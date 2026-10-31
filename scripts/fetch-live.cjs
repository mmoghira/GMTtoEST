const https = require('https');

function fetchUrl(urlPath) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'gmttoestconverter.com',
      path: urlPath,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    };
    https.get(options, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const robots = data.match(/<meta\s+name=["']robots["']\s+content=["']([^"']*)["']/i);
        const canonical = data.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i);
        resolve({
          path: urlPath,
          status: res.statusCode,
          robots: robots ? robots[1] : null,
          canonical: canonical ? canonical[1] : null,
          isChallenge: data.includes('Just a moment') || data.includes('Checking your browser') || data.includes('Vercel Security Checkpoint')
        });
      });
    }).on('error', reject);
  });
}

async function run() {
  const paths = [
    '/hi/contact-us/',
    '/ur/privacy-policy/',
    '/fa/privacy-policy/',
    '/es/privacy-policy/',
    '/de/terms-of-service/',
    '/id/business-hours-overlap/',
    '/id/world-clock/',
    '/vi/mst-to-est/',
    '/id/kst-to-est/'
  ];
  for (const p of paths) {
    try {
      const res = await fetchUrl(p);
      console.log(res.path, '-> status:', res.status, '| robots:', res.robots, '| canonical:', res.canonical, res.isChallenge ? '(SECURITY CHALLENGE)' : '');
    } catch(e) {
      console.error(p, e.message);
    }
  }
}

run();
