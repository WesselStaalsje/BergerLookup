# Berger Lookup (NL / BE / DE)

Kleine webtool om op basis van postcode een uitvoerende berger te tonen + een kaart in de webapp.

## Bestanden
- `index.html` – UI + Leaflet
- `bergerLookup.ts` – logica + postcode-tabellen + kaart (let op: dit is **plain JavaScript**, geen TypeScript syntax)

## Gebruik
1. Open `index.html` (lokaal of via een simpele webserver).
2. Kies het land (NL/BE/DE) en vul de postcode in.
3. Klik **Zoek**.

### Auto-detect
- `1234AB` → land wordt automatisch NL
- `42119` → land wordt automatisch DE
- 4-cijferig blijft bewust **ambiguous** (NL en BE), dus dan laat hij je keuze staan.

## Kaart
De kaart is Leaflet + OpenStreetMap tiles. Voor het plaatsen van een marker gebruikt de tool Nominatim (OpenStreetMap geocoding).

## Self-test
Knop **Self-test** loopt:
- België: 1000–9999
- Duitsland: 01000–99999

en checkt of er altijd een resultaat uitkomt (range of fallback).
