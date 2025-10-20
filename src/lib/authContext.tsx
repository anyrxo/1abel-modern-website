'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (email: string, password: string, name: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('1abel-user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (e) {
        console.error('Failed to parse user from localStorage', e)
      }
    }
  }, [])

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('1abel-user', JSON.stringify(user))
    } else {
      localStorage.removeItem('1abel-user')
    }
  }, [user])

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    // In a real app, this would call your backend API
    // For now, we'll just store in localStorage
    const users = JSON.parse(localStorage.getItem('1abel-users') || '[]')

    // Check if user already exists
    if (users.find((u: any) => u.email === email)) {
      return false // User already exists
    }

    // Create new user
    const newUser = { email, password, name }
    users.push(newUser)
    localStorage.setItem('1abel-users', JSON.stringify(users))

    // Log them in
    setUser({ email, name })
    return true
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would call your backend API
    const users = JSON.parse(localStorage.getItem('1abel-users') || '[]')
    const user = users.find((u: any) => u.email === email && u.password === password)

    if (user) {
      setUser({ email: user.email, name: user.name })
      return true
    }

    return false
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
