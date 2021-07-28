// // import $ from "jquery";
// // console.log("Welcome to the Ecommerce");

// // Here we will pass out JSON data to the Frontend(HTML, CSS, and Js) with the help of Vanilla JavaScript

// // Previously we were doing it with the help of JQuery but now we will be doing it with the help of Vanilla JavaScript

// // fetch("Data.json")
// fetch("Data.json")
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     appendData(data);
//   })
//   .catch(function (err) {
//     console.log(err);
//   });

// function appendData(data) {
//   //   // Js for Calculating total products found
//   var amountContainer = document.getElementById("Amount");
//   var div2 = document.createElement("div");
//   Amount = `<h5 class="OrderBy">${data.length} Product(s) found.</h5>`;
//   div2.innerHTML = Amount;
//   amountContainer.appendChild(div2);

//   //   // Js for displaying all the products from the Data.json file
//   var mainContainer = document.getElementById("table");
//   for (var i = 0; i < data.length; i++) {
//     // append each person to our page
//     Image = '"' + data[i].Image + '"';
//     Condition = data[i].condition;
//     var div = document.createElement("div");
//     s = `<div class="item py-2 mix ${Condition} filterDiv" style="width: 150px" data-order = "${data[i].Price1}">
//       <div class="product font-rale">
//         <a href="#">
//           <img src=${Image} alt="product1" class="img-fluid shop-item-image" />
//         </a>
//         <div class="text-center">
//           <h6 class="mt-3 fw-bold shop-item-title">
//             ${data[i].Name}
//             <br />
//             T-Shirt
//           </h6>
//           <div class="">
//             <h1 class="fw-bold line">--</h1>
//             <h6 class="fw-bold shop-item-price">$<span class="Price">${data[i].Price1}</span>${data[i].Price2}
//             </h6>
//             <h6 class="fw-bold text-muted fs-5">or ${data[i].Price3} x $ ${data[i].Price4}</h6>
//           </div>
//           <button
//             type="submit"
//             class="btn font-size-12 bg-dark text-white Addtocart fw-bold"
//           >
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>`;
//     div.innerHTML = s;
//     mainContainer.appendChild(div);
//     console.log(s);
//   }
//   Render();
// }

// function Render() {
//   // Js for Filtering
//   const btns = document.querySelectorAll(".btn2");
//   const filterDiv = document.querySelectorAll(".filterDiv");
//   console.log("Welcome");
//   console.log(filterDiv);

//   for (i = 0; i < btns.length; i++) {
//     btns[i].addEventListener("click", (e) => {
//       const filter = e.target.dataset.filter;
//       const toggle = e.target.value;
//       console.log(toggle);
//       if (e.target.value == "off") {
//         filterDiv.forEach((product) => {
//           if (filter === "ALL") {
//             product.style.display = "";
//           } else {
//             if (product.classList.contains(filter)) {
//               product.style.display = "";
//             } else {
//               product.style.display = "none";
//             }
//           }
//         });
//         e.target.value = "on";
//       } else {
//         filterDiv.forEach((product) => {
//           product.style.display = "";
//         });
//         e.target.value = "off";
//       }
//     });
//   }

//   // Js for Cart Items
//   var cart_btn = document.querySelector(".CartButton");
//   var cart_sidebar = document.querySelector(".cart-sidebar");
//   var close_icon = document.querySelector(".cart-close-icon");
//   cart_btn.onclick = function () {
//     cart_sidebar.style.right = "0";
//   };

//   close_icon.onclick = function () {
//     cart_sidebar.style.right = "-400px";
//   };

//   // Js for Deleting or removing an item from the cart
//   var removeCartItemButtons = document.getElementsByClassName(
//     "RemoveItemButton"
//   );
//   for (var i = 0; i < removeCartItemButtons.length; i++) {
//     var button = removeCartItemButtons[i];
//     button.addEventListener("click", removeCartItem);
//   }

//   function removeCartItem(event) {
//     var buttonClicked = event.target;
//     buttonClicked.parentElement.parentElement.parentElement.parentElement.remove();
//     UpdateCartBoxValue();
//     updateCartTotal();
//   }

//   // Js for Updating the value of Subtotal
//   function updateCartTotal() {
//     var cartItemContainer = document.getElementsByClassName("cart-body")[0];
//     var cartRows = cartItemContainer.getElementsByClassName("cart-item");
//     var total = 0;
//     for (var i = 0; i < cartRows.length; i++) {
//       var cartRow = cartRows[i];
//       var priceElement = cartRow.getElementsByClassName("cart-item-price")[0];
//       var quantityElement = cartRow.getElementsByClassName(
//         "ItemCounterCart2"
//       )[0];
//       var price = parseFloat(priceElement.innerText.replace("$", ""));
//       var quantity = parseInt(quantityElement.value);
//       total1 = price * quantity;
//       total = total + total1;
//       total = Math.round(total * 100) / 100;
//     }
//     document.getElementsByClassName("subtotal3")[0].innerText = "$" + total;
//   }

//   // Js for selecting Quantity
//   var quantityInputs = document.getElementsByClassName("ItemCounterCart2");
//   for (var i = 0; i < quantityInputs.length; i++) {
//     var input = quantityInputs[i];
//     input.addEventListener("change", quantityChanged);
//   }

//   // Js for selecting Quantity and Updating the Subtotal
//   function quantityChanged(event) {
//     var input = event.target;
//     updateCartTotal();
//   }

//   // Js for Add to cart functionality
//   var addToCartButtons = document.getElementsByClassName("Addtocart");

//   for (var i = 0; i < addToCartButtons.length; i++) {
//     var button2 = addToCartButtons[i];
//     button2.addEventListener("click", addToCartClicked);
//   }

//   function addToCartClicked(event) {
//     var button2 = event.target;
//     var shopItem = button2.parentElement.parentElement.parentElement;
//     var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;

//     var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;

//     var imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;

//     addItemToCart(title, price, imageSrc);
//     updateCartTotal();
//   }

//   function addItemToCart(title, price, imageSrc) {
//     var cartRow = document.createElement("div");
//     var cartItems = document.getElementsByClassName("cart-body")[0];
//     var cartItemNames = cartItems.getElementsByClassName("cart-item-title");
//     for (var i = 0; i < cartItemNames.length; i++) {
//       if (cartItemNames[i].innerText == title) {
//         alert("This item is already added to the Cart");
//         return;
//       }
//     }
//     var cartRowContents = `
//   <div class="cart-item">
//   <div class="row">
//     <div class="col-lg-2 col-md-2 ">
//       <div class="cart-img">
//         <img
//           src="${imageSrc}"
//           alt=""
//           style="width: 40px !important; height: 90px !important,"
//         />
//       </div>
//     </div>
//     <div class="col-lg-8 col-md-8 ">
//       <h6 class="text-white">${title}</h6>
//       <h6 style="color: gray !important">Lorem ipsum dolor sit.</h6>
//       <h6 style="color: gray !important" class="item-quantity">
//         Quantity: 1
//       </h6>
//     </div>
//     <div class="col-lg-2 col-md-2 ">
//       <h6 class="cart-item-price" style="color: lightgreen">${price}</h6>
//       <div>
//       <input
//       type="number"
//       class="ItemCounterCart ItemCounterCart2"
//       value="1"
//     />
//       </div>
//       <div class="RemoveItem">
//         <i class="fas fa-trash-alt RemoveItemButton"></i>
//       </div>
//     </div>
//   </div>
// </div>`;
//     cartRow.innerHTML = cartRowContents;
//     cartItems.append(cartRow);
//     cartRow
//       .getElementsByClassName("RemoveItemButton")[0]
//       .addEventListener("click", removeCartItem);
//     cartRow
//       .getElementsByClassName("ItemCounterCart2")[0]
//       .addEventListener("change", quantityChanged);

//     UpdateCartBoxValue();
//   }

//   // Js for checkout button in the Cart Section
//   document
//     .getElementsByClassName("btn-purchase")[0]
//     .addEventListener("click", purchaseClicked);

//   function purchaseClicked() {
//     alert("Thanks you for shopping");
//     var cartItems = document.getElementsByClassName("cart-body")[0];
//     while (cartItems.hasChildNodes()) {
//       cartItems.removeChild(cartItems.firstChild);
//     }
//     updateCartTotal();
//     UpdateCartBoxValue();
//   }

//   // Function to update the value inside the FontAwesome Cart Icon
//   function UpdateCartBoxValue() {
//     var New = document.getElementById("BNavbar2H6");
//     var New2 = document.getElementById("BNavbar2H62");
//     New.innerText = document.getElementsByClassName("cart-item").length;
//     New2.innerText = document.getElementsByClassName("cart-item").length;
//   }

//   // JQuery for Sorting items on the basis of Price
//   $(document).ready(function () {
//     var mixer = mixitup(".items");
//   });

//   // Implemented Sorting Using Mixitup Jquery Plugin -> Layout Issue
// }
