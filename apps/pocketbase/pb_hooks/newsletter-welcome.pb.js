/// <reference path="../pb_data/types.d.ts" />
onRecordAfterCreateSuccess((e) => {
  const message = new MailerMessage({
    from: {
      address: $app.settings().meta.senderAddress,
      name: $app.settings().meta.senderName
    },
    to: [{ address: e.record.get("email") }],
    subject: "Welcome to EvidenceWell by RealDose Labs",
    html: "<h1>Welcome to EvidenceWell!</h1><p>Thank you for subscribing to our newsletter. We're excited to share evidence-based health insights with you.</p><p>You'll receive curated articles, research summaries, and health tips delivered to your inbox.</p><p>Best regards,<br>The EvidenceWell Team at RealDose Labs</p>"
  });
  $app.newMailClient().send(message);
  e.next();
}, "email_signups");