# Planering och reflektion: Eshkere Impact Lab

Datum: 16 november 2026. Uppgift: AWfully Good webbplats.
Inriktning: **Good**, med en fiktiv prototyp som innehåll.
Dokumentet beskriver den genomförda lösningen. AI har hjälpt till med kod, formgivning, logga, skisser och dokumentation. Läs och bearbeta reflektionen med egna erfarenheter inför redovisningen.

## 1. Idé, syfte och målgrupp

Eshkere Impact Lab är en fristående svensk webbplats för att utforska projektidéer inom AI-säkerhet. Besökaren ska förstå syftet, läsa tre exempel och pröva en egen idé med tre enkla frågor. Målet är att göra antaganden tydliga och föreslå ett litet nästa experiment.

Målgruppen är nyfikna elever, studenter och personer som vill börja undersöka ansvarsfull AI utan att redan vara experter. Därför används korta texter, tydliga rubriker, förklarade begrepp och en liten meny. Alla projekt är fiktiva exempel. Inga resultat eller finansieringar påstås vara verkliga.

## 2. Research, inspiration och jämförelse av rörelse

Eshkere är konceptuell inspiration för utforskande och experiment. Referens: https://vaigotakuthescientist.github.io/eshkere/. Den ursprungliga sidan kunde inte läsas med webbverktyget; inga påståenden görs om dess faktiska animationer och ingen befintlig Eshkere-kod kopierades.

Formgivningen använder varm pappersbakgrund, mörkgrön text och orange accenter. Kubens mörka scen och olika färgade ytor gör djupet tydligt. Arial/Helvetica/sans-serif används för text och Georgia/Times New Roman/serif för betoning. Alla typsnitt har reserver.

Källor och inspiration, lästa 16 november 2026:

- [W3Schools: CSS 3D Transforms – Cube](https://www.w3schools.com/css/css3_3dtransforms_cube.asp). Inspiration för en kub med sex HTML-ytor. Projektet använder egen formgivning, svenska teman, pausfunktion och en statisk textlista.
- [MDN: Using CSS transforms](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Transforms/Using). Teknisk referens för perspektiv, rotation, förflyttning och tredimensionellt djup.
- [MDN: transition](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transition). Referens för övergångar mellan vanliga tillstånd och hover/fokus.
- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion). Referens för att respektera användarens inställning för minskad rörelse.

### Jämförelse: från diskret dekoration till meningsfull rörelse

| Rörelse | Startsignal och längd | Funktion | Avvägning och tillgänglighet |
| --- | --- | --- | --- |
| 3D-kub | Sidladdning; 32 sekunder per varv, upprepas | Visar att AI-säkerhet har sex kompletterande perspektiv | Tydligt blickfång. En kryssruta pausar rotationen utan JavaScript. Vid minskad rörelse står kuben stilla. Alla teman finns även som vanlig text. |
| Projektkort | Hover eller fokus på en länk/summary inuti kortet; 0,3 sekunder | Kortet lyfts 6 px med skugga och kantfärg för att visa aktivt innehåll | Fokus får samma återkoppling som mus. Ingen layout flyttas. Vid minskad rörelse används bara färg/skugga utan övergång eller förflyttning. |
| Poängring | Giltig formulärinlämning; 1,2 sekunder | Visar den illustrativa poängens andel av 100 | Bara ringen animeras. Slutvärdet visas direkt som text. Minskad rörelse ger slutlig ring direkt. Ny inlämning skapar en ny ring och startar om animationen. |
| Sidentréer | Sidladdning; 0,7 sekunder, högst 0,2 sekunders fördröjning | Skapar visuell ordning när rubrik, paneler och kort kommer in | Spelas en gång. CSS ändrar opacitet och position; ingen JavaScript-observatör behövs. Innehållet är direkt synligt utan animationer. |
| Knappövergång | Hover/fokus; 0,18 sekunder | Bekräftar klickbarhet | Kortare än kortens rörelse för snabb återkoppling. Synlig fokusram finns kvar. |

Den första versionens SVG-illustration tonades bara in kort vid laddning. Den nya kuben gör rörelse till en central del av innehållet. Kuben visar teknisk säkerhet, styrning, utvärderingar, fältbyggande, tolkbarhet och prognoser. Förklaringen under kuben gör att ingen behöver vänta på en viss sida eller läsa lutande text.

Kontinuerlig puls och blinkande effekter valdes bort. Bara kuben rör sig kontinuerligt, med en tydlig pausmöjlighet. Kort och poängring reagerar på besökarens handling. Entréer varar mindre än en sekund. Detta ger en tydlig hierarki mellan presentation och återkoppling.

### Hur koden fungerar

Scenen har `perspective: 1000px`. Kuben har `transform-style: preserve-3d`. Varje yta roteras och flyttas ut med `translateZ` motsvarande halva kubens bredd. Exempel: `.cube-right` använder `rotateY(90deg) translateZ(var(--half-cube))`. `@keyframes cube-turn` ändrar X- och Y-vinklar så att även ovan- och undersidan kommer fram. Färgskillnader, tunna kanter och en statisk skugga gör volymen tydlig utan WebGL eller bibliotek.

