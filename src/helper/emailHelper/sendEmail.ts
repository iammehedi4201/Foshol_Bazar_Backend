import { ENV } from "@/config";
import transporter from "@/config/emailConfig";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = async (options: EmailOptions) => {
  await transporter.sendMail({
    from: `"Foshol Bazar" <${ENV.EMAIL_USER}>`,
    to: options.to,
    subject: options.subject,
    html: options.html,
  });
};
