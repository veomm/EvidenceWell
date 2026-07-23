/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("users");
  const record = new Record(collection);
  record.set("email", "dr.emily.rodriguez@example.com");
  record.setPassword("SecurePass123!");
  record.set("name", "Dr. Emily Rodriguez");
  record.set("role", "reviewer");
  record.set("bio", "Clinical psychologist specializing in behavioral health");
  record.set("credentials", "PhD Clinical Psychology, Licensed Psychologist");
  record.set("expertise", "Mental Health, Behavioral Science, Wellness");
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
    const record = app.findFirstRecordByData("users", "email", "dr.emily.rodriguez@example.com");
    app.delete(record);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Auth record not found, skipping rollback");
      return;
    }
    throw e;
  }
})