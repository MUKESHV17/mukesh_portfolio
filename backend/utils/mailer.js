import nodemailer from 'nodemailer';

// Helper to create transport
const getTransporter = () => {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass || user.includes('your_email') || pass.includes('your_gmail_app_password')) {
    // Return null to flag that we should log instead of sending to mock development mode
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user,
      pass
    }
  });
};

// Send alert to portfolio owner (Mukesh V)
export const sendAdminAlertEmail = async ({ name, email, subject, message }) => {
  const transporter = getTransporter();
  const recipient = process.env.CONTACT_RECEIVER || 'mukesh631701@gmail.com';

  const htmlContent = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #030014; color: #ffffff; border: 1px solid #1f1f2e; border-radius: 12px; padding: 24px; box-shadow: 0 4px 20px rgba(0,245,255,0.15);">
      <h2 style="color: #00f5ff; border-bottom: 2px solid #ff007f; padding-bottom: 10px; margin-top: 0; font-family: 'Orbitron', Arial, sans-serif; letter-spacing: 1px;">
        [PORTFOLIO ALERT] New Contact Message
      </h2>
      <p style="font-size: 16px; line-height: 1.6; color: #a5a5cc;">You have received a new message from your personal portfolio website.</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0; background: #0b042c; border-radius: 8px; overflow: hidden;">
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #1f1f2e; color: #ff007f; font-weight: bold; width: 30%;">Sender Name</td>
          <td style="padding: 12px; border-bottom: 1px solid #1f1f2e; color: #ffffff;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #1f1f2e; color: #ff007f; font-weight: bold;">Sender Email</td>
          <td style="padding: 12px; border-bottom: 1px solid #1f1f2e; color: #ffffff;">
            <a href="mailto:${email}" style="color: #00f5ff; text-decoration: none;">${email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #1f1f2e; color: #ff007f; font-weight: bold;">Subject</td>
          <td style="padding: 12px; border-bottom: 1px solid #1f1f2e; color: #ffffff;">${subject}</td>
        </tr>
      </table>

      <div style="background: #08021c; border-left: 4px solid #00f5ff; padding: 16px; border-radius: 4px; margin-top: 10px;">
        <h4 style="margin: 0 0 8px 0; color: #00f5ff; text-transform: uppercase; font-size: 12px; letter-spacing: 1px;">Message Content</h4>
        <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #e2e2f0; white-space: pre-wrap;">${message}</p>
      </div>
      
      <div style="margin-top: 24px; text-align: center; border-top: 1px solid #1f1f2e; padding-top: 20px;">
        <a href="https://linkedin.com/in/mukesh-v-1027b0293" style="display: inline-block; padding: 10px 20px; background: linear-gradient(135deg, #00f5ff, #ff007f); color: #ffffff; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 14px; text-shadow: 0 1px 2px rgba(0,0,0,0.5);">
          View Admin Panel
        </a>
      </div>
    </div>
  `;

  if (!transporter) {
    console.log('--- DEVELOPMENT MODE (Email Log) ---');
    console.log(`[ALERT EMAIL] To: ${recipient}`);
    console.log(`[ALERT EMAIL] From: ${email} (${name})`);
    console.log(`[ALERT EMAIL] Subject: ${subject}`);
    console.log(`[ALERT EMAIL] Message: ${message}`);
    console.log('------------------------------------');
    return { success: true, mocked: true };
  }

  const mailOptions = {
    from: `"Portfolio Portal" <${process.env.EMAIL_USER}>`,
    to: recipient,
    subject: `[Portfolio Contact] - ${subject}`,
    html: htmlContent
  };

  return await transporter.sendMail(mailOptions);
};

// Send automatic acknowledgment receipt back to the visitor/recruiter
export const sendVisitorAckEmail = async ({ name, email, subject }) => {
  const transporter = getTransporter();

  const htmlContent = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #030014; color: #ffffff; border: 1px solid #1f1f2e; border-radius: 12px; padding: 24px; box-shadow: 0 4px 20px rgba(0,245,255,0.15);">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #00f5ff; margin: 0; font-family: 'Orbitron', Arial, sans-serif; font-size: 26px; font-weight: 800; letter-spacing: 1px;">
          MUKESH<span style="color: #ff007f;">V.</span>
        </h1>
        <p style="color: #39ff14; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin: 5px 0 0 0;">
          Full-Stack & AI/ML Developer
        </p>
      </div>

      <p style="font-size: 16px; line-height: 1.6; color: #e2e2f0;">Hi <strong>${name}</strong>,</p>
      <p style="font-size: 15px; line-height: 1.6; color: #a5a5cc;">
        Thank you for reaching out! This is an automated confirmation that I have successfully received your message regarding "<strong>${subject}</strong>".
      </p>
      
      <p style="font-size: 15px; line-height: 1.6; color: #a5a5cc;">
        I value professional connections and will review your message immediately. I will get back to you within 24-48 hours. Let's build something exceptional!
      </p>
      
      <div style="background: #0b042c; padding: 16px; border-radius: 8px; text-align: center; margin: 24px 0;">
        <h4 style="margin: 0 0 10px 0; color: #00f5ff; font-size: 14px; text-transform: uppercase;">Let's Connect in the meantime</h4>
        <div style="display: flex; justify-content: center; gap: 20px; font-size: 14px;">
          <a href="https://linkedin.com/in/mukesh-v-1027b0293" style="color: #ff007f; text-decoration: none; margin: 0 10px;">LinkedIn</a> |
          <a href="https://github.com/MUKESHV17" style="color: #ff007f; text-decoration: none; margin: 0 10px;">GitHub</a>
        </div>
      </div>
      
      <p style="font-size: 14px; color: #6e6e8e; border-top: 1px solid #1f1f2e; padding-top: 15px; margin-top: 20px; text-align: center;">
        &copy; 2026 Mukesh V. All rights reserved.<br>
        B.E. Computer Science Engineering, SKCET
      </p>
    </div>
  `;

  if (!transporter) {
    console.log('--- DEVELOPMENT MODE (Email Log) ---');
    console.log(`[VISITOR ACK] To: ${email}`);
    console.log(`[VISITOR ACK] Subject: Thank you for contacting Mukesh V!`);
    console.log('------------------------------------');
    return { success: true, mocked: true };
  }

  const mailOptions = {
    from: `"Mukesh V" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Acknowledgment: Connection Request Received!`,
    html: htmlContent
  };

  return await transporter.sendMail(mailOptions);
};
