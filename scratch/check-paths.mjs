import fs from 'node:fs';

const paths = [
  '.vercel/output/static/bn/gmt-to-nzdt/index.html',
  '.vercel/output/static/hi/gmt-to-pkt/index.html',
  '.vercel/output/static/es/gmt-to-hdt/index.html',
  '.vercel/output/static/japan-time-to-est/index.html',
  '.vercel/output/static/ru/blog/uefa-champions-league-final-2026-kickoff-time-gmt-est/index.html',
  '.vercel/output/static/ar/disclaimer/index.html'
];

for (const p of paths) {
  console.log(p, fs.existsSync(p));
}
