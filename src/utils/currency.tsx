export const formatPrice = (price: number, locale: string, currency: string) => {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  });
  return formatter.format(price);
};