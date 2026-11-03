/**
 * Mini Google: 1997 vs 1998
 * Core JavaScript Engine: TF-IDF Text Ranking, Random Surfer PageRank Simulation,
 * Anchor Text Scoring, Interactive Canvas Network Graph, and UI Controller.
 *
 * Built with pure Vanilla JavaScript (ES6+). Zero external dependencies.
 */

// ============================================================================
// 1. DATASET: 36 Web Pages Graph
// Each page includes both `outboundLinks` and `links_to` for dead-end & self-link handling.
// ============================================================================
const pages = [
  // --- 1. CORE AUTHORITY PAGES (High Inbound Links) ---
  {
    id: "stanford-tech",
    title: "Stanford University Web Directory & CS Research Index",
    url: "http://www-cs.stanford.edu/webdir/1998",
    content: "Official directory of computer science research, web architecture projects, and digital multimedia archives. Curated by university researchers for indexing emerging technology and algorithmic resources. Highlights essential guides in digital photography, modern programming languages, scientific journals, and nutritional wellness.",
    tags: ["stanford", "computing", "technology", "directory", "research", "multimedia"],
    outboundLinks: ["camera-authority", "prog-python-hub", "science-space-journal", "health-nutrition-institute", "tech-chronicle-news", "cs-algorithms-lab"],
    links_to: ["camera-authority", "prog-python-hub", "science-space-journal", "health-nutrition-institute", "tech-chronicle-news", "cs-algorithms-lab"],
    anchorTexts: {
      "camera-authority": "recommended best camera and digital imaging guide",
      "prog-python-hub": "learn programming with python codex",
      "science-space-journal": "space exploration and deep astronomy archives",
      "health-nutrition-institute": "evidence-based healthy recipes and diet guide",
      "tech-chronicle-news": "global technology news and analysis",
      "cs-algorithms-lab": "computer science algorithms research"
    }
  },
  {
    id: "camera-authority",
    title: "The Best Camera Guide 1998: Digital Camera Reviews & Ratings",
    url: "http://www.optics-review-hub.org/best-camera-guide",
    content: "Our laboratory tests evaluate the best camera models for every budget, sensor size, and shooting condition. Finding the best camera requires balancing resolution, lens sharpness, battery endurance, and exposure controls. Explore our definitive best camera benchmark ratings for landscape, portrait, and studio photography. Choosing the best camera requires reviewing lab test data to find the best camera value.",
    tags: ["best camera", "camera", "digital camera", "optics", "photography", "reviews", "ratings"],
    outboundLinks: ["photo-hobby-blog", "lens-comparison-lab", "stanford-tech", "vintage-film-archive"],
    links_to: ["photo-hobby-blog", "lens-comparison-lab", "stanford-tech", "vintage-film-archive"],
    anchorTexts: {
      "photo-hobby-blog": "amateur photography discussion group",
      "lens-comparison-lab": "optical lens test benchmarks",
      "stanford-tech": "stanford computing directory",
      "vintage-film-archive": "vintage 35mm film history"
    }
  },
  {
    id: "prog-python-hub",
    title: "Learn Programming: The Modern Python & Software Codex",
    url: "http://www.dev-codex-archive.org/learn-programming-guide",
    content: "An open curriculum designed for students who want to learn programming from foundational principles. Master Python syntax, algorithmic data structures, and object-oriented architecture through real-world software projects. When you learn programming with disciplined practice, you can learn programming to build scalable web systems, database engines, and networked applications.",
    tags: ["learn programming", "programming", "python", "software engineering", "coding", "tutorials"],
    outboundLinks: ["cs-algorithms-lab", "web-standards-org", "stanford-tech", "unix-command-guide"],
    links_to: ["cs-algorithms-lab", "web-standards-org", "stanford-tech", "unix-command-guide"],
    anchorTexts: {
      "cs-algorithms-lab": "algorithmic complexity library",
      "web-standards-org": "w3c internet specifications",
      "stanford-tech": "stanford computer science directory",
      "unix-command-guide": "unix shell mastery"
    }
  },
  {
    id: "health-nutrition-institute",
    title: "Healthy Recipes Codex: National Institute of Nutritional Science",
    url: "http://www.nutrition-wellness-institute.gov/healthy-recipes",
    content: "Evidence-based research on dietary health, metabolic wellness, and balanced nutrition. Access clinical evaluations of whole-food diets, plant-based macronutrient profiles, and cardiovascular fitness. Our test kitchen publishes validated healthy recipes designed to lower cholesterol, stabilize blood sugar, and provide delicious healthy recipes for longevity. Cook wholesome healthy recipes every week with nutrient-rich ingredients, delicious healthy recipes, and easy healthy recipes.",
    tags: ["healthy recipes", "health", "nutrition", "diet", "wellness", "recipes", "culinary"],
    outboundLinks: ["mediterranean-diet-hub", "stanford-tech", "organic-farm-network"],
    links_to: ["mediterranean-diet-hub", "stanford-tech", "organic-farm-network"],
    anchorTexts: {
      "mediterranean-diet-hub": "mediterranean lifestyle and healthy recipes",
      "stanford-tech": "academic research registry",
      "organic-farm-network": "sustainable agriculture alliance"
    }
  },
  {
    id: "science-space-journal",
    title: "Astrophysics & Deep Space Exploration Journal",
    url: "http://www.cosmic-science-review.org/deep-space",
    content: "Peer-reviewed observatory reports detailing orbital telemetry, planetary rover expeditions, and stellar spectrometry. Review deep space exploration initiatives from NASA, ESA, and international astronomical consortia. Featuring breakthrough imagery from the Hubble Space Telescope and deep sky surveys for space exploration researchers.",
    tags: ["space exploration", "astronomy", "space", "astrophysics", "nasa", "hubble", "planets"],
    outboundLinks: ["mars-rover-dispatch", "hubble-photo-gallery", "stanford-tech", "astro-society-hub"],
    links_to: ["mars-rover-dispatch", "hubble-photo-gallery", "stanford-tech", "astro-society-hub"],
    anchorTexts: {
      "mars-rover-dispatch": "mars rover scientific telemetry",
      "hubble-photo-gallery": "hubble telescope deep space images",
      "stanford-tech": "stanford academic resources",
      "astro-society-hub": "amateur astronomer observatory network"
    }
  },
  {
    id: "tech-chronicle-news",
    title: "Global Technology & Digital Media Chronicle",
    url: "http://www.tech-chronicle-daily.com/frontpage",
    content: "Daily investigative reporting on personal computers, telecommunication deregulation, digital cameras, and internet search technology. Expert columns evaluating hardware innovations and software development across Silicon Valley. Read our annual buyer comparisons on the best camera gear and developer workstations.",
    tags: ["technology", "news", "silicon valley", "hardware", "software", "best camera", "digital media"],
    outboundLinks: ["camera-authority", "prog-python-hub", "stanford-tech", "web-standards-org"],
    links_to: ["camera-authority", "prog-python-hub", "stanford-tech", "web-standards-org"],
    anchorTexts: {
      "camera-authority": "best camera buyers guide and lab test results",
      "prog-python-hub": "comprehensive guide to learn programming",
      "stanford-tech": "stanford research archives",
      "web-standards-org": "open web standards consortium"
    }
  },

  // --- 2. SPAM PAGES (Keyword Stuffing, Minimal/No Reputable Inbound Links) ---
  {
    id: "camera-spam-97",
    title: "BEST CAMERA BEST CAMERA BUY BEST CAMERA REVIEWS CHEAP",
    url: "http://www.discount-deals-direct99.com/best-camera-best-camera",
    content: "Best camera best camera best camera! Looking to buy the best camera at lowest wholesale prices? Our best camera guide has the best camera ratings, best camera features, and best camera deals. Click here for best camera discount coupons and best camera reviews today!",
    tags: ["best camera", "camera", "best", "deals", "cheap", "buy", "discount", "reviews"],
    outboundLinks: ["stanford-tech", "tech-chronicle-news"],
    links_to: ["stanford-tech", "tech-chronicle-news"],
    anchorTexts: {
      "stanford-tech": "directory",
      "tech-chronicle-news": "news"
    }
  },
  {
    id: "prog-spam-97",
    title: "LEARN PROGRAMMING LEARN PROGRAMMING CODE IN 24 HOURS FAST",
    url: "http://www.instant-coding-secrets.net/learn-programming",
    content: "Learn programming learn programming learn programming overnight without hard work! Secrets to learn programming, easy learn programming tutorials, fast learn programming hacks. Anyone can learn programming right now with our learn programming cheat sheet!",
    tags: ["learn programming", "programming", "code", "fast", "hacks", "cheat sheet"],
    outboundLinks: ["stanford-tech"],
    links_to: ["stanford-tech"],
    anchorTexts: {
      "stanford-tech": "tech directory"
    }
  },
  {
    id: "health-spam-97",
    title: "HEALTHY RECIPES HEALTHY RECIPES MIRACLE DIET LOSE WEIGHT FAST",
    url: "http://www.miracle-weight-loss-99.biz/healthy-recipes",
    content: "Healthy recipes healthy recipes healthy recipes! The ultimate secret to miracle healthy recipes, quick healthy recipes, easy healthy recipes, and delicious healthy recipes. Burn belly fat now with our guaranteed healthy recipes and healthy recipes meal plan today!",
    tags: ["healthy recipes", "recipes", "diet", "healthy", "food", "miracle", "weight loss"],
    outboundLinks: ["stanford-tech"],
    links_to: ["stanford-tech"],
    anchorTexts: {
      "stanford-tech": "directory"
    }
  },
  {
    id: "spam-link-exchange",
    title: "FREE CLICKS & BANNER LINK EXCHANGE NETWORK 1997",
    url: "http://www.free-web-hits-generator.biz/exchange",
    content: "Boost your search engine rank with free banner exchanges and web ring links. Join thousands of webmasters inflating hit counters with keyword stuffing and reciprocal link swaps. Guaranteed top search placement for all commercial shopping directories.",
    tags: ["webring", "hits", "free", "traffic", "exchange", "seo"],
    outboundLinks: ["camera-spam-97", "prog-spam-97"],
    links_to: ["camera-spam-97", "prog-spam-97"],
    anchorTexts: {
      "camera-spam-97": "click here for deals",
      "prog-spam-97": "free member site"
    }
  },

  // --- 3. NORMAL TOPICAL PAGES (Cameras & Photography) ---
  {
    id: "photo-hobby-blog",
    title: "Shutter & Lens: Amateur Photography Journal",
    url: "http://www.shutter-lens-diary.com/notes",
    content: "My personal field notes capturing wildlife, urban streetscapes, and family moments with 35mm and early digital sensors. Testing aperture speeds, flash exposure, and color fidelity on weekend excursions. Always consulting reliable reviews to determine the best camera for low-light situations.",
    tags: ["photography", "camera", "photos", "hobby", "lenses", "best camera"],
    outboundLinks: ["camera-authority", "lens-comparison-lab", "nature-photo-showcase"],
    links_to: ["camera-authority", "lens-comparison-lab", "nature-photo-showcase"],
    anchorTexts: {
      "camera-authority": "recommended best camera models and reviews",
      "lens-comparison-lab": "lens sharpness tests",
      "nature-photo-showcase": "wildlife photo gallery"
    }
  },
  {
    id: "lens-comparison-lab",
    title: "Optics Bench: Prime & Zoom Lens Analysis",
    url: "http://www.lens-benchmarks-test.net/reviews",
    content: "Benchmarking focal length distortion, chromatic aberration, and corner-to-corner sharpness across leading glass manufacturers. Essential reading for photographers upgrading their kit bodies to professional optics. We evaluate glass performance mounted on the best camera sensor bodies available.",
    tags: ["lenses", "optics", "camera", "sharpness", "best camera", "benchmark"],
    outboundLinks: ["camera-authority", "photo-hobby-blog"],
    links_to: ["camera-authority", "photo-hobby-blog"],
    anchorTexts: {
      "camera-authority": "the best camera ratings and sensor guide",
      "photo-hobby-blog": "field photography tests"
    }
  },
  {
    id: "nature-photo-showcase",
    title: "Wilderness Vistas: Nature Photography Showcase",
    url: "http://www.wilderness-vistas.org/gallery",
    content: "High-resolution photo essays tracking migratory birds, national park panoramas, and alpine sunsets. Tips on weatherproofing your electronic gear and stabilizing long telephoto lenses in rugged backcountry terrain. Capturing breathtaking wilderness photos requires patience and the best camera gear for outdoor conditions.",
    tags: ["nature", "photography", "wilderness", "landscapes", "best camera"],
    outboundLinks: ["camera-authority", "photo-hobby-blog"],
    links_to: ["camera-authority", "photo-hobby-blog"],
    anchorTexts: {
      "camera-authority": "buyers guide for the best camera outdoors",
      "photo-hobby-blog": "photo field discussions"
    }
  },
  {
    id: "camera-forum-board",
    title: "PhotoNet Community Bulletin Board & Classifieds",
    url: "http://www.photonet-discussion.org/threads/digital",
    content: "Active discussions among amateur and professional shutterbugs regarding shutter lag, flash synchronization, and memory cards. Thread participants frequently ask what is currently the best camera for travel and family portraits. Check out the community consensus links before making your purchase.",
    tags: ["forum", "community", "camera", "best camera", "classifieds", "discussion"],
    outboundLinks: ["camera-authority", "tech-chronicle-news"],
    links_to: ["camera-authority", "tech-chronicle-news"],
    anchorTexts: {
      "camera-authority": "best camera recommendations for beginners",
      "tech-chronicle-news": "tech news roundup"
    }
  },
  {
    id: "vintage-film-archive",
    title: "Classic 35mm Rangefinder & SLR Museum",
    url: "http://www.vintage-film-camera-archive.org/slr",
    content: "Dedicated to the mechanical craftsmanship of vintage German and Japanese mechanical rangefinders and SLR bodies. Learn about manual shutter timing, selenium light meters, and darkroom chemical development techniques. Preserving the analog heritage that inspired modern digital imaging.",
    tags: ["vintage", "film", "slr", "analog", "camera", "history"],
    outboundLinks: ["camera-authority"],
    links_to: ["camera-authority"],
    anchorTexts: {
      "camera-authority": "history of the best camera optics"
    }
  },
  {
    id: "digital-photo-deadend",
    title: "Digital Sensor Megapixel Gallery 1998 (Dead End)",
    url: "http://www.early-megapixels.edu/deadend-archive",
    content: "Archived sample photos showing 0.8 megapixel and 1.2 megapixel color captures from prototype CCD sensor units. Displays uncompressed bitmap graphics for academic image processing research. This repository has no outgoing links and serves as an image dump.",
    tags: ["samples", "ccd", "sensor", "camera", "gallery", "archive"],
    outboundLinks: [], // Dead-End Page (links_to is empty)
    links_to: [],
    anchorTexts: {}
  },
  {
    id: "tech-gadgets-today",
    title: "Byte & Pixel: Consumer Tech Hardware Roundups",
    url: "http://www.byte-pixel-gadgets.com/reviews",
    content: "Reviews and benchmark comparisons of flatbed scanners, ink-jet printers, 56k modems, and portable computing peripherals. Every quarter we conduct comprehensive lab evaluations to identify the best camera and scanner setups for home office enthusiasts. Don't waste money on sub-par hardware.",
    tags: ["gadgets", "hardware", "best camera", "reviews", "tech", "peripherals"],
    outboundLinks: ["camera-authority", "tech-chronicle-news"],
    links_to: ["camera-authority", "tech-chronicle-news"],
    anchorTexts: {
      "camera-authority": "the best camera buyers guide and lab scores",
      "tech-chronicle-news": "tech industry reports"
    }
  },
  {
    id: "amateur-webmaster-ring",
    title: "GeoCities Webmaster Neighborhood Ring 1997",
    url: "http://www.geocities.com/SiliconValley/Pebble/4128",
    content: "Welcome to my homepage! Under construction animated gif, midi background music, and counter widget. Check out my favorite links to learn programming in HTML and discover great reviews on the best camera for scanning pictures onto the web. Sign my guestbook before you leave!",
    tags: ["geocities", "personal", "homepage", "learn programming", "best camera", "guestbook"],
    // Note: includes a self-link to test EDGE CASE: "If a page links to itself, allow it and treat it as a normal outgoing link."
    outboundLinks: ["camera-authority", "prog-python-hub", "web-standards-org", "amateur-webmaster-ring"],
    links_to: ["camera-authority", "prog-python-hub", "web-standards-org", "amateur-webmaster-ring"],
    anchorTexts: {
      "camera-authority": "best camera site for scanning web photos",
      "prog-python-hub": "how to learn programming",
      "web-standards-org": "valid html",
      "amateur-webmaster-ring": "back to top of my page"
    }
  },

  // --- 4. NORMAL TOPICAL PAGES (Programming & CS) ---
  {
    id: "cs-algorithms-lab",
    title: "Computer Science Algorithms & Data Structures Lab",
    url: "http://www-theory.stanford.edu/algo-lab",
    content: "Research papers and interactive lecture notes exploring graph theory, sorting complexity, and dynamic programming. Students learn programming concepts through rigorous mathematical analysis of asymptotic bounds. Includes implementations of Dijkstra shortest path, PageRank Markov chains, and hash tables.",
    tags: ["algorithms", "computer science", "data structures", "graph theory", "learn programming"],
    outboundLinks: ["prog-python-hub", "stanford-tech", "unix-command-guide"],
    links_to: ["prog-python-hub", "stanford-tech", "unix-command-guide"],
    anchorTexts: {
      "prog-python-hub": "applied code in python to learn programming",
      "stanford-tech": "stanford cs faculty",
      "unix-command-guide": "unix tooling"
    }
  },
  {
    id: "unix-command-guide",
    title: "The Unix Shell & System Administrator Manual",
    url: "http://www.unix-guru-handbook.org/shell",
    content: "Comprehensive documentation covering Bourne shell scripts, sed stream editor patterns, awk pipelines, and process control. Master command-line utilities to automate recurring administration duties and file management. An indispensable reference for anyone preparing to learn programming in a POSIX environment.",
    tags: ["unix", "shell", "bash", "linux", "admin", "learn programming"],
    outboundLinks: ["prog-python-hub", "web-standards-org"],
    links_to: ["prog-python-hub", "web-standards-org"],
    anchorTexts: {
      "prog-python-hub": "learn programming scripts and software",
      "web-standards-org": "w3c internet RFCs"
    }
  },
  {
    id: "web-standards-org",
    title: "World Wide Web Consortium: HTML & Protocol Specifications",
    url: "http://www.w3-standards-consortium.org/specs",
    content: "Official technical recommendations for HyperText Markup Language 4.0, Cascading Style Sheets, and HTTP/1.1 protocols. Essential guidelines ensuring semantic interoperability and uniform rendering across diverse client browsers. Learn how valid document structure aids search spiders and accessible user agents.",
    tags: ["html", "css", "web standards", "w3c", "specifications", "internet"],
    outboundLinks: ["stanford-tech", "prog-python-hub"],
    links_to: ["stanford-tech", "prog-python-hub"],
    anchorTexts: {
      "stanford-tech": "stanford web architecture group",
      "prog-python-hub": "learn programming for web protocols"
    }
  },
  {
    id: "javascript-origins",
    title: "Brendan's Interactive Scripting Primer 1997",
    url: "http://www.netscape-scripting-docs.com/js12",
    content: "Introduction to lightweight client-side event scripting for Netscape Navigator 4.0 and compatible browsers. Discover DOM manipulation, form validation routines, and dynamic rollover graphics without server roundtrips. Great starting point for aspiring developers eager to learn programming for the web.",
    tags: ["javascript", "scripting", "web development", "netscape", "learn programming"],
    outboundLinks: ["prog-python-hub", "web-standards-org"],
    links_to: ["prog-python-hub", "web-standards-org"],
    anchorTexts: {
      "prog-python-hub": "learn programming with modern languages",
      "web-standards-org": "ecmascript standardization draft"
    }
  },
  {
    id: "hacker-news-1997",
    title: "The Silicon Valley Hacker & Programmer Forum",
    url: "http://www.valley-hackers-forum.org/threads",
    content: "Independent message boards where software engineers debate compiled versus interpreted languages, text editors, and startup ideas. Fresh university graduates frequently ask for the most practical roadmap to learn programming for software careers. Links to verified tutorials and foundational computer science texts.",
    tags: ["hackers", "forum", "software", "discussion", "learn programming"],
    outboundLinks: ["prog-python-hub", "tech-chronicle-news"],
    links_to: ["prog-python-hub", "tech-chronicle-news"],
    anchorTexts: {
      "prog-python-hub": "best curriculum to learn programming from scratch",
      "tech-chronicle-news": "valley industry reporting"
    }
  },
  {
    id: "code-camp-bulletin",
    title: "Junior Software Developer Study Circle",
    url: "http://www.developer-study-circles.org/meetup",
    content: "A cooperative peer group organizing weekend study sessions on functional programming, recursion, and relational databases. We share recommended textbooks, open courseware, and peer coding tips. If you want to learn programming with like-minded colleagues, register for our local chapter meetings.",
    tags: ["study", "learn programming", "coding", "software", "developers"],
    outboundLinks: ["prog-python-hub", "stanford-tech"],
    links_to: ["prog-python-hub", "stanford-tech"],
    anchorTexts: {
      "prog-python-hub": "trusted roadmap to learn programming",
      "stanford-tech": "stanford lecture notes"
    }
  },

  // --- 5. NORMAL TOPICAL PAGES (Nutrition & Recipes) ---
  {
    id: "mediterranean-diet-hub",
    title: "The Mediterranean Hearth: Olive Oil, Grains & Heart Health",
    url: "http://www.mediterranean-wellness-heart.org/nutrition",
    content: "Investigating the dietary traditions of Crete and southern Italy characterized by extra virgin olive oil, fresh legumes, and wild herbs. Longitudinal epidemiological studies confirm significant reductions in cardiovascular incidents. Featuring vibrant and wholesome healthy recipes prepared with seasonal vegetables and wholesome grains.",
    tags: ["mediterranean", "healthy recipes", "olive oil", "heart health", "nutrition", "diet"],
    outboundLinks: ["health-nutrition-institute", "vegetarian-kitchen-blog", "organic-farm-network"],
    links_to: ["health-nutrition-institute", "vegetarian-kitchen-blog", "organic-farm-network"],
    anchorTexts: {
      "health-nutrition-institute": "clinical healthy recipes and nutrition database",
      "vegetarian-kitchen-blog": "plant-based recipes collection",
      "organic-farm-network": "organic produce providers"
    }
  },
  {
    id: "vegetarian-kitchen-blog",
    title: "Green Table: Everyday Vegetarian Culinary Delights",
    url: "http://www.green-table-vegetarian.com/daily",
    content: "Simple home cooking celebrating crisp garden produce, roasted root vegetables, and fragrant lentil stews. Proof that nutritious meals can be deeply satisfying, budget-friendly, and simple to prepare for the whole family. Explore hundreds of wholesome healthy recipes crafted with unrefined ingredients and zero artificial additives.",
    tags: ["vegetarian", "healthy recipes", "vegetables", "cooking", "plant-based", "recipes"],
    outboundLinks: ["health-nutrition-institute", "mediterranean-diet-hub"],
    links_to: ["health-nutrition-institute", "mediterranean-diet-hub"],
    anchorTexts: {
      "health-nutrition-institute": "nutritional analysis of healthy recipes",
      "mediterranean-diet-hub": "olive oil cuisine"
    }
  },
  {
    id: "organic-farm-network",
    title: "Community Supported Agriculture & Organic Growers",
    url: "http://www.local-harvest-organic-farms.org/coop",
    content: "Connecting local sustainable farmers with urban households seeking pesticide-free heirloom produce and grass-fed dairy. Understanding soil microbiome ecology, composting cycles, and regional seasonal availability. We provide our members with weekly meal planners filled with rustic healthy recipes tailored to each harvest basket.",
    tags: ["organic", "agriculture", "healthy recipes", "farming", "food", "harvest"],
    outboundLinks: ["health-nutrition-institute", "mediterranean-diet-hub"],
    links_to: ["health-nutrition-institute", "mediterranean-diet-hub"],
    anchorTexts: {
      "health-nutrition-institute": "nutrition guide and healthy recipes",
      "mediterranean-diet-hub": "traditional diet wisdom"
    }
  },
  {
    id: "runner-fuel-nutrition",
    title: "Endurance Athlete Nutrition & Marathon Fuel",
    url: "http://www.endurance-runner-fuel.com/diet",
    content: "Optimizing glycogen replenishment, electrolyte balance, and recovery windows for distance runners and cyclists. Learn how complex carbohydrates and lean proteins prevent muscular fatigue and chronic inflammation. Includes pre-race fueling strategies and quick healthy recipes designed for sustained athletic energy.",
    tags: ["fitness", "running", "healthy recipes", "nutrition", "athletes", "energy"],
    outboundLinks: ["health-nutrition-institute", "mediterranean-diet-hub"],
    links_to: ["health-nutrition-institute", "mediterranean-diet-hub"],
    anchorTexts: {
      "health-nutrition-institute": "authoritative clinical healthy recipes and guidelines",
      "mediterranean-diet-hub": "mediterranean whole grains"
    }
  },
  {
    id: "healthy-family-meals",
    title: "Family Table: Quick Weeknight Healthy Recipes",
    url: "http://www.healthy-family-meals.com/recipes",
    content: "Busy parents sharing 30-minute balanced dinner ideas featuring sheet-pan roasted vegetables, grain bowls, and lean skillet dishes. Cut down processed sugar and excess sodium without sacrificing vibrant flavor that kids and adults love. Try our collection of tested healthy recipes for wholesome weeknight dinners.",
    tags: ["family", "healthy recipes", "quick meals", "nutrition", "dinner", "recipes"],
    outboundLinks: ["health-nutrition-institute", "vegetarian-kitchen-blog"],
    links_to: ["health-nutrition-institute", "vegetarian-kitchen-blog"],
    anchorTexts: {
      "health-nutrition-institute": "trusted healthy recipes and clinical nutrition advice",
      "vegetarian-kitchen-blog": "easy vegetable dishes"
    }
  },
  {
    id: "food-deadend-archive",
    title: "Traditional Culinary History Archive (Dead End)",
    url: "http://www.culinary-history-museum.org/deadend",
    content: "Transcribed medieval kitchen scrolls, Renaissance banquet menus, and colonial breadmaking records. Preserved purely for academic folklore studies without outgoing links to modern culinary websites. Contains historical accounts of ancient feast preparation and spice trade routes.",
    tags: ["history", "culinary", "medieval", "archive", "cooking"],
    outboundLinks: [], // Dead-End Page (links_to is empty)
    links_to: [],
    anchorTexts: {}
  },

  // --- 6. NORMAL TOPICAL PAGES (Space Exploration & Astronomy) ---
  {
    id: "mars-rover-dispatch",
    title: "Sojourner Rover & Mars Pathfinder Mission Dispatch",
    url: "http://www.pathfinder-mission-jpl.gov/sojourner",
    content: "Direct telemetry logs, rock composition spectrometry, and stereoscopic imagery from Ares Vallis on the Martian surface. Robotic exploration reveals ancient alluvial floodplains and volcanic basalt formations. A triumphant milestone in robotic space exploration expanding human knowledge of extraterrestrial geology.",
    tags: ["mars", "space exploration", "pathfinder", "rover", "nasa", "astronomy"],
    outboundLinks: ["science-space-journal", "astro-society-hub"],
    links_to: ["science-space-journal", "astro-society-hub"],
    anchorTexts: {
      "science-space-journal": "official space exploration mission summaries",
      "astro-society-hub": "planetary observation logs"
    }
  },
  {
    id: "hubble-photo-gallery",
    title: "Hubble Space Telescope Public Heritage Archive",
    url: "http://www.stsci-heritage-archive.org/gallery",
    content: "Breathtaking deep-field exposures of distant spiral galaxies, glowing emission nebulae, and stellar birth clusters. Orbiting above atmospheric distortion, Hubble provides unprecedented clarity on cosmic expansion and galactic evolution. A cornerstone of modern deep space exploration captivating both scientists and the public.",
    tags: ["hubble", "space exploration", "telescope", "galaxies", "nebula", "astronomy"],
    outboundLinks: ["science-space-journal", "astro-society-hub"],
    links_to: ["science-space-journal", "astro-society-hub"],
    anchorTexts: {
      "science-space-journal": "scientific review of space exploration data",
      "astro-society-hub": "amateur telescope sky charts"
    }
  },
  {
    id: "astro-society-hub",
    title: "International Amateur Astronomical Federation",
    url: "http://www.amateur-astronomy-union.org/skywatch",
    content: "Connecting backyard stargazers, comet hunters, and astrophotographers across six continents. Monthly celestial ephemeris tables covering lunar occultations, planetary oppositions, and meteor showers. Inspiring the next generation to follow international space exploration breakthroughs through hands-on telescope observation.",
    tags: ["astronomy", "space exploration", "stargazing", "telescope", "comets"],
    outboundLinks: ["science-space-journal", "mars-rover-dispatch"],
    links_to: ["science-space-journal", "mars-rover-dispatch"],
    anchorTexts: {
      "science-space-journal": "deep space exploration research journal",
      "mars-rover-dispatch": "mars pathfinder landing site updates"
    }
  },
  {
    id: "cosmic-voyages-book",
    title: "Voyages to the Outer Solar System: Voyager 1 & 2",
    url: "http://www.outer-planets-voyager.org/chronicles",
    content: "The thrilling saga of the twin Voyager robotic probes traversing Jupiter, Saturn, Uranus, and Neptune. Recording the magnetic fields, icy moons, and supersonic winds at the edge of the heliosphere. The definitive historical triumph of human interplanetary space exploration beyond the solar system.",
    tags: ["voyager", "space exploration", "solar system", "jupiter", "saturn", "planets"],
    outboundLinks: ["science-space-journal"],
    links_to: ["science-space-journal"],
    anchorTexts: {
      "science-space-journal": "peer-reviewed space exploration discoveries"
    }
  },
  {
    id: "planetarium-gazette",
    title: "Metropolitan Planetarium & Science Educator Gazette",
    url: "http://www.city-planetarium-news.org/shows",
    content: "Public education programs, dome projection schedules, and weekend astronomy workshops for school students. Exploring the mysteries of dark matter, extrasolar planets, and robotic expeditions across our galaxy. Supporting regional awareness of international space exploration achievements.",
    tags: ["planetarium", "education", "space exploration", "astronomy", "science"],
    outboundLinks: ["science-space-journal", "astro-society-hub"],
    links_to: ["science-space-journal", "astro-society-hub"],
    anchorTexts: {
      "science-space-journal": "deep space exploration publications",
      "astro-society-hub": "local astronomy clubs"
    }
  },
  {
    id: "space-deadend-station",
    title: "Mir Orbital Space Station Telemetry Log (Dead End)",
    url: "http://www.mir-telemetry-archive.ru/deadend",
    content: "Archived vacuum pressure logs, module docking angles, and oxygen recycling sensor outputs from the Russian Mir space station. Maintained as a historical raw data dump without external links. Documents prolonged human microgravity habitation during long-duration orbital missions.",
    tags: ["mir", "space station", "orbit", "space", "telemetry", "archive"],
    outboundLinks: [], // Dead-End Page (links_to is empty)
    links_to: [],
    anchorTexts: {}
  }
];

