#!/usr/bin/env python3
"""
Simple 1ABEL Website Audit Script
Manual analysis of static HTML files
"""

import os
import re
import json
from pathlib import Path
from datetime import datetime

class SimpleAuditor:
    def __init__(self, base_path):
        self.base_path = Path(base_path)
        self.issues = []
        self.links_found = []
        self.pages_found = []
        
    def log_issue(self, severity, category, page, description, recommendation):
        """Log an issue found during audit"""
        issue = {
            "severity": severity,
            "category": category,
            "page": page,
            "description": description,
            "recommendation": recommendation
        }
        self.issues.append(issue)
        print(f"[{severity.upper()}] {category}: {description} on {page}")
        
    def find_html_files(self):
        """Find all HTML files in the static export"""
        html_files = []
        for file_path in self.base_path.rglob("*.html"):
            relative_path = file_path.relative_to(self.base_path)
            html_files.append(file_path)
            self.pages_found.append(str(relative_path))
        return html_files
        
    def extract_links_from_file(self, file_path):
        """Extract all links from an HTML file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Extract href attributes
            href_pattern = r'href=["\']([^"\']+)["\']'
            links = re.findall(href_pattern, content)
            
            # Extract navigation specific links
            nav_pattern = r'<nav[^>]*>(.*?)</nav>'
            nav_matches = re.findall(nav_pattern, content, re.DOTALL | re.IGNORECASE)
            
            nav_links = []
            for nav_content in nav_matches:
                nav_links.extend(re.findall(href_pattern, nav_content))
                
            return links, nav_links
            
        except Exception as e:
            self.log_issue('medium', 'parsing', str(file_path), 
                         f"Failed to parse HTML file: {str(e)}", 
                         "Check file encoding and HTML structure")
            return [], []
    
    def check_meta_tags(self, file_path):
        """Check SEO meta tags in HTML file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            page_name = str(file_path.relative_to(self.base_path))
            
            # Check for title tag
            title_match = re.search(r'<title[^>]*>(.*?)</title>', content, re.IGNORECASE)
            if not title_match:
                self.log_issue('high', 'seo', page_name, 
                             "Missing title tag", 
                             "Add descriptive title tag")
            else:
                title = title_match.group(1).strip()
                if len(title) < 10:
                    self.log_issue('medium', 'seo', page_name, 
                                 f"Title too short: '{title}'", 
                                 "Make title more descriptive (50-60 chars)")
                elif len(title) > 60:
                    self.log_issue('medium', 'seo', page_name, 
                                 f"Title too long: {len(title)} chars", 
                                 "Shorten title to 50-60 characters")
            
            # Check for meta description
            desc_pattern = r'<meta\s+name=["\']description["\']\s+content=["\']([^"\']*)["\']'
            desc_match = re.search(desc_pattern, content, re.IGNORECASE)
            if not desc_match:
                self.log_issue('high', 'seo', page_name, 
                             "Missing meta description", 
                             "Add meta description (150-160 chars)")
            else:
                desc = desc_match.group(1).strip()
                if len(desc) > 160:
                    self.log_issue('medium', 'seo', page_name, 
                                 f"Meta description too long: {len(desc)} chars", 
                                 "Shorten to 150-160 characters")
            
            # Check for H1 tags
            h1_matches = re.findall(r'<h1[^>]*>(.*?)</h1>', content, re.IGNORECASE | re.DOTALL)
            if len(h1_matches) == 0:
                self.log_issue('medium', 'seo', page_name, 
                             "No H1 tag found", 
                             "Add H1 tag for page structure")
            elif len(h1_matches) > 1:
                self.log_issue('low', 'seo', page_name, 
                             f"Multiple H1 tags found: {len(h1_matches)}", 
                             "Use only one H1 tag per page")
            
            # Check for images without alt text
            img_no_alt = re.findall(r'<img(?![^>]*alt=)[^>]*>', content, re.IGNORECASE)
            if img_no_alt:
                self.log_issue('medium', 'accessibility', page_name, 
                             f"Found {len(img_no_alt)} images without alt text", 
                             "Add descriptive alt text to all images")
                             
        except Exception as e:
            self.log_issue('medium', 'parsing', str(file_path), 
                         f"Failed to check meta tags: {str(e)}", 
                         "Check file accessibility")
    
    def check_links_validity(self):
        """Check if internal links point to existing files"""
        # Build list of available pages
        available_pages = set()
        for page in self.pages_found:
            # Normalize paths
            if page.endswith('/index.html'):
                available_pages.add(page[:-10])  # Remove /index.html
                available_pages.add(page[:-11] + '/')  # Add trailing slash
            available_pages.add(page)
            
        # Check all found links
        for link_info in self.links_found:
            link = link_info['url']
            source = link_info['source']
            
            # Skip external links, mailto, tel, etc.
            if (link.startswith('http') or link.startswith('mailto:') or 
                link.startswith('tel:') or link.startswith('#') or 
                link.startswith('javascript:')):
                continue
                
            # Normalize internal links
            normalized_link = link.lstrip('/')
            if normalized_link == '':
                normalized_link = 'index.html'
            elif not normalized_link.endswith('.html') and not normalized_link.endswith('/'):
                normalized_link += '/index.html'
                
            # Check if target exists
            target_exists = False
            for available in available_pages:
                if (normalized_link == available or 
                    normalized_link == available + 'index.html' or
                    normalized_link + '/' == available):
                    target_exists = True
                    break
                    
            if not target_exists:
                self.log_issue('high', 'navigation', source, 
                             f"Broken internal link: '{link}' -> '{normalized_link}'", 
                             "Fix broken link or remove it")
    
    def check_forms(self, file_path):
        """Check forms for basic functionality"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            page_name = str(file_path.relative_to(self.base_path))
            
            # Find forms
            form_matches = re.findall(r'<form[^>]*>(.*?)</form>', content, re.DOTALL | re.IGNORECASE)
            
            for i, form_content in enumerate(form_matches):
                # Check for action attribute
                action_match = re.search(r'action=["\']([^"\']*)["\']', form_content, re.IGNORECASE)
                if not action_match:
                    self.log_issue('medium', 'forms', page_name, 
                                 f"Form {i+1} missing action attribute", 
                                 "Add form action for proper submission")
                
                # Check for submit button
                submit_button = re.search(r'<(input[^>]*type=["\']submit["\'][^>]*|button[^>]*type=["\']submit["\'][^>]*|button[^>]*>)', 
                                        form_content, re.IGNORECASE)
                if not submit_button:
                    self.log_issue('medium', 'forms', page_name, 
                                 f"Form {i+1} missing submit button", 
                                 "Add submit button to form")
                
                # Check for input fields
                input_fields = re.findall(r'<(input|textarea|select)[^>]*>', form_content, re.IGNORECASE)
                if len(input_fields) == 0:
                    self.log_issue('medium', 'forms', page_name, 
                                 f"Form {i+1} has no input fields", 
                                 "Add input fields to form")
                                 
        except Exception as e:
            self.log_issue('medium', 'parsing', str(file_path), 
                         f"Failed to check forms: {str(e)}", 
                         "Check form structure")
    
    def run_audit(self):
        """Run the complete audit"""
        print("🔍 Starting 1ABEL Website Audit...")
        
        # Find all HTML files
        html_files = self.find_html_files()
        print(f"Found {len(html_files)} HTML pages")
        
        # Analyze each file
        for file_path in html_files:
            print(f"\n📄 Analyzing: {file_path.relative_to(self.base_path)}")
            
            # Extract links
            all_links, nav_links = self.extract_links_from_file(file_path)
            
            # Store links with source info
            for link in all_links:
                self.links_found.append({
                    'url': link,
                    'source': str(file_path.relative_to(self.base_path)),
                    'type': 'nav' if link in nav_links else 'content'
                })
            
            # Check meta tags and SEO
            self.check_meta_tags(file_path)
            
            # Check forms (specifically for contact page)
            if 'contact' in str(file_path).lower():
                self.check_forms(file_path)
        
        # Check link validity
        print("\n🔗 Checking link validity...")
        self.check_links_validity()
        
        # Generate report
        self.generate_report()
    
    def generate_report(self):
        """Generate audit report"""
        
        print("\n" + "="*60)
        print("🎯 1ABEL WEBSITE AUDIT RESULTS")
        print("="*60)
        
        # Summary stats
        critical_issues = [i for i in self.issues if i['severity'] == 'critical']
        high_issues = [i for i in self.issues if i['severity'] == 'high']
        medium_issues = [i for i in self.issues if i['severity'] == 'medium']
        low_issues = [i for i in self.issues if i['severity'] == 'low']
        
        print(f"\n📊 ISSUE SUMMARY:")
        print(f"🔴 Critical: {len(critical_issues)}")
        print(f"🟠 High: {len(high_issues)}")
        print(f"🟡 Medium: {len(medium_issues)}")
        print(f"🟢 Low: {len(low_issues)}")
        print(f"📄 Total Pages: {len(self.pages_found)}")
        print(f"🔗 Total Links: {len(self.links_found)}")
        
        # Show pages found
        print(f"\n📄 PAGES FOUND:")
        for page in sorted(self.pages_found):
            print(f"  - {page}")
        
        # Navigation analysis
        nav_links = [l for l in self.links_found if l['type'] == 'nav']
        unique_nav = list(set([l['url'] for l in nav_links]))
        print(f"\n🧭 NAVIGATION LINKS:")
        for link in sorted(unique_nav):
            print(f"  - {link}")
        
        # Critical and high issues
        if critical_issues or high_issues:
            print(f"\n🚨 CRITICAL & HIGH PRIORITY ISSUES:")
            for issue in critical_issues + high_issues:
                print(f"\n[{issue['severity'].upper()}] {issue['category']} - {issue['page']}")
                print(f"  Problem: {issue['description']}")
                print(f"  Fix: {issue['recommendation']}")
        
        # Medium issues
        if medium_issues:
            print(f"\n⚠️  MEDIUM PRIORITY ISSUES:")
            for issue in medium_issues:
                print(f"\n[{issue['severity'].upper()}] {issue['category']} - {issue['page']}")
                print(f"  Problem: {issue['description']}")
                print(f"  Fix: {issue['recommendation']}")
        
        # Save detailed report
        report_data = {
            "audit_date": datetime.now().isoformat(),
            "total_pages": len(self.pages_found),
            "total_links": len(self.links_found),
            "pages": self.pages_found,
            "navigation_links": unique_nav,
            "issues": self.issues,
            "summary": {
                "critical": len(critical_issues),
                "high": len(high_issues),
                "medium": len(medium_issues),
                "low": len(low_issues)
            }
        }
        
        with open('1abel_audit_detailed.json', 'w') as f:
            json.dump(report_data, f, indent=2)
        
        print(f"\n💾 Detailed report saved to: 1abel_audit_detailed.json")
        print("\n" + "="*60)

if __name__ == "__main__":
    auditor = SimpleAuditor("/Users/anyro/Downloads/home/ubuntu/igloo_clone/out")
    auditor.run_audit()