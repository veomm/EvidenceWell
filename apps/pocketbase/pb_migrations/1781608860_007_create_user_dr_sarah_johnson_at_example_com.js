/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("users");
  const record = new Record(collection);
  record.set("email", "dr.sarah.johnson@example.com");
  record.setPassword("SecurePass123!");
  record.set("name", "Dr. Sarah Johnson");
  record.set("role", "admin");
  record.set("bio", "PhD in Nutritional Science with 15+ years of research experience");
  record.set("credentials", "PhD Nutritional Science, MS Biochemistry");
  record.set("expertise", "Nutrition, Metabolic Health, Longevity");
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
    const record = app.findFirstRecordByData("users", "email", "dr.sarah.johnson@example.com");
    app.delete(record);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Auth record not found, skipping rollback");
      return;
    }
    throw e;
  }
})