// Original data order mapping for stable tie-breaking
const pageOriginalIndex = {};
pages.forEach((p, idx) => {
  pageOriginalIndex[p.id] = idx;
});

// ============================================================================
// 2. GLOBAL STATE & CONFIGURATION
// ============================================================================
const state = {
  activeMode: "compare", // "1997" | "1998" | "compare"
  currentQuery: "best camera",
  dampingFactor: 0.85,
  wText: 0.55,
  wPR: 0.35,
  wAnchor: 0.10,

  // Random Surfer Simulation State
  surferScores: {},      // Stored as percentage out of 100%
  surferNormalized: {},  // Normalized from 0 to 1 for 1998 ranking formula
  surferTotalPercent: 100.0,
  surferStepsRun: 0,

  // Graph state
  nodes: [],
  links: [],
  selectedNodeId: null,
  zoom: 1.0,
  panX: 0,
  panY: 0,
  isDragging: false,
  draggedNode: null,
  lastMouseX: 0,
  lastMouseY: 0,

  // Cache
  inboundMap: {},
  pageRankResult: null,
  textScoreResult: null,
  anchorScoreResult: null
};

// ============================================================================
// 3. WHOLE-WORD MATCHING HELPERS (EDGE CASES)
// - Whole-word matching only: searching "exam" must not match "example".
// - Ignore capital letters when matching search words.
// ============================================================================

