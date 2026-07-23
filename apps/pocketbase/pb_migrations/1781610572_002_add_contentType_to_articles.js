/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("articles");

  const existing = collection.fields.getByName("contentType");
  if (existing) {
    if (existing.type === "select") {
      return; // field already exists with correct type, skip
    }
    collection.fields.removeByName("contentType"); // exists with wrong type, remove first
  }

  collection.fields.add(new SelectField({
    name: "contentType",
    required: false,
    values: ["Research Simplified", "Myth vs Fact", "5-Minute Evidence Review", "General Article"]
  }));

  return app.save(collection);
}, (app) => {
  try {
    const collection = app.findCollectionByNameOrId("articles");
    collection.fields.removeByName("contentType");
    return app.save(collection);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Collection not found, skipping revert");
      return;
    }
    throw e;
  }
})