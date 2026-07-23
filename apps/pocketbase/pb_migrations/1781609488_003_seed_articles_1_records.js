/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("articles");

  const record0 = new Record(collection);
    record0.set("title", "Hydration Science: Beyond the 8-Glass Rule");
    record0.set("slug", "hydration-science-beyond-8-glasses");
    record0.set("content", "Water is essential for life, comprising approximately 60% of adult body weight and participating in virtually every physiological process. Despite water's fundamental importance, hydration science remains poorly understood by the general public, leading to myths like the \"8 glasses a day\" rule. This comprehensive review examines the science of hydration, individual fluid needs, and the effects of dehydration on health and performance.\n\nWater serves multiple critical functions in the body. It acts as a solvent for nutrients and metabolic waste, facilitates nutrient transport, regulates body temperature through perspiration, lubricates joints, and maintains cellular structure. Adequate hydration is essential for cognitive function, physical performance, and metabolic health.\n\nFluid needs vary considerably based on individual factors including body size, activity level, climate, and health status. The popular \"8 glasses a day\" recommendation lacks scientific basis and oversimplifies hydration needs. A more evidence-based approach considers individual factors and uses thirst and urine color as hydration indicators. Pale yellow urine generally indicates adequate hydration, while dark yellow suggests dehydration.\n\nDehydration impairs cognitive function, reducing attention, working memory, and decision-making abilities. Studies show that even mild dehydration (1-2% body weight loss) impairs cognitive performance. Physical performance is similarly affected, with dehydration reducing endurance capacity, strength, and power output. Athletes performing in hot environments face particular dehydration risk.\n\nChronic mild dehydration may contribute to various health problems. Some research suggests associations between inadequate hydration and increased kidney stone risk, urinary tract infections, and constipation. However, establishing causality is challenging, as these conditions have multiple contributing factors.\n\nElectrolyte balance is crucial for hydration. Sodium, potassium, and other electrolytes regulate fluid distribution between intracellular and extracellular compartments. Excessive water intake without electrolyte replacement can lead to hyponatremia (low blood sodium), a serious condition. This is particularly relevant for endurance athletes engaging in prolonged exercise.\n\nBeverage choice affects hydration and health. Water is the optimal hydration source, containing no calories or additives. Caffeinated beverages (coffee, tea) have mild diuretic effects but still contribute to hydration. Sugar-sweetened beverages provide hydration but excess calories and metabolic effects. Alcohol has diuretic properties and impairs hydration.\n\nIndividual hydration needs can be estimated using the formula: body weight (kg) \u00d7 35 mL/day for sedentary individuals, with adjustments for activity level and climate. However, thirst remains a reliable indicator for most healthy individuals in temperate climates. Older adults and those with certain medical conditions may have impaired thirst sensation and require more deliberate hydration strategies.\n\nOptimal hydration supports cognitive function, physical performance, and metabolic health. Rather than following arbitrary rules, individuals should assess their hydration status through thirst and urine color, adjusting fluid intake based on activity level and environmental conditions.");
    record0.set("excerpt", "Explore the science of hydration, individual fluid needs, and how proper hydration supports cognitive and physical performance.");
    const record0_categoryLookup = app.findFirstRecordByFilter("categories", "slug='nutrition-diet'");
    if (!record0_categoryLookup) { throw new Error("Lookup failed for category: no record in 'categories' matching \"slug='nutrition-diet'\""); }
    record0.set("category", record0_categoryLookup.id);
    const record0_authorLookup = app.findFirstRecordByFilter("users", "email='admin@evidencewell.com'");
    if (!record0_authorLookup) { throw new Error("Lookup failed for author: no record in 'users' matching \"email='admin@evidencewell.com'\""); }
    record0.set("author", record0_authorLookup.id);
    record0.set("status", "published");
    record0.set("publishedDate", "2024-03-01");
    record0.set("lastReviewedDate", "2024-03-01");
    record0.set("readingTime", 8);
    record0.set("seoTitle", "Hydration Science: Beyond the 8-Glass Rule");
    record0.set("seoDescription", "Evidence-based guide to hydration needs, dehydration effects on cognition and performance, and optimal fluid intake strategies.");
    record0.set("references", [{"title": "Hydration and Cognitive Performance", "authors": ["Edmonds CJ", "Jeffes B"], "year": 2009}, {"title": "Fluid Intake and Health", "authors": ["Popkin BM", "D'Anci KE", "Rosenberg IH"], "year": 2010}]);
    record0.set("views", 750);
    record0.set("shares", 42);
    record0.set("relatedArticles", []);
  try {
    app.save(record0);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }
}, (app) => {
  // Rollback: record IDs not known, manual cleanup needed
})