/**
 * countWholeWordMatches(text, word):
 * Strictly checks whole-word occurrences using \b boundaries and case-insensitivity.
 */
function countWholeWordMatches(text, word) {
  if (!text || !word) return 0;
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // Match word boundary at start and end
  const re = new RegExp('\\b' + escaped + '\\b', 'gi');
  const matches = text.match(re);
  return matches ? matches.length : 0;
}

/**
 * countWholePhraseMatches(text, phrase):
 * Strictly checks multi-word phrase occurrences with word boundaries on first and last word.
 */
function countWholePhraseMatches(text, phrase) {
  if (!text || !phrase) return 0;
  const words = phrase.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return 0;
  const pattern = words.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('\\s+');
  const re = new RegExp('\\b' + pattern + '\\b', 'gi');
  const matches = text.match(re);
  return matches ? matches.length : 0;
}

// ============================================================================
// 4. CORE ALGORITHM FUNCTIONS
// ============================================================================

/**
 * buildIndex():
 * Builds the graph connectivity structures, mapping every page's inbound links
 * and ensuring compatibility between links_to and outboundLinks.
 */
function buildIndex() {
  state.inboundMap = {};
  pages.forEach(p => {
    state.inboundMap[p.id] = [];
    // Ensure both links_to and outboundLinks exist
    if (!p.links_to) p.links_to = p.outboundLinks || [];
    if (!p.outboundLinks) p.outboundLinks = p.links_to || [];
  });

  pages.forEach(source => {
    const targets = source.links_to || source.outboundLinks || [];
    targets.forEach(targetId => {
      if (state.inboundMap[targetId]) {
        state.inboundMap[targetId].push(source.id);
      }
    });
  });
}

