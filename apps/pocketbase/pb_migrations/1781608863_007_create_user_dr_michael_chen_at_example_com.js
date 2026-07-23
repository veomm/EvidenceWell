/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("users");
  const record = new Record(collection);
  record.set("email", "dr.michael.chen@example.com");
  record.setPassword("SecurePass123!");
  record.set("name", "Dr. Michael Chen");
  record.set("role", "author");
  record.set("bio", "Exercise physiologist and sports medicine specialist");
  record.set("credentials", "MD, Board Certified Sports Medicine");
  record.set("expertise", "Fitness, Performance, Recovery");
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
    const record = app.findFirstRecordByData("users", "email", "dr.michael.chen@example.com");
    app.delete(record);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Auth record not found, skipping rollback");
      return;
    }
    throw e;
  }
})