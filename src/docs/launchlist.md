# launchlist 🚀

## Old site

- [x] Add countdown with the remaining time till relaunch
- [ ] Bacup site under flash.manonet.org and share it on the old website

---

## Development test

### Prepare Development

- [ ] Prepare project management, eg. github versioning, issues, milestones, etc.
- [ ] Prepare project file structure
- [ ] README or other documentation is created as needed for ongoing projects or future developers with the following sections:

  - [ ] Overview
  - [ ] Setup
  - [ ] Running locally
  - [ ] Team
  - [ ] Errors / Bugs
  - [ ] Pull Requests
  - [ ] Copyright and License

- [ ] License is added

- [ ] CodeQuality
  - [ ] .editorconfig
  - [ ] JSLint/JSHint
  - [ ] SCSS hint
  - [ ] Semantic HTML

* [ ] Living Style Guide

  - [ ] Font Styles and Typography
  - [ ] Colours and Gradients
  - [ ] Logo and Icons
  - [ ] Image Sizes
  - [ ] Formatted HTML Modules
  - [ ] Imagery Style
  - [ ] Tone of Voice

* Automatisation works
  - [ ] Build scripts for each environment
  - [ ] Deployment script

### Prepare the Site

#### [HTML boilerplate](https://github.com/h5bp/html5-boilerplate/tree/master/dist)

