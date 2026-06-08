import { BrevoClient } from "@getbrevo/brevo";
import { env, brevoEnabled } from "./env";

/**
 * Transactional email via Brevo (@getbrevo/brevo v5 client API).
 *
 * If BREVO_API_KEY is not set the message is logged to the console instead of
 * sent, so local development and CI work without credentials.
 */

let client: BrevoClient | null = null;

function getClient(): BrevoClient {
  if (!client) {
    client = new BrevoClient({ apiKey: env.BREVO_API_KEY as string });
  }
  return client;
}

interface SendEmailArgs {
  to: string;
  toName?: string;
  subject: string;
  html: string;
}

export async function sendEmail({
  to,
  toName,
  subject,
  html,
}: SendEmailArgs): Promise<void> {
  if (!brevoEnabled) {
    console.log(
      `📧 [email:dev] To: ${to} | Subject: ${subject}\n${stripHtml(html)}`,
    );
    return;
  }

  try {
    await getClient().transactionalEmails.sendTransacEmail({
      subject,
      htmlContent: wrapHtml(html),
      sender: {
        email: env.BREVO_SENDER_EMAIL,
        name: env.BREVO_SENDER_NAME,
      },
      to: [{ email: to, name: toName }],
    });
  } catch (err) {
    // Never let an email failure break the request flow.
    console.error(`Failed to send email to ${to}:`, err);
  }
}

/* ----------------------- Pipeline email templates ----------------------- */

export async function sendWelcomeEmail(to: string, name?: string) {
  await sendEmail({
    to,
    toName: name,
    subject: "Welcome to Créatifia 🌱",
    html: `
      <h1>Welcome${name ? `, ${name}` : ""}!</h1>
      <p>Thanks for starting your project with Créatifia. Here's what happens next:</p>
      <ol>
        <li><strong>Complete your brief</strong> — tell us about your business (you can save and come back anytime).</li>
        <li><strong>Book a discovery call</strong> — a quick Zoom to align on your vision.</li>
        <li><strong>Start your subscription</strong> — $299/month, and we begin building.</li>
      </ol>
      <p><a href="${env.APP_URL}/dashboard">Go to your dashboard →</a></p>
    `,
  });
}

export async function sendBriefReminderEmail(to: string, name?: string) {
  await sendEmail({
    to,
    toName: name,
    subject: "Your Créatifia brief is waiting",
    html: `
      <p>Hi${name ? ` ${name}` : ""},</p>
      <p>You started your project brief but haven't finished yet. Your progress is saved — pick up right where you left off.</p>
      <p><a href="${env.APP_URL}/dashboard/brief">Continue your brief →</a></p>
    `,
  });
}

export async function sendCallConfirmationEmail(
  to: string,
  scheduledAt: Date,
  meetingLink: string | null | undefined,
  name?: string,
) {
  await sendEmail({
    to,
    toName: name,
    subject: "Your discovery call is booked 📅",
    html: `
      <p>Hi${name ? ` ${name}` : ""},</p>
      <p>Your discovery call is confirmed for <strong>${scheduledAt.toUTCString()}</strong>.</p>
      ${meetingLink ? `<p>Join here: <a href="${meetingLink}">${meetingLink}</a></p>` : ""}
      <p>Talk soon!</p>
    `,
  });
}

export async function sendPaymentReceiptEmail(
  to: string,
  amountCents: number,
  name?: string,
) {
  await sendEmail({
    to,
    toName: name,
    subject: "Payment received — let's build! 🚀",
    html: `
      <p>Hi${name ? ` ${name}` : ""},</p>
      <p>We've received your payment of <strong>$${(amountCents / 100).toFixed(2)}</strong>. Your subscription is now active and our team is starting on your website.</p>
      <p>You'll see your first draft within 5 business days.</p>
      <p><a href="${env.APP_URL}/dashboard">View your dashboard →</a></p>
    `,
  });
}

export async function sendAdminNotification(subject: string, body: string) {
  if (!env.ADMIN_NOTIFY_EMAIL) return;
  await sendEmail({
    to: env.ADMIN_NOTIFY_EMAIL,
    subject: `[Créatifia CRM] ${subject}`,
    html: body,
  });
}

/* ------------------------------ helpers ------------------------------ */

function wrapHtml(inner: string): string {
  return `<!doctype html><html><body style="font-family:Inter,Arial,sans-serif;line-height:1.6;color:#1a1a1a;max-width:560px;margin:0 auto;padding:24px;">${inner}<hr style="border:none;border-top:1px solid #eee;margin:32px 0 16px;"/><p style="font-size:12px;color:#999;">Créatifia — Premium websites, one subscription.</p></body></html>`;
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
