// Ren beräkning: kan senare återanvändas utan sidans HTML.
function calculateScore(impact, feasibility, evidence) {
  const ratings = [impact, feasibility, evidence];
  if (!ratings.every(value => Number.isInteger(value) && value >= 1 && value <= 5)) {
    throw new Error("Varje bedömning måste vara ett heltal mellan 1 och 5.");
  }
  return Math.round((impact + feasibility + evidence) / 15 * 100);
}

const form = document.querySelector("#evaluation-form");
const result = document.querySelector("#result");
const idea = document.querySelector("#idea");
const examples = {
  osakerhet: "Exempel: När säger modellen jag vet inte?",
  information: "Exempel: Begriplig information före användning",
  modellkort: "Exempel: Ett öppet kort för modellens gränser"
};
const selectedIdea = new URLSearchParams(window.location.search).get("ide");
if (examples[selectedIdea]) idea.value = examples[selectedIdea];
document.querySelector("#calculate").disabled = false;

// Använd textContent så att användarens text aldrig tolkas som HTML.
function addResultText(tag, text, className = "") {
  const element = document.createElement(tag);
  element.textContent = text;
  element.className = className;
  result.append(element);
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (!idea.value.trim()) {
    idea.setCustomValidity("Skriv ett namn som innehåller mer än mellanslag.");
    idea.reportValidity();
    return;
  }
  const impact = Number(form.elements.impact.value);
  const feasibility = Number(form.elements.feasibility.value);
  const evidence = Number(form.elements.evidence.value);
  const score = calculateScore(impact, feasibility, evidence);
  result.replaceChildren();
  addResultText("p", "ILLUSTRATIV POÄNG · INTE ETT FINANSIERINGSBESLUT", "eyebrow");
  addResultText("h2", idea.value.trim());
  addResultText("p", score + " / 100", "score");
  addResultText("p", `Nytta: ${impact}/5 · Genomförbarhet: ${feasibility}/5 · Kunskapsläge: ${evidence}/5`);
  addResultText("p", evidence <= 2
    ? "Nästa steg: samla underlag. Ett svagt kunskapsläge gör slutsatsen osäker, även om totalpoängen är hög."
    : feasibility <= 2
    ? "Nästa steg: minska omfattningen. Formulera ett experiment som går att genomföra med dina resurser."
    : impact <= 2
    ? "Nästa steg: precisera problemet och vem som skulle ha nytta av en lösning."
    : "Nästa steg: skriv en testbar fråga och bestäm i förväg vad som skulle få dig att ändra uppfattning.");
  const uncertainty = form.elements.uncertainty.value.trim();
  if (uncertainty) addResultText("p", "Att undersöka: " + uncertainty);
});

// Dölj gamla slutsatser direkt när underlaget ändras.
form.addEventListener("input", function () {
  idea.setCustomValidity("");
  result.replaceChildren();
});
form.addEventListener("reset", function () {
  idea.setCustomValidity("");
  result.replaceChildren();
});
