# Berger lookup (postcode / PLZ)

Standalone lookup:
- **NL:** postcode **PC4** (4 cijfers) → regio + (primaire/backup) berger
- **DE:** **PLZ** (5 cijfers) → één of meerdere Duitse bergers (overlap is toegestaan)

## Snel starten
Open `index.html` in je browser (dubbelklik) of zet de map op een webserver / GitHub Pages.

## Voor TypeScript/React
- NL-only: `getBergerByPostcode(postcode)` of `lookupBerger(postcode)`
- International: `getBergerByPostcodeInternational(input)` (NL of DE)
- DE-only: `lookupGermanBergersByPlz(plz)`
