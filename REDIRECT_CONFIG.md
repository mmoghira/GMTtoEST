# Website Redirect Configuration

This document outlines the comprehensive redirect setup ensuring all traffic is directed to the preferred English (`/en/`) version of the website.

## Redirect Layers

### 1. **Vercel Configuration** (`vercel.json`)
- **Rule**: Root (`/`) → `/en/`
- **Type**: Permanent (301) Redirect
- **Status**: Active on all Vercel deployments
- **Priority**: Highest (server-level)

```json
{
    "redirects": [
        {
            "source": "/",
            "destination": "/en/",
            "permanent": true
        }
    ],
    "cleanUrls": true,
    "trailingSlash": true
}
```

### 2. **HTML Meta Redirect** (`index.html`)
- **Method**: `<meta http-equiv="refresh">` + JavaScript fallback
- **Purpose**: Redundant client-side redirect if server-level redirect fails
- **Status**: Active immediately upon page load

```html
<meta http-equiv="refresh" content="0; url=/en/">
<script>
    if (window.location.pathname === '/' || window.location.pathname === '') {
        window.location.replace('/en/');
    }
</script>
```

### 3. **Vercel Edge Functions** (`public/_redirects`)
- **Rule**: All requests → `/en/`
- **Type**: Permanent (301) Redirect
- **Purpose**: Additional layer for edge deployment

```
/ /en/ 301
/* /en/:splat 301
```

### 4. **Apache Server** (`public/.htaccess`)
- **Rule**: Root → `/en/` with rewrite engine
- **Fallback**: For traditional Apache hosting
- **Status**: Active when deployed on Apache servers

```apache
RewriteRule ^$ /en/ [L,R=301]
RewriteRule ^index\.html$ /en/ [L,R=301]
```

### 5. **Astro Configuration** (`astro.config.mjs`)
- **Dev Server**: Middleware redirects root requests to `/en/`
- **Build**: Configured with i18n sitemap settings
- **Default**: English (`en`) is the default locale

## SEO Configuration

### Robots.txt (`public/robots.txt`)
- Allows crawling of `/en/` path
- Points all search engines to the canonical English version
- Specifies primary sitemap location

### Canonical Links (`theme/layouts/BaseLayout.astro`)
```html
<link rel="canonical" href="https://gmttoest.com/en/" />
```
- All pages reference the English version as canonical
- Prevents duplicate content issues
- Consolidates SEO authority

### Sitemap
- Generated with i18n support
- Primary version is English (`/en/`)
- All language versions included but marked appropriately

## Redirect Hierarchy

```
Request to www.gmttoest.com/
    ↓
[Vercel 301 Redirect] → /en/
    ↓
[_redirects file] (backup)
    ↓
[HTML Meta Refresh] (if JavaScript enabled)
    ↓
[JavaScript Redirect] (if meta refresh disabled)
    ↓
/en/ (Preferred Version)
```

## Deployment Notes

- **Vercel**: Uses native redirect configuration (highest priority)
- **Apache**: Uses `.htaccess` rewrite rules
- **Netlify**: Would use `_redirects` file
- **Development**: Astro middleware handles redirects

## Testing Redirect

To verify redirects are working:

```bash
# Test with curl
curl -I https://gmttoest.com/

# Expected response:
# HTTP/1.1 301 Moved Permanently
# Location: https://gmttoest.com/en/
```

## Maintenance

- All language versions remain available at their respective paths (`/es/`, `/fr/`, etc.)
- Root redirect ensures default user experience is in English
- Users can manually navigate to other language versions
- Search engines recognize English as preferred version via canonical tags

## Future Changes

To change the preferred version from English to another language:
1. Update `vercel.json` redirect destination
2. Update `index.html` refresh URL
3. Update `public/_redirects` destination
4. Update `.htaccess` rewrite rule
5. Update `astro.config.mjs` sitemap i18n defaultLocale
6. Update canonical links in `BaseLayout.astro`
7. Clear CDN cache
