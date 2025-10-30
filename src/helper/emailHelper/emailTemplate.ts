export const getVerificationEmailTemplate = (verificationUrl: string) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verify Your Email</title>
  </head>
  <body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;background-color:#f4f7fa;">
    <table role="presentation" style="width:100%;border-collapse:collapse;background-color:#f4f7fa;">
      <tr>
        <td align="center" style="padding:40px 20px;">
          <table role="presentation" style="width:100%;max-width:600px;border-collapse:collapse;background-color:#ffffff;border-radius:12px;box-shadow:0 4px 6px rgba(0,0,0,0.1);">
            <tr>
              <td style="padding:40px 40px 30px;text-align:center;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);border-radius:12px 12px 0 0;">
                <div style="width:80px;height:80px;background-color:rgba(255,255,255,0.2);border-radius:50%;display:inline-flex;align-items:center;justify-content:center;backdrop-filter:blur(10px);">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="white"/>
                  </svg>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:40px;">
                <h1 style="margin:0 0 16px;font-size:28px;font-weight:700;color:#1a1a1a;text-align:center;">Verify Your Email Address</h1>
                <p style="margin:0 0 24px;font-size:16px;line-height:1.6;color:#4a5568;text-align:center;">
                  Please confirm your email address to get started.
                </p>
                <table role="presentation" style="width:100%;margin:32px 0;">
                  <tr>
                    <td align="center">
                      <a href="${verificationUrl}" style="display:inline-block;padding:16px 48px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#ffffff;text-decoration:none;border-radius:8px;font-size:16px;font-weight:600;box-shadow:0 4px 12px rgba(102,126,234,0.4);transition:transform 0.2s;">
                        Verify Email Address
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:0 40px 40px;">
                <div style="background-color:#fff5f5;border-left:4px solid #f56565;padding:16px;border-radius:6px;">
                  <p style="margin:0;font-size:14px;color:#742a2a;line-height:1.5;">
                    <strong>⏰ Important:</strong> This verification link will expire in <strong>1 hour</strong> for security reasons.
                  </p>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:32px 40px;background-color:#f8fafc;border-radius:0 0 12px 12px;border-top:1px solid #e2e8f0;">
                <p style="margin:0;font-size:13px;color:#a0aec0;text-align:center;">
                  © 2024 Your Company. All rights reserved.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
