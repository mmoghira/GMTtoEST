$filesToCheck = @(
    ".vercel/output/static/es/index.html",
    ".vercel/output/static/es/gmt-to-est/index.html",
    ".vercel/output/static/es/aest-to-est/index.html",
    ".vercel/output/static/es/mst-to-est/index.html",
    ".vercel/output/static/es/est-to-gmt/index.html",
    ".vercel/output/static/es/gmt-vs-est/index.html"
)

Write-Host "=== VERIFYING SPANISH PAGES ==="

foreach ($file in $filesToCheck) {
    if (-not (Test-Path $file)) {
        Write-Host "MISSING: $file" -ForegroundColor Red
        continue
    }
    $content = Get-Content $file -Raw
    Write-Host "`n--- Checking $file ---" -ForegroundColor Cyan
    
    # 1. Check html lang
    if ($content -match '<html[^>]*lang="es"') {
        Write-Host "[PASS] html lang='es'" -ForegroundColor Green
    } else {
        Write-Host "[FAIL] html lang is not 'es'" -ForegroundColor Red
    }

    # 2. Check og:locale
    if ($content -match '<meta property="og:locale" content="es_ES"') {
        Write-Host "[PASS] og:locale is 'es_ES'" -ForegroundColor Green
    } else {
        Write-Host "[FAIL] og:locale is not 'es_ES'" -ForegroundColor Red
    }

    # 3. Check hreflang
    $hasEsHreflang = $content -match '<link rel="alternate" hreflang="es"'
    $hasEnHreflang = $content -match '<link rel="alternate" hreflang="en"'
    $hasXDefault = $content -match '<link rel="alternate" hreflang="x-default"'
    if ($hasEsHreflang -and $hasEnHreflang -and $hasXDefault) {
        Write-Host "[PASS] Hreflang tags (es, en, x-default) present" -ForegroundColor Green
    } else {
        Write-Host "[FAIL] Missing hreflangs: es=$hasEsHreflang en=$hasEnHreflang x-default=$hasXDefault" -ForegroundColor Red
    }

    # 4. Check footer headings
    $footerHeadings = @("CONVERTIDORES", "GUÍAS", "HERRAMIENTAS", "REGIONES", "EMPRESA", "CONTACTO", "IDIOMA")
    $allHeadingsFound = $true
    foreach ($fh in $footerHeadings) {
        if (-not ($content -match [regex]::Escape($fh))) {
            Write-Host "[FAIL] Footer heading missing: $fh" -ForegroundColor Red
            $allHeadingsFound = $false
        }
    }
    if ($allHeadingsFound) {
        Write-Host "[PASS] All Spanish footer headings present" -ForegroundColor Green
    }

    # 5. Check mode tabs for converter
    if ($file -match "es/index.html" -or $file -match "gmt-to-est") {
        if ($content -match "De GMT a la hora del Este" -or $content -match "De EST / EDT a GMT") {
            Write-Host "[PASS] Mode tab labels in Spanish" -ForegroundColor Green
        } else {
            Write-Host "[WARN] Mode tab label check" -ForegroundColor Yellow
        }
    }

    # 6. Check for unintended English fragments
    $badStrings = @(
        "From GMT to Eastern Time",
        "From EST / EDT to GMT",
        "og:locale`" content=`"en_US`"",
        "All rights reserved.",
        ">CONVERTERS<",
        ">GUIDES<",
        ">TOOLS<",
        ">REGIONS<",
        ">COMPANY<",
        ">CONTACT<",
        ">LANGUAGE<"
    )
    $foundBad = $false
    foreach ($bad in $badStrings) {
        if ($content -match [regex]::Escape($bad)) {
            Write-Host "[FAIL] Found English string: $bad" -ForegroundColor Red
            $foundBad = $true
        }
    }
    if (-not $foundBad) {
        Write-Host "[PASS] No obvious English fragments found" -ForegroundColor Green
    }
}
