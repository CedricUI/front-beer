function priceWithTax(price_without_tax, tax_amount) {
    const priceWithTax = (price_without_tax + ((price_without_tax * tax_amount) / 100))/100;
    const roundedPrice = priceWithTax.toFixed(2);
    // console.log('priceWithTax: ' + priceWithTax + ' roundedPrice: ' + roundedPrice);
    const formattedPrice = roundedPrice.replace('.', ',');
    // console.log('formattedPrice: ' + formattedPrice + ' roundedPrice: ' + roundedPrice + ' priceWithTax: ' + priceWithTax);
    return formattedPrice;
}

export default priceWithTax;