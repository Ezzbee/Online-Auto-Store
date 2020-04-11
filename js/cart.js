function loadCartItems() {
    carts = JSON.parse(sessionStorage.getItem("carts")); //Get the cart object from sessionStorage
    //  load the items in cart in the DOM for display on the UI
    let cartElement = document.getElementById("cart");
    // Sizing the div to accomodate the no of items in the cart
    let cartHeight = carts.length * 141 + 35;
    $(document).ready(function() {
        $("#cart").css("height", cartHeight);
    });
    carts.forEach((itemCart, i) => {
        let strhtml = '<div class="item"><div class="buttons"><span class="delete-btn"></span><span class="like-btn"></span></div><div class="image"><img src=%itemImage% alt="" /></div><div class="description"><span>%itemDescription%</span><span>%itemColor%</span><span></span></div><div class="quantity"><button class="plus-btn" type="button" name="button"><img src="images/plus.svg" alt="" /></button><input type="text" name="name" value=%orderQty%><button class="minus-btn" type="button" name="button"><img src="images/minus.svg" alt="" /></button></div><div class="total-price">%itemTotal%</div></div>'
        // Plug in the actual data from the carts object
        // Insert the HTLM statement for the car after the opening body tag, using template variables
        let strhtml2 = strhtml.replace("%itemImage%", itemCart.itemImage);
        strhtml2 = strhtml2.replace("%itemDescription%", itemCart.itemDescription);
        strhtml2 = strhtml2.replace("%orderQty%", itemCart.orderQty);
        strhtml2 = strhtml2.replace("%itemColor%", itemCart.itemColor);
        strhtml2 = strhtml2.replace("%itemTotal%", formatNumber(itemCart.orderQty * itemCart.price));

        cartElement.insertAdjacentHTML("beforeend", strhtml2);

    }) // end of forEach
}

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

$('.minus-btn').on('click', function(e) {
    e.preventDefault();
    var $this = $(this);
    var $input = $this.closest('div').find('input');
    var value = parseInt($input.val());

    if (value > 1) {
        value = value - 1;
    } else {
        value = 0;
    }

    $input.val(value);

});

$('.plus-btn').on('click', function(e) {
    e.preventDefault();
    var $this = $(this);
    var $input = $this.closest('div').find('input');
    var value = parseInt($input.val());

    if (value < 100) {
        value = value + 1;
    } else {
        value = 100;
    }

    $input.val(value);
});

$('.like-btn').on('click', function() {
    $(this).toggleClass('is-active');
});
