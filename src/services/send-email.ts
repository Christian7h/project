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
    <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; box-shadow: 0 0 10px rgba(0,0,0,0.1); border-radius: 8px;">
      <div style="text-align: center; background: linear-gradient(135deg, #1e88e5 0%, #1565c0 100%); padding: 25px; border-radius: 8px 8px 0 0;">
        <h1 style="color: white; font-size: 28px; margin: 0; text-shadow: 1px 1px 2px rgba(0,0,0,0.2);">¡Gracias por tu Compra!</h1>
        <p style="color: white; font-size: 16px; margin: 10px 0; opacity: 0.9;">¡Valoramos tu preferencia!</p>
      </div>

      <div style="padding: 30px;">
        <h2 style="font-size: 24px; color: #333; margin-bottom: 20px;">Hola ${firstName},</h2>
        <p style="font-size: 16px; line-height: 1.6; color: #444;">Gracias por tu reciente orden. Aquí están los detalles de tu compra:</p>

        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin: 20px 0;">
          <div style="font-size: 16px; line-height: 1.6; color: #333;">
            <p style="margin: 10px 0;"><strong>Orden ID:</strong> ${orderId}</p>
            <p style="margin: 10px 0;"><strong>Monto:</strong> ${new Intl.NumberFormat("es-CL", {
              style: "currency",
              currency: "CLP",
              minimumFractionDigits: 0
            }).format(amount)}</p>
          </div>
        </div>

        <p style="font-size: 16px; line-height: 1.6; color: #444; margin: 20px 0;">
          Tu orden está siendo procesada y te notificaremos cuando sea despachada. Si tienes alguna pregunta o necesitas ayuda, no dudes en 
          <a href="mailto:contacto@luxurymotors.cl" style="color: #1e88e5; text-decoration: none; font-weight: 500;">contactarnos</a>.
        </p>

        <div style="text-align: center; margin: 35px 0;">
          <a href="https://www.luxurymotors.cl" 
             style="background: linear-gradient(135deg, #1e88e5 0%, #1565c0 100%); 
                    color: white; 
                    padding: 14px 28px; 
                    border-radius: 6px; 
                    text-decoration: none; 
                    font-size: 16px;
                    font-weight: 500;
                    display: inline-block;
                    transition: all 0.3s ease;">Visitar Nuestra Tienda</a>
        </div>
      </div>

      <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; border-top: 1px solid #eee;">
        <p style="font-size: 14px; color: #666; margin: 0;">&copy; ${new Date().getFullYear()} Luxury Motors. Todos los derechos reservados.</p>
      </div>
    </div>
  `;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await axios.post(
      "https://backend-luxuymotorswebpay-12684bc9e3bd.herokuapp.com/api/send-email",
      {
        to,
        subject,
        reactTemplate,
      },
      {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 10000
      }
    );

    clearTimeout(timeoutId);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Error al enviar el email: ${error.message}`);
    }
    throw error;
  }
};