/**
 * runRandomSurfer(dampingFactor, totalSteps):
 * Simulates a random web surfer exploring the hyperlink network.
 *
 * Rules:
 * - Run only once on page load.
 * - Reused until the user clicks "Run the surfer again".
 * - If a page has no outgoing links (or links_to is empty), the surfer jumps
 *   to a random page on that move.
 * - If a page links to itself, allow it and treat it as a normal outgoing link.
 * - Make sure the surfer score of all pages adds up to approximately 100%.
 */
function runRandomSurfer(dampingFactor = 0.85, totalSteps = 50000) {
  const N = pages.length;
  if (N === 0) return;

  const visitCounts = {};
  pages.forEach(p => {
    visitCounts[p.id] = 0;
  });

  // Start at a random page
  let currentIdx = Math.floor(Math.random() * N);

  for (let step = 0; step < totalSteps; step++) {
    const curPage = pages[currentIdx];
    visitCounts[curPage.id]++;

    // Handle dead end: "If links_to is empty, treat the page as a dead end."
    const outgoing = curPage.links_to || curPage.outboundLinks || [];

    // "If a page has no outgoing links, the surfer must jump to a random page on that move."
    // Also with probability (1 - dampingFactor), random teleportation occurs.
    if (Math.random() > dampingFactor || outgoing.length === 0) {
      currentIdx = Math.floor(Math.random() * N);
    } else {
      // "If a page links to itself, allow it and treat it as a normal outgoing link."
      const chosenTargetId = outgoing[Math.floor(Math.random() * outgoing.length)];
      const targetIndex = pages.findIndex(p => p.id === chosenTargetId);
      if (targetIndex !== -1) {
        currentIdx = targetIndex;
      } else {
        currentIdx = Math.floor(Math.random() * N);
      }
    }
  }

  // Calculate percentages (sum of all pages is mathematically 100.00%)
  const percentages = {};
  let totalPercent = 0;
  pages.forEach(p => {
    const pct = (visitCounts[p.id] / totalSteps) * 100;
    percentages[p.id] = pct;
    totalPercent += pct;
  });

  // Find max percentage for 0 to 1 normalization in the composite ranking formula
  let maxPct = 0;
  pages.forEach(p => {
    if (percentages[p.id] > maxPct) maxPct = percentages[p.id];
  });

  const normalized = {};
  pages.forEach(p => {
    normalized[p.id] = maxPct > 0 ? (percentages[p.id] / maxPct) : 0;
  });

  state.surferScores = percentages;
  state.surferNormalized = normalized;
  state.surferTotalPercent = totalPercent;
  state.surferStepsRun = totalSteps;

  state.pageRankResult = {
    raw: visitCounts,
    percentages: percentages,
    normalized: normalized
  };

  return state.pageRankResult;
}

