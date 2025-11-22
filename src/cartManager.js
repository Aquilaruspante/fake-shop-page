export function getCart() {
    const items = localStorage.getItem('cart');

    return JSON.parse(items);
};

export function addToCart(item) {
    let items = getCart();

    if (!items) {
        items = [];
    };

    items.push(item);
    localStorage.setItem('cart', JSON.stringify(items));
};