- [ ] `<html lang="en-US" dir="ltr" class="no-js">`
- [ ] `<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# object: http://ogp.me/ns/object# article: http://ogp.me/ns/article# profile: http://ogp.me/ns/profile#">`
- [ ] `<meta charset="utf-8" >`
- [ ] `<meta http-equiv="X-UA-Compatible" content="IE=edge" >`
- [ ] `<meta http-equiv="Content-Language" content="en" >`
- [ ] `<meta name="viewport" content="width=device-width, initial-scale=1.0" >`
- [ ] `<title>Your Title</title>`
- [ ] `<meta name="description" content="Your Description" >`
- [ ] `<meta name="keywords" content="your, keywords" >`
- [ ] `<meta name="language" content="english" >`
- [ ] `<meta name="google-site-verification" content="APICODE" >`
- [ ] `<link rel="icon" href="favicon.png" type="image/png">` see [favicon-cheat-sheet](https://github.com/audreyr/favicon-cheat-sheet), [favicomatic](http://www.favicomatic.com/)
- [ ] `<link rel="canonical" href="https://www.yourdomain.com/yourpage">`
- [ ] `<link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="YourSite">` see [opensearch.org](http://www.opensearch.org)
- [ ] ``
- [ ] ``

* [ ] [Check that ARIA Landmark Roles and other accessibility measures have been taken properly](http://a11yproject.com/checklist.html)
* [ ] [Schemas are added](https://github.com/schemaorg/schemaorg)
* [ ] Set up Google Analytics project and add code
* [ ] Set up [Google Webmaster Tools](https://www.google.com/webmasters/tools/home?hl=en)
* [ ] Verify site in Webmaster Tools with DNS TXT record
* [ ] Link Webmaster Tools to Google Analytics
* [ ] Cookie privacy policy notifications added
* [ ] "JavaScript turned off" warning is set
* [ ] Keyword Research research with [Google AdWords](http://www.google.co.uk/AdWords)
* [ ] Page Titles & Descriptions
* [ ] Nice message to hackers and developers

- [ ] [Uptime Monitor](http://uptimerobot.com/)
- [ ] Create a print stylesheet

### Server

- [ ] Create common [error pages](http://alexphelps.github.io/server-error-pages/) (make it witty or entertaining if possible)
  - [ ] 404
  - [ ] 500
- [ ] Set up any URL redirects or forwards
- [ ] Database Request works
- [ ] Cache is set
- [ ] Robots.txt
- [ ] Humans.txt
- [ ] sitemap.xml
- [ ] opensearch.xml see [Opensearch Specifications](http://www.opensearch.org/Specifications/OpenSearch/1.1)
- [ ] .htaccess
  - [ ] URL rewrites works
  - [ ] Access Permissions set
- [ ] mod_deflate works, MIME types set correctly
- [ ] Gzip is set
- [ ] Page caching is set

### Domain

- [ ] Redirect off www
- [ ] Each environment domain is set up correctly
  - [ ] Environment variables
  - [ ] Robots.txt
  - [ ] For re-designs, ensure important old/existing URLs are redirected to relevant new URLs, if the URL scheme is changing

### Sharing & Rich Snippets

- [ ] Set up general meta tags
- [ ] `<meta name=“description”>`
- [ ] `<meta name=“author”>`

### Social media modules

- [ ] Open Graph protocol proper meta data
- `<meta property=“og:site_name”>`
- `<meta property=“og:title”>`
- `<meta property=“og:type”>`
- `<meta property=“og:description”>`
- `<meta property=“og:url”>`
- `<meta property=“og:locale">`
- `<meta property=“og:image”>`
- [ ] Set up Facebook meta tags (above) & validate [here](https://developers.facebook.com/tools/debug/)
- [ ] Set up Twitter meta tags & validate [here](https://cards-dev.twitter.com/validator)
- `<meta name=“twitter:card”>`
- `<meta name=“twitter:site”>`
- `<meta name=“twitter:creator”>`
- `<meta name=“twitter:description”>` (note that this needs to be under 200 characters)
- `<meta name=“twitter:title”>`
- `<meta name=“twitter:url”>`
- `<meta name=“twitter:image:src”>`
- [ ] Create 2-5 meme images using [Canva](http://canva.com/) or a similar tool
- [ ] Pinterest
- [ ] Stumbleupon
- [ ] LinkedIn
- [ ] Digg

### Before each commit

- [ ] Remove all lorem ipsum (better not to write any)
- [ ] Remove all console.log, or other unneeded test-related JavaScript
- [ ] Remove any unneeded markup that is commented out
- [ ] Remove any unneeded files from the project directory
- [ ] Compress all images used
- [ ] Set proper `alt` text on all inline images
- [ ] Check all ‘Hidden Copy’ (e.g. alt text, transcriptions, text in JavaScript functions)

## Feature checklist

- [ ] Standards and Validation

  - [ ] HTML validation
  - [ ] JavaScript validation
  - [ ] CSS validation

- [ ] Accessibility

  - [ ] Feature complies with [accessibility checklist](http://a11yproject.com/checklist.html)
  - [ ] Try it with color blindness simulation
  - [ ] Try it with a screen reader
  - [ ] ARIA Landmarks used

- [ ] All users/groups are designated in ACL or otherwise given access
- [ ] Social media share is working as expected

- [ ] Each function is responsive
- [ ] If a print stylesheet is necessary, it exist and working properly

- [ ] Everything is prepared for translation
- [ ] All possible error is handled

  - [ ] Internally with try catch blocks or similar
  - [ ] With proper messages for the user
  - [ ] Error is logged if necessary

- [ ] Feature is accessible via links from website and it links back to the site, so it is connected properly
- [ ] Analytics is added if necessary
- [ ] Robots.txt, sitemap.xml checked and updated if necessary
- [ ] Changelog is Updated
- [ ] Documentation is updated
- [ ] Privacy policy is updated if necessary
- [ ] Has own README if necessary
- [ ] New Feature is communicated well with the users wia e-mail, teaser and documentation
- [ ] Can not conflict with cached outdated user data like browser cache, cookies, or local storage (saved variables, values on images...)

### Before deploy to Alpha

- [ ] Set all code output modes to compressed (JavaScript/CSS)
- [ ] Check console for JavaScript errors
- [ ] speed/performance test and optimizing. You can use services such as [Google Page Speed](https://developers.google.com/speed/pagespeed/insights/) or [Blame Stella](https://www.blamestella.com/)
- [ ] Test in a low-bandwidth situation
- [ ] Database update plan exist

## Alpha test

In this phase App/website is tested only by systems staff on Alpha (development) database.

- [ ] [Check site for broken links](http://validator.w3.org/checklink)
- [ ] [Validate markup](http://validator.w3.org/) to check for stray/unclosed tags etc.
- [ ] Existing data migrated to new database and test data removed
- [ ] "Show to someone who hasn't used it and watch them try to use it"

## Beta test

In this phase App/website is tested by systems staff and group of real users on production database

### Before deploy to Beta

- [ ] All text is translated
- [ ] Ensure no test content on site

- [ ] Launch date/time set, communicated with Project Sponsors, test useg group and systems staff
- E-mail notifications are turned on and point to correct recipients

### User testing

- [ ] App meets functional requirements

  - [ ] Check all bespoke/complex functionality
  - [ ] Check search functionality (including relevance of results)
  - [ ] Test all forms (e.g. contact us, blog comments), including anti-spam features, response emails/text, etc.
  - [ ] Test without JavaScript, Flash, and other plug-ins
  - [ ] Check all external links are valid

- [ ] Cross browser testing passed in all browsers/devices and platforms (Windows, OSX, Linux) decided on at beginning of project, at least:
  - [ ] Internet Explorer on Windows7
  - [ ] Internet Explorer on Windows10
  - [ ] Edge on Windows10
  - [ ] Firefox latest
  - [ ] Chrome latest
  - [ ] Safary on Mac
  - [ ] Tablet and handhelds, various mobile devices (doesn't have to be pretty, just functional)
  - [ ] scrolling is easy
  - [ ] nav bar works
  - [ ] hoverable things are tappable
  - [ ] charts/maps look ok
  - [ ] Check on common variations of Screen Resolution

Use platforms such as [Responsivator](http://dfcb.github.com/Responsivator/) and [BrowserStack](http://www.browserstack.com/)

- [ ] content and translations passed
  - [ ] Spelling and grammar check
  - [ ] Check for incorrect punctuation marks, particularly apostrophes, quotation marks and hyphens/dashes
  - [ ] Check consistency. Check for widow/orphan terms in important paragraphs
  - [ ] Capitalisation (especially of main headings)
  - [ ] Tense/Style of writing
  - [ ] Recurring/common phrases (e.g. ‘More about X’ links)
  - [ ] Check Variations in words (e.g. Websites vs Web Sites, or UK vs US spelling)
  - [ ] Treatment of bulleted lists (e.g. periods or commas at end of each item)

* [ ] Check for hard-coded links to staging domain (i.e. ensure all links will change to ‘live’ URL/domain when site is launched)

* [ ] Performance test passed
* [ ] App complies with [accessibility checklist](http://a11yproject.com/checklist.html)
* [ ] App passes Technology Services security scan
* [ ] App tested and approved by Project Sponsors (premium users)
* [ ] Check how important pages (e.g. content items) print

* [ ] Existing features are tested based on documentation

## Live test

### Rollout

- [ ] Existing data migrated to new database and test data removed
- [ ] App switched from development to production database
- [ ] App linked from live website
- [ ] Apache redirects placed, functional for old application URLs
- [ ] Post-launch e-mail sent to Project Sponsor and systems department
- [ ] Old version of app, old databases archived/deleted

### Automatised live test

- [ ] Check For Broken Links

### Real user test

- [ ] Users have proper rights, they can, and only can access they own properties
- [ ] Social media share works

## After testing

- [ ] This list is updated with new requirements

---

- [ ] Search Engine Visibility, SEO and Metrics
  - [ ] Page Titles are important; ensure they make sense and have relevant keywords in them.
  - [ ] Create metadata descriptions for important pages.
  - [ ] Check for canonical domain issues (e.g. variations in links to http://site.com http://www.site.com http://www.site.com/index.html should be reduced to a single consistent style)
  - [ ] Ensure content is marked-up semantically/correctly (h1, etc.)
  - [ ] Check for target keyword usage in general content
  - [ ] Check format (user/search engine friendliness) of URLs
  - [ ] Set up Analytics, FeedBurner, and any other packages for measuring ongoing success
  - [ ] Create an XML Sitemap
  - [ ] Configure Google Webmaster Console and Yahoo! Site Explorer

---

- [ ] Security/Risk
  - [ ] Configure backup schedule, and test recovery from backup.
  - [ ] Protect any sensitive pages (e.g. administration area)
  - [ ] Use robots.txt where necessary
  - [ ] Security/Penetration test
  - [ ] Turn-off verbose error reporting
  - [ ] Check disk space/capacity
  - [ ] Set-up email/SMS monitoring/alerts (e.g. for errors, server warnings); consider internal and external monitoring services

---

- [ ] Performance
  - [ ] Load test
  - [ ] Check image optimisation
  - [ ] Check and implement caching where necessary
  - [ ] Check total page size/download time
  - [ ] Minify/compress static (JavaScript/HTML/CSS) files
  - [ ] Optimise your CSS: use short image paths; make full-use ‘cascading’ nature of CSS, etc.
  - [ ] Check correct database indexing
  - [ ] Check configuration at every level (Web server, Database, any other software e.g. Content Management System)
  - [ ] Configure server-based logging/measurement tools (e.g. database/web server logging)