/**
 * calculatePageRank(dampingFactor):
 * Legacy / wrapper interface. Uses the active random-surfer distribution.
 */
function calculatePageRank(dampingFactor = 0.85) {
  if (!state.pageRankResult) {
    return runRandomSurfer(dampingFactor);
  }
  return state.pageRankResult;
}

/**
 * calculateTextScore(query):
 * 1997 Text Relevance Engine (TF-IDF / Keyword frequency style).
 *
 * Enforces:
 * - Whole-word matching only: searching "exam" must not match "example".
 * - Ignore capital letters when matching search words.
 * - Extra weight to: title matches, exact phrase matches, tags matches, keyword frequency in content.
 * - Normalized from 0.0 to 1.0.
 */
function calculateTextScore(query) {
  const qClean = (query || "").trim();
  if (!qClean) {
    const zeros = {};
    pages.forEach(p => zeros[p.id] = 0);
    return { raw: zeros, normalized: zeros };
  }

  // Split query into whole words (ignoring case)
  const queryTerms = qClean.toLowerCase().split(/\s+/).filter(Boolean);
  const rawScores = {};

  pages.forEach(p => {
    const titleText = p.title || "";
    const urlText = p.url || "";
    const contentText = p.content || "";
    const tagsArray = p.tags || [];

    let score = 0;

    // 1. Exact Whole-Phrase Match Bonus
    const phraseMatchesTitle = countWholePhraseMatches(titleText, qClean);
    const phraseMatchesURL = countWholePhraseMatches(urlText, qClean);
    const phraseMatchesContent = countWholePhraseMatches(contentText, qClean);

    if (phraseMatchesTitle > 0) score += 35 * phraseMatchesTitle;
    if (phraseMatchesURL > 0) score += 15 * phraseMatchesURL;
    if (phraseMatchesContent > 0) score += 14 * phraseMatchesContent;

    // 2. Individual Whole-Word Matches
    queryTerms.forEach(term => {
      // Whole-word matching in title
      const titleMatches = countWholeWordMatches(titleText, term);
      score += titleMatches * 10;

      // Whole-word matching in tags
      let tagMatches = 0;
      tagsArray.forEach(tag => {
        tagMatches += countWholeWordMatches(tag, term);
      });
      score += tagMatches * 8;

      // Whole-word matching in URL
      const urlMatches = countWholeWordMatches(urlText, term);
      score += urlMatches * 4;

      // Whole-word keyword frequency in content
      const contentMatches = countWholeWordMatches(contentText, term);
      score += contentMatches * 4;
    });

    rawScores[p.id] = score;
  });

  // Normalize from 0.0 to 1.0
  let maxScore = 0;
  pages.forEach(p => {
    if (rawScores[p.id] > maxScore) maxScore = rawScores[p.id];
  });

  const normalized = {};
  pages.forEach(p => {
    normalized[p.id] = maxScore > 0 ? (rawScores[p.id] / maxScore) : 0;
  });

  return { raw: rawScores, normalized };
}

/**
 * calculateAnchorTextScore(query):
 * Evaluates whole-word and phrase matches in clickable incoming link anchor texts.
 */
function calculateAnchorTextScore(query) {
  const qClean = (query || "").trim();
  if (!qClean) {
    const zeros = {};
    pages.forEach(p => zeros[p.id] = 0);
    return { raw: zeros, normalized: zeros };
  }

  const queryTerms = qClean.toLowerCase().split(/\s+/).filter(Boolean);
  const rawAnchorScores = {};

  pages.forEach(target => {
    let score = 0;
    const inbounds = state.inboundMap[target.id] || [];

    inbounds.forEach(srcId => {
      const srcPage = pages.find(p => p.id === srcId);
      if (srcPage && srcPage.anchorTexts && srcPage.anchorTexts[target.id]) {
        const anchor = srcPage.anchorTexts[target.id];

        // Whole-phrase match in anchor
        const phraseMatch = countWholePhraseMatches(anchor, qClean);
        if (phraseMatch > 0) {
          score += 25 * phraseMatch;
        }

        // Whole-word matches in anchor
        queryTerms.forEach(term => {
          score += countWholeWordMatches(anchor, term) * 8;
        });
      }
    });

    rawAnchorScores[target.id] = score;
  });

  let maxScore = 0;
  pages.forEach(p => {
    if (rawAnchorScores[p.id] > maxScore) maxScore = rawAnchorScores[p.id];
  });

  const normalized = {};
  pages.forEach(p => {
    normalized[p.id] = maxScore > 0 ? (rawAnchorScores[p.id] / maxScore) : 0;
  });

  return { raw: rawAnchorScores, normalized };
}

/**
 * rank1997(query):
 * Ranks corpus using 1997 text-only scoring.
 *
 * Rules:
 * - If multiple pages have the same score, keep their original data order.
 */
function rank1997(query) {
  const textScoreObj = calculateTextScore(query);
  state.textScoreResult = textScoreObj;

  // Filter candidates that match query words (raw score > 0)
  const candidates = pages.filter(p => textScoreObj.raw[p.id] > 0);

  // Stable sort: highest score first, tie-break by original data order
  candidates.sort((a, b) => {
    const scoreA = textScoreObj.normalized[a.id];
    const scoreB = textScoreObj.normalized[b.id];
    const diff = scoreB - scoreA;
    if (Math.abs(diff) > 1e-9) {
      return diff;
    }
    // "If multiple pages have the same score, keep their original data order."
    return pageOriginalIndex[a.id] - pageOriginalIndex[b.id];
  });

  return candidates.map((p, index) => ({
    page: p,
    rank1997: index + 1,
    textScore: textScoreObj.normalized[p.id],
    pageRank: state.pageRankResult.normalized[p.id] || 0,
    pageRankPercent: state.pageRankResult.percentages[p.id] || 0,
    anchorScore: 0,
    finalScore: textScoreObj.normalized[p.id],
    inboundCount: (state.inboundMap[p.id] || []).length
  }));
}

/**
 * rank1998(query):
 * Ranks corpus using 1998 composite score:
 * finalScore = (wText * textScore) + (wPR * pageRank) + (wAnchor * anchorScore)
 *
 * Rules:
 * - If multiple pages have the same score, keep their original data order.
 */
function rank1998(query) {
  const textScoreObj = calculateTextScore(query);
  const anchorScoreObj = calculateAnchorTextScore(query);
  const prObj = state.pageRankResult;

  state.textScoreResult = textScoreObj;
  state.anchorScoreResult = anchorScoreObj;

  const wText = state.wText;
  const wPR = state.wPR;
  const wAnchor = state.wAnchor;

  // A page is eligible if query words match in text OR anchor text
  const candidates = pages.filter(p => textScoreObj.raw[p.id] > 0 || anchorScoreObj.raw[p.id] > 0);

  const scoredCandidates = candidates.map(p => {
    const tScore = textScoreObj.normalized[p.id] || 0;
    const pScore = prObj.normalized[p.id] || 0;
    const pPercent = prObj.percentages[p.id] || 0;
    const aScore = anchorScoreObj.normalized[p.id] || 0;

    const finalScore = (wText * tScore) + (wPR * pScore) + (wAnchor * aScore);

    return {
      page: p,
      textScore: tScore,
      pageRank: pScore,
      pageRankPercent: pPercent,
      anchorScore: aScore,
      finalScore: finalScore,
      inboundCount: (state.inboundMap[p.id] || []).length
    };
  });

  // Stable sort: highest score first, tie-break by original data order
  scoredCandidates.sort((a, b) => {
    const diff = b.finalScore - a.finalScore;
    if (Math.abs(diff) > 1e-9) {
      return diff;
    }
    // "If multiple pages have the same score, keep their original data order."
    return pageOriginalIndex[a.page.id] - pageOriginalIndex[b.page.id];
  });

  return scoredCandidates.map((item, index) => ({
    ...item,
    rank1998: index + 1
  }));
}

// ============================================================================
// 5. RENDERING & UI CONTROLLER
// ============================================================================

/**
 * highlightKeywords(text, query):
 * Safely wraps matched whole query terms with <mark class="query-highlight">.
 * Strict whole-word matching: "exam" will not highlight inside "example".
 */
function highlightKeywords(text, query) {
  if (!text || !query) return escapeHTML(text || "");
  const qClean = query.trim();
  const terms = qClean.toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return escapeHTML(text);

  // Escaped terms
  const escapedTerms = terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

  // Strict whole-word pattern
  const pattern = new RegExp('\\b(' + escapedTerms.join('|') + ')\\b', 'gi');

  const safe = escapeHTML(text);
  return safe.replace(pattern, '<mark class="query-highlight">$1</mark>');
}

function escapeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * showToast(message):
 * Displays a non-intrusive floating status banner (no alert()).
 */
function showToast(message) {
  const toast = document.getElementById("toast-notification");
  if (!toast) return;
  toast.innerHTML = message;
  toast.classList.remove("hidden");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.classList.add("hidden");
  }, 3500);
}

/**
 * renderResultCard(item, mode, deltaInfo):
 * Generates an HTML card for a search result item.
 */
