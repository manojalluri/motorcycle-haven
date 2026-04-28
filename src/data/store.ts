// Central store contact — Sree Sai Vijaya Durga Auto Finance is the seller for every listing.
export const STORE = {
  name: "Sree Sai Vijaya Durga Auto Finance",
  phone: "919999999999", // WhatsApp (digits only, with country code)
  email: "support@sreesaivijayadurga.com",
  address: "Sree Sai Vijaya Durga Auto Finance, Bhimavaram, India",
  hours: "Mon – Sat, 10am – 7pm",
};

export const buildBuyMessage = (bikeName: string) =>
  `Hi Sree Sai Vijaya Durga Auto Finance, I'm interested in buying the ${bikeName} listed on your website. Please share more details and arrange a viewing.`;

export const buildSellMessage = () =>
  `Hi Sree Sai Vijaya Durga Auto Finance, I'd like to sell my bike. Please share the next steps for inspection and quote.`;

export const whatsappLink = (message: string) =>
  `https://wa.me/${STORE.phone}?text=${encodeURIComponent(message)}`;
