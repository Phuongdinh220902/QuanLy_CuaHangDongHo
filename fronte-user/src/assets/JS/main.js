function handleCallIconClick() {
    alert('Hãy liên hệ với chúng tôi qua số máy: 0999999999');
}

// Lấy số lượng từ localStorage và cập nhật số lượng trong giỏ hàng
function updateCartNumber() {
    var number = JSON.parse(localStorage.getItem('Names'));
    var cartNumberElement = document.getElementById('cart-number');
    
    if (number !== null) {
        cartNumberElement.textContent = number.length;
    } else {
        cartNumberElement.textContent = 0;
    }
}

// Xuất các hàm để có thể import ở những nơi khác
export { handleCallIconClick, updateCartNumber };