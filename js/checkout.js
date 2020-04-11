let deliveryCost = 0;
let vat = 0;
let totalAmt = 0;
let subTotal = 0;
let nodeIdx = 0;

document.getElementById("voucher").style.display = "none";

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
// Load the items in the cart
function loadCartItems() {
    subTotal = 0;
    carts = JSON.parse(sessionStorage.getItem("carts")); //Get the cart object from sessionStorage
    //  load the items in cart in the DOM for display on the UI
    let cartElement = document.getElementById("itemNos");
    // Sizing the div to accomodate the no of items in the cart
    let strhtml = '<b>%itemCount%</b>';
    //Display the item count in the cart
    let strhtml2 = strhtml.replace("%itemCount%", carts.length);
    // Insert the item count next to the cart icon in the DOM
    cartElement.insertAdjacentHTML("afterend", strhtml2);
    cartElement = document.getElementById("total");
    //Next, display all the items in the cart
    carts.forEach((itemCart, i) => {
        let strhtml = '<p><a href="#">%itemDescription%</a> <span class="price">%itemTotal%</span></p>'
        // Insert the HTLM statement for the items in the cart
        let strhtml2 = strhtml.replace("%itemDescription%", itemCart.itemDescription);
        strhtml2 = strhtml2.replace("%orderQty%", itemCart.orderQty);
        strhtml2 = strhtml2.replace("%itemTotal%", formatNumber((itemCart.orderQty * itemCart.price)));
        cartElement.insertAdjacentHTML("afterbegin", strhtml2);
        subTotal += Number(itemCart.price * itemCart.orderQty);

    }) // end of forEach
    if (document.querySelector("#homeDelivery").checked) {
        deliveryCost = 500;
    } else {
        deliveryCost = 100;
    }
    totalAmt = subTotal + deliveryCost
    vat = totalAmt * 0.17; // VAT at 17%
    totalAmt += vat;
    cartElement = document.getElementById("cart");
    // Sizing the div to accomodate the no of items in the cart
    strhtml = '<p>Delivery Cost <span class="price" id="delivery" style="color:black"><b>%deliveryCost%</b></span></p>';
    //Display the item count in the cart
    strhtml2 = strhtml.replace("%deliveryCost%", formatNumber(deliveryCost.toFixed()));
    // Insert the delivery cost, right after the cart items list
    cartElement.insertAdjacentHTML("beforeend", strhtml2);
    strhtml = '<p>VAT @17% <span class="price" id="vat" style="color:black"><b>%vat%</b></span></p>';
    //Display the item count in the cart
    strhtml2 = strhtml.replace("%vat%", formatNumber(vat.toFixed()));
    // Insert the VAT cost, right after delivery cost
    cartElement.insertAdjacentHTML("beforeend", strhtml2);

    cartElement = document.getElementById("cart");
    // Sizing the div to accomodate the no of items in the cart
    strhtml = '<p>Total <span class="price" id="totalAmt" style="color:black"><b>%totalAmt%</b></span></p>';
    //Display the item count in the cart
    strhtml2 = strhtml.replace("%totalAmt%", formatNumber(totalAmt));
    // Insert the total cost, after vat
    cartElement.insertAdjacentHTML("beforeend", strhtml2);
}
document.querySelector("#homeDelivery").addEventListener("click", function(event) {
    // call updateTotals with 500, being the delivery fee for home delivery
    if (event.target.checked) {
        updateTotals(500);
    }
})

document.querySelector("#collection").addEventListener("click", function(event) {
    if (event.target.checked) {
        // call updateTotals with 100, being the delivery fee for collection
        updateTotals(100);
    }
})

function updateTotals(deliveryCost) {
    totalAmt = subTotal + deliveryCost; //deliveryCost
    vat = (totalAmt * 0.17).toFixed(); // VAT at 17%
    totalAmt += Number(vat);

    // Replace the child nodes for delivery fee, vat and subtotal with the newly computed figures

    var textnode = document.createTextNode(deliveryCost);
    var item = document.getElementById("delivery").childNodes[0];
    item.replaceChild(textnode, item.childNodes[0]);

    var textnode = document.createTextNode(formatNumber(vat));
    var item = document.getElementById("vat").childNodes[0];
    item.replaceChild(textnode, item.childNodes[0]);

    var textnode = document.createTextNode(formatNumber(totalAmt));
    var item = document.getElementById("totalAmt").childNodes[0];
    item.replaceChild(textnode, item.childNodes[0]);

}
// Toggle discount voucher input div, based on the state of the chkVoucher checkbox
$(document).ready(function() {
    $("#chkVoucher").click(function() {
        $("div#voucher").toggle();
    })
});

// Order confirmation prompt
document.getElementById("btnCheckout").addEventListener("click", function(event) {

    var choice;
    if (confirm("Are sure you wish to checkout and \nconfirm your order. \n\nYour cart total amount is R" + formatNumber(totalAmt))) {

        let confirmationNo = orderNumber();
        if (confirm("Your order has been confirmed! \n\nYour order no is " + confirmationNo + "\n\nClick Ok to continue shopping, Cancel to return to checkout"))
            window.location = "index.html"; {}
    } else {
        // continue shopping
    }

});

function orderNumber() {
    let now = Date.now().toString() // This generate a 13-digit no
    // pad with extra random digit. to make it a 14-digit order no. This is also to ensure uniqueness
    now += now + Math.floor(Math.random() * 10)
    // Then, slice this into 3 groups of nos
    return [now.slice(0, 4), now.slice(4, 10), now.slice(10, 14)].join('-')
}
