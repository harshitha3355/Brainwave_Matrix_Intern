let cart = JSON.parse(localStorage.getItem('cart')) || [];
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                const product = e.target.closest('.product');
                const id = product.dataset.id;
                const name = product.dataset.name;
                const price = parseFloat(product.dataset.price);
                const existing = cart.find(item => item.id === id);

                if (existing) {
                    existing.qty++;
                } else {
                    cart.push({ id, name, price, qty: 1 });
                }
                updateCart();
                saveCart();
            });
        });
        function updateCart() {
            const cartItems = document.getElementById('cart-items');
            cartItems.innerHTML = '';
            let total = 0;
            cart.forEach((item, index) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    ${item.name} x${item.qty} - $${item.price * item.qty}
                    <button onclick="removeFromCart(${index})">Remove❌</button>
                `;
                cartItems.appendChild(li);
                total += item.price * item.qty;
            });
            document.getElementById('cart-total').textContent = total.toFixed(2);
        }
        function removeFromCart(index) {
            cart.splice(index, 1);
            updateCart();
            saveCart();
        }
        function saveCart() {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        document.getElementById('checkout-btn').addEventListener('click', () => {
            document.getElementById('cart-section').style.display = 'none';
            document.getElementById('checkout-page').style.display = 'block';
        });
        document.getElementById('checkout-form').addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Order placed successfully!');
            cart = [];
            updateCart();
            saveCart();
            document.getElementById('cart-section').style.display = 'block';
            document.getElementById('checkout-page').style.display = 'none';
        });
        document.getElementById('search-bar').addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            document.querySelectorAll('.product').forEach(product => {
                const name = product.dataset.name.toLowerCase();
                if (name.includes(searchTerm)) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        });
        updateCart();

        document.addEventListener("DOMContentLoaded", function () {
            const slides = document.querySelectorAll(".slide");
            const prevButton = document.getElementById("prev");
            const nextButton = document.getElementById("next");
            let currentIndex = 0;
        
            function showSlide(index) {
                slides.forEach((slide, i) => {
                    slide.classList.toggle("active", i === index);
                });
            }
        
            prevButton.addEventListener("click", function () {
                currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
                showSlide(currentIndex);
            });
        
            nextButton.addEventListener("click", function () {
                currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
                showSlide(currentIndex);
            });
        
            showSlide(currentIndex);
        });
        