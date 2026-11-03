# Mini Google: 1997 vs 1998

> **An interactive simulation demonstrating the birth of Google's PageRank algorithm, the death of keyword stuffing, and the mathematical transition from 1997 text-only search engines to 1998 link-graph ranking.**

Built entirely with **semantic HTML5, modern CSS3, and vanilla JavaScript (ES6+)**. No Node.js runtime, no npm packages, no build steps, and no third-party libraries. You can run the entire application simply by opening `index.html` in any modern web browser.

---

## 🌟 Table of Contents
1. [What the Project Does](#what-the-project-does)
2. [1997 vs 1998: The Fundamental Difference](#1997-vs-1998-the-fundamental-difference)
3. [Edge Cases & Core Specifications](#edge-cases--core-specifications)
4. [How the Algorithms Work](#how-the-algorithms-work)
   - [1997 Text Relevance (Whole-Word TF-IDF & Frequency)](#1-1997-text-relevance-algorithm)
   - [1998 Random Surfer PageRank Simulation](#2-1998-random-surfer-pagerank-simulation)
   - [1998 Anchor Text Intelligence](#3-1998-anchor-text-intelligence)
   - [1998 Composite Final Score](#4-1998-composite-final-score)
5. [How to Run the Application](#how-to-run-the-application)
6. [How to Test the "best camera" Demo](#how-to-test-the-best-camera-demo)
7. [Testing Other Preset Queries](#testing-other-preset-queries)
8. [Tuning Damping Factors & Ranking Weights](#tuning-damping-factors--ranking-weights)
9. [The Web Graph Topology (36 Pages)](#the-web-graph-topology-36-pages)
10. [Project Structure & Code Organization](#project-structure--code-organization)

---

## What the Project Does

In the mid-to-late 1990s, early web search engines like AltaVista, Lycos, Excite, and Yahoo indexed web pages by looking almost exclusively at **what each page said about itself**. This created a critical vulnerability: commercial webmasters and spammers quickly discovered that repeating target search phrases dozens of times (even hidden in white text on white backgrounds or stuffed into `<meta>` tags) would trick the search engine into awarding them the #1 position.

In 1998, Stanford Ph.D. students **Larry Page and Sergey Brin** created Google, introducing **PageRank**. Rather than trusting on-page text alone, PageRank treated every hyperlink pointing to a page as a **democratic vote of confidence**, recursively weighting votes from reputable sites higher than votes from obscure or spammy sites.

**Mini Google** simulates a complete 36-page synthetic web ecosystem containing:
- **Authority Hubs:** Trusted university, testing lab, and encyclopedic sites with dense incoming citations.
- **Normal Web Pages:** Realistic niche blogs, enthusiast forums, community hubs, tutorials, and photo galleries.
- **Keyword Spam Pages:** Deliberately stuffed pages repeating terms like `"best camera"`, `"learn programming"`, or `"healthy recipes"` with minimal incoming link prestige.
- **Complex Topologies:** Natural link cycles ($A \to B \to C \to A$), dead-end pages ($0$ outbound links), and bidirectional relationships.
- **Live Network Graph:** An interactive HTML5 Canvas visualization showing node sizes proportional to PageRank and arrows showing citation flow.
- **Side-by-Side Comparison:** Direct visual confirmation of how ranking transforms between 1997 and 1998.

---

## 1997 vs 1998: The Fundamental Difference

| Feature | 1997 Search Engines (AltaVista, Lycos, Yahoo) | 1998 Google (PageRank + Backlinks) |
| :--- | :--- | :--- |
| **Primary Metric** | On-page textual frequency & title matching | Text relevance + Link Graph authority + Anchor text |
| **Philosophical Basis** | *What does the page claim about itself?* | *What do other trusted webmasters say about this page?* |
| **Handling of Links** | Ignored completely | Hyperlinks treated as weighted democratic citations |
| **Susceptibility to Spam**| **Extremely High:** Keyword stuffing wins #1 rank easily | **Extremely Low:** Spam pages have no incoming link authority |
| **Anchor Text** | Ignored | Used as unbiased third-party descriptive annotations |
| **Algorithmic Complexity**| $O(N \cdot M)$ text scan | Iterative Markov-chain eigenvalue solver (Power Method) |

---

## Edge Cases & Core Specifications

The engine strictly implements all specified edge cases:

1. **Whole-Word Matching Only:**
   - Searching for `"exam"` matches `"exam"`, but strictly **will NOT match** `"example"`.
   - Handled via regex word boundaries (`\b`) across document content, titles, URLs, tags, and inbound anchor texts.
   - Highlighting (`<mark class="query-highlight">`) is also constrained to whole words.
2. **Case Insensitivity:**
   - Capital letters are completely ignored during tokenization and evaluation (`"BEST CAMERA"`, `"Best Camera"`, and `"best camera"` return identical results).
3. **Dead-End Random Jumps:**
   - If a page has no outgoing links (`links_to` is empty), the random surfer is teleported to a randomly chosen page on that step.
4. **Self-Links:**
   - If a page links to itself (e.g. `amateur-webmaster-ring`), it is allowed and treated as a normal outgoing link.
5. **Empty `links_to`:**
   - If `links_to` is empty, the page is classified as a dead end.
6. **Simulation Lifecycle:**
   - The Random Surfer simulation runs **only once** when the page loads.
   - Surfer scores are **reused** across all searches, mode toggles, and weight adjustments until the user explicitly clicks the **"🎲 Run the surfer again"** button.
7. **No-Results Display:**
   - If no page matches the search query (e.g. searching `"exam"` or a nonexistent term), the app displays a friendly no-results message and **hides the result columns entirely**.
8. **Stable Tie-Breaking:**
   - If multiple pages receive the exact same final ranking score, their **original data order** in the dataset is strictly preserved.
9. **100% Probability Conservation:**
   - The surfer scores across all 36 pages mathematically add up to **approximately 100%** ($100.00\%$), representing the exact probability distribution of the random surfer.

---

## How the Algorithms Work

### 1. 1997 Text Relevance Algorithm
The 1997 engine breaks documents and user queries into normalized tokens and calculates an Information Retrieval score:

$$\text{Score}_{1997} = \text{ExactPhraseBonus} + w_{\text{title}} \cdot \text{TitleMatches} + w_{\text{tags}} \cdot \text{TagMatches} + w_{\text{url}} \cdot \text{URLMatches} + w_{\text{body}} \cdot \text{TermFreq}$$

- **Whole-Word Matches Only:** Enforced via `\b` word boundaries so partial word substrings (like `"exam"` in `"example"`) produce zero points.
- **Weights Used:**
  - Exact phrase in Title: $+35$
  - Exact phrase in URL: $+15$
  - Exact phrase occurrences in Content: $+14$ per occurrence
  - Individual query terms in Title: $+10$
  - Individual query terms in Tags: $+8$
  - Individual query terms in URL: $+4$
  - Content keyword frequency: $+4$ per occurrence
- The raw score is normalized from $0.0$ to $1.0$ across the corpus.
- **Notice:** Because link data is completely absent, a spam page that repeats `"best camera"` 10 times easily outscores a thoughtful review page.

---

### 2. 1998 Random Surfer PageRank Simulation
Google models the web as a directed graph $G = (V, E)$ traversed by a **"Random Web Surfer"**:
- With probability $d$ (damping factor, default $0.85$), the surfer follows an outgoing link chosen uniformly at random from the current page.
- If the current page has no outgoing links (`links_to` is empty / dead end), or with probability $(1 - d)$, the surfer teleports to a random page chosen uniformly across the entire web.
- Self-links are treated as normal outgoing links.

After 50,000 steps, each page's surfer score is calculated as:

$$\text{SurferScore}(p) = \frac{\text{Visits}(p)}{\text{TotalSteps}} \times 100\%$$

$$\sum_{p \in V} \text{SurferScore}(p) = 100.00\%$$

For the 1998 composite score formula, the percentage is normalized from $0.0$ to $1.0$:

$$\text{NormalizedPR}(p) = \frac{\text{SurferScore}(p)}{\max_{q}(\text{SurferScore}(q))}$$

The simulation runs **only once on page load**, and the scores are cached and reused for all searches until the user clicks **"🎲 Run the surfer again"**.

---

### 3. 1998 Anchor Text Intelligence
When page $B$ links to page $A$, the text clickable in the hyperlink is known as **anchor text**. External webmasters rarely write spam in their link descriptions—they write concise, objective summaries like *"recommended best camera"* or *"learn programming with python"*.

If whole query terms or exact query phrases appear in inbound anchor text pointing to page $A$, page $A$ receives an anchor text score normalized to $[0.0, 1.0]$.

---

### 4. 1998 Composite Final Score
Google combined all three signals into a balanced composite ranking:

$$\text{FinalScore}_{1998} = (w_{\text{text}} \cdot \text{NormalizedTextScore}) + (w_{\text{PR}} \cdot \text{NormalizedPageRank}) + (w_{\text{anchor}} \cdot \text{NormalizedAnchorScore})$$

**Default weights:**
- $w_{\text{text}} = 0.55$ ($55\%$ weight)
- $w_{\text{PR}} = 0.35$ ($35\%$ weight)
- $w_{\text{anchor}} = 0.10$ ($10\%$ weight)

Because spam pages have near-zero PageRank ($< 0.70\%$) and zero authoritative anchor text endorsements, their composite score drops sharply, allowing high-quality, reputable guides to win top positions.

---

## How to Run the Application

This project requires **no web server, no npm, and no dependencies**.

1. Navigate to the repository folder:
   ```bash
   cd mini_google
   ```
2. Double-click `index.html` or open it with any web browser (Google Chrome, Firefox, Safari, Microsoft Edge):
   ```bash
   # On macOS:
   open index.html

   # On Linux:
   xdg-open index.html

   # On Windows:
   start index.html
   ```
3. The app is ready to use immediately!

---

## How to Test the "best camera" Demo

The `"best camera"` search query directly showcases the historic algorithmic breakthrough:

1. Look at the search bar at the top of the page. It is preloaded with `"best camera"`. (If not, click the preset chip: **"📷 best camera"**).
2. Ensure the mode is set to **"⚔️ Compare"** (the default view).
3. Observe the side-by-side results:

### In 1997 Search Engine (Left Column):
- **#1 Rank:** `BEST CAMERA BEST CAMERA BUY BEST CAMERA REVIEWS CHEAP` (`discount-deals-direct99.com`)
  - **Text Score:** `1.000`
  - **Inbound Links:** Only `1` weak link from an unindexed banner exchange.
  - **Why it won:** It repeated the phrase *"best camera"* 10 times in the body, 3 times in the title, and packed the URL with keyword spam. In 1997, that made it the "most relevant" page on the web!

### In 1998 Google (Right Column):
- **#1 Rank:** `The Best Camera Guide 1998: Digital Camera Reviews & Ratings` (`optics-review-hub.org`)
  - **Final Score:** `0.640`
  - **Surfer Probability:** `~8.8%` (High PageRank)
  - **Anchor Score:** `1.000`
  - **Inbound Links:** `9` high-reputation links (endorsed by Stanford University CS Directory, PhotoNet Bulletin Board, Optics Bench Lab, Amateur Photography Journal, and Tech Chronicle Daily).
- **Spam Page Demoted:** The keyword spammer is immediately pushed down because its surfer probability is practically zero ($< 0.7\%$).

---

## Testing Other Preset Queries & Edge Cases

- **Strict Whole-Word Matching ("exam" vs "example"):**
  - Type `"exam"` into the search box:
  - Even though pages contain the word `"example"`, the engine returns **0 results**, displays the friendly no-results card, and **hides the result columns**.
- **Case-Insensitive Queries:**
  - Search `"BEST CAMERA"` or `"bEsT cAmErA"`: returns identical results to `"best camera"`.
- **💻 "learn programming":**
  - **1997:** Duped by an instant coding cheat-sheet spam site.
  - **1998:** Elevates *The Modern Programming Codex* backed by Stanford University and Unix administrator manuals.
- **🥗 "healthy recipes":**
  - **1997:** Topped by a commercial "miracle belly fat" diet spam page.
  - **1998:** Elevates the *National Institute of Nutritional Science* supported by clinical journals and agricultural research alliances.
- **🚀 "space exploration":**
  - Shows how peer-reviewed research hubs like the *Astrophysics & Deep Space Exploration Journal* and NASA Pathfinder telemetry archives dominate search results.

---

## Tuning Damping Factors & Ranking Weights

Click the **"⚙️ Settings & Weights"** button in the header to reveal the live algorithm tuning drawer:

1. **Damping Factor ($d$):**
   - Slider range: `0.00` to `1.00` (default: `0.85`).
   - If set to `0.00`, links are ignored and every page receives equal probability.
   - If set closer to `1.00`, PageRank concentrates strongly in authority hubs and cycles.
2. **Text Relevance Weight ($w_{\text{text}}$):**
   - Default: `0.55`. Controls the influence of keyword matching.
3. **PageRank Weight ($w_{\text{PR}}$):**
   - Default: `0.35`. Controls the influence of the link graph.
4. **Anchor Text Weight ($w_{\text{anchor}}$):**
   - Default: `0.10`. Controls the boost given when inbound links describe the destination with query keywords.
5. **"🎲 Run the surfer again" Button:**
   - Available in the header and graph toolbar.
   - Re-simulates 50,000 steps of the random web surfer across the graph.
   - Shows a toast confirming that all 36 pages sum to 100.0%.

---

## The Web Graph Topology (36 Pages)

The synthetic web graph contains 36 interconnected pages designed to mirror real web topology:
- **Authority Hubs (4–6 pages):**
  - `stanford-tech`: Stanford University Web Directory & CS Research Index
  - `camera-authority`: The Best Camera Guide 1998 (Optics Review Hub)
  - `prog-python-hub`: Learn Programming: The Modern Python & Software Codex
  - `health-nutrition-institute`: Healthy Recipes Codex (National Institute of Nutritional Science)
  - `science-space-journal`: Astrophysics & Deep Space Exploration Journal
  - `tech-chronicle-news`: Global Technology & Digital Media Chronicle
- **Keyword Spam Pages (3 pages):**
  - `camera-spam-97`: Repetitive camera sales text
  - `prog-spam-97`: "Learn programming in 24 hours" spam
  - `health-spam-97`: "Miracle diet healthy recipes" spam
  - `spam-link-exchange`: Reciprocal link-swapping farm
- **Dead-End Nodes (3 pages with 0 outbound links):**
  - `digital-photo-deadend`: Prototype sensor image repository (`links_to: []`)
  - `food-deadend-archive`: Historical culinary museum archive (`links_to: []`)
  - `space-deadend-station`: Mir orbital space station telemetry dump (`links_to: []`)
- **Self-Linking Node:**
  - `amateur-webmaster-ring`: Links to `["camera-authority", "prog-python-hub", "web-standards-org", "amateur-webmaster-ring"]`.
- **Link Cycles:**
  - `camera-authority` $\leftrightarrow$ `photo-hobby-blog` $\leftrightarrow$ `lens-comparison-lab` $\to$ `camera-authority`
  - `stanford-tech` $\to$ `prog-python-hub` $\to$ `cs-algorithms-lab` $\to$ `stanford-tech`

### Graph Visualization Features:
- **Node Size:** Proportional to normalized PageRank ($10\text{px}$ to $26\text{px}$).
- **Node Color:**
  - 🔵 **Blue:** Authority Hubs
  - 🔴 **Red:** Spam Pages
  - ⚪ **Slate:** Standard Web Pages
  - 🟡 **Glowing Gold Ring & # Badge:** Top results for the current query
- **Directed Arrows & Self-Loops:** Shows the exact direction of hyperlink votes and self-citation arcs.
- **Interactive Controls:**
  - **Drag:** Click and drag any node to explore connections.
  - **Inspect:** Click any node to open the floating **Node Inspector** displaying its URL, Surfer Percentage (out of 100%), outbound links, and a complete list of inbound links with their exact anchor text.
  - **Zoom / Pan:** Use mouse wheel, canvas drag, or the `➕` / `➖` / `🔄` toolbar buttons.

---

## Project Structure & Code Organization

```
mini_google/
├── index.html        # Semantic HTML5 single-page application structure
├── style.css         # Responsive styling, CSS variables, Google palette & animations
├── script.js         # Complete dataset, Random Surfer engine, 1997 engine, canvas physics & UI logic
└── README.md         # Comprehensive documentation & algorithmic explanation
```

### Key JavaScript Functions in `script.js`:
- `buildIndex()`: Builds link adjacency structures, maps inbound links, and handles `links_to` vs `outboundLinks`.
- `runRandomSurfer(d, steps)`: Simulates 50,000 steps of the random web surfer with dead-end jumps, self-links, and 100% sum.
- `calculatePageRank(d)`: Returns active random-surfer distribution scores.
- `calculateTextScore(query)`: 1997 whole-word keyword frequency and exact-phrase scoring (ignores capital letters).
- `calculateAnchorTextScore(query)`: Evaluates query terms across incoming link anchors using whole-word matching.
- `rank1997(query)`: Ranks corpus using 1997 text-only scoring with stable tie-breaking.
- `rank1998(query)`: Ranks corpus using the 1998 composite score formula with stable tie-breaking.
- `renderResults()`: Ranks and renders cards; hides result columns and shows friendly message if 0 matches found.
- `renderGraph()`: Draws the canvas network graph with arrowheads, self-loops, and glowing badges.
- `updateSettings(isDampingChange)`: Synchronizes sliders with state without re-running surfer unless damping factor changes.
- `triggerSurferRerun()`: Re-executes the random surfer when the user clicks "Run the surfer again".

---

## License & Credits

Created as an educational demonstration of the history of Information Retrieval and Graph Theory algorithms on the World Wide Web. Inspired by Lawrence Page and Sergey Brin's 1998 paper: *"The Anatomy of a Large-Scale Hypertextual Web Search Engine"*, Stanford University.
