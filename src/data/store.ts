// Central store contact — Quick Bikes is the seller for every listing.
export const STORE = {
  name: "Quick Bikes",
  phone: "919999999999", // WhatsApp (digits only, with country code)
  email: "support@quickbikes.com",
  address: "Quick Bikes Showroom, Mumbai, India",
  hours: "Mon – Sat, 10am – 7pm",
};

export const buildBuyMessage = (bikeName: string) =>
  `Hi Quick Bikes, I'm interested in buying the ${bikeName} listed on your website. Please share more details and arrange a viewing.`;

export const buildSellMessage = () =>
  `Hi Quick Bikes, I'd like to sell my bike. Please share the next steps for inspection and quote.`;

export const whatsappLink = (message: string) =>
  `https://wa.me/${STORE.phone}?text=${encodeURIComponent(message)}`;
