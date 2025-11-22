export function getCart() {
    const items = localStorage.getItem('cart');

    return JSON.parse(items);
};

export function addToCart(item) {
    let items = getCart();

    if (!items) items = [];

    let element = items.find((el) => el.id === item.id);
    const index = items.indexOf(element);

    if (element) {
        console.log('element', element.quantity);
        const newElement = {
            ...element,
            quantity: element.quantity + 1,
        };
        
        items.splice(index, 1, newElement);
    } else {
        const itemWithQuantity = {
            ...item,
            quantity: 1,
        };
        items.push(itemWithQuantity);
    };

    localStorage.setItem('cart', JSON.stringify(items));
};