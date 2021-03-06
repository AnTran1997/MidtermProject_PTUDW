// cart => [
// 	{
// 		product: {},
// 		quantity: 2,
//		amount: 999
// 	},
// ]

exports.getNumberOfItems = cart => {
    if (!cart) {
        return -1;
    }

    var n = 0;
    for (var i = cart.length - 1; i >= 0; i--) {
        n += cart[i].quantity;
    }

    return n;
}


exports.sumPrice = cart => {
    if (!cart) {
        return -1;
    }

    var n = 0;
    for (var i = cart.length - 1; i >= 0; i--) {
        n += cart[i].price;
    }

    return n;
}


exports.add = (cart, item) => {
    for (var i = cart.length - 1; i >= 0; i--) {
        if (cart[i].product.productID === item.product.productID) {
            cart[i].quantity += item.quantity;
            if(!cart[i].quantity){
                cart.splice(i, 1);
            }
            else{
                cart[i].price = parseInt(cart[i].quantity*parseInt(cart[i].product.productPrice));
            }
            return;
        }
    }

    cart.push(item);
}

exports.remove = (cart, proId) => {
    for (var i = cart.length - 1; i >= 0; i--) {
        if (proId === cart[i].product.productID) {
            cart.splice(i, 1);
            return;
        }
    }
}