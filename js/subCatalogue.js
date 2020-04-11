function shoppingCart(itemDescription, vinNo, price, itemImage, itemColor, orderQty, itemTotal) {
    this.itemDescription = itemDescription; // This is concat of yearManufactured,make & model
    this.itemImage = itemImage; // Small-size copy of the image
    this.itemColor = itemColor;
    this.vinNo = vinNo;
    this.price = price;
    this.orderQty = orderQty;
    this.itemTotal = itemTotal; //This is price x orderQty
}

// Set up the array to store the app data structures
let menuCars = [];
let orders = [];
let arrOrderDetails = [];
let customers = [];
let idx;
let carts = [];
let cartTotal = 0;
let filterStr ="";
let i =0;

/*
// Laod data into the auto structure
var auto1 = new auto("Toyota", "Camry", "2014", "4-Door", "Gold", "images/1111111111/01.jpg", "1111111111", 210000);
var auto2 = new auto("MBenz", "GLE", "2011", "4-Door", "Silver", "images/2222222222/01.jpg", "2222222222", 120000);
var auto3 = new auto("Model", "Model-X", "2010", "4-Door", "White", "images/3333333333/01.jpg", "3333333333", 110000);
var auto4 = new auto("Lexus", "GS", "2007", "4-Door", "Black", "images/4444444444/01.jpg", "4444444444", 150000);
var auto5 = new auto("Honda", "Accord Sport", "2015", "Convertible", "White", "images/5555555555/01.jpg", "5555555555", 180000);
var auto6 = new auto("Toyota", "Land Cruiser", "2012", "SUV", "Black", "images/6666666666/01.jpg", "6666666666", 180000);
var auto7 = new auto("Toyota", "Avalon", "2014", "4-Door", "Gray", "images/7777777777/01.jpg", "7777777777", 180000);
var auto8 = new auto("Range Rover", "LR5", "2018", "SUV", "Gray", "images/8888888888/01.jpg", "8888888888", 450000);
var auto9 = new auto("Honda", "Accord Sport", "2016", "4-Door", "White", "images/9999999999/01.jpg", "9999999999", 230000);
autos = [auto1, auto2, auto3, auto4, auto5, auto6,auto7,auto8,auto9];
*/
//                  make,model,yearManufactured,type,colour,image,vinNo,price
function pageLoad() {
    filterStr = window.location.hash.substring(1) // This returns the index of the image clicked
  //  Load the full Catalogue from sessionStorage
    autos = JSON.parse(sessionStorage.getItem("autos")); //Get the cart object from sessionStorage
// Create a subset of the catalogue based on the side menu clicked
    menuCars = autos.filter(function(car) {
      return car.type== filterStr;
    });
    jQuery($( "#row1" ).empty()); //Clear the current products listed in the DOM
    // store the subset of the inventory in sessionStorage
    sessionStorage.setItem("menuCars", JSON.stringify(menuCars));

    if (menuCars.length != 0){
      LoadAutolist();}

}

function LoadAutolist() {
    // Load the autos array with ONLY filtered type of cars

    let idx = 0;
    for (let aCar of menuCars) {
        // strhtml is used to store the template pattern variable
        let strhtml = '<div class="col-lg-4 col-md-6 mb-4"><div class="card h-100"><a href="%more%"><img class="card-img-top" src=%image% alt=""></a><div class="card-body"><h4 class="card-title"><label>%description%</label></h4><h5>R%price%</h5><p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!</p></div><div class="card-footer"><small class="text-muted">&#9733; &#9733; &#9733; &#9734; &#9734;</small></div><p><button class="card" id="%btn%" onclick="loadCart()">Add to Cart</button></p></div></div>';
        let imageFilename= aCar.image.split("/"); // Strip the image filename from the full image path
        let htmlFilename= imageFilename[1].split(".");

        // Then, substitute the patterns with actual values retrieved from the autos object
        let carElement = document.querySelector('#row1');
        let strhtml2 = strhtml.replace("%description%", aCar.yearManufactured + " " + aCar.make + " " + aCar.model);
        strhtml2 = strhtml2.replace("%price%", formatNumber(aCar.price));
        strhtml2 = strhtml2.replace("%image%", aCar.image);
        strhtml2 = strhtml2.replace("%more%", "subProductDetails.html#"+idx);
        // strhtml2 = strhtml2.replace("%more1%", htmlFilename[0]+".html");
        strhtml2 = strhtml2.replace("%btn%", "btn_" + idx);

        idx++;

        // Insert the HTML statement for the car after the opening body tag
        carElement.insertAdjacentHTML("afterbegin", strhtml2);

    }

} // end of LoadAutolist

function loadCart() {
//   var res = str.slice(0, -12);
    let arrIndex = event.target.id.split("_");
    // idx to be derived from the id of button clicked

    idx = parseInt(arrIndex[1]);
    // Derive the path to small copy of the item image
    let itemImage = "images/"+menuCars[idx].vinNo+"/small/small.jpg";

    let itemDescription = menuCars[idx].yearManufactured + " " + menuCars[idx].make + " " + menuCars[idx].model
    cart = new shoppingCart(itemDescription, menuCars[idx].vinNo, menuCars[idx].price, itemImage, menuCars[idx].color, 1, menuCars[idx].price * 1);
    // Add the new item to the carts array
    carts.push(cart);
    cartTotal += Number(menuCars[idx].price);
    // Then, store the cart in storageSession
    sessionStorage.setItem("carts", JSON.stringify(carts));
    goToCart();
};

function goToCart() {
    var choice;
    if (confirm("Item added to your shopping cart. \n\nYour cart total amount is R" + formatNumber(cartTotal.toString()) + " \n\n Will you like to view your cart & checkout?")) {
        window.location = "cart.html";

    } else {
        // continue shopping
    }

}
// This function is used to format a number, i.e 2123495 is formatted as 2,123,495
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

// eventlistener for the side menu
jQuery($( ".list-group" ).on( "click", function(e){
  $( "#row1" ).empty(); //Clear the current products listed in the DOM
  console.log("filterStr = "+filterStr);
  
  pageLoad();
  }));
