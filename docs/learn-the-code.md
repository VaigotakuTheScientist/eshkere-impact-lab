# Learn the Eshkere Impact Lab code

Read the **real project files**, not a copy of them. The source now contains `LEARNING:` comments: HTML comments use `<!-- ... -->`, CSS comments use `/* ... */`, and JavaScript comments begin with `//`. Browsers ignore these comments.

## Start here

1. [`index.html`](../index.html) — document skeleton (`head`, `body`), navigation, sections, the cube's six faces, accessibility.
2. [`css/style.css`](../css/style.css) — selectors such as `.hero`, reusable colors (`:root`), Grid/Flexbox, media queries, 3D transforms, transitions and animations.
3. [`projekt.html`](../projekt.html) — semantic `article` blocks and interactive `details`/`summary` without JavaScript.
4. [`utvardera.html`](../utvardera.html) — form inputs, labels, the `result` element and the deferred JavaScript file.
5. [`js/evaluation.js`](../js/evaluation.js) — form submission, pure score calculation, DOM updates and the SVG score ring.

## How the files talk to each other

| Layer | Example from the project | Job |
| --- | --- | --- |
| HTML | `<section class="hero">` | Defines meaning, content and structure. |
| CSS | `.hero { display: grid; }` | Selects HTML by class and controls presentation. |
| JavaScript | `document.querySelector("#result")` | Finds HTML by id and changes content in response to user actions. |

An anchor such as `href="projekt.html"` connects HTML pages. A stylesheet link loads the common CSS file. The evaluation page loads `js/evaluation.js` with `defer`. The six-faced cube is entirely HTML + CSS; no JavaScript is necessary for rotation or pausing.

## Study experiments

**1. HTML:** Change one sentence in `index.html`. Reload the page. What did the browser change, and why did it not require editing CSS?

**2. CSS:** In `css/style.css`, change `--accent`. Observe which elements change. Then compare `transition` on `.button` with `@keyframes cube-turn`. Change the cube's `32s` to `16s` and predict what happens. Note that reduced-motion settings can disable the animation.

**3. JavaScript + math:** In the evaluation form, choose ratings 3, 3 and 3. Find the function `calculateScore` and predict `Math.round((3+3+3)/15*100) = 60`. Follow the submit event, `Number(...)`, the calculation, and `result.append(...)`. Try 5, 1, 2 and predict the new score.

## Questions to test your understanding

- Why does `class="hero"` connect to CSS `.hero`, but `id="result"` connect to `#result`?
- How does `@media (max-width: 680px)` change the page?
- Why does `:checked ~ .cube-stage .cube` work without JavaScript?
- Why does `textContent` insert user input more safely than `innerHTML`?
- Why isn't a high illustrative score proof that a project will have real impact?

Study a small piece, **predict what an edit will do**, change it on an experimental branch, reload, and compare your prediction with the result. Your school reflection should describe your own understanding and testing.
