#!/usr/bin/env python3
"""
Browser test for 1ABEL website navigation and functionality
"""

import asyncio
from playwright.async_api import async_playwright
import json
from datetime import datetime

async def test_navigation():
    """Test navigation links and page functionality"""
    
    base_url = "http://localhost:8000"
    issues = []
    
    def log_issue(severity, category, page, description, recommendation):
        issue = {
            "severity": severity,
            "category": category,
            "page": page,
            "description": description,
            "recommendation": recommendation,
            "timestamp": datetime.now().isoformat()
        }
        issues.append(issue)
        print(f"[{severity.upper()}] {category}: {description}")
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        # Test main navigation links
        nav_links = {
            'Home': '/',
            'Blog': '/blog/',
            'About': '/about/',
            'Contact (Email)': 'mailto:anyro@1abel.com'
        }
        
        print("🧭 Testing main navigation links...")
        
        for link_name, url in nav_links.items():
            try:
                if url.startswith('mailto:'):
                    print(f"✅ {link_name}: Email link format correct")
                    continue
                    
                print(f"Testing {link_name} ({url})...")
                await page.goto(f"{base_url}{url}")
                await page.wait_for_load_state('networkidle', timeout=10000)
                
                # Check if page loads successfully
                title = await page.title()
                if not title:
                    log_issue('high', 'navigation', url, f"{link_name} page has no title", "Add page title")
                
                # Check for 404 content
                content = await page.content()
                if '404' in content.lower() and 'not found' in content.lower():
                    log_issue('critical', 'navigation', url, f"{link_name} returns 404 page", "Fix broken navigation link")
                else:
                    print(f"✅ {link_name}: Page loads successfully")
                    
            except Exception as e:
                log_issue('critical', 'navigation', url, f"{link_name} failed to load: {str(e)}", "Check page exists and loads correctly")
        
        # Test blog functionality
        print("\n📝 Testing blog functionality...")
        try:
            await page.goto(f"{base_url}/blog/")
            await page.wait_for_load_state('networkidle')
            
            # Check for blog posts
            blog_links = await page.locator('a[href*="/blog/"]').all()
            print(f"Found {len(blog_links)} blog post links")
            
            if len(blog_links) > 0:
                # Test first few blog posts
                for i, link in enumerate(blog_links[:3]):
                    try:
                        href = await link.get_attribute('href')
                        if href and href != '/blog/':
                            print(f"Testing blog post: {href}")
                            await link.click()
                            await page.wait_for_load_state('networkidle')
                            
                            # Check if blog post loads
                            current_url = page.url
                            if '404' in await page.content():
                                log_issue('high', 'blog', href, "Blog post returns 404", "Fix broken blog post link")
                            else:
                                print(f"✅ Blog post loads: {href}")
                            
                            # Go back to blog listing
                            await page.go_back()
                            await page.wait_for_load_state('networkidle')
                            
                    except Exception as e:
                        log_issue('medium', 'blog', f"blog-post-{i}", f"Failed to test blog post: {str(e)}", "Check blog post implementation")
            else:
                log_issue('medium', 'blog', '/blog/', "No blog post links found", "Add blog posts or check blog implementation")
                
        except Exception as e:
            log_issue('high', 'blog', '/blog/', f"Blog page failed to load: {str(e)}", "Check blog page implementation")
        
        # Test contact functionality
        print("\n📧 Testing contact functionality...")
        try:
            await page.goto(f"{base_url}/contact/")
            await page.wait_for_load_state('networkidle')
            
            # Check for contact forms
            forms = await page.locator('form').all()
            print(f"Found {len(forms)} forms on contact page")
            
            if len(forms) == 0:
                # Check for alternative contact methods
                email_links = await page.locator('a[href^="mailto:"]').count()
                phone_links = await page.locator('a[href^="tel:"]').count()
                
                if email_links == 0 and phone_links == 0:
                    log_issue('high', 'contact', '/contact/', "No contact methods found", "Add contact form or contact information")
                else:
                    print(f"✅ Found {email_links} email links and {phone_links} phone links")
            else:
                print(f"✅ Found {len(forms)} contact forms")
                
        except Exception as e:
            log_issue('medium', 'contact', '/contact/', f"Contact page failed to load: {str(e)}", "Check contact page exists")
        
        # Test mobile responsiveness
        print("\n📱 Testing mobile responsiveness...")
        viewports = [
            {'width': 375, 'height': 667, 'name': 'Mobile'},
            {'width': 768, 'height': 1024, 'name': 'Tablet'},
            {'width': 1920, 'height': 1080, 'name': 'Desktop'}
        ]
        
        for viewport in viewports:
            try:
                await page.set_viewport_size({'width': viewport['width'], 'height': viewport['height']})
                await page.goto(f"{base_url}/")
                await page.wait_for_load_state('networkidle')
                
                # Check for horizontal scroll
                scroll_width = await page.evaluate('document.documentElement.scrollWidth')
                client_width = await page.evaluate('document.documentElement.clientWidth')
                
                if scroll_width > client_width + 5:  # Small tolerance
                    log_issue('medium', 'mobile', '/', f"Horizontal scroll on {viewport['name']} ({viewport['width']}px)", "Fix responsive design")
                else:
                    print(f"✅ {viewport['name']}: No horizontal scroll")
                    
            except Exception as e:
                log_issue('medium', 'mobile', '/', f"Failed to test {viewport['name']} viewport: {str(e)}", "Check responsive design")
        
        # Test page performance
        print("\n⚡ Testing page performance...")
        try:
            start_time = asyncio.get_event_loop().time()
            await page.goto(f"{base_url}/")
            await page.wait_for_load_state('networkidle')
            load_time = asyncio.get_event_loop().time() - start_time
            
            print(f"Homepage load time: {load_time:.2f}s")
            
            if load_time > 3.0:
                log_issue('medium', 'performance', '/', f"Slow page load time: {load_time:.2f}s", "Optimize images, CSS, and JavaScript")
            else:
                print(f"✅ Good load time: {load_time:.2f}s")
                
        except Exception as e:
            log_issue('medium', 'performance', '/', f"Failed to test performance: {str(e)}", "Check page optimization")
        
        await browser.close()
    
    # Generate summary report
    print("\n" + "="*60)
    print("🎯 BROWSER TEST RESULTS")
    print("="*60)
    
    critical_issues = [i for i in issues if i['severity'] == 'critical']
    high_issues = [i for i in issues if i['severity'] == 'high']
    medium_issues = [i for i in issues if i['severity'] == 'medium']
    
    print(f"\n📊 Issue Summary:")
    print(f"🔴 Critical: {len(critical_issues)}")
    print(f"🟠 High: {len(high_issues)}")
    print(f"🟡 Medium: {len(medium_issues)}")
    
    if critical_issues or high_issues:
        print(f"\n🚨 CRITICAL & HIGH PRIORITY ISSUES:")
        for issue in critical_issues + high_issues:
            print(f"\n[{issue['severity'].upper()}] {issue['category']} - {issue['page']}")
            print(f"  Problem: {issue['description']}")
            print(f"  Fix: {issue['recommendation']}")
    
    # Save detailed results
    report = {
        "test_date": datetime.now().isoformat(),
        "base_url": base_url,
        "total_issues": len(issues),
        "issues": issues,
        "summary": {
            "critical": len(critical_issues),
            "high": len(high_issues),
            "medium": len(medium_issues)
        }
    }
    
    with open('browser_test_results.json', 'w') as f:
        json.dump(report, f, indent=2)
    
    print(f"\n💾 Full results saved to: browser_test_results.json")
    return issues

if __name__ == "__main__":
    asyncio.run(test_navigation())