Paus fungerar med CSS: `.motion-toggle:checked ~ .cube-stage .cube` sätter `animation-play-state: paused`. Kryssrutan fungerar med Tab och mellanslag samt med mus/touch. Den dekorativa kuben har `aria-hidden`, medan den vanliga listan med sex teman är tillgänglig för skärmläsare. Vid minskad rörelse döljs den då onödiga pauskontrollen och ersätts med en förklaring.

Projektkort använder `:focus-within` så att det räcker att fokusera deras riktiga länkar; korten behöver inga extra tabbstopp. `transform: translateY(-6px)` kombineras med skugga och kantfärg. Mus-hover används bara på enheter som stöder hover.

JavaScript skapar två SVG-cirklar vid inlämning. `pathLength="100"` normaliserar omkretsen. CSS-variabeln `--score-gap` är 100 minus poängen. `stroke-dashoffset` animeras från 100 till detta värde. För 60 poäng blir slutvärdet 40. SVG:n är dekorativ; resultatet 60 / 100 finns samtidigt som riktig text i en live-region. Ingen sifferräknare eller JavaScript-timer behövs. Resultatet placeras direkt efter formuläret och rullas in i vyn utan animerad scroll.

Den globala regeln för `prefers-reduced-motion: reduce` stänger av animationer och övergångar. Extra regler tar även bort kortens förflyttning. Beräkning, länkar, text, pauskontroll och teman är inte beroende av att en animation slutförs.

## 3. Webbplatskarta

```text
                 Gemensam meny på alla sidor
          ┌─────────────────────────────────────┐
          │ Översikt ↔ Projektidéer ↔ Utvärdera │
          └─────────────────────────────────────┘
           index.html  projekt.html  utvardera.html

Loggan på varje sida → index.html
Startsidans knappar → Projektidéer / Utvärdera
Varje exempel → Utvärdera med förifyllt idénamn
Sidfot på varje sida → detta planeringsdokument
```

Alla tre sidor länkar direkt till varandra via huvudmenyn. Kontaktsida behövs inte för syftet; uppgiftens startsida/innehåll/kontakt är ett förslag, inte ett tekniskt krav.

## 4. Layoutskisser och logga

![Skisser av tre datorsidor och startsidan i mobilbredd](wireframes.svg)

Skisserna visar logga, meny, rubriker, text, illustration och knappar. På dator har startsidan två kolumner. Projektidéer visas i rader. Verktyget har formulär till vänster och metod till höger. På mobil blir innehållet en kolumn och menyn är alltid synlig. Detta undviker en extra JavaScript-meny.

Rörelse markeras vid startsidans kub (rotation och paus), projektkort (hover/fokus), formulärresultat (poängring) och sidentréer (sidladdning). Skisserna är dokumentationsskisser framtagna med AI och återger den valda layouten; de är inte handritade elevoriginal.

![Loggans skiss och färdiga form](logo-process.svg)

Loggidé: ett enkelt E i en kvadrat och en liten punkt som symboliserar ett experiment. Codex skapade både konceptskissen och den slutliga SVG-koden som AI-stöd. Briefen var: ”En enkel E-symbol för ett utforskande labb, läsbar i liten storlek, orange bakgrund, ljus bokstav och mörk experimentpunkt.” Slutformen har rundade hörn, jämna linjer och kan skalas utan att bli suddig. Det är en egen prototyplogga, inte Eshkeres officiella logga. SVG valdes för enkel redigering och liten filstorlek. Ingen separat bildgenerator användes.

## 5. Genomförande och arkitektur

1. Läs uppgiften och bestäm sidornas roller.
2. Lägg projektet i en helt separat mapp.
3. Skapa tre HTML-sidor med samma meny, logga och extern CSS.
4. Skriv innehåll, fiktiva exempel och tydliga begränsningar.
5. Lägg till responsiv layout, 3D-kub, kortövergångar och sidentréer.
6. Lägg till ett litet formulär med JavaScript.
7. Testa länkar, skärmbredder, tangentbord och beräkningar.
8. Dokumentera och packa projektmappen som ZIP.

HTML beskriver innehåll, CSS styr utseende och JavaScript hanterar endast bedömningsverktyget. Inga ramverk, externa typsnitt, installationer eller byggsteg krävs. Menyn upprepas i tre filer för att vara lätt att förstå och fungera utan JavaScript. Nackdelen är att en menyändring måste göras på tre ställen.

Alla sökvägar är relativa. Därför fungerar sidorna direkt från en uppackad mapp och under en framtida undermapp på en webbserver. Beräkningen ligger i funktionen `calculateScore`, separat från koden som uppdaterar sidan. Vid framtida integration kan funktionen flyttas, medan sidans CSS bör avgränsas för att inte påverka Eshkeres övriga design. Projektet använder inget API, ingen databas och ingen lokal lagring.

## 6. Utvärderingsmodell

Besökaren ger tre heltalsbetyg från 1 till 5: möjlig nytta, genomförbarhet och kunskapsläge. Ingen fråga är förvald. Poängen är summan delad med 15, multiplicerad med 100 och avrundad. Alla delar väger lika. Exempel: 3 + 3 + 3 ger 60/100. Lägsta resultat är 20, högsta 100.

