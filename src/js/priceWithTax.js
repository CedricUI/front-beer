function priceWithTax(price_without_tax, tax_amount) {
    const priceWithTax = (price_without_tax + ((price_without_tax * tax_amount) / 100))/100;
    const roundedPrice = priceWithTax.toFixed(2);
    const formattedPrice = roundedPrice.replace('.', ',');
    return formattedPrice;
}

export default priceWithTax;