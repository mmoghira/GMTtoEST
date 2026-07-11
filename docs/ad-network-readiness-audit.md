# Ad-network readiness audit

Audit date: July 6, 2026  
Site: https://gmttoestconverter.com/

## Executive result

The approval-critical code issues found in this repository have been fixed. The site now has a clean AdSense ownership signal, valid `ads.txt`, privacy-first consent defaults, clear trust pages, and no aggressive third-party ad scripts.

Approval is still a manual decision by Google or Mediavine. No code change can guarantee approval.

The repository changes must be deployed before they affect the production site. At audit time, the live site still served the removed third-party ad script.

## Implemented

- Removed the `effectivecpmnetwork.com` scripts and container that loaded on every page.
- Removed Microsoft Clarity while consent is not yet managed by a certified CMP.
- Removed those third-party domains from deployment configuration.
- Kept the AdSense publisher ID consistent as `ca-pub-3364858473460532`.
- Kept the matching authorized seller record in both copies of `ads.txt`.
- Moved the conditional AdSense loader into the document `<head>`.
- Limited AdSense during initial review to indexable, English utility and blog content.
- Prevented AdSense from loading on legal, trust, sitemap, and localized pages.
- Added Google Consent Mode v2 defaults for ads and analytics.
- Added a visible **Privacy Choices** footer link.
- Added `npm run audit:ads` as a deployment/readiness regression check.
- Removed the static allowlist CSP. Google only supports AdSense with a nonce-based strict CSP, while CSP is optional; the old allowlist could disrupt ad serving.

## Current readiness

| Area | Status | Notes |
|---|---|---|
| Original useful content | Manual review needed | The converter, guides, and articles provide utility, but originality and editorial quality are judged by the network. |
| Clear navigation | Ready | Main navigation, footer navigation, breadcrumbs, sitemap, and internal links are present. |
| Trust pages | Ready | About, author, editorial policy, contact, privacy, terms, and disclaimer pages exist. |
| AdSense ownership | Ready | Publisher meta tag and `ads.txt` use the same publisher ID. |
| Ad placement/density | Ready | No manual display-ad units or intrusive third-party ad scripts remain. |
| Privacy disclosures | Ready in site copy | The policy covers cookies, Google advertising, personalized/non-personalized ads, analytics, and user choices. |
| Consent platform | Account action required | Consent Mode defaults are not a CMP. Publish a Google-certified CMP before serving personalized ads where required. |
| Localized pages | Conservative configuration | Ads are off on localized pages until each translation receives a human quality review. |
| Journey by Mediavine | Account/traffic action required | Grow must be installed from the exact account-provided script and run long enough for evaluation. |
| Mediavine Official | Revenue/quality action required | The program currently requires at least $5,000 in annual ad revenue plus quality and good-standing checks. |

## Required AdSense account actions

1. In AdSense, add only the canonical domain: `gmttoestconverter.com`.
2. Confirm ownership using the existing publisher meta tag or `ads.txt`.
3. In **Privacy & messaging**, create and publish:
   - a GDPR message using a Google-certified CMP with **Consent**, **Do not consent**, and **Manage options**;
   - applicable US state privacy messages.
4. Confirm the account holder is at least 18 and complete identity, address, tax, and payment details when requested.
5. Request site review, then monitor **Sites** and **Policy center**. Review may take several days and sometimes 2–4 weeks.
6. Do not click live ads, ask visitors to click ads, buy low-quality traffic, or place ads so they resemble navigation.

Google requires a certified CMP using the IAB TCF for ads served in the EEA, UK, and Switzerland. TCF v2.3 has been required since March 1, 2026.

## Journey by Mediavine actions

1. Create a Journey/Grow account and add this domain.
2. Copy the complete, exact Grow script from the Grow Publisher Portal.
3. Add that script directly to the site `<head>` without deferring or optimizing it.
4. Connect GA4 and let Grow collect data for at least 30 days.
5. Apply when the site has at least about 1,000 monthly sessions, sufficient engaged human traffic, a domain history of roughly four months, and regularly updated original brand-safe content.

The Grow script was not added during this audit because it contains an account-specific identifier and must be copied exactly from the owner’s portal.

## Content actions before applying

- Human-review every article for originality, factual accuracy, helpful examples, and a clear update date.
- Human-review localized pages before enabling ads on them; Persian/Farsi is not currently listed as an AdSense-supported primary language.
- Continue publishing substantial evergreen scheduling/time-zone articles rather than many near-duplicate template pages.
- Keep event schedules current and cite primary sources where dates may change.
- Build traffic through search, direct, referral, and social audiences—never paid-to-click or bot traffic.

## Verification

Local verification result:

- 224 generated pages checked
- 18 strong English pages with one AdSense loader each
- 0 AdSense loaders on policy or localized pages
- 0 missing publisher meta tags or consent defaults
- 0 forbidden ad/tracker domains
- 0 SEO audit findings, orphan pages, or broken internal links

Run:

```bash
npm run build
npm run audit:seo
npm run audit:ads
```

The ad-readiness audit fails if an intrusive network returns, publisher IDs diverge, consent defaults disappear, AdSense loads on policy/localized pages, trust pages are removed, or duplicate AdSense loaders are introduced.

## Official references

- [AdSense eligibility](https://support.google.com/adsense/answer/9724?hl=en)
- [AdSense site readiness](https://support.google.com/adsense/answer/7299563?hl=en)
- [Google Publisher Policies](https://support.google.com/adsense/answer/10502938?hl=en)
- [Required privacy disclosures](https://support.google.com/adsense/answer/1348695?hl=en)
- [Connect a site to AdSense](https://support.google.com/adsense/answer/7584263?hl=en)
- [Ads.txt guide](https://support.google.com/adsense/answer/9785052?hl=en)
- [Google CMP requirements](https://support.google.com/adsense/answer/7670013?hl=en-GB)
- [Consent Mode implementation](https://developers.google.com/tag-platform/security/guides/consent)
- [AdSense supported languages](https://support.google.com/adsense/answer/9727?hl=en)
- [AdSense and CSP](https://support.google.com/adsense/answer/16283098?hl=en-GB)
- [Journey program requirements](https://www.journeymv.com/affiliates-faq/)
- [Getting started with Journey](https://www.journeymv.com/getting-started-with-journey-by-mediavine/)
- [Mediavine programs](https://www.mediavine.com/programs/)
- [Mediavine Official requirements](https://help.mediavine.com/mediavine-official)
- [Installing Grow](https://help.grow.me/hc/en-us/sections/31502670660635-Installing-Grow)