function renderResultCard(item, mode, deltaInfo = null) {
  const p = item.page;
  const isSpam = p.id.includes("spam");
  const isAuth = (state.inboundMap[p.id] || []).length >= 4;

  let cardClasses = "result-card";
  if (isSpam) cardClasses += " is-spam";
  if (isAuth) cardClasses += " is-authority";

  const rank = mode === "1997" ? item.rank1997 : item.rank1998;
  const isTopRank = rank === 1;

  let deltaHTML = "";
  if (deltaInfo) {
    if (deltaInfo.direction === "up") {
      deltaHTML = `<span class="rank-delta-badge delta-up">▲ Rose ${deltaInfo.diff} spots</span>`;
    } else if (deltaInfo.direction === "down") {
      deltaHTML = `<span class="rank-delta-badge delta-down">▼ Dropped ${deltaInfo.diff} spots</span>`;
    } else {
      deltaHTML = `<span class="rank-delta-badge delta-same">━ Same rank</span>`;
    }
  }

  const highlightedSnippet = highlightKeywords(p.content, state.currentQuery);

  return `
    <article class="${cardClasses}" data-page-id="${p.id}">
      <div class="result-card-header">
        <div style="display:flex; align-items:center; gap:8px;">
          <span class="rank-badge ${isTopRank ? 'top-rank' : ''}">#${rank}</span>
          ${deltaHTML}
        </div>
        ${isSpam ? '<span class="spam-warning-tag">⚠️ Keyword Stuffer</span>' : ''}
        ${isAuth ? '<span class="inspector-badge" style="background:#e0f2fe; color:#0369a1;">★ Authority Hub</span>' : ''}
      </div>

      <h3 class="result-title">
        <a class="result-title-link" href="#inspect-${p.id}" onclick="inspectNode('${p.id}'); return false;">
          ${escapeHTML(p.title)}
        </a>
      </h3>
      <div class="result-url">${escapeHTML(p.url)}</div>
      <p class="result-snippet">${highlightedSnippet}</p>

      <div class="result-metrics">
        <span class="metric-pill pill-final" title="Composite score used for sorting">
          Score: <strong>${item.finalScore.toFixed(3)}</strong>
        </span>
        <span class="metric-pill" title="On-page whole-word relevance">
          Text: <strong>${item.textScore.toFixed(3)}</strong>
        </span>
        ${mode !== "1997" ? `
          <span class="metric-pill" title="Random Surfer probability out of 100% total graph mass">
            Surfer: <strong>${item.pageRankPercent.toFixed(2)}%</strong>
          </span>
          <span class="metric-pill" title="Inbound anchor text match score">
            Anchor: <strong>${item.anchorScore.toFixed(3)}</strong>
          </span>
        ` : ''}
        <span class="metric-pill pill-inlinks" title="Number of incoming hyperlinks">
          Inbound: <strong>${item.inboundCount} links</strong>
        </span>
      </div>
    </article>
  `;
}

/**
 * renderResults():
 * Executes ranking for current query and updates the DOM.
 *
 * Rules:
 * - If no page matches the search word, show the friendly no-results message and do NOT display result columns.
 */
function renderResults() {
  const query = state.currentQuery;
  const container = document.getElementById("results-display-container");
  const statusEl = document.getElementById("results-status");

  const results1997 = rank1997(query).slice(0, 10);
  const results1998 = rank1998(query).slice(0, 10);

  // Check if no page matched the search word
  const hasMatches = state.activeMode === "1997" 
    ? results1997.length > 0 
    : (state.activeMode === "1998" ? results1998.length > 0 : (results1997.length > 0 || results1998.length > 0));

  if (!hasMatches) {
    statusEl.innerHTML = `
      <div>Search status for <span class="results-meta-query">"${escapeHTML(query)}"</span>: <strong>0 results found</strong></div>
      <div>Surfer Distribution: <strong>${state.surferTotalPercent.toFixed(1)}% total</strong></div>
    `;

    // "If no page matches the search word, show the friendly no-results message and do not display result columns."
    container.innerHTML = `
      <div class="empty-results">
        <div class="empty-icon">🔍</div>
        <h3>No matching pages found for "${escapeHTML(query)}"</h3>
        <p>We searched all 36 pages in the web graph using strict whole-word matching. None of the pages matched your search terms.</p>
        <p class="empty-hint">Try searching for one of our preset topics: <strong>best camera</strong>, <strong>learn programming</strong>, <strong>healthy recipes</strong>, or <strong>space exploration</strong>.</p>
      </div>
    `;

    renderDynamicInsight(null, null);
    renderGraph();
    return;
  }

  // Meta Status Bar
  statusEl.innerHTML = `
    <div>Showing Top results for query <span class="results-meta-query">"${escapeHTML(query)}"</span></div>
    <div>Mode: <strong>${state.activeMode.toUpperCase()}</strong> &bull; Surfer Total: <strong>${state.surferTotalPercent.toFixed(1)}%</strong></div>
  `;

  if (state.activeMode === "1997") {
    container.innerHTML = `
      <div class="results-list">
        ${results1997.map(item => renderResultCard(item, "1997")).join("")}
      </div>
    `;
  } else if (state.activeMode === "1998") {
    container.innerHTML = `
      <div class="results-list">
        ${results1998.map(item => renderResultCard(item, "1998")).join("")}
      </div>
    `;
  } else {
    // Compare Mode: Side-by-side
    const rank1997Map = {};
    results1997.forEach(item => {
      rank1997Map[item.page.id] = item.rank1997;
    });

    const col1997Cards = results1997.map(item => renderResultCard(item, "1997")).join("");

    const col1998Cards = results1998.map(item => {
      let deltaInfo = null;
      if (rank1997Map[item.page.id] !== undefined) {
        const r97 = rank1997Map[item.page.id];
        const r98 = item.rank1998;
        if (r98 < r97) {
          deltaInfo = { direction: "up", diff: r97 - r98 };
        } else if (r98 > r97) {
          deltaInfo = { direction: "down", diff: r98 - r97 };
        } else {
          deltaInfo = { direction: "same", diff: 0 };
        }
      } else {
        deltaInfo = { direction: "up", diff: "New" };
      }
      return renderResultCard(item, "1998", deltaInfo);
    }).join("");

    container.innerHTML = `
      <div class="compare-container">
        <div class="compare-column">
          <div class="column-header">
            <h3 class="column-title col-1997-title">📜 1997 Search Engine (Text-Only)</h3>
            <p class="column-desc">Ranks by keyword frequency &amp; title matches. Susceptible to keyword spam.</p>
          </div>
          ${col1997Cards}
        </div>

        <div class="compare-column">
          <div class="column-header">
            <h3 class="column-title col-1998-title">🚀 1998 Google (PageRank + Backlinks)</h3>
            <p class="column-desc">Ranks by text relevance + democratic link graph votes + anchor text.</p>
          </div>
          ${col1998Cards}
        </div>
      </div>
    `;
  }

  renderDynamicInsight(results1997, results1998);
  renderGraph();
}

/**
 * renderDynamicInsight(results1997, results1998):
 * Explains the algorithmic divergence for the current query.
 */
function renderDynamicInsight(results1997, results1998) {
  const insightEl = document.getElementById("dynamic-query-insight");
  if (!results1997 || !results1998 || results1997.length === 0) {
    insightEl.innerHTML = "<em>Search for a term above or click a preset query to observe the algorithmic divergence.</em>";
    return;
  }

  const top1997 = results1997[0];
  const top1998 = results1998[0];

  let commentary = "";

  if (state.currentQuery.toLowerCase().includes("camera")) {
    commentary = `
      <strong>Case Study Analysis for "best camera":</strong> In 1997 mode, the spam page <em>"${escapeHTML(top1997.page.title)}"</em> takes <strong>#1</strong> by repeating the phrase 12+ times. In 1998 Google mode, the authoritative guide <em>"${escapeHTML(top1998.page.title)}"</em> vaults to <strong>#1</strong> because it is endorsed by 9 inbound links from Stanford Tech, photography blogs, and lens testing labs! The spam page is pushed down due to near-zero link authority (${top1997.pageRankPercent.toFixed(2)}% surfer probability).
    `;
  } else if (state.currentQuery.toLowerCase().includes("programming")) {
    commentary = `
      <strong>Case Study Analysis for "learn programming":</strong> 1997 engines were duped by instant coding cheat-sheets that stuffed keywords. 1998 Google elevates the <em>The Modern Programming Codex</em> and Stanford CS directory because authoritative computer science faculty and Unix webmasters link directly to them with relevant anchor texts.
    `;
  } else if (state.currentQuery.toLowerCase().includes("recipes")) {
    commentary = `
      <strong>Case Study Analysis for "healthy recipes":</strong> Commercial diet miracle spam dominated 1997 text engines. 1998 Google promotes the <em>National Institute of Nutritional Science</em> because clinical journals, agricultural alliances, and vegetarian kitchens provide trusted backlink citations.
    `;
  } else {
    commentary = `
      <strong>Algorithm Comparison:</strong> In 1997, <em>#1 was "${escapeHTML(top1997.page.title)}"</em> (Score: ${top1997.finalScore.toFixed(3)}). In 1998, <em>#1 is "${escapeHTML(top1998.page.title)}"</em> (Score: ${top1998.finalScore.toFixed(3)}). PageRank weights inbound citations so that peer endorsements outweigh brute-force word repetition.
    `;
  }

  insightEl.innerHTML = commentary;
}

// ============================================================================
// 6. SETTINGS CONTROLLER
// ============================================================================

/**
 * updateSettings():
 * Synchronizes slider UI inputs with state.
 * Changing weights does NOT re-run the random surfer simulation (surfer scores are reused).
 * If the damping factor slider changes, the surfer is re-run with the new damping factor.
 */
