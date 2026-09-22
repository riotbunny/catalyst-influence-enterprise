import type { Submission } from "@/lib/submissions";

type ResendEmail = {
  from: string;
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  reply_to?: string;
};

const resendApiUrl = "https://api.resend.com/emails";

export async function sendSubmissionEmails(submission: Submission) {
  const apiKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL;
  const fromEmail = process.env.FROM_EMAIL ?? "Catalyst <onboarding@resend.dev>";

  if (!apiKey || !adminEmail) {
    console.warn("Submission email skipped: RESEND_API_KEY or ADMIN_NOTIFICATION_EMAIL is not configured.");
    return;
  }

  const adminMessage: ResendEmail = {
    from: fromEmail,
    to: adminEmail,
    subject: `New Catalyst review request - ${submission.executiveName}`,
    reply_to: submission.email,
    html: renderAdminEmail(submission),
    text: renderAdminText(submission),
  };

  const submitterMessage: ResendEmail = {
    from: fromEmail,
    to: submission.email,
    subject: "Your Catalyst review request is confirmed",
    html: renderSubmitterEmail(submission),
    text: renderSubmitterText(submission),
  };

  await sendResendEmail(adminMessage, `${submission.id}-admin`);

  if (!canSendSubmitterEmail(fromEmail, adminEmail, submission.email)) {
    console.warn("Submitter email skipped: Resend test sender cannot send to this recipient.");
    return;
  }

  await sendResendEmail(submitterMessage, `${submission.id}-submitter`);
}

async function sendResendEmail(message: ResendEmail, idempotencyKey: string) {
  const response = await fetch(resendApiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey,
    },
    body: JSON.stringify(message),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(`Resend email failed: ${response.status} ${errorText}`);
  }
}

function renderAdminEmail(submission: Submission) {
  return emailShell({
    eyebrow: "New review request",
    heading: "A new Catalyst review request was submitted.",
    intro:
      "Review the submitted details and follow up if the business appears to be a fit for a strategic acquisition review.",
    content: `
      ${field("Name", submission.executiveName)}
      ${field("Email", `<a href="mailto:${escapeHtml(submission.email)}" style="color:#1d4ed8;text-decoration:none;">${escapeHtml(submission.email)}</a>`)}
      ${field("Acquisition investment", submission.marketingCapacity)}
      ${field("Website", formatWebsiteField(submission))}
      ${field("City context", submission.city || "Homepage")}
      ${field("Source path", submission.sourcePath || "/")}
      ${field("Submitted", formatSubmissionDate(submission.createdAt))}
      ${field("Request ID", submission.id)}
    `,
  });
}

function renderSubmitterEmail(submission: Submission) {
  const firstName = submission.executiveName.split(" ")[0] || submission.executiveName;

  return emailShell({
    eyebrow: "Request confirmed",
    heading: "Your review request has been received.",
    intro: `Hi ${escapeHtml(firstName)}, thank you for reaching out to Catalyst. We received your request and will review the information submitted before recommending any next step.`,
    content: `
      <div style="margin:24px 0;padding:20px;border:1px solid #e2e8f0;background:#f8fafc;">
        <div style="font-size:13px;font-weight:700;color:#111827;letter-spacing:0.08em;text-transform:uppercase;">What happens next</div>
        <p style="margin:12px 0 0;color:#334155;font-size:15px;line-height:1.65;">We will look at the market, offer, website context, and acquisition path to determine whether there is a clear reason to discuss a potential engagement. No action is needed from you right now.</p>
      </div>
      <p style="margin:0 0 18px;color:#334155;font-size:15px;line-height:1.65;">Catalyst works selectively with established businesses where stronger customer acquisition can create measurable growth without creating operational strain. If there is a fit, we will follow up directly.</p>
      ${field("Website submitted", formatWebsiteField(submission))}
      ${field("Review request ID", submission.id)}
      <p style="margin:28px 0 0;color:#111827;font-size:15px;line-height:1.6;">Regards,<br /><strong>Catalyst Influence</strong></p>
    `,
  });
}

