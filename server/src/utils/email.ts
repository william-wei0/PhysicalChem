import { Resend } from "resend";

const getResend = () => new Resend(process.env.RESEND_API_KEY);
const getResendFromEmail = () => process.env.RESEND_FROM_EMAIL

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resend = getResend();
  const resetUrl = `${process.env.SITE_URL}/reset-password?token=${token}`;

  const from = getResendFromEmail() || "Acme <onboarding@resend.dev>";
  
  const { error } = await resend.emails.send({
    from,
    to: [email],
    subject: "Password Reset Request",
    html: `
      <p>You requested a password reset.</p>
      <p>Click the link below to reset your password. This link expires in 15 minutes.</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>If you did not request this, ignore this email.</p>
    `,
  });

  if (error) {
    throw new Error(`Failed to send reset email: ${error.message}`);
  }
};