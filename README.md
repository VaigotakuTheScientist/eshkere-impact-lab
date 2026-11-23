# Eshkere Impact Lab

Fristående skolprototyp i HTML, CSS och vanilla JavaScript. Ingen installation krävs.

## Öppna

Packa upp hela mappen och öppna `index.html` i en webbläsare. Behåll undermapparna. Du kan också köra `python -m http.server 8000` i projektmappen och besöka `http://localhost:8000`. Internet behövs inte för webbplatsen; dokumentationens externa källor kräver anslutning.

## Filer och läsordning

| Fil | Syfte |
| --- | --- |
| index.html | Startsida: CSS-kub med sex teman, paus, statisk temalista och vägar vidare. Börja studera här. |
| projekt.html | Tre fiktiva idéer och utfällbara experiment med HTML-elementen details/summary. |
| utvardera.html | Märkt formulär, metodförklaring, no-JS-information och resultatregion. |
| css/style.css | En enda gemensam stilmall: variabler, layout, komponenter, mobil, minskad rörelse och utskrift. |
| js/evaluation.js | Validerad beräkning, förifyllning via URL, formulärhändelser, SVG-poängring och säker textvisning. |
| images/logo.svg | AI-stödd prototyplogga och favicon. |
| images/lab-map.svg | Tidigare vektorillustration av arbetsprocessen, sparad som skiss/reserv; används inte på startsidan. |
| docs/planering.md | Svensk planering, kravkoppling, research, arkitektur och reflektionsunderlag. |
| docs/wireframes.svg | Tre sidlayouter på dator och startsidan på mobil, inklusive rörelsesignaler. |
| docs/logo-process.svg | Dokumenterad konceptskiss och färdig loggform. |
| docs/testprotokoll.md | Faktiska tester, reproduktionssteg och testbegränsningar. |
| README.md | Denna startguide och filförklaring. |

## Viktiga beslut

Tre riktiga HTML-dokument gör navigeringen enkel och oberoende av JavaScript. Gemensam CSS håller utseendet enhetligt. Menyn upprepas medvetet för att slippa ett byggverktyg: ändra den i alla tre filer vid behov. Relativa länkar fungerar både lokalt och under en undermapp. Inga resurser hämtas från en CDN.

Beräkningsfunktionen `calculateScore` är separat från DOM-hanteringen. Den kan flyttas till Eshkere senare. Formuläret skickar inget till en server och sparar inget mellan omladdningar. Poängen är illustrativa, inte verifierade säkerhetsvärden. En framtida integration behöver anpassa CSS-selektorer, navigering och metod till värdprojektet.

## Studera och ändra

**Lärguide:** [Study the commented source code](docs/learn-the-code.md). Kommentaren `LEARNING:` markerar förklaringar i HTML, CSS och JavaScript.

1. Byt en rubrik i index.html och ladda om sidan.
2. Ändra färgvariabeln `--accent` i CSS och kontrollera läsbarheten.
3. Läs `calculateScore`, räkna 3 + 3 + 3 för hand och jämför med 60/100.
4. Följ submit-lyssnaren från formulärvärden till resultatelement.
5. Testa med Tab/Enter och en smal webbläsare efter varje ändring.

AI-stöd har använts för implementation och dokumentation. Anpassa den egna reflektionen före inlämning. Inga ändringar har gjorts i Eshkeres befintliga webbplats. Källkoden finns i GitHub-repot eshkere-impact-lab. Webbplatsen har inte driftsatts.

## Animationer

Kub, kort och entréer styrs helt av CSS. En vanlig kryssruta pausar kuben även utan JavaScript. Alla sex teman står i en statisk lista. JavaScript räknar poängen och skapar en dekorativ SVG-ring; CSS animerar dess linje medan textvärdet visas direkt. Vid minskad rörelse visas allt i färdigt, stillastående tillstånd. Läs avsnitt 2 i planeringen för en jämförelse och kodförklaring.

## Cache vid publicering

CSS- och JavaScript-länkarna har versionsparametern `?v=20261116-motion1`. Ändra versionen i alla berörda HTML-filer när dessa resurser uppdateras. Det hindrar att en ny sida använder en äldre cachad stilmall. Filnamnen på disk ändras inte.