function updateSettings(isDampingChange = false) {
  const dVal = parseFloat(document.getElementById("slider-damping").value);
  const tVal = parseFloat(document.getElementById("slider-text-weight").value);
  const pVal = parseFloat(document.getElementById("slider-pr-weight").value);
  const aVal = parseFloat(document.getElementById("slider-anchor-weight").value);

  const prevDamping = state.dampingFactor;
  state.dampingFactor = dVal;
  state.wText = tVal;
  state.wPR = pVal;
  state.wAnchor = aVal;

  document.getElementById("val-damping").textContent = dVal.toFixed(2);
  document.getElementById("val-text-weight").textContent = tVal.toFixed(2);
  document.getElementById("val-pr-weight").textContent = pVal.toFixed(2);
  document.getElementById("val-anchor-weight").textContent = aVal.toFixed(2);

  // Weight sum check
  const sum = (tVal + pVal + aVal).toFixed(2);
  const sumEl = document.getElementById("weight-sum-val");
  const statusEl = document.getElementById("weight-sum-status");
  sumEl.textContent = sum;

  if (Math.abs(parseFloat(sum) - 1.0) < 0.01) {
    statusEl.textContent = "✓ Balanced (1.00)";
    statusEl.className = "status-valid";
  } else {
    statusEl.textContent = "⚠️ Unbalanced";
    statusEl.className = "status-warning";
  }

  // Only re-run surfer if damping factor explicitly changed
  if (isDampingChange && Math.abs(prevDamping - dVal) > 1e-4) {
    runRandomSurfer(state.dampingFactor);
  }

  // Update node sizes on graph
  updateGraphNodeSizes();

  // Re-render search results
  renderResults();
}

function resetSettings() {
  document.getElementById("slider-damping").value = 0.85;
  document.getElementById("slider-text-weight").value = 0.55;
  document.getElementById("slider-pr-weight").value = 0.35;
  document.getElementById("slider-anchor-weight").value = 0.10;
  updateSettings(true);
  showToast("⚙️ Settings restored to default 1998 weights.");
}

// ============================================================================
// 7. INTERACTIVE NETWORK GRAPH (HTML5 CANVAS)
// ============================================================================

/**
 * initGraph():
 * Initializes node positions and links. Supports self-loops gracefully.
 */
function initGraph() {
  const canvas = document.getElementById("network-canvas");
  const width = canvas.width;
  const height = canvas.height;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) * 0.38;

  state.nodes = pages.map((p, i) => {
    const angle = (i / pages.length) * 2 * Math.PI;
    const isSpam = p.id.includes("spam");
    const isAuth = (state.inboundMap[p.id] || []).length >= 4;

    return {
      id: p.id,
      page: p,
      x: centerX + radius * Math.cos(angle) + (Math.random() - 0.5) * 40,
      y: centerY + radius * Math.sin(angle) + (Math.random() - 0.5) * 40,
      vx: 0,
      vy: 0,
      radius: 12,
      isSpam,
      isAuth
    };
  });

  state.links = [];
  pages.forEach(src => {
    const outgoing = src.links_to || src.outboundLinks || [];
    outgoing.forEach(targetId => {
      state.links.push({
        source: src.id,
        target: targetId,
        isSelf: src.id === targetId // "If a page links to itself, allow it and treat it as a normal outgoing link."
      });
    });
  });

  updateGraphNodeSizes();
  setupGraphInteraction();
}

/**
 * updateGraphNodeSizes():
 * Updates node radii proportionally based on PageRank / Surfer score.
 */
function updateGraphNodeSizes() {
  const prObj = state.pageRankResult;
  if (!prObj) return;

  state.nodes.forEach(node => {
    const normPR = prObj.normalized[node.id] || 0;
    node.radius = 10 + normPR * 16;
  });
}

/**
 * renderGraph():
 * Draws the web graph, nodes, directed arrow edges, self-loops, and highlights.
 */
function renderGraph() {
  const canvas = document.getElementById("network-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;

  // Clear background
  ctx.clearRect(0, 0, width, height);

  ctx.save();
  ctx.translate(state.panX, state.panY);
  ctx.scale(state.zoom, state.zoom);

  // Compute set of Top 10 highlighted page IDs
  const highlightedRankMap = {};
  const currentResults = state.activeMode === "1997"
    ? rank1997(state.currentQuery).slice(0, 10)
    : rank1998(state.currentQuery).slice(0, 10);

  currentResults.forEach((item, idx) => {
    highlightedRankMap[item.page.id] = idx + 1;
  });

  const nodeMap = {};
  state.nodes.forEach(n => nodeMap[n.id] = n);

  // 1. Draw directed edges & self-loops
  state.links.forEach(link => {
    const src = nodeMap[link.source];
    const dst = nodeMap[link.target];
    if (!src || !dst) return;

    const isConnectedToSelected = state.selectedNodeId === src.id || state.selectedNodeId === dst.id;

    // Handle self-links cleanly
    if (link.isSelf || src.id === dst.id) {
      ctx.beginPath();
      ctx.arc(src.x, src.y - src.radius - 8, 8, 0, 2 * Math.PI);
      ctx.strokeStyle = isConnectedToSelected ? "#1a73e8" : "rgba(203, 213, 225, 0.7)";
      ctx.lineWidth = isConnectedToSelected ? 2.5 : 1;
      ctx.stroke();
      return;
    }

    ctx.beginPath();
    ctx.moveTo(src.x, src.y);
    ctx.lineTo(dst.x, dst.y);

    if (isConnectedToSelected) {
      ctx.strokeStyle = state.selectedNodeId === src.id ? "#1a73e8" : "#34a853";
      ctx.lineWidth = 2.5;
    } else {
      ctx.strokeStyle = "rgba(203, 213, 225, 0.5)";
      ctx.lineWidth = 1;
    }
    ctx.stroke();

    drawArrowHead(ctx, src.x, src.y, dst.x, dst.y, dst.radius, isConnectedToSelected);
  });

  // 2. Draw nodes
  state.nodes.forEach(node => {
    const isSelected = state.selectedNodeId === node.id;
    const rankNum = highlightedRankMap[node.id];
    const isHighlighted = rankNum !== undefined;

    // Glowing halo for query results
    if (isHighlighted) {
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius + 6, 0, 2 * Math.PI);
      ctx.fillStyle = "rgba(251, 188, 4, 0.4)";
      ctx.fill();
      ctx.strokeStyle = "#d97706";
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Node body
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.radius, 0, 2 * Math.PI);

    if (node.isSpam) {
      ctx.fillStyle = "#ef4444"; // Red for spam
    } else if (node.isAuth) {
      ctx.fillStyle = "#2563eb"; // Bold blue for authority
    } else {
      ctx.fillStyle = "#64748b"; // Slate for normal pages
    }

    ctx.fill();

    // Border
    ctx.strokeStyle = isSelected ? "#000000" : "#ffffff";
    ctx.lineWidth = isSelected ? 3 : 2;
    ctx.stroke();

    // Rank label badge if in top 10
    if (isHighlighted) {
      ctx.fillStyle = "#1e293b";
      ctx.beginPath();
      ctx.arc(node.x + node.radius * 0.7, node.y - node.radius * 0.7, 9, 0, 2 * Math.PI);
      ctx.fillStyle = "#facc15";
      ctx.fill();
      ctx.strokeStyle = "#854d0e";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = "#000000";
      ctx.font = "bold 10px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`#${rankNum}`, node.x + node.radius * 0.7, node.y - node.radius * 0.7);
    }
  });

  ctx.restore();
}

/**
 * drawArrowHead():
 * Renders directional arrows along graph links pointing towards target.
 */
function drawArrowHead(ctx, fromX, fromY, toX, toY, targetRadius, isSelected) {
  const dx = toX - fromX;
  const dy = toY - fromY;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist < targetRadius + 5) return;

  const arrowDist = dist - (targetRadius + 3);
  const arrowX = fromX + (dx / dist) * arrowDist;
  const arrowY = fromY + (dy / dist) * arrowDist;
  const angle = Math.atan2(dy, dx);
  const arrowSize = isSelected ? 7 : 5;

  ctx.save();
  ctx.translate(arrowX, arrowY);
  ctx.rotate(angle);

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(-arrowSize, -arrowSize / 1.6);
  ctx.lineTo(-arrowSize, arrowSize / 1.6);
  ctx.closePath();

  ctx.fillStyle = isSelected ? "#1a73e8" : "rgba(148, 163, 184, 0.8)";
  ctx.fill();
  ctx.restore();
}

/**
 * setupGraphInteraction():
 * Adds mouse dragging, zoom, panning, and click inspection to the canvas.
 */
