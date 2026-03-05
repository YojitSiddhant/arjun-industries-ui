export function toPhoneHref(phone: string): string {
  const normalized = phone.replace(/[^\d+]/g, "");
  return normalized ? `tel:${normalized}` : "tel:";
}

export function toWhatsAppHref(phone: string): string {
  const digits = phone.replace(/[^\d]/g, "");
  return digits ? `https://wa.me/${digits}` : "https://wa.me/";
}
