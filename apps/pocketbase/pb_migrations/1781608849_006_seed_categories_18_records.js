/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("categories");

  const record0 = new Record(collection);
    record0.set("name", "Nutrition & Diet");
    record0.set("slug", "nutrition-diet");
    record0.set("description", "Evidence-based nutrition science, dietary approaches, and nutritional strategies for optimal health");
    record0.set("displayOrder", 1);
  try {
    app.save(record0);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record1 = new Record(collection);
    record1.set("name", "Supplements & Ingredients");
    record1.set("slug", "supplements-ingredients");
    record1.set("description", "Research on vitamins, minerals, herbs, and other nutritional supplements");
    record1.set("displayOrder", 2);
  try {
    app.save(record1);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record2 = new Record(collection);
    record2.set("name", "Longevity & Healthy Aging");
    record2.set("slug", "longevity-healthy-aging");
    record2.set("description", "Science of aging, lifespan extension, and strategies for healthy aging");
    record2.set("displayOrder", 3);
  try {
    app.save(record2);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record3 = new Record(collection);
    record3.set("name", "Fitness & Performance");
    record3.set("slug", "fitness-performance");
    record3.set("description", "Exercise science, training methods, and athletic performance optimization");
    record3.set("displayOrder", 4);
  try {
    app.save(record3);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record4 = new Record(collection);
    record4.set("name", "Sleep & Recovery");
    record4.set("slug", "sleep-recovery");
    record4.set("description", "Sleep science, recovery techniques, and rest optimization");
    record4.set("displayOrder", 5);
  try {
    app.save(record4);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record5 = new Record(collection);
    record5.set("name", "Mental Well-being");
    record5.set("slug", "mental-wellbeing");
    record5.set("description", "Mental health, stress management, and psychological well-being");
    record5.set("displayOrder", 6);
  try {
    app.save(record5);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record6 = new Record(collection);
    record6.set("name", "Women's Health");
    record6.set("slug", "womens-health");
    record6.set("description", "Health topics specific to women's physiology and life stages");
    record6.set("displayOrder", 7);
  try {
    app.save(record6);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record7 = new Record(collection);
    record7.set("name", "Men's Health");
    record7.set("slug", "mens-health");
    record7.set("description", "Health topics specific to men's physiology and well-being");
    record7.set("displayOrder", 8);
  try {
    app.save(record7);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record8 = new Record(collection);
    record8.set("name", "Preventive Health");
    record8.set("slug", "preventive-health");
    record8.set("description", "Disease prevention and proactive health strategies");
    record8.set("displayOrder", 9);
  try {
    app.save(record8);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record9 = new Record(collection);
    record9.set("name", "Gut Health");
    record9.set("slug", "gut-health");
    record9.set("description", "Microbiome science, digestive health, and gut-brain connection");
    record9.set("displayOrder", 10);
  try {
    app.save(record9);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record10 = new Record(collection);
    record10.set("name", "Metabolic Health");
    record10.set("slug", "metabolic-health");
    record10.set("description", "Metabolism, blood sugar regulation, and metabolic disorders");
    record10.set("displayOrder", 11);
  try {
    app.save(record10);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record11 = new Record(collection);
    record11.set("name", "Everyday Science");
    record11.set("slug", "everyday-science");
    record11.set("description", "Science behind everyday health practices and common questions");
    record11.set("displayOrder", 12);
  try {
    app.save(record11);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record12 = new Record(collection);
    record12.set("name", "Myth vs Fact");
    record12.set("slug", "myth-vs-fact");
    record12.set("description", "Debunking health myths and separating fact from fiction");
    record12.set("displayOrder", 13);
  try {
    app.save(record12);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record13 = new Record(collection);
    record13.set("name", "Research Simplified");
    record13.set("slug", "research-simplified");
    record13.set("description", "Breaking down complex scientific research into understandable insights");
    record13.set("displayOrder", 14);
  try {
    app.save(record13);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record14 = new Record(collection);
    record14.set("name", "Emerging Health Technologies");
    record14.set("slug", "emerging-health-technologies");
    record14.set("description", "New technologies and innovations in health and wellness");
    record14.set("displayOrder", 15);
  try {
    app.save(record14);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record15 = new Record(collection);
    record15.set("name", "Lifestyle & Habits");
    record15.set("slug", "lifestyle-habits");
    record15.set("description", "Daily habits, lifestyle changes, and behavioral health");
    record15.set("displayOrder", 16);
  try {
    app.save(record15);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record16 = new Record(collection);
    record16.set("name", "Public Health");
    record16.set("slug", "public-health");
    record16.set("description", "Population health, epidemiology, and public health policy");
    record16.set("displayOrder", 17);
  try {
    app.save(record16);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record17 = new Record(collection);
    record17.set("name", "Future of Healthcare");
    record17.set("slug", "future-healthcare");
    record17.set("description", "Trends, innovations, and the future direction of healthcare");
    record17.set("displayOrder", 18);
  try {
    app.save(record17);
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