function setupGraphInteraction() {
  const canvas = document.getElementById("network-canvas");

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    renderGraph();
  }

  window.addEventListener("resize", resizeCanvas);
  setTimeout(resizeCanvas, 50);

  function getCanvasCoords(evt) {
    const rect = canvas.getBoundingClientRect();
    const rawX = evt.clientX - rect.left;
    const rawY = evt.clientY - rect.top;
    return {
      x: (rawX - state.panX) / state.zoom,
      y: (rawY - state.panY) / state.zoom
    };
  }

  function findNodeAt(x, y) {
    for (let i = state.nodes.length - 1; i >= 0; i--) {
      const n = state.nodes[i];
      const dx = n.x - x;
      const dy = n.y - y;
      if (Math.sqrt(dx * dx + dy * dy) <= n.radius + 4) {
        return n;
      }
    }
    return null;
  }

  canvas.addEventListener("mousedown", evt => {
    const coords = getCanvasCoords(evt);
    const clickedNode = findNodeAt(coords.x, coords.y);

    if (clickedNode) {
      state.isDragging = true;
      state.draggedNode = clickedNode;
      inspectNode(clickedNode.id);
    } else {
      state.isDragging = true;
      state.draggedNode = null;
      state.lastMouseX = evt.clientX;
      state.lastMouseY = evt.clientY;
    }
  });

  window.addEventListener("mousemove", evt => {
    if (!state.isDragging) return;

    if (state.draggedNode) {
      const coords = getCanvasCoords(evt);
      state.draggedNode.x = coords.x;
      state.draggedNode.y = coords.y;
      renderGraph();
    } else {
      const dx = evt.clientX - state.lastMouseX;
      const dy = evt.clientY - state.lastMouseY;
      state.panX += dx;
      state.panY += dy;
      state.lastMouseX = evt.clientX;
      state.lastMouseY = evt.clientY;
      renderGraph();
    }
  });

  window.addEventListener("mouseup", () => {
    state.isDragging = false;
    state.draggedNode = null;
  });

  canvas.addEventListener("wheel", evt => {
    evt.preventDefault();
    const zoomFactor = evt.deltaY < 0 ? 1.1 : 0.9;
    const newZoom = Math.min(Math.max(state.zoom * zoomFactor, 0.4), 2.5);
    state.zoom = newZoom;
    renderGraph();
  }, { passive: false });

  document.getElementById("btn-zoom-in").addEventListener("click", () => {
    state.zoom = Math.min(state.zoom * 1.2, 2.5);
    renderGraph();
  });

  document.getElementById("btn-zoom-out").addEventListener("click", () => {
    state.zoom = Math.max(state.zoom * 0.8, 0.4);
    renderGraph();
  });

  document.getElementById("btn-reset-graph").addEventListener("click", () => {
    state.zoom = 1.0;
    state.panX = 0;
    state.panY = 0;
    state.selectedNodeId = null;
    document.getElementById("graph-inspector").classList.add("hidden");
    initGraph();
    renderGraph();
  });
}

/**
 * inspectNode(pageId):
 * Populates the inspector card with in-depth link information and surfer percentage.
 */
function inspectNode(pageId) {
  const page = pages.find(p => p.id === pageId);
  if (!page) return;

  state.selectedNodeId = pageId;
  const inspector = document.getElementById("graph-inspector");
  inspector.classList.remove("hidden");

  const badge = document.getElementById("inspector-badge");
  const inbounds = state.inboundMap[pageId] || [];
  const outgoing = page.links_to || page.outboundLinks || [];

  if (page.id.includes("spam")) {
    badge.textContent = "Keyword Spam Page";
    badge.style.backgroundColor = "#fee2e2";
    badge.style.color = "#dc2626";
  } else if (inbounds.length >= 4) {
    badge.textContent = "Authority Page";
    badge.style.backgroundColor = "#e0f2fe";
    badge.style.color = "#0369a1";
  } else if (outgoing.length === 0) {
    badge.textContent = "Dead-End Page";
    badge.style.backgroundColor = "#f3f4f6";
    badge.style.color = "#4b5563";
  } else {
    badge.textContent = "Standard Page";
    badge.style.backgroundColor = "#f1f5f9";
    badge.style.color = "#475569";
  }

  document.getElementById("inspector-title").textContent = page.title;
  document.getElementById("inspector-url").textContent = page.url;

  const pctVal = state.pageRankResult.percentages[pageId] || 0;
  document.getElementById("inspector-pr").textContent = pctVal.toFixed(2) + "%";
  document.getElementById("inspector-inlinks").textContent = inbounds.length;
  document.getElementById("inspector-outlinks").textContent = outgoing.length;

  const listEl = document.getElementById("inspector-inbound-list");
  if (inbounds.length === 0) {
    listEl.innerHTML = `<div class="inspector-links-heading">Incoming Backlinks (0)</div><div style="font-size:11px; color:#94a3b8;">No incoming links.</div>`;
  } else {
    const itemsHTML = inbounds.map(srcId => {
      const srcPage = pages.find(p => p.id === srcId);
      const anchor = (srcPage && srcPage.anchorTexts && srcPage.anchorTexts[pageId]) || "hyperlink";
      return `
        <div class="inspector-link-item">
          From <strong>${srcPage ? escapeHTML(srcPage.title.slice(0, 24)) : srcId}...</strong><br>
          Anchor: "<span class="inspector-anchor-text">${escapeHTML(anchor)}</span>"
        </div>
      `;
    }).join("");

    listEl.innerHTML = `
      <div class="inspector-links-heading">Incoming Backlinks (${inbounds.length}):</div>
      ${itemsHTML}
    `;
  }

  renderGraph();
}

/**
 * triggerSurferRerun():
 * Executes a new random surfer simulation when the user explicitly clicks "Run the surfer again".
 */
function triggerSurferRerun() {
  runRandomSurfer(state.dampingFactor, 50000);
  updateGraphNodeSizes();
  renderResults();
  showToast(`🎲 Random surfer simulation completed (50,000 steps). Scores updated! Total sum = ${state.surferTotalPercent.toFixed(1)}%.`);
}

// ============================================================================
// 8. EVENT LISTENERS & INITIALIZATION
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  // 1. Build Index
  buildIndex();

  // 2. "Run the random-surfer simulation only once when the page loads."
  runRandomSurfer(state.dampingFactor, 50000);

  // 3. Initialize Canvas Graph
  initGraph();

  // 4. Search Form & Controls
  const searchInput = document.getElementById("search-input");
  const clearBtn = document.getElementById("btn-clear-search");

  searchInput.value = state.currentQuery;
  clearBtn.style.display = state.currentQuery ? "block" : "none";

  searchInput.addEventListener("input", () => {
    state.currentQuery = searchInput.value;
    clearBtn.style.display = searchInput.value ? "block" : "none";
    renderResults();
  });

  clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    state.currentQuery = "";
    clearBtn.style.display = "none";
    searchInput.focus();
    renderResults();
  });

  document.getElementById("search-form").addEventListener("submit", (e) => {
    e.preventDefault();
    state.currentQuery = searchInput.value;
    renderResults();
  });

  document.getElementById("btn-feeling-lucky").addEventListener("click", () => {
    searchInput.value = "best camera";
    state.currentQuery = "best camera";
    clearBtn.style.display = "block";
    renderResults();
  });

  // 5. Mode Tabs
  const modeTabs = document.querySelectorAll(".mode-tab");
  modeTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      modeTabs.forEach(t => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      state.activeMode = tab.getAttribute("data-mode");
      renderResults();
    });
  });

  // 6. Preset Buttons
  document.querySelectorAll(".preset-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const q = btn.getAttribute("data-query");
      searchInput.value = q;
      state.currentQuery = q;
      clearBtn.style.display = "block";
      renderResults();
    });
  });

  // 7. "Run the surfer again" Buttons
  const btnRunSurfer = document.getElementById("btn-run-surfer");
  if (btnRunSurfer) {
    btnRunSurfer.addEventListener("click", triggerSurferRerun);
  }
  const btnRunSurferGraph = document.getElementById("btn-run-surfer-graph");
  if (btnRunSurferGraph) {
    btnRunSurferGraph.addEventListener("click", triggerSurferRerun);
  }

  // 8. Settings Panel Toggle & Sliders
  const settingsPanel = document.getElementById("settings-panel");
  const btnToggleSettings = document.getElementById("btn-toggle-settings");
  const btnCloseSettings = document.getElementById("btn-close-settings");

  btnToggleSettings.addEventListener("click", () => {
    const isHidden = settingsPanel.classList.toggle("hidden");
    btnToggleSettings.setAttribute("aria-expanded", (!isHidden).toString());
  });

  btnCloseSettings.addEventListener("click", () => {
    settingsPanel.classList.add("hidden");
    btnToggleSettings.setAttribute("aria-expanded", "false");
  });

  document.getElementById("slider-damping").addEventListener("input", () => updateSettings(true));
  ["slider-text-weight", "slider-pr-weight", "slider-anchor-weight"].forEach(id => {
    document.getElementById(id).addEventListener("input", () => updateSettings(false));
  });

  document.getElementById("btn-reset-settings").addEventListener("click", resetSettings);

  // 9. Inspector Close Button
  document.getElementById("btn-close-inspector").addEventListener("click", () => {
    state.selectedNodeId = null;
    document.getElementById("graph-inspector").classList.add("hidden");
    renderGraph();
  });

  // 10. How It Works Modal
  const modalBackdrop = document.getElementById("modal-backdrop");
  const btnOpenModal = document.getElementById("btn-open-modal");
  const btnCloseModal = document.getElementById("btn-close-modal");
  const btnModalGotIt = document.getElementById("btn-modal-got-it");

  function openModal() {
    modalBackdrop.classList.remove("hidden");
  }

  function closeModal() {
    modalBackdrop.classList.add("hidden");
  }

  btnOpenModal.addEventListener("click", openModal);
  btnCloseModal.addEventListener("click", closeModal);
  btnModalGotIt.addEventListener("click", closeModal);

  modalBackdrop.addEventListener("click", (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modalBackdrop.classList.contains("hidden")) {
      closeModal();
    }
  });

  // 11. Initial Results Render
  renderResults();
});
