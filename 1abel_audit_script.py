#!/usr/bin/env python3
"""
Comprehensive 1ABEL Website Audit Script
Tests navigation, buttons, links, forms, responsiveness, performance, and content
"""

import asyncio
import json
import time
from datetime import datetime
from playwright.async_api import async_playwright
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class WebsiteAuditor:
    def __init__(self, base_url="http://localhost:8000"):
        self.base_url = base_url
        self.issues = []
        self.performance_data = []
        self.links_tested = set()
        self.broken_links = []
        self.dead_ends = []
        self.mobile_issues = []
        
    def log_issue(self, severity, category, page, description, recommendation=""):
        """Log an issue found during audit"""
        issue = {
            "timestamp": datetime.now().isoformat(),
            "severity": severity,  # critical, high, medium, low
            "category": category,  # navigation, button, link, form, mobile, performance, content, seo
            "page": page,
            "description": description,
            "recommendation": recommendation
        }
        self.issues.append(issue)
        logger.error(f"[{severity.upper()}] {category}: {description} on {page}")
        
    async def audit_navigation_links(self, page):
        """Test all navigation links in header and footer"""
        logger.info("Testing navigation links...")
        
        try:
            # Check header navigation
            header_links = await page.locator('header a, nav a').all()
            for link in header_links:
                try:
                    href = await link.get_attribute('href')
                    text = await link.inner_text()
                    
                    if href and href not in self.links_tested:
                        self.links_tested.add(href)
                        
                        if href.startswith('/'):
                            # Internal link
                            await link.click()
                            await page.wait_for_load_state('networkidle')
                            
                            # Check if page loaded successfully
                            current_url = page.url
                            if '404' in current_url or await page.locator('text=404').count() > 0:
                                self.log_issue('high', 'navigation', current_url, 
                                             f"Header link '{text}' leads to 404 page",
                                             "Fix broken navigation link or remove it")
                            
                            # Go back to test more links
                            await page.go_back()
                            await page.wait_for_load_state('networkidle')
                            
                except Exception as e:
                    self.log_issue('medium', 'navigation', page.url,
                                 f"Failed to test header link '{text}': {str(e)}",
                                 "Investigate link functionality")
            
            # Check footer navigation
            footer_links = await page.locator('footer a').all()
            for link in footer_links:
                try:
                    href = await link.get_attribute('href')
                    text = await link.inner_text()
                    
                    if href and href not in self.links_tested:
                        self.links_tested.add(href)
                        
                        if href.startswith('/'):
                            await link.click()
                            await page.wait_for_load_state('networkidle')
                            
                            current_url = page.url
                            if '404' in current_url or await page.locator('text=404').count() > 0:
                                self.log_issue('high', 'navigation', current_url,
                                             f"Footer link '{text}' leads to 404 page",
                                             "Fix broken footer link or remove it")
                            
                            await page.go_back()
                            await page.wait_for_load_state('networkidle')
                            
                except Exception as e:
                    self.log_issue('medium', 'navigation', page.url,
                                 f"Failed to test footer link '{text}': {str(e)}",
                                 "Investigate link functionality")
                    
        except Exception as e:
            self.log_issue('critical', 'navigation', page.url,
                         f"Failed to audit navigation: {str(e)}",
                         "Check page structure and navigation elements")
    
    async def test_buttons_and_ctas(self, page):
        """Test all buttons and CTAs throughout the site"""
        logger.info("Testing buttons and CTAs...")
        
        try:
            # Find all buttons and button-like elements
            buttons = await page.locator('button, .btn, [role="button"], input[type="submit"]').all()
            
            for i, button in enumerate(buttons):
                try:
                    text = await button.inner_text() or f"Button {i}"
                    is_visible = await button.is_visible()
                    is_enabled = await button.is_enabled()
                    
                    if is_visible and not is_enabled:
                        self.log_issue('medium', 'button', page.url,
                                     f"Button '{text}' is visible but disabled",
                                     "Check if button should be enabled or provide user feedback")
                    
                    if is_visible and is_enabled:
                        # Check if button has proper aria labels or text
                        aria_label = await button.get_attribute('aria-label')
                        if not text.strip() and not aria_label:
                            self.log_issue('medium', 'button', page.url,
                                         f"Button {i} has no text or aria-label",
                                         "Add descriptive text or aria-label for accessibility")
                
                except Exception as e:
                    self.log_issue('low', 'button', page.url,
                                 f"Failed to test button {i}: {str(e)}",
                                 "Check button implementation")
                    
        except Exception as e:
            self.log_issue('medium', 'button', page.url,
                         f"Failed to audit buttons: {str(e)}",
                         "Check page structure for button elements")
    
    async def test_internal_links(self, page):
        """Test all internal page links"""
        logger.info("Testing internal links...")
        
        try:
            # Get all internal links (excluding external and anchor links)
            links = await page.locator('a[href^="/"], a[href^="./"], a[href^="../"]').all()
            
            for link in links:
                try:
                    href = await link.get_attribute('href')
                    text = await link.inner_text()
                    
                    if href and href not in self.links_tested:
                        self.links_tested.add(href)
                        
                        # Test the link
                        original_url = page.url
                        await link.click()
                        await page.wait_for_load_state('networkidle')
                        
                        current_url = page.url
                        
                        # Check for 404 or error pages
                        if '404' in current_url or await page.locator('text=404').count() > 0:
                            self.broken_links.append({
                                'url': href,
                                'text': text,
                                'source_page': original_url
                            })
                            self.log_issue('high', 'link', original_url,
                                         f"Internal link '{text}' ({href}) is broken",
                                         "Fix broken link or remove it")
                        
                        # Check for dead ends (pages with no way back)
                        back_links = await page.locator('a[href="/"], a[href="./"], nav a').count()
                        if back_links == 0:
                            self.dead_ends.append(current_url)
                            self.log_issue('medium', 'navigation', current_url,
                                         "Page has no clear navigation back to main site",
                                         "Add breadcrumbs or navigation links")
                        
                        await page.go_back()
                        await page.wait_for_load_state('networkidle')
                        
                except Exception as e:
                    self.log_issue('medium', 'link', page.url,
                                 f"Failed to test internal link '{text}': {str(e)}",
                                 "Check link implementation")
                    
        except Exception as e:
            self.log_issue('medium', 'link', page.url,
                         f"Failed to audit internal links: {str(e)}",
                         "Check page structure for link elements")
    
    async def test_blog_system(self, page):
        """Test blog navigation and individual posts"""
        logger.info("Testing blog system...")
        
        try:
            # Navigate to blog page
            await page.goto(f"{self.base_url}/blog")
            await page.wait_for_load_state('networkidle')
            
            # Check if blog page loads
            if await page.locator('text=404').count() > 0:
                self.log_issue('critical', 'blog', '/blog',
                             "Blog page returns 404",
                             "Fix blog page routing")
                return
            
            # Test blog post links
            blog_links = await page.locator('a[href*="/blog/"]').all()
            
            for i, link in enumerate(blog_links[:5]):  # Test first 5 posts
                try:
                    href = await link.get_attribute('href')
                    text = await link.inner_text()
                    
                    await link.click()
                    await page.wait_for_load_state('networkidle')
                    
                    # Check if post loads correctly
                    if await page.locator('text=404').count() > 0:
                        self.log_issue('high', 'blog', href,
                                     f"Blog post '{text}' returns 404",
                                     "Fix blog post routing or content")
                    else:
                        # Check for content
                        content = await page.locator('article, .content, main').count()
                        if content == 0:
                            self.log_issue('medium', 'blog', href,
                                         f"Blog post '{text}' has no visible content",
                                         "Add proper content structure")
                    
                    await page.go_back()
                    await page.wait_for_load_state('networkidle')
                    
                except Exception as e:
                    self.log_issue('medium', 'blog', page.url,
                                 f"Failed to test blog post {i}: {str(e)}",
                                 "Check blog post implementation")
                    
        except Exception as e:
            self.log_issue('critical', 'blog', '/blog',
                         f"Failed to test blog system: {str(e)}",
                         "Check blog page implementation")
    
    async def test_contact_forms(self, page):
        """Test contact forms and email functionality"""
        logger.info("Testing contact forms...")
        
        try:
            # Navigate to contact page
            await page.goto(f"{self.base_url}/contact")
            await page.wait_for_load_state('networkidle')
            
            # Check for forms
            forms = await page.locator('form').all()
            
            if len(forms) == 0:
                self.log_issue('medium', 'form', '/contact',
                             "No contact forms found on contact page",
                             "Add contact form or verify page content")
            
            for i, form in enumerate(forms):
                try:
                    # Check form fields
                    inputs = await form.locator('input, textarea, select').all()
                    submit_button = await form.locator('input[type="submit"], button[type="submit"], button').first
                    
                    if len(inputs) == 0:
                        self.log_issue('medium', 'form', '/contact',
                                     f"Form {i} has no input fields",
                                     "Add proper form fields")
                    
                    # Check if submit button exists
                    if await submit_button.count() == 0:
                        self.log_issue('medium', 'form', '/contact',
                                     f"Form {i} has no submit button",
                                     "Add submit button to form")
                    
                    # Check form action
                    action = await form.get_attribute('action')
                    method = await form.get_attribute('method')
                    
                    if not action:
                        self.log_issue('low', 'form', '/contact',
                                     f"Form {i} has no action attribute",
                                     "Add form action for proper submission")
                
                except Exception as e:
                    self.log_issue('medium', 'form', '/contact',
                                 f"Failed to test form {i}: {str(e)}",
                                 "Check form implementation")
            
            # Check for email links
            email_links = await page.locator('a[href^="mailto:"]').all()
            for link in email_links:
                href = await link.get_attribute('href')
                if not href or not '@' in href:
                    self.log_issue('low', 'form', '/contact',
                                 "Invalid email link found",
                                 "Fix email link format")
                    
        except Exception as e:
            self.log_issue('medium', 'form', '/contact',
                         f"Failed to test contact forms: {str(e)}",
                         "Check contact page implementation")
    
    async def test_mobile_responsiveness(self, page):
        """Test mobile responsiveness across different screen sizes"""
        logger.info("Testing mobile responsiveness...")
        
        # Mobile viewport sizes to test
        viewports = [
            {'width': 375, 'height': 667, 'name': 'Mobile (iPhone)'},
            {'width': 768, 'height': 1024, 'name': 'Tablet'},
            {'width': 1024, 'height': 768, 'name': 'Desktop Small'},
            {'width': 1920, 'height': 1080, 'name': 'Desktop Large'}
        ]
        
        for viewport in viewports:
            try:
                await page.set_viewport_size({'width': viewport['width'], 'height': viewport['height']})
                await page.reload()
                await page.wait_for_load_state('networkidle')
                
                # Check for horizontal scroll
                scroll_width = await page.evaluate('document.documentElement.scrollWidth')
                client_width = await page.evaluate('document.documentElement.clientWidth')
                
                if scroll_width > client_width:
                    self.log_issue('medium', 'mobile', page.url,
                                 f"Horizontal scroll detected on {viewport['name']}",
                                 "Fix responsive design to prevent horizontal scroll")
                
                # Check if navigation is accessible on mobile
                if viewport['width'] <= 768:
                    nav_visible = await page.locator('nav').is_visible()
                    hamburger = await page.locator('.hamburger, .menu-toggle, [aria-label*="menu"]').count()
                    
                    if not nav_visible and hamburger == 0:
                        self.log_issue('high', 'mobile', page.url,
                                     "No mobile navigation menu found",
                                     "Add mobile hamburger menu or ensure nav is accessible")
                
                # Check text readability
                small_text = await page.locator('*').evaluate_all('''
                    elements => elements.filter(el => {
                        const style = window.getComputedStyle(el);
                        const fontSize = parseInt(style.fontSize);
                        return fontSize < 14 && el.innerText && el.innerText.trim().length > 0;
                    }).length
                ''')
                
                if small_text > 0:
                    self.log_issue('low', 'mobile', page.url,
                                 f"Found {small_text} elements with text smaller than 14px on {viewport['name']}",
                                 "Increase font size for better mobile readability")
                    
            except Exception as e:
                self.log_issue('medium', 'mobile', page.url,
                             f"Failed to test {viewport['name']} responsiveness: {str(e)}",
                             "Check responsive design implementation")
    
    async def check_performance(self, page):
        """Check for performance issues"""
        logger.info("Checking performance...")
        
        try:
            # Measure page load time
            start_time = time.time()
            await page.reload()
            await page.wait_for_load_state('networkidle')
            load_time = time.time() - start_time
            
            self.performance_data.append({
                'page': page.url,
                'load_time': load_time
            })
            
            if load_time > 5:
                self.log_issue('medium', 'performance', page.url,
                             f"Page load time is {load_time:.2f}s (slow)",
                             "Optimize images, minify CSS/JS, enable compression")
            
            # Check for large images
            images = await page.locator('img').all()
            for img in images:
                src = await img.get_attribute('src')
                if src and not src.startswith('data:'):
                    # Check if image has explicit dimensions
                    width = await img.get_attribute('width')
                    height = await img.get_attribute('height')
                    
                    if not width or not height:
                        self.log_issue('low', 'performance', page.url,
                                     f"Image {src} missing explicit dimensions",
                                     "Add width and height attributes to prevent layout shift")
            
            # Check for inline styles (potential optimization)
            inline_styles = await page.locator('[style]').count()
            if inline_styles > 10:
                self.log_issue('low', 'performance', page.url,
                             f"Found {inline_styles} elements with inline styles",
                             "Consider moving inline styles to CSS files")
                             
        except Exception as e:
            self.log_issue('medium', 'performance', page.url,
                         f"Failed to check performance: {str(e)}",
                         "Check page performance optimization")
    
    async def check_content_errors(self, page):
        """Check for content errors, typos, and formatting issues"""
        logger.info("Checking content errors...")
        
        try:
            # Check for empty elements
            empty_elements = await page.locator('h1:empty, h2:empty, h3:empty, p:empty, div:empty').count()
            if empty_elements > 0:
                self.log_issue('low', 'content', page.url,
                             f"Found {empty_elements} empty content elements",
                             "Remove empty elements or add content")
            
            # Check for missing alt text on images
            images_without_alt = await page.locator('img:not([alt])').count()
            if images_without_alt > 0:
                self.log_issue('medium', 'content', page.url,
                             f"Found {images_without_alt} images without alt text",
                             "Add descriptive alt text for accessibility")
            
            # Check for duplicate IDs
            all_ids = await page.evaluate('''
                () => {
                    const elements = document.querySelectorAll('[id]');
                    const ids = Array.from(elements).map(el => el.id);
                    const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
                    return [...new Set(duplicates)];
                }
            ''')
            
            if len(all_ids) > 0:
                self.log_issue('medium', 'content', page.url,
                             f"Found duplicate IDs: {', '.join(all_ids)}",
                             "Ensure all IDs are unique")
            
            # Check for broken internal references
            hash_links = await page.locator('a[href^="#"]').all()
            for link in hash_links:
                href = await link.get_attribute('href')
                target_id = href[1:]  # Remove #
                target_exists = await page.locator(f'#{target_id}').count() > 0
                
                if not target_exists:
                    self.log_issue('medium', 'content', page.url,
                                 f"Hash link {href} points to non-existent element",
                                 "Fix internal anchor link or add target element")
                                 
        except Exception as e:
            self.log_issue('medium', 'content', page.url,
                         f"Failed to check content errors: {str(e)}",
                         "Check page content structure")
    
    async def check_seo_elements(self, page):
        """Check SEO elements and meta tags"""
        logger.info("Checking SEO elements...")
        
        try:
            # Check for title tag
            title = await page.locator('title').inner_text()
            if not title or len(title) < 10:
                self.log_issue('high', 'seo', page.url,
                             "Page title is missing or too short",
                             "Add descriptive page title (50-60 characters)")
            elif len(title) > 60:
                self.log_issue('medium', 'seo', page.url,
                             f"Page title is too long ({len(title)} characters)",
                             "Shorten title to 50-60 characters")
            
            # Check for meta description
            meta_desc = await page.locator('meta[name="description"]').get_attribute('content')
            if not meta_desc:
                self.log_issue('high', 'seo', page.url,
                             "Missing meta description",
                             "Add meta description (150-160 characters)")
            elif len(meta_desc) > 160:
                self.log_issue('medium', 'seo', page.url,
                             f"Meta description too long ({len(meta_desc)} characters)",
                             "Shorten meta description to 150-160 characters")
            
            # Check for H1 tag
            h1_count = await page.locator('h1').count()
            if h1_count == 0:
                self.log_issue('medium', 'seo', page.url,
                             "No H1 tag found",
                             "Add H1 tag for better SEO structure")
            elif h1_count > 1:
                self.log_issue('low', 'seo', page.url,
                             f"Multiple H1 tags found ({h1_count})",
                             "Use only one H1 tag per page")
            
            # Check heading hierarchy
            headings = await page.locator('h1, h2, h3, h4, h5, h6').all()
            prev_level = 0
            for heading in headings:
                tag_name = await heading.evaluate('el => el.tagName.toLowerCase()')
                level = int(tag_name[1])
                
                if level > prev_level + 1:
                    self.log_issue('low', 'seo', page.url,
                                 f"Heading hierarchy skip: {tag_name} after h{prev_level}",
                                 "Maintain proper heading hierarchy (h1 > h2 > h3...)")
                prev_level = level
            
            # Check for Open Graph tags
            og_tags = await page.locator('meta[property^="og:"]').count()
            if og_tags == 0:
                self.log_issue('medium', 'seo', page.url,
                             "No Open Graph tags found",
                             "Add Open Graph meta tags for social sharing")
                             
        except Exception as e:
            self.log_issue('medium', 'seo', page.url,
                         f"Failed to check SEO elements: {str(e)}",
                         "Check page meta tags and SEO structure")
    
    async def run_full_audit(self):
        """Run the complete website audit"""
        print("🔍 Starting comprehensive 1ABEL website audit...")
        
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            page = await browser.new_page()
            
            # Test main pages
            main_pages = ['/', '/about', '/services', '/contact', '/careers', '/blog', '/privacy', '/terms']
            
            for page_path in main_pages:
                try:
                    print(f"\n📄 Auditing page: {page_path}")
                    await page.goto(f"{self.base_url}{page_path}")
                    await page.wait_for_load_state('networkidle')
                    
                    # Run all tests on this page
                    await self.audit_navigation_links(page)
                    await self.test_buttons_and_ctas(page)
                    await self.test_internal_links(page)
                    await self.check_performance(page)
                    await self.check_content_errors(page)
                    await self.check_seo_elements(page)
                    
                    # Test mobile responsiveness on key pages
                    if page_path in ['/', '/contact', '/services']:
                        await self.test_mobile_responsiveness(page)
                    
                except Exception as e:
                    self.log_issue('critical', 'general', page_path,
                                 f"Failed to load page: {str(e)}",
                                 "Check page exists and loads correctly")
            
            # Test blog system specifically
            await self.test_blog_system(page)
            
            # Test contact forms specifically
            await self.test_contact_forms(page)
            
            await browser.close()
        
        # Generate audit report
        await self.generate_report()
    
    async def generate_report(self):
        """Generate comprehensive audit report"""
        report = {
            "audit_timestamp": datetime.now().isoformat(),
            "website": "1ABEL Music Label",
            "base_url": self.base_url,
            "total_issues": len(self.issues),
            "issues_by_severity": {
                "critical": len([i for i in self.issues if i['severity'] == 'critical']),
                "high": len([i for i in self.issues if i['severity'] == 'high']),
                "medium": len([i for i in self.issues if i['severity'] == 'medium']),
                "low": len([i for i in self.issues if i['severity'] == 'low'])
            },
            "issues_by_category": {},
            "issues": self.issues,
            "broken_links": self.broken_links,
            "dead_ends": self.dead_ends,
            "performance_data": self.performance_data
        }
        
        # Calculate issues by category
        categories = set(issue['category'] for issue in self.issues)
        for category in categories:
            report['issues_by_category'][category] = len([i for i in self.issues if i['category'] == category])
        
        # Save detailed report
        with open('1abel_audit_report.json', 'w') as f:
            json.dump(report, f, indent=2)
        
        # Generate human-readable summary
        await self.generate_summary_report(report)
    
    async def generate_summary_report(self, report):
        """Generate human-readable summary report"""
        summary = f"""
# 1ABEL Website Audit Report
**Audit Date:** {datetime.now().strftime('%B %d, %Y at %H:%M')}
**Website:** 1ABEL Music Label
**Total Issues Found:** {report['total_issues']}

## 📊 Issues by Severity
- 🔴 **Critical:** {report['issues_by_severity']['critical']}
- 🟠 **High:** {report['issues_by_severity']['high']}
- 🟡 **Medium:** {report['issues_by_severity']['medium']}
- 🟢 **Low:** {report['issues_by_severity']['low']}

## 📋 Issues by Category
"""
        
        for category, count in report['issues_by_category'].items():
            summary += f"- **{category.title()}:** {count} issues\n"
        
        summary += f"""
## 🔗 Broken Links Found
**Total Broken Links:** {len(report['broken_links'])}
"""
        
        for link in report['broken_links']:
            summary += f"- `{link['text']}` ({link['url']}) on {link['source_page']}\n"
        
        summary += f"""
## 🚫 Dead End Pages
**Total Dead Ends:** {len(report['dead_ends'])}
"""
        
        for dead_end in report['dead_ends']:
            summary += f"- {dead_end}\n"
        
        summary += """
## 🚀 Performance Summary
"""
        
        for perf in report['performance_data']:
            summary += f"- {perf['page']}: {perf['load_time']:.2f}s\n"
        
        summary += """
## 🔍 Critical Issues Requiring Immediate Attention
"""
        
        critical_issues = [i for i in report['issues'] if i['severity'] == 'critical']
        for issue in critical_issues:
            summary += f"""
### {issue['category'].title()} Issue on {issue['page']}
**Problem:** {issue['description']}
**Recommendation:** {issue['recommendation']}
"""
        
        summary += """
## 🎯 High Priority Issues
"""
        
        high_issues = [i for i in report['issues'] if i['severity'] == 'high']
        for issue in high_issues:
            summary += f"""
### {issue['category'].title()} Issue on {issue['page']}
**Problem:** {issue['description']}
**Recommendation:** {issue['recommendation']}
"""
        
        # Save summary report
        with open('1abel_audit_summary.md', 'w') as f:
            f.write(summary)
        
        print("\n" + "="*60)
        print("🎯 AUDIT COMPLETE!")
        print("="*60)
        print(summary)

if __name__ == "__main__":
    auditor = WebsiteAuditor()
    asyncio.run(auditor.run_full_audit())