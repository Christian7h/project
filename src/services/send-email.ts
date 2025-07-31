import axios from "axios";
import { CartItem } from "../types";

export const sendEmail = async ({
  to,
  subject,
  firstName,
  orderId,
  amount,
  cartItems,
  subtotal,
  discount,
  couponCode
}: {
  to: string;
  subject: string;
  firstName: string;
  orderId: string;
  amount: number;
  cartItems: CartItem[];
  subtotal?: number;
  discount?: number;
  couponCode?: string;
}) => {
  // Calcular subtotal si no se proporciona
  const calculatedSubtotal = subtotal || 
    cartItems.reduce((total, item) => 
      total + (parseInt(item.vehicle.price) * item.quantity), 0
    );

  const appliedDiscount = discount || 0;

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0
    }).format(value);

  const reactTemplate = `
    <div style="font-family: 'Arial', sans-serif; max-width: 650px; margin: 0 auto; padding: 20px; background-color: #ffffff; box-shadow: 0 0 15px rgba(0,0,0,0.1); border-radius: 10px;">
      <div style="text-align: center; background: linear-gradient(135deg, #1e88e5 0%, #1565c0 100%); padding: 30px; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; font-size: 32px; margin: 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">¡Gracias por tu Compra!</h1>
        <p style="color: white; font-size: 18px; margin: 15px 0; opacity: 0.95;">Tu vehículo de lujo te está esperando</p>
      </div>

      <div style="padding: 35px;">
        <h2 style="font-size: 26px; color: #333; margin-bottom: 25px;">Hola ${firstName},</h2>
        <p style="font-size: 16px; line-height: 1.7; color: #444; margin-bottom: 25px;">
          ¡Felicitaciones por tu excelente elección! Tu orden ha sido confirmada exitosamente. 
          Aquí tienes el resumen completo de tu compra:
        </p>

        <!-- Información de la orden -->
        <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #1e88e5;">
          <h3 style="color: #1e88e5; font-size: 20px; margin: 0 0 15px 0;">📋 Detalles de la Orden</h3>
          <div style="font-size: 16px; line-height: 1.6; color: #333;">
            <p style="margin: 8px 0;"><strong>Orden ID:</strong> <span style="color: #1e88e5; font-family: monospace;">${orderId}</span></p>
            <p style="margin: 8px 0;"><strong>Fecha:</strong> ${new Date().toLocaleDateString('es-CL', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
          </div>
        </div>

        <!-- Resumen Financiero -->
        <div style="background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%); padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #f39c12;">
          <h3 style="color: #d68910; font-size: 20px; margin: 0 0 15px 0;">💰 Resumen Financiero</h3>
          
          <div style="background: white; padding: 20px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #eee;">
              <span style="font-size: 16px; color: #555;">Subtotal:</span>
              <span style="font-size: 16px; font-weight: 600; color: #333;">${formatCurrency(calculatedSubtotal)}</span>
            </div>
            
            ${appliedDiscount > 0 ? `
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #eee;">
                <span style="font-size: 16px; color: #555;">
                  Descuento ${couponCode ? `(${couponCode})` : ''}:
                </span>
                <span style="font-size: 16px; font-weight: 600; color: #e74c3c;">-${formatCurrency(appliedDiscount)}</span>
              </div>
            ` : ''}
            
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; margin-top: 10px;">
              <span style="font-size: 18px; font-weight: bold; color: #1e88e5;">TOTAL PAGADO:</span>
              <span style="font-size: 20px; font-weight: bold; color: #27ae60;">${formatCurrency(amount)}</span>
            </div>
          </div>
        </div>

        <!-- Productos Comprados -->
        <div style="background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%); padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #28a745;">
          <h3 style="color: #155724; font-size: 20px; margin: 0 0 15px 0;">🚗 Vehículos Adquiridos</h3>
          
          <div style="background: white; border-radius: 6px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            ${cartItems.map((item, index) => `
              <div style="padding: 20px; ${index > 0 ? 'border-top: 1px solid #eee;' : ''}">
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                  <div style="flex: 1;">
                    <h4 style="margin: 0 0 8px 0; font-size: 18px; color: #333; font-weight: 600;">${item.vehicle.name}</h4>
                    <p style="margin: 0; color: #666; font-size: 14px;">Cantidad: ${item.quantity} unidad${item.quantity > 1 ? 'es' : ''}</p>
                    <p style="margin: 4px 0 0 0; color: #666; font-size: 14px;">Precio unitario: ${formatCurrency(parseInt(item.vehicle.price))}</p>
                  </div>
                  <div style="text-align: right;">
                    <span style="font-size: 16px; font-weight: 600; color: #1e88e5;">
                      ${formatCurrency(parseInt(item.vehicle.price) * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Mensaje de seguimiento -->
        <div style="background: linear-gradient(135deg, #cce5ff 0%, #b3d9ff 100%); padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #007bff;">
          <h3 style="color: #0056b3; font-size: 20px; margin: 0 0 15px 0;">📦 Próximos Pasos</h3>
          <p style="font-size: 16px; line-height: 1.7; color: #004085; margin: 0;">
            Tu orden está siendo procesada por nuestro equipo especializado. Te notificaremos por email cuando tu vehículo esté listo para la entrega. 
            Nuestro concierge se pondrá en contacto contigo dentro de las próximas 24 horas para coordinar los detalles.
          </p>
        </div>

        <p style="font-size: 16px; line-height: 1.7; color: #444; margin: 25px 0; text-align: center;">
          Si tienes alguna pregunta o necesitas asistencia inmediata, no dudes en 
          <a href="mailto:contacto@luxurymotors.cl" style="color: #1e88e5; text-decoration: none; font-weight: 600; padding: 2px 4px; border-radius: 3px; background-color: rgba(30, 136, 229, 0.1);">contactar a nuestro equipo</a>.
        </p>

        <div style="text-align: center; margin: 40px 0;">
          <a href="https://www.luxurymotors.cl" 
             style="background: linear-gradient(135deg, #1e88e5 0%, #1565c0 100%); 
                    color: white; 
                    padding: 16px 32px; 
                    border-radius: 8px; 
                    text-decoration: none; 
                    font-size: 16px;
                    font-weight: 600;
                    display: inline-block;
                    box-shadow: 0 4px 12px rgba(30, 136, 229, 0.3);
                    transition: all 0.3s ease;">Explorar Más Vehículos</a>
        </div>
      </div>

      <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 25px; text-align: center; border-radius: 0 0 10px 10px; border-top: 1px solid #dee2e6;">
        <p style="font-size: 14px; color: #6c757d; margin: 0 0 10px 0;">&copy; ${new Date().getFullYear()} Luxury Cars - Concesionario Premium</p>
        <p style="font-size: 12px; color: #adb5bd; margin: 0;">Av. Nueva Costanera 3737, Vitacura, Santiago | +56 2 2345 6789</p>
      </div>
    </div>
  `;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    const API_URL = import.meta.env.BACKEND_URL_API || "https://backend-luxurymotors-react-nodejs-webpay.onrender.com";

    const response = await axios.post(
      `${API_URL}/api/send-email`,
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