Poängen illustrerar personliga antaganden och är inte en validerad metod. Den får inte läsas som procentuell chans att lyckas. Alla delbetyg visas så att ett högt medelvärde inte döljer en svag del. Lågt kunskapsläge prioriteras i förslaget till nästa steg. Därefter prioriteras låg genomförbarhet, sedan låg nytta. Annars föreslås ett avgränsat test.

Tomma obligatoriska fält stoppas av HTML-validering. Namn med enbart mellanslag stoppas av JavaScript. Användartext skrivs med `textContent`. När svar ändras tas föregående resultat bort. Återställning tömmer formuläret. Utan JavaScript finns frågorna och formeln kvar, med en tydlig förklaring och avstängd beräkningsknapp.

## 7. Kravkontroll

| Krav från uppgiften | Lösning / belägg |
| --- | --- |
| Minst tre sammanlänkade HTML-sidor | index.html, projekt.html, utvardera.html; gemensam meny |
| Semantisk HTML | header, nav, main, section, article, aside, footer; en h1 per sida |
| Gemensam extern CSS | css/style.css på alla tre sidor |
| Mobil och dator | Flexbox, Grid och brytpunkter vid 900/680 px; testade bredder i testprotokollet |
| Webbsäkra typsnitt och reserver | Arial/Helvetica/sans-serif och Georgia/Times New Roman/serif |
| Bilder och alt-texter | Loggbilden har tom alt eftersom länken har eget namn; dekorativ kub har aria-hidden och motsvarande information som vanlig text |
| Loggskiss och AI-stödd logga | docs/logo-process.svg och images/logo.svg |
| Sitemap och layoutskisser | Avsnitt 3 samt docs/wireframes.svg |
| Research och jämförelse av rörelse | Avsnitt 2, med källor och designbeslut |
| Frivillig rörelse och JavaScript | Båda ingår enligt projektönskemålet och förklaras här |
| Test och reflektion | docs/testprotokoll.md och avsnitt 8 |
| Projektmapp och planeringsdokument | ZIP med alla filer; detta dokument kan lämnas in separat |

## 8. Reflektion och kodförklaring

**Vilken är målgruppen?** Nyfikna elever, studenter och nybörjare inom AI-säkerhet. Innehållet ska hjälpa dem att ställa tydligare frågor utan att skapa falsk säkerhet genom exakta poäng.

**HTML-exempel:** `<nav aria-label="Huvudmeny">` anger ett navigationsområde och ger det ett begripligt namn. `aria-current="page"` markerar den aktuella sidan. `<label for="idea">` kopplar texten till formulärfältet med `id="idea"`, så att fältet får ett tillgängligt namn.

**CSS-exempel:** `.steps { display: grid; grid-template-columns: repeat(3, 1fr); }` ger tre lika breda kolumner. I mediafrågan för högst 680 px ändras detta till en kolumn. Samma innehåll blir därmed lättare att läsa på en smal skärm.

**JavaScript-exempel:** `Math.round((impact + feasibility + evidence) / 15 * 100)` räknar om tre betyg till modellens poäng. En submit-lyssnare stoppar omladdning med `event.preventDefault()`, läser fälten, anropar beräkningen och skapar resultattext. `textContent` gör att inmatning behandlas som text, även om den innehåller HTML-tecken.

**Vad upptäcktes vid animationsuppdateringen?** Den tidigare rörelsen var för diskret enligt återkopplingen. Kuben ersatte därför den statiska huvudillustrationen. Resultatet flyttades till direkt under formuläret så att poängringen syns före metodtexten på mobil. Rörelsetester kontrollerade både aktiv och minskad rörelse, omstart av ringen och paus utan JavaScript. Se det uppdaterade testprotokollet.

**Vad upptäcktes i första versionen?** Den första länkkontrollen hittade att planeringsdokumentet ännu inte hade skapats. Dokumentet lades till innan sluttestet. Testmiljön saknade Playwrights medföljande Chromium; testerna kördes i installerad Microsoft Edge. Slutliga resultat och begränsningar redovisas i testprotokollet utan att kalla automatiserade tester för användartester.

**Vad kan utvecklas vidare?** Genomför användartester med målgruppen. Undersök om frågorna förstås på samma sätt av olika personer. Undersök om kubens tempo och pausfunktion passar målgruppen. Lägg eventuellt till lokal export av anteckningar, men först när behovet är tydligt. Före integration behövs en granskning av Eshkeres riktiga struktur och formspråk. Poängmodellen bör fortsätta beskrivas som illustrativ om den inte valideras.

## 9. Inlämning

ZIP-filen heter `DittNamn_AwfullyGood.zip` och innehåller en överordnad mapp med samma namn. Ersätt `DittNamn` med ditt inlämningsnamn före Classroom. Arbetsprojektet heter fortfarande `eshkere-impact-lab`. Lämna även in detta planeringsdokument separat enligt uppgiften. Läs koden, gör egna ändringar och komplettera reflektionen med vad du själv kan förklara. Classroom-inlämning ingår inte i prototypen.
