export function formatPrice(price: number, currency: 'UZS' | 'USD' = 'UZS', isFree?: boolean): string {
  if (isFree || price === 0) {
    return 'Tekinga (Asrab olish)';
  }
  
  if (currency === 'USD') {
    return `$${price.toLocaleString('en-US')}`;
  }
  
  // Format as Uzbek So'm: e.g. 1 800 000 so'm
  return `${price.toLocaleString('uz-UZ').replace(/,/g, ' ')} so'm`;
}

export function formatPhoneNumber(phone: string): string {
  return phone;
}
