# Testprotokoll

Datum: 16 november 2026. Testmiljö: Microsoft Edge på Windows, automatiserad med Playwright. Skärmbilder granskades visuellt. Ingen publicering gjordes.

## Genomförda tester

| Test | Resultat |
| --- | --- |
| Alla tre sidor vid 320, 375, 768 och 1280 px bredd | Godkänt: ingen horisontell dokumentrullning |
| Samtliga lokala sidlänkar, CSS, JS, logga, illustration och planeringslänk | Godkänt: resurserna svarade utan 404 |
| Bildinläsning | Godkänt: bilderna laddades och hade en faktisk bredd |
| En huvudrubrik och en aktuell menylänk per sida | Godkänt |
| Tab till hopplänk, Enter till main | Godkänt |
| Tab till Projektidéer, synlig fokusram, Enter till sidan | Godkänt |
| Enter på experimentets summary | Godkänt: details öppnades |
| Projektlänk till verktyget | Godkänt: exempelnamnet förifylldes |
| Beräkna med saknade obligatoriska svar | Godkänt: inget resultat skapades |
| Betyg 1/1/1, 5/5/5, 3/3/3 | Godkänt: 20, 100 respektive 60 |
| Betyg 5/5/1, 4/1/4, 1/4/4 | Godkänt: 73, 60 respektive 60 |
| Lågt kunskapsläge | Godkänt: förslag att samla underlag |
| Beräkna via tangentbordets Enter | Godkänt |
| Öppna direkt via file:// utan server | Godkänt: formuläret beräknade 60/100 |
| HTML-liknande text i idénamn | Godkänt: visades som text, skapade inget img-element |
| Ändra ett svar efter beräkning | Godkänt: det gamla resultatet togs bort |
| Börja om | Godkänt: namn och resultat tömdes |
| Minskad rörelse | Godkänt: illustrationens animation var none |
| JavaScript avstängt | Godkänt: förklaring synlig, beräkningsknapp avstängd, navigation fungerade |
| JavaScript-fel under testet | Inga registrerade pageerror-fel |

## Visuell granskning

Startsidan, projektlistan och formuläret granskades i skärmbilder. Meny och innehåll ryms i mobilbredd. Formuläret följs av metodförklaringen på mobil. På dator används två kolumner där det hjälper läsningen. Inga observerade överlappningar eller avklippta huvudtexter i de granskade vyerna.

## Upptäckter och åtgärder

Den första länkkontrollen upptäckte den ännu oskapade planeringsfilen. Den skapades och länkkontrollen gick därefter igenom. Testkörningen anpassades till installerad Edge eftersom Playwrights medföljande Chromium saknades. En tillfällig testserver avslutades mellan körningar; sluttestet startade och stängde en egen server i samma process.

## Prova själv

1. Öppna index.html och gå genom menyn med Tab. Öppna Projektidéer med Enter.
2. Öppna ett experiment med Enter. Välj Pröva idén och kontrollera namnet.
3. Välj 3 i alla tre frågor. Beräkna: resultatet ska bli 60/100.
4. Ändra ett svar: det gamla resultatet ska försvinna. Beräkna igen.
5. Prova Börja om och ett tomt formulär.
6. Gör fönstret smalt och kontrollera att meny, text och formulär går att använda.
7. Aktivera minskad rörelse i systemet och ladda om startsidan.

## Begränsningar

Detta är inte ett användartest eller en fullständig WCAG-granskning. Inga tester med skärmläsare, fysisk mobil, Safari eller Firefox har genomförts. Tester vid bestämda skärmbredder ersätter inte granskning på varje möjlig enhet. Ingen extern HTML-validator användes. Den illustrativa poängmodellens vetenskapliga giltighet har inte testats och påstås inte.


## Uppdatering: tydligare animationer

Testat 16 november 2026 med Playwright och installerad Microsoft Edge. Samtliga tidigare funktionstester kördes på den uppdaterade implementationen och gick igenom.

| Ny kontroll | Resultat |
| --- | --- |
| Sex kubytor och sex statiska teman | Godkänt |
| preserve-3d och transform som faktiskt ändras över tid | Godkänt |
| Tab/fokus och mellanslag på pauskryssrutan | Godkänt: paus och återstart |
| Samma transform efter väntan under paus | Godkänt |
| Åtta vinklar vid vardera 320, 375, 768 och 1280 px | Godkänt: ingen horisontell dokumentrullning i 32 prover |
| Kort vid hover respektive fokus inuti | Godkänt: transform aktiverades |
| Poängring efter giltig inlämning | Godkänt: draw-score kördes, texten visade 60 / 100 direkt |
| Ringens slutvärde | Godkänt: stroke-dashoffset blev 40 för 60 poäng |
| Ny inlämning | Godkänt: ringanimationen startade om |
| Minskad rörelse | Godkänt: kub och ring saknade animation, ringens slutvärde var korrekt, kort flyttades inte |
| JavaScript avstängt på startsidan | Godkänt: pauskryssrutan fungerade, sex teman fanns kvar |
| Visuell granskning av dator, mobil och mobilresultat | Godkänt: kub, läsbar temalista och poängring granskades i skärmbilder |

Den nya versionen är fortfarande inte testad med fysisk mobil, skärmläsare, Safari eller Firefox. Den illustrativa poängmodellens begränsningar gäller även när resultatet visas med en ring. Animationens grafiska precision innebär ingen vetenskaplig validering.
