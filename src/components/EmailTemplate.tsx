//src/components/EmailTemplate.tsx
interface EmailTemplateProps {
    firstName: string;
    orderId: string;
    amount: number;
  }
  
  export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    firstName,
    orderId,
    amount,
  }) => (
    <div style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.6" }}>
      <h1 style={{ color: "#333" }}>Thank you for your purchase, {firstName}!</h1>
      <p>Your payment has been successfully processed.</p>
      <p>
        <strong>Order ID:</strong> {orderId} <br />
        <strong>Amount Paid:</strong> {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount)}
      </p>
      <p>
        We hope you enjoy your purchase! If you have any questions, please
        contact us at <a href="mailto:support@luxurymotors.com">support@luxurymotors.com</a>.
      </p>
      <button
        style={{
          backgroundColor: "#007bff",
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "5px",
          textDecoration: "none",
          display: "inline-block",
          marginTop: "20px",
        }}
      >
        <a
          href="https://project-d61.pages.dev"
          style={{ color: "#fff", textDecoration: "none" }}
        >
          Visit Our Website
        </a>
      </button>
    </div>
  );
  