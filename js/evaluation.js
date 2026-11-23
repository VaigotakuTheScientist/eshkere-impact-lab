// Ren beräkning: kan senare återanvändas utan sidans HTML.
// LEARNING: PURE FUNCTION: the inputs determine the numeric result, independent of the page.
function calculateScore(impact, feasibility, evidence) {
  const ratings = [impact, feasibility, evidence];
  if (!ratings.every(value => Number.isInteger(value) && value >= 1 && value <= 5)) {
    throw new Error("Varje bedömning måste vara ett heltal mellan 1 och 5.");
  }
  return Math.round((impact + feasibility + evidence) / 15 * 100);
}

// LEARNING: DOM LOOKUP: querySelector('#id') finds an element by its HTML id.
const form = document.querySelector("#evaluation-form");
const result = document.querySelector("#result");
const idea = document.querySelector("#idea");
// LEARNING: EXAMPLE MAPPING: URL codes point to readable project names.
const examples = {
  osakerhet: "Exempel: När säger modellen jag vet inte?",
  information: "Exempel: Begriplig information före användning",
  modellkort: "Exempel: Ett öppet kort för modellens gränser"
};
// LEARNING: URL PARAMETERS: read ?ide=... from the current page address.
const selectedIdea = new URLSearchParams(window.location.search).get("ide");
if (Object.hasOwn(examples, selectedIdea)) idea.value = examples[selectedIdea];
// LEARNING: BUTTON STATE: enable submit only once the script is running.
document.querySelector("#calculate").disabled = false;

// Använd textContent så att användarens text aldrig tolkas som HTML.
// LEARNING: SAFE OUTPUT: create an element and insert textContent rather than interpreting input as HTML.
function addResultText(tag, text, className = "") {
  const element = document.createElement(tag);
  element.textContent = text;
  element.className = className;
  result.append(element);
}

// LEARNING: EVENT LISTENER: the submit callback runs when the user submits the form.
form.addEventListener("submit", function (event) {
  // LEARNING: STOP NAVIGATION: prevent the browser's default form submit so the result stays here.
  event.preventDefault();
  if (!idea.value.trim()) {
    idea.setCustomValidity("Skriv ett namn som innehåller mer än mellanslag.");
    idea.reportValidity();
    return;
  }
  // LEARNING: TYPE CONVERSION: form values are strings; Number converts one to a numeric rating.
  const impact = Number(form.elements.impact.value);
  const feasibility = Number(form.elements.feasibility.value);
  const evidence = Number(form.elements.evidence.value);
  // LEARNING: SEPARATION: compute the score first, then display it in the following lines.
  const score = calculateScore(impact, feasibility, evidence);
  // LEARNING: CLEAR STATE: remove old output before building a new result.
  result.replaceChildren();
  addResultText("p", "ILLUSTRATIV POÄNG · INTE ETT FINANSIERINGSBESLUT", "eyebrow");
  addResultText("h2", idea.value.trim());
  // SVG visar samma poäng som texten. CSS sköter själva rörelsen.
  // pathLength=100 gör att stroke-dashoffset kan räknas direkt från poängen.
  const visual = document.createElement("div");
  visual.className = "score-visual";
  // LEARNING: SVG NAMESPACE: createElementNS is needed for SVG shapes.
  const svgNamespace = "http://www.w3.org/2000/svg";
  const ring = document.createElementNS(svgNamespace, "svg");
  ring.setAttribute("viewBox", "0 0 160 160");
  ring.setAttribute("aria-hidden", "true");
  for (const className of ["score-track", "score-fill"]) {
    const circle = document.createElementNS(svgNamespace, "circle");
    circle.setAttribute("cx", "80");
    circle.setAttribute("cy", "80");
    circle.setAttribute("r", "68");
    circle.setAttribute("pathLength", "100");
    circle.setAttribute("class", className);
    ring.append(circle);
  }
  // LEARNING: CSS/JS HANDOFF: this custom property controls the score ring animation.
  visual.style.setProperty("--score-gap", 100 - score);
  visual.append(ring);
  const scoreText = document.createElement("p");
  scoreText.className = "score";
  scoreText.textContent = score + " / 100";
  visual.append(scoreText);
  result.append(visual);
  addResultText("p", `Nytta: ${impact}/5 · Genomförbarhet: ${feasibility}/5 · Kunskapsläge: ${evidence}/5`);
  // LEARNING: CONDITIONS: the ternary expression prioritizes low evidence, then feasibility, then impact.
  addResultText("p", evidence <= 2
    ? "Nästa steg: samla underlag. Ett svagt kunskapsläge gör slutsatsen osäker, även om totalpoängen är hög."
    : feasibility <= 2
    ? "Nästa steg: minska omfattningen. Formulera ett experiment som går att genomföra med dina resurser."
    : impact <= 2
    ? "Nästa steg: precisera problemet och vem som skulle ha nytta av en lösning."
    : "Nästa steg: skriv en testbar fråga och bestäm i förväg vad som skulle få dig att ändra uppfattning.");
  const uncertainty = form.elements.uncertainty.value.trim();
  if (uncertainty) addResultText("p", "Att undersöka: " + uncertainty);
  // Visa resultatet även på små skärmar. Ingen animerad scroll behövs.
  result.scrollIntoView({ block: "nearest", behavior: "instant" });
});

// Dölj gamla slutsatser direkt när underlaget ändras.
// LEARNING: INVALIDATION: changing any input clears a now-outdated result.
form.addEventListener("input", function () {
  idea.setCustomValidity("");
  result.replaceChildren();
});
form.addEventListener("reset", function () {
  idea.setCustomValidity("");
  result.replaceChildren();
});
