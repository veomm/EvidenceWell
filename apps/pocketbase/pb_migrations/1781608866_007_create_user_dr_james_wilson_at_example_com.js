/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("users");
  const record = new Record(collection);
  record.set("email", "dr.james.wilson@example.com");
  record.setPassword("SecurePass123!");
  record.set("name", "Dr. James Wilson");
  record.set("role", "author");
  record.set("bio", "Gastroenterologist and microbiome researcher");
  record.set("credentials", "MD Gastroenterology, PhD Microbiology");
  record.set("expertise", "Gut Health, Microbiome, Digestive Health");
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
    const record = app.findFirstRecordByData("users", "email", "dr.james.wilson@example.com");
    app.delete(record);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Auth record not found, skipping rollback");
      return;
    }
    throw e;
  }
})