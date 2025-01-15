import axios from "axios";

export const sendEmail = async ({
  to,
  subject,
  firstName,
  orderId,
  amount,
}: {
  to: string;
  subject: string;
  firstName: string;
  orderId: string;
  amount: number;
}) => {
  const reactTemplate = `
    <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px; border: 1px solid #ddd;">
      <div style="text-align: center; background-color: #1e88e5; padding: 20px; border-radius: 8px 8px 0 0;">
        <h1 style="color: white; font-size: 28px; margin: 0;">Thank You for Your Purchase!</h1>
        <p style="color: white; font-size: 16px; margin: 10px 0;">We appreciate your business!</p>
      </div>

      <div style="padding: 20px;">
        <h2 style="font-size: 22px; color: #333;">Hello ${firstName},</h2>
        <p style="font-size: 16px; line-height: 1.5; color: #555;">Thank you for your recent order! Here are the details:</p>

        <ul style="font-size: 16px; line-height: 1.5; color: #333; list-style-type: none; padding: 0;">
          <li style="margin: 10px 0; font-weight: bold;">Order ID: ${orderId}</li>
          <li style="margin: 10px 0; font-weight: bold;">Amount: ${new Intl.NumberFormat("es-CL", {
            style: "currency",
            currency: "CLP",
          }).format(amount)}</li>
        </ul>

        <p style="font-size: 16px; line-height: 1.5; color: #555;">Your order is being processed, and we will notify you once it's shipped. If you have any questions or need assistance, don't hesitate to <a href="mailto:support@example.com" style="color: #1e88e5; text-decoration: none;">contact us</a>.</p>

        <div style="text-align: center; margin-top: 30px;">
          <a href="https://www.example.com" style="background-color: #1e88e5; color: white; padding: 12px 20px; border-radius: 5px; text-decoration: none; font-size: 16px;">Visit Our Website</a>
        </div>
      </div>

      <div style="background-color: #f7f7f7; padding: 10px; text-align: center; border-radius: 0 0 8px 8px;">
        <p style="font-size: 14px; color: #777;">&copy; 2025 YourCompany. All Rights Reserved.</p>
      </div>
    </div>
  `;

  return await axios.post("https://rpmlegends.netlify.app/api/send-email", {
    to,
    subject,
    reactTemplate,
  });
};
