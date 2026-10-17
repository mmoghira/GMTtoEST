import http from 'node:http';

function checkUrl(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      resolve({
        url,
        statusCode: res.statusCode,
        headers: res.headers,
        location: res.headers.location
      });
    }).on('error', (err) => {
      resolve({ url, error: err.message });
    });
  });
}

const testUrls = [
  'http://127.0.0.1:4173/',
  'http://127.0.0.1:4173/gmt-to-est/',
  'http://127.0.0.1:4173/cst-to-est/',
  'http://127.0.0.1:4173/fr/author/',
  'http://127.0.0.1:4173/it/about-us/',
  'http://127.0.0.1:4173/ar/disclaimer/',
  'http://127.0.0.1:4173/gmt-to-mest/',
  'http://127.0.0.1:4173/what-is-gmt/',
  'http://127.0.0.1:4173/japan-time-to-est/',
  'http://127.0.0.1:4173/bn/gmt-to-nzdt/'
];

for (const u of testUrls) {
  const result = await checkUrl(u);
  console.log(`${result.statusCode || 'ERR'} | ${u} | loc: ${result.location || 'none'}`);
}
