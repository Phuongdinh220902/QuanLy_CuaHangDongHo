var cartNumber = document.getElementById('cart-number');
// modifyCart.js
export function addCart(name, price, image) {
    var DottedPrice = Number(price).toLocaleString("vi");
    // Mỗi khi bấm thêm món ăn vào giỏ hàng sẽ có thông báo
    alert('Bạn vừa thêm ' + name + ' giá: ' + DottedPrice + ' vnd vào giỏ hàng!')
    // khi giỏ hàng rỗng
    var ItemNameIncart = JSON.parse(localStorage.getItem('Names'));
    if (ItemNameIncart == null) {
        let AddItem = { 'name': name, 'price': price, 'quantity': 1, 'image': image };
        var arr = [AddItem.name];
        localStorage.setItem('Names', JSON.stringify(arr));
        localStorage.setItem(name, JSON.stringify(AddItem));
        cartNumber.textContent = JSON.parse(localStorage.getItem('Names')).length;
        return;
    } else {
        for (let i = 0; i < ItemNameIncart.length; i++) {
            if (ItemNameIncart[i] != null) {
                let item = JSON.parse(localStorage.getItem(ItemNameIncart[i]));

                if (item.name == name) {
                    // đã tồn tại thì cập nhật quantity+=1
                    var quantity = item.quantity;
                    quantity++;
                    let AddItem = { 'name': name, 'price': price, 'quantity': quantity, 'image': image };
                    localStorage.setItem(item.name, JSON.stringify(AddItem));
                    return;
                }
            }
        }
        // chưa tồn tại thì thêm mới
        let AddItem1 = { 'name': name, 'price': price, 'quantity': 1, 'image': image };
        localStorage.setItem(name, JSON.stringify(AddItem1));
        ItemNameIncart.push(name);
        localStorage.setItem('Names', JSON.stringify(ItemNameIncart));
        cartNumber.textContent = JSON.parse(localStorage.getItem('Names')).length;
        return;
    }
}

export function congItem(itemName) {
    var item = JSON.parse(localStorage.getItem(itemName));
    item.quantity++;
    localStorage.setItem(itemName, JSON.stringify(item));
    location.reload();
}

export function truItem(itemName) {
    var item = JSON.parse(localStorage.getItem(itemName));
    if (item.quantity > 0) {
        item.quantity--;
        localStorage.setItem(itemName, JSON.stringify(item));
        location.reload();
    }
}

// xóa key có tên món đó và xóa tên món đó khỏi key Names
export function xoaItem(itemName) {
    localStorage.removeItem(itemName);
    var itemList1 = JSON.parse(localStorage.getItem('Names'));
    console.log(itemList1);
    itemList1.splice(itemList1.indexOf(itemName), 1);
    localStorage.setItem('Names', JSON.stringify(itemList1));
    cartNumber.textContent = JSON.parse(localStorage.getItem('Names')).length;
    setTimeout(location.reload(), 2000);
}

