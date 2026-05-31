// Central store contact — Sree Sai Vijaya Durga Auto Finance is the seller for every listing.
export const STORE = {
  name: "Sree Sai Vijaya Durga Auto Finance",
  phone: "918297666555", // WhatsApp (digits only, with country code)
  email: "svdaf2015@gmail.com",
  address: "Sree Sai Vijaya Durga Auto Finance, Bhimavaram, India",
  hours: "Mon - Sat, 9am - 8pm (Sunday Holiday)",
};

export const buildBuyMessage = (bikeName: string) =>
  `Hi Sree Sai Vijaya Durga Auto Finance, I'm interested in buying the ${bikeName} listed on your website. Please share more details and arrange a viewing.`;

export const buildSellMessage = () =>
  `Hi Sree Sai Vijaya Durga Auto Finance, I'd like to sell my bike. Please share the next steps for inspection and quote.`;

export const whatsappLink = (message: string) =>
  `https://wa.me/${STORE.phone}?text=${encodeURIComponent(message)}`;
