import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';

console.log('=== RUNNING FRENCH HOMEPAGE LOCALIZATION & SEO VERIFICATION ===');

const frHtmlPath = fs.existsSync(path.resolve('.vercel/output/static/fr/index.html'))
  ? path.resolve('.vercel/output/static/fr/index.html')
  : fs.existsSync(path.resolve('dist/client/fr/index.html'))
  ? path.resolve('dist/client/fr/index.html')
  : path.resolve('dist/fr/index.html');
assert(fs.existsSync(frHtmlPath), `${frHtmlPath} does not exist!`);

const rawHtml = fs.readFileSync(frHtmlPath, 'utf8');
const html = rawHtml
  .replace(/&#39;/g, "'")
  .replace(/&apos;/g, "'")
  .replace(/&quot;/g, '"')
  .replace(/&amp;/g, '&');

// 1. Language attribute
assert(html.includes('lang="fr"'), 'Missing or invalid lang="fr" attribute');

// 2. Canonical
const canonicalMatch = html.match(/<link rel="canonical" href="([^"]*)"/i);
assert(canonicalMatch, 'Missing canonical tag');
assert.strictEqual(canonicalMatch[1], 'https://gmttoestconverter.com/fr/', 'Canonical is not https://gmttoestconverter.com/fr/');

// 3. Exactly 1 H1
const h1Matches = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());
assert.strictEqual(h1Matches.length, 1, 'Expected exactly 1 H1');
assert.strictEqual(h1Matches[0], 'Convertisseur GMT vers EST', 'H1 is not Convertisseur GMT vers EST');

// 4. Meta robots
const robotsMatch = html.match(/<meta name="robots" content="([^"]*)"/i);
assert(robotsMatch, 'Missing meta robots');
assert(robotsMatch[1].includes('index'), 'Robots tag does not allow indexing');

// 5. Check visible French strings
const requiredFrench = [
  'Convertisseur GMT vers EST',
  'Horloge mondiale',
  'Planificateur de réunion',
  'Outils pour développeurs',
  'Guide des fuseaux horaires',
  'Rechercher…',
  'De',
  "l'heure de l'Est",
  "Utiliser l'heure actuelle",
  'Format 24 h',
  'Copier',
  "Prise en compte de l'heure d'été",
  'Visualiser le décalage horaire',
  'Rythme de jour et de nuit',
  "Décalage avec heure d'été",
  'Créneaux de réunion partagés',
  'Horloges en direct',
  'GMT actuel',
  "Heure de l'Est actuelle",
  'Accès rapides',
  'Heure de réunion',
  'Événement en direct',
  'Heures de trading',
  'Résumé du décalage horaire actuel entre GMT et EST',
  'Fuseau horaire',
  'Statut',
  'Permanent',
  'Saisonnier',
  'Tableau de conversion GMT vers EST',
  'Chevauchement des heures de travail',
  'Traders et marchés financiers',
  'Équipes à distance et télétravail',
  'Événements en direct et gaming',
  'Étudiants et universitaires',
  'Logistique et transport aérien',
  "Qu'est-ce que le GMT ?",
  "Qu'est-ce que l'EST ?",
  "GMT vers EST et l'heure d'été",
  'Planificateur de réunion GMT vers EST',
  'Horaires de trading GMT et EST',
  'Comprendre les abréviations horaires',
  'Foire aux questions (FAQ) : Convertisseur GMT vers EST',
  'Résumé rapide et prochaines étapes',
  'CONVERTISSEURS',
  'GUIDES',
  'OUTILS',
  'ENTREPRISE',
  'CONTACT',
  'LANGUE',
  'Tous droits réservés.'
];

for (const s of requiredFrench) {
  assert(html.includes(s), 'Missing required French string: ' + s);
}

// 6. Check forbidden English tokens in visible text
let clean = html.replace(/<style[\s\S]*?<\/style>/gi, '');
const jsonLdMatches = [];
clean = clean.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi, (m, json) => {
  jsonLdMatches.push(json);
  return '';
});
clean = clean.replace(/<script[\s\S]*?<\/script>/gi, '');
clean = clean.replace(/<!--[\s\S]*?-->/gi, '');

const textMatches = clean.match(/>([^<]+)</g) || [];
const visibleTexts = textMatches
  .map(t => t.slice(1, -1).trim())
  .filter(t => t.length > 0 && !/^[\d\s:.,/|\\→⇄›©↑-]+$/.test(t));

const forbiddenPatterns = [
  /\bFrom\b/i,
  /\bTo Eastern\b/i,
  /\bUse current time\b/i,
  /\b24h format\b/i,
  /\bCopy failed\b/i,
  /\bDST aware\b/i,
  /\bExplore the time shift\b/i,
  /\bDay and night rhythm\b/i,
  /\bDST-aware offset\b/i,
  /\bMeeting overlap\b/i,
  /\bLive clocks\b/i,
  /\bCurrent GMT\b/i,
  /\bCurrent Eastern Time\b/i,
  /\bQuick presets\b/i,
  /\bMeeting time\b/i,
  /\bLive event\b/i,
  /\bTrading hours\b/i,
  /\bCurrent Offset Summary\b/i,
  /\bStandard Time Offset\b/i,
  /\bDaylight Saving Offset\b/i,
  /\bWorkday overlap\b/i,
  /\bBuilt for real use\b/i,
  /\bForex Traders\b/i,
  /\bRemote Teams\b/i,
  /\bOnline Gamers\b/i,
  /\bStudents & Educators\b/i,
  /\bGlobal Logistics\b/i,
  /\bWhat is GMT\b/i,
  /\bWhat is EST\b/i,
  /\bQuick Summary & Next Steps\b/i,
  /\bNext Step\b/i,
  /\bAll rights reserved\b/i,
  /\bPopular Tools\b/i,
  /\bPrimary Navigation\b/i,
  /\bFree timezone converter\b/i,
  /\bReverse Tool\b/i,
  /\bhours diff\b/i,
  /\bprev day\b/i,
  /\bnext day\b/i
];

const failures = [];
for (const s of visibleTexts) {
  for (const p of forbiddenPatterns) {
    if (p.test(s)) {
      failures.push({ text: s, pattern: p.toString() });
    }
  }
}

assert.strictEqual(failures.length, 0, 'Found English leakage in visible text: ' + JSON.stringify(failures, null, 2));

// 7. Check JSON-LD
for (const json of jsonLdMatches) {
  assert(!json.includes('Primary Navigation'), 'JSON-LD contains English Primary Navigation');
  assert(!json.includes('Free timezone converter'), 'JSON-LD contains English Free timezone converter');
  assert(json.includes('"inLanguage":"fr"') || json.includes('"inLanguage": "fr"'), 'JSON-LD missing inLanguage: fr');
}

console.log('PASS: All French homepage localization and SEO checks passed cleanly (0 English leakage).');
