export interface BlogPost {
  id: string;
  title: string;
  category: string;
  categoryColor: string;
  excerpt: string;
  description: string;
  readTime: string;
  date: string;
  slug: string;
  keywords: string[];
  type: 'general' | 'news';
}

export interface BlogMetrics {
  views: number;
  likes: number;
  shares: number;
  lastUpdated: string;
  initialDate: string;
}

// Generate random date in 2025 (Jan-Aug)
const generateRandomDate = (): string => {
  const year = 2025;
  const month = Math.floor(Math.random() * 8) + 1; // 1-8 (Jan-Aug)
  const day = Math.floor(Math.random() * 28) + 1; // 1-28 (safe for all months)
  const date = new Date(year, month - 1, day);
  return date.toISOString().split('T')[0]; // YYYY-MM-DD format
};

// Calculate days since article publication
const getDaysSincePublication = (articleDate: string): number => {
  const today = new Date();
  const pubDate = new Date(articleDate);
  const diffTime = Math.abs(today.getTime() - pubDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Generate initial realistic metrics based on article characteristics
const generateInitialMetrics = (post: BlogPost): BlogMetrics => {
  // Base metrics influenced by content type and quality
  const baseViews = post.type === 'news' ? 
    Math.floor(Math.random() * 3000) + 2500 : // 2500-5500 for news
    Math.floor(Math.random() * 2000) + 1500;  // 1500-3500 for general
  
  // Category influence on engagement
  const categoryMultipliers: { [key: string]: number } = {
    'PLATFORM COMPARISON': 1.4,
    'SOCIAL MEDIA': 1.6,
    'INDUSTRY TRUTH': 1.3,
    'MONETIZATION': 1.5,
    'PLATFORM NEWS': 1.7,
    'STREAMING DATA': 1.2,
    'AI & MUSIC': 1.8,
    'SYNC LICENSING': 1.1,
    'INDUSTRY WARNING': 1.3
  };
  
  const multiplier = categoryMultipliers[post.category] || 1.0;
  const views = Math.floor(baseViews * multiplier);
  
  // Likes are 7-14% of views
  const likeRate = (Math.random() * 0.07) + 0.07; // 7-14%
  const likes = Math.floor(views * likeRate);
  
  // Shares are 13-18% of likes
  const shareRate = (Math.random() * 0.05) + 0.13; // 13-18%
  const shares = Math.floor(likes * shareRate);
  
  return {
    views,
    likes,
    shares,
    lastUpdated: new Date().toISOString(),
    initialDate: post.date
  };
};

// Calculate daily growth based on article age and performance
const calculateDailyGrowth = (metrics: BlogMetrics, daysSincePublication: number): BlogMetrics => {
  // Growth slows over time (exponential decay)
  const ageMultiplier = Math.max(0.1, 1 / Math.sqrt(daysSincePublication + 1));
  
  // Base daily growth rates
  const viewGrowthRate = (Math.random() * 0.015 + 0.005) * ageMultiplier; // 0.5-2% daily, slowing
  const likeGrowthRate = (Math.random() * 0.008 + 0.003) * ageMultiplier; // 0.3-1.1% daily, slowing
  const shareGrowthRate = (Math.random() * 0.005 + 0.002) * ageMultiplier; // 0.2-0.7% daily, slowing
  
  // Calculate new metrics
  const newViews = Math.floor(metrics.views * (1 + viewGrowthRate));
  
  // Ensure likes stay within 7-14% of views
  const maxLikes = Math.floor(newViews * 0.14);
  const minLikes = Math.floor(newViews * 0.07);
  let newLikes = Math.floor(metrics.likes * (1 + likeGrowthRate));
  newLikes = Math.max(minLikes, Math.min(maxLikes, newLikes));
  
  // Ensure shares stay within 13-18% of likes
  const maxShares = Math.floor(newLikes * 0.18);
  const minShares = Math.floor(newLikes * 0.13);
  let newShares = Math.floor(metrics.shares * (1 + shareGrowthRate));
  newShares = Math.max(minShares, Math.min(maxShares, newShares));
  
  return {
    views: newViews,
    likes: newLikes,
    shares: newShares,
    lastUpdated: new Date().toISOString(),
    initialDate: metrics.initialDate
  };
};

// Main function to get persistent, growing metrics
export const getPostStats = (post: BlogPost): BlogMetrics => {
  if (typeof window === 'undefined') {
    // Server-side fallback
    return generateInitialMetrics(post);
  }
  
  const storageKey = `blog-metrics-${post.id}`;
  const stored = localStorage.getItem(storageKey);
  
  let metrics: BlogMetrics;
  
  if (stored) {
    metrics = JSON.parse(stored);
    
    // Check if we need to update (once per day)
    const lastUpdate = new Date(metrics.lastUpdated);
    const now = new Date();
    const hoursSinceUpdate = (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60);
    
    if (hoursSinceUpdate >= 24) {
      // Time for daily growth update
      const daysSincePublication = getDaysSincePublication(metrics.initialDate);
      metrics = calculateDailyGrowth(metrics, daysSincePublication);
      localStorage.setItem(storageKey, JSON.stringify(metrics));
    }
  } else {
    // First time - generate initial metrics
    metrics = generateInitialMetrics(post);
    localStorage.setItem(storageKey, JSON.stringify(metrics));
  }
  
  return metrics;
};

export const calculateBlogMetrics = (posts: BlogPost[]) => {
  const totalPosts = posts.length;
  
  if (totalPosts === 0) {
    return {
      totalPosts: 0,
      totalReadTime: 0,
      averageReadTime: 0,
      totalViews: 0,
      totalLikes: 0,
      totalShares: 0
    };
  }
  
  const totalReadTime = posts.reduce((acc, post) => {
    const minutes = parseInt(post.readTime.replace(' min', ''));
    return acc + minutes;
  }, 0);
  
  // Calculate total views, likes, and shares from all posts using dynamic metrics
  let totalViews = 0;
  let totalLikes = 0;
  let totalShares = 0;
  
  if (typeof window !== 'undefined') {
    // Use actual dynamic metrics when available
    posts.forEach(post => {
      const stats = getPostStats(post);
      totalViews += stats.views;
      totalLikes += stats.likes;
      totalShares += stats.shares;
    });
  } else {
    // Server-side fallback with estimated totals
    totalViews = totalPosts * 3200; // Average views per post
    totalLikes = Math.round(totalViews * 0.095); // 9.5% average like rate
    totalShares = Math.round(totalLikes * 0.155); // 15.5% average share rate
  }
  
  const averageReadTime = Math.round(totalReadTime / totalPosts);
  
  return {
    totalPosts,
    totalReadTime,
    averageReadTime,
    totalViews,
    totalLikes,
    totalShares
  };
};

export const formatBlogDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const getCategoryColor = (category: string) => {
  const colors: { [key: string]: string } = {
    'LEADERSHIP': 'blue',
    'INNOVATION': 'purple',
    'STRATEGY': 'green',
    'CULTURE': 'orange',
    'TECH NEWS': 'blue',
    'AI NEWS': 'purple',
    'BUSINESS': 'green',
    'INSIGHTS': 'orange',
    'TRENDS': 'pink'
  };
  
  return colors[category] || 'gray';
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`;
  }
  return num.toString();
};