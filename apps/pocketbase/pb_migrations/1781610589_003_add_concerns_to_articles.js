/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const concernsCollection = app.findCollectionByNameOrId("concerns");
  const collection = app.findCollectionByNameOrId("articles");

  const existing = collection.fields.getByName("concerns");
  if (existing) {
    if (existing.type === "relation") {
      return; // field already exists with correct type, skip
    }
    collection.fields.removeByName("concerns"); // exists with wrong type, remove first
  }

  collection.fields.add(new RelationField({
    name: "concerns",
    required: false,
    collectionId: concernsCollection.id,
    maxSelect: 5
  }));

  return app.save(collection);
}, (app) => {
  try {
    const collection = app.findCollectionByNameOrId("articles");
    collection.fields.removeByName("concerns");
    return app.save(collection);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Collection not found, skipping revert");
      return;
    }
    throw e;
  }
})