/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const articlesCollection = app.findCollectionByNameOrId("articles");
  const collection = app.findCollectionByNameOrId("articles");

  const existing = collection.fields.getByName("relatedArticles");
  if (existing) {
    if (existing.type === "relation") {
      return; // field already exists with correct type, skip
    }
    collection.fields.removeByName("relatedArticles"); // exists with wrong type, remove first
  }

  collection.fields.add(new RelationField({
    name: "relatedArticles",
    collectionId: articlesCollection.id,
    maxSelect: 5
  }));

  return app.save(collection);
}, (app) => {
  try {
    const collection = app.findCollectionByNameOrId("articles");
    collection.fields.removeByName("relatedArticles");
    return app.save(collection);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Collection not found, skipping revert");
      return;
    }
    throw e;
  }
})