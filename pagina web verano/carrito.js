let cart = [];
let total = 0;

function addToCart(title, price) {
    const existingProduct = cart.find(item => item.title === title);
    
    if (existingProduct) {
        existingProduct.quantity += 1;
        updateCart();
    } else {
        cart.push({ title, price, quantity: 1 });
        updateCart();
    }
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    cartItems.innerHTML = '';
    total = 0;

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.classList.add('cart-item');
        li.innerHTML = `
            ${item.title} - $${item.price.toFixed(2)} x ${item.quantity} 
            <button class="btn btn-light" onclick="changeQuantity(${index}, -1)">-</button>
            <button class="btn btn-light" onclick="changeQuantity(${index}, 1)">+</button>
            <button class="btn btn-danger" onclick="removeFromCart(${index})">Eliminar</button>
        `;
        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = total.toFixed(2);
}

function changeQuantity(index, delta) {
    cart[index].quantity += delta;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function pagar() {
    let message = 'Hola, me gustaria ordenar los siguientes platillos:\n\n';
    
    cart.forEach(item => {
        message += `${item.title} - $${item.price.toFixed(2)} x ${item.quantity}\n`;
    });
    
    message += `\nTotal: $${total.toFixed(2)}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
}
