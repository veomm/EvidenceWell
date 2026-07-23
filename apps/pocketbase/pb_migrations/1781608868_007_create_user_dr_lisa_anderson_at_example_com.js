/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("users");
  const record = new Record(collection);
  record.set("email", "dr.lisa.anderson@example.com");
  record.setPassword("SecurePass123!");
  record.set("name", "Dr. Lisa Anderson");
  record.set("role", "author");
  record.set("bio", "Sleep medicine specialist and neuroscientist");
  record.set("credentials", "MD Sleep Medicine, PhD Neuroscience");
  record.set("expertise", "Sleep Science, Recovery, Circadian Rhythms");
  record.set("isActive", true);
  try {
    return app.save(record);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
      return;
    }
    throw e;
  }
}, (app) => {
  try {
    const record = app.findFirstRecordByData("users", "email", "dr.lisa.anderson@example.com");
    app.delete(record);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Auth record not found, skipping rollback");
      return;
    }
    throw e;
  }
})