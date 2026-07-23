/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("concerns");
  collection.indexes.push("CREATE UNIQUE INDEX idx_concerns_name ON concerns (name)");
  collection.indexes.push("CREATE UNIQUE INDEX idx_concerns_slug ON concerns (slug)");
  return app.save(collection);
}, (app) => {
  try {
  const collection = app.findCollectionByNameOrId("concerns");
  collection.indexes = collection.indexes.filter(idx => !idx.includes("idx_concerns_name"));
  collection.indexes = collection.indexes.filter(idx => !idx.includes("idx_concerns_slug"));
  return app.save(collection);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Collection not found, skipping revert");
      return;
    }
    throw e;
  }
})