function renderAdminText(submission: Submission) {
  return [
    "New Catalyst review request",
    "",
    `Name: ${submission.executiveName}`,
    `Email: ${submission.email}`,
    `Acquisition investment: ${submission.marketingCapacity}`,
    `Website: ${submission.websiteUrl || "Not provided"}`,
    `City context: ${submission.city || "Homepage"}`,
    `Source path: ${submission.sourcePath || "/"}`,
    `Submitted: ${formatSubmissionDate(submission.createdAt)}`,
    `Request ID: ${submission.id}`,
  ].join("\n");
}

function renderSubmitterText(submission: Submission) {
  const firstName = submission.executiveName.split(" ")[0] || submission.executiveName;

  return [
    `Hi ${firstName},`,
    "",
    "Thank you for reaching out to Catalyst. We received your request and will review the information submitted before recommending any next step.",
    "",
    "What happens next:",
    "We will look at the market, offer, website context, and acquisition path to determine whether there is a clear reason to discuss a potential engagement. No action is needed from you right now.",
    "",
    `Website submitted: ${submission.websiteUrl || "Not provided"}`,
    `Review request ID: ${submission.id}`,
    "",
    "Regards,",
    "Catalyst Influence",
  ].join("\n");
}

function canSendSubmitterEmail(fromEmail: string, adminEmail: string, submitterEmail: string) {
  if (!fromEmail.toLowerCase().includes("onboarding@resend.dev")) {
    return true;
  }

  return adminEmail.toLowerCase() === submitterEmail.toLowerCase();
}

function emailShell({
  eyebrow,
  heading,
  intro,
  content,
}: {
  eyebrow: string;
  heading: string;
  intro: string;
  content: string;
}) {
  return `
    <div style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif;color:#111827;">
      <div style="display:none;max-height:0;overflow:hidden;color:transparent;">Catalyst has received the review request.</div>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f6f8;margin:0;padding:32px 16px;">
        <tr>
          <td align="center">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border:1px solid #e5e7eb;">
              <tr>
                <td style="padding:28px 32px 22px;border-bottom:1px solid #e5e7eb;">
                  <div style="font-size:13px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#9a6a1e;">Catalyst Influence</div>
                  <h1 style="margin:16px 0 0;font-size:26px;line-height:1.25;color:#111827;font-weight:700;">${heading}</h1>
                  <p style="margin:14px 0 0;color:#475569;font-size:15px;line-height:1.65;">${intro}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:26px 32px;">
                  <div style="font-size:12px;font-weight:700;color:#64748b;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:14px;">${escapeHtml(eyebrow)}</div>
                  ${content}
                </td>
              </tr>
              <tr>
                <td style="padding:20px 32px;border-top:1px solid #e5e7eb;background:#fafafa;">
                  <p style="margin:0;color:#64748b;font-size:12px;line-height:1.55;">This message confirms receipt of a review request submitted through the Catalyst website. It does not create an engagement or obligation.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  `;
}

function field(label: string, value: string) {
  return `
    <div style="border-top:1px solid #e5e7eb;padding:14px 0;">
      <div style="font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:0.08em;font-weight:700;">${escapeHtml(label)}</div>
      <div style="font-size:15px;color:#111827;margin-top:6px;word-break:break-word;line-height:1.55;">${value}</div>
    </div>
  `;
}

function formatWebsiteField(submission: Submission) {
  return submission.websiteUrl
    ? `<a href="${escapeHtml(submission.websiteUrl)}" style="color:#1d4ed8;text-decoration:none;">${escapeHtml(submission.websiteUrl)}</a>`
    : "Not provided";
}

function formatSubmissionDate(createdAt: string) {
  return new Date(createdAt).toLocaleString("en-US", { timeZone: "America/Chicago" });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
