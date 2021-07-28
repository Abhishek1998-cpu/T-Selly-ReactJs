import React, { useEffect } from "react";
import $ from "jquery";
import mixitup from "mixitup";

function Utility() {
  // import $ from "jquery";
  // console.log("Welcome to the Ecommerce");

  // Here we will pass out JSON data to the Frontend(HTML, CSS, and Js) with the help of Vanilla JavaScript

  // Previously we were doing it with the help of JQuery but now we will be doing it with the help of Vanilla JavaScript

  // fetch("Data.json")
  fetch("Data.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      appendData(data);
    })
    .catch(function (err) {
      console.log(err);
    });

  function appendData(data) {
    //   // Js for Calculating total products found
    var amountContainer = document.getElementById("Amount");
    var div2 = document.createElement("div");
    var Amount = `<h5 class="OrderBy">${data.length} Product(s) found.</h5>`;
    div2.innerHTML = Amount;
    amountContainer.appendChild(div2);

    //   // Js for displaying all the products from the Data.json file
    var mainContainer = document.getElementById("table");
    for (var i = 0; i < data.length; i++) {
      // append each person to our page
      var Image = '"' + data[i].Image + '"';
      var Condition = data[i].condition;
      var div = document.createElement("div");
      var s = `<div class="item py-2 mix ${Condition} filterDiv" style="width: 150px" data-order = "${data[i].Price1}">
    <div className="product font-rale">
      <a href="#">
        <img src=${Image} alt="product1" class="img-fluid shop-item-image" />
      </a>
      <div class="text-center">
        <h6 class="mt-3 fw-bold shop-item-title">
          ${data[i].Name}
          <br />
          T-Shirt
        </h6>
        <div class="">
          <h1 class="fw-bold line">--</h1>
          <h6 class="fw-bold shop-item-price">$<span class="Price">${data[i].Price1}</span>${data[i].Price2}
          </h6>
          <h6 class="fw-bold text-muted fs-5">or ${data[i].Price3} x $ ${data[i].Price4}</h6>
        </div>
        <button
          type="submit"
          class="btn font-size-12 bg-dark text-white Addtocart fw-bold"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>`;
      div.innerHTML = s;
      mainContainer.appendChild(div);
      console.log(s);
    }
    Render();
  }

  function Render() {
    // Js for Filtering
    const btns = document.querySelectorAll(".btn2");
    const filterDiv = document.querySelectorAll(".filterDiv");
    console.log("Welcome");
    console.log(filterDiv);

    for (let i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", (e) => {
        const filter = e.target.dataset.filter;
        const toggle = e.target.value;
        console.log(toggle);
        if (e.target.value === "off") {
          filterDiv.forEach((product) => {
            if (filter === "ALL") {
              product.style.display = "";
            } else {
              if (product.classList.contains(filter)) {
                product.style.display = "";
              } else {
                product.style.display = "none";
              }
            }
          });
          e.target.value = "on";
        } else {
          filterDiv.forEach((product) => {
            product.style.display = "";
          });
          e.target.value = "off";
        }
      });
    }

    // Js for Cart Items
    var cart_btn = document.querySelector(".CartButton");
    var cart_sidebar = document.querySelector(".cart-sidebar");
    var close_icon = document.querySelector(".cart-close-icon");
    cart_btn.onclick = function () {
      cart_sidebar.style.right = "0";
    };

    close_icon.onclick = function () {
      cart_sidebar.style.right = "-400px";
    };

    // Js for Deleting or removing an item from the cart
    var removeCartItemButtons = document.getElementsByClassName(
      "RemoveItemButton"
    );
    for (var i = 0; i < removeCartItemButtons.length; i++) {
      var button = removeCartItemButtons[i];
      button.addEventListener("click", removeCartItem);
    }

    function removeCartItem(event) {
      var buttonClicked = event.target;
      buttonClicked.parentElement.parentElement.parentElement.parentElement.remove();
      UpdateCartBoxValue();
      updateCartTotal();
    }

    // Js for Updating the value of Subtotal
    function updateCartTotal() {
      var cartItemContainer = document.getElementsByClassName("cart-body")[0];
      var cartRows = cartItemContainer.getElementsByClassName("cart-item");
      var total = 0;
      for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName("cart-item-price")[0];
        var quantityElement = cartRow.getElementsByClassName(
          "ItemCounterCart2"
        )[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = parseInt(quantityElement.value);
        var total1 = price * quantity;
        total = total + total1;
        total = Math.round(total * 100) / 100;
      }
      document.getElementsByClassName("subtotal3")[0].innerText = "$" + total;
    }

    // Js for selecting Quantity
    var quantityInputs = document.getElementsByClassName("ItemCounterCart2");
    for (var k = 0; k < quantityInputs.length; k++) {
      var input = quantityInputs[k];
      input.addEventListener("change", quantityChanged);
    }

    // Js for selecting Quantity and Updating the Subtotal
    function quantityChanged(event) {
      // var input = event.target;
      updateCartTotal();
    }

    // Js for Add to cart functionality
    var addToCartButtons = document.getElementsByClassName("Addtocart");

    for (var j = 0; j < addToCartButtons.length; j++) {
      var button2 = addToCartButtons[j];
      button2.addEventListener("click", addToCartClicked);
    }

    function addToCartClicked(event) {
      var button2 = event.target;
      var shopItem = button2.parentElement.parentElement.parentElement;
      var title = shopItem.getElementsByClassName("shop-item-title")[0]
        .innerText;

      var price = shopItem.getElementsByClassName("shop-item-price")[0]
        .innerText;

      var imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;

      addItemToCart(title, price, imageSrc);
      updateCartTotal();
    }

    function addItemToCart(title, price, imageSrc) {
      var cartRow = document.createElement("div");
      var cartItems = document.getElementsByClassName("cart-body")[0];
      var cartItemNames = cartItems.getElementsByClassName("cart-item-title");
      for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText === title) {
          alert("This item is already added to the Cart");
          return;
        }
      }
      var cartRowContents = `
<div class="cart-item">
<div class="row">
  <div class="col-lg-2 col-md-2 ">
    <div class="cart-img">
      <img
        src="${imageSrc}"
        alt=""
        style="width: 40px !important; height: 90px !important,"
      />
    </div>
  </div>
  <div class="col-lg-8 col-md-8 ">
    <h6 class="text-white">${title}</h6>
    <h6 style="color: gray !important">Lorem ipsum dolor sit.</h6>
    <h6 style="color: gray !important" class="item-quantity">
      Quantity: 1
    </h6>
  </div>
  <div class="col-lg-2 col-md-2 ">
    <h6 class="cart-item-price" style="color: lightgreen">${price}</h6>
    <div>
    <input
    type="number"
    class="ItemCounterCart ItemCounterCart2"
    value="1"
  />
    </div>
    <div class="RemoveItem">
      <i class="fas fa-trash-alt RemoveItemButton"></i>
    </div>
  </div>
</div>
</div>`;
      cartRow.innerHTML = cartRowContents;
      cartItems.append(cartRow);
      cartRow
        .getElementsByClassName("RemoveItemButton")[0]
        .addEventListener("click", removeCartItem);
      cartRow
        .getElementsByClassName("ItemCounterCart2")[0]
        .addEventListener("change", quantityChanged);

      UpdateCartBoxValue();
    }

    // Js for checkout button in the Cart Section
    document
      .getElementsByClassName("btn-purchase")[0]
      .addEventListener("click", purchaseClicked);

    function purchaseClicked() {
      alert("Thanks you for shopping");
      var cartItems = document.getElementsByClassName("cart-body")[0];
      while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
      }
      updateCartTotal();
      UpdateCartBoxValue();
    }

    // Function to update the value inside the FontAwesome Cart Icon
    function UpdateCartBoxValue() {
      var New = document.getElementById("BNavbar2H6");
      var New2 = document.getElementById("BNavbar2H62");
      New.innerText = document.getElementsByClassName("cart-item").length;
      New2.innerText = document.getElementsByClassName("cart-item").length;
    }

    // JQuery for Sorting items on the basis of Price
    $(document).ready(function () {
      var mixer = mixitup(".items");
    });

    // Implemented Sorting Using Mixitup Jquery Plugin -> Layout Issue
  }
}

function Home() {
  useEffect(() => {
    Utility();
  }, []);

  return (
    <>
      {/* <!DOCTYPE html> */}

      <html lang="en">
        <head>
          {/* <!-- Required meta tags --> */}
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          {/* <!-- Bootstrap CSS --> */}
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x"
            crossorigin="anonymous"
          />

          {/* <!-- Custom CSS Link  --> */}
          {/* <link rel="stylesheet" href="./Index.css" /> */}

          <title>T-Selly</title>
        </head>
        <body>
          <div className="container">
            {/* <!-- Navbar Starts  --> */}

            <header>
              <nav className="navbar navbar-expand-lg navbar-dark">
                <div className="container-fluid p-2">
                  <a className="navbar-brand" href="/">
                    T-Selly
                  </a>
                  <button
                    className="navbar-toggler bg-dark"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="/navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                  >
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                      <li className="nav-item">
                        <a className="nav-link" aria-current="page" href="/">
                          HOME
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/">
                          COLLECTION
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/">
                          NEW ARRIVAL
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/">
                          ONGOING OFFERS
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/">
                          GET HELP
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </header>

            {/* <!-- Navbar Ends  --> */}

            {/* <!-- Cart Icon Section Starts --> */}
            <section>
              <div className="container">
                <div className="BNavbar">
                  <i className="fa-2x fas fa-cart-plus p-2 CartButton"></i>
                  <span>
                    <button className="BNavbar2">
                      <h6 id="BNavbar2H62">0</h6>
                    </button>
                  </span>
                </div>
              </div>
            </section>
            {/* <!-- Cart Icon Section Ends  --> */}

            {/* <!-- Main Layout Section Starts --> */}
            {/* <!-- Below is just for creating boundary of the Cart Icon Section  --> */}
            <section>
              <div className="container layout">
                <h3>-</h3>
              </div>
            </section>
            {/* <!-- Above is just for creating boundary of the Cart Icon Section  --> */}
            <section>
              <div className="container">
                <div className="row">
                  <div className="col-lg-3">
                    {/* <!-- Sizes filter Section Starts  --> */}
                    <h5 className="fw-bold sizebutton">Sizes:</h5>
                    <div className="d-flex justify-content-start mt-3 sizebutton">
                      {/* <!-- <button
                  className="fw-bold me-2 btn2 geekmark inside"
                  data-filter="XS"
                >
                  XS
                </button> --> */}
                      {/* <!-- <button className="Sizebutton p-2 fw-bold me-2">S</button>
                <button className="Sizebutton p-2 fw-bold me-2">M</button>
                <button className="Sizebutton p-2 fw-bold me-2">ML</button>  --> */}
                      <div className="inputbuttons">
                        <label className="script me-2">
                          <input
                            type="checkbox"
                            condition="XS"
                            className="btn2"
                            data-filter="XS"
                            value="off"
                          />
                          <span className="geekmark inside">XS</span>
                        </label>
                        <label className="script me-2">
                          <input
                            type="checkbox"
                            data-filter="S"
                            className="btn2"
                            value="off"
                          />
                          <span className="geekmark inside">S</span>
                        </label>
                        <label className="script me-2">
                          <input
                            type="checkbox"
                            data-filter="M"
                            className="btn2"
                            value="off"
                          />
                          <span className="geekmark inside">M</span>
                        </label>
                        <label className="script me-2">
                          <input
                            type="checkbox"
                            condition="ML"
                            className="btn2"
                            data-filter="ML"
                            value="off"
                          />
                          <span className="geekmark inside">ML</span>
                        </label>
                      </div>
                    </div>
                    <div className="d-flex justify-content-start mt-2 sizebutton">
                      {/* <!-- <button className="Sizebutton p-2 fw-bold me-2">L</button>
                <button className="Sizebutton p-2 fw-bold me-2">XL</button>
                <button className="Sizebutton p-2 fw-bold me-2">XXL</button> --> */}
                      <div className="inputbuttons">
                        <label className="script me-2">
                          <input
                            type="checkbox"
                            data-filter="L"
                            className="btn2"
                            value="off"
                          />
                          <span className="geekmark inside">L</span>
                        </label>
                        <label className="script me-2">
                          <input
                            type="checkbox"
                            condition="XL"
                            className="btn2"
                            data-filter="XL"
                            value="off"
                          />
                          <span className="geekmark inside">XL</span>
                        </label>
                        <label className="script me-2">
                          <input
                            type="checkbox"
                            condition="XXL"
                            className="btn2"
                            data-filter="XXL"
                            value="off"
                          />
                          <span className="geekmark inside">XXL</span>
                        </label>
                        {/* <!-- <button className="sort" data-sort="order:asc">ASC</button>
                  <button className="sort" data-sort="order:desc">DESC</button> --> */}
                        {/* <!-- <label className="script me-2">
                    <input
                      type="checkbox"
                      condition="XXL"
                      className="btn2"
                      data-filter="ALL"
                      value="off"
                    />
                    <span className="geekmark inside">ALL</span>
                  </label> --> */}
                      </div>
                    </div>
                    <div className="container text-center mt-4">
                      <p>
                        Leave a star on Github if this <br />
                        repository was useful :)
                      </p>
                      <button className="fw-bold p-2 githubbutton">
                        <i className="fab fa-github"></i>
                        <span className="Star">Star</span>
                      </button>
                    </div>
                    {/* <!-- Sizes filter Section Ends  --> */}
                  </div>
                  <div className="col-lg-8">
                    {/* <!--  --> */}
                    {/* <!-- OrderBy Filter Section Starts  --> */}
                    <div className="d-flex flex-row justify-content-start align-items-center">
                      <div id="Amount">
                        {/* <!-- <h5 className="OrderBy">X Product's found</h5> --> */}
                      </div>
                      <h5 className="d-flex align-items-center justify-content-center OrderBy">
                        Order By:&nbsp;
                        <div className="dropdown">
                          <span>Select</span>
                          <div className="dropdown-content">
                            <p
                              className="sort cursor-pointer"
                              data-sort="default"
                            >
                              Default
                            </p>
                            <p
                              className="sort cursor-pointer"
                              data-sort="order:asc"
                            >
                              Price Low to High
                            </p>
                            <p
                              className="sort cursor-pointer"
                              data-sort="order:desc"
                            >
                              Price High to Low
                            </p>
                          </div>
                        </div>
                      </h5>
                    </div>
                    {/* <!-- OrderBy Filter Section Ends  --> */}
                    {/* <!--  --> */}

                    {/* <!-- Product Layout Section Starts  --> */}
                    {/* <!-- 1st Row One  --> */}
                    <section className="mt-4 grid-itemX">
                      <div className="items" id="table"></div>
                    </section>
                    {/* <!-- Product Layout Section Ends  --> */}
                  </div>
                  <div className="col-lg-1"></div>
                </div>
              </div>
            </section>
          </div>
          {/* <!-- Main Layout Section Ends --> */}
          {/* <!-- Footer Section Starts  --> */}
          <footer id="footer">
            <div className="container">
              <div className="container-fluid p-0">
                <div className="row text-left footer">
                  {/* <!-- Bootstrap Column  --> */}
                  <div className="col-md-5 col-sm-5 text-light">
                    <h4 className="text-light">IMPORTANT LINKS</h4>
                    <div className="mt-5 mb-4 importantlinks">
                      <h6 className="text-light">
                        <i className="far fa-star"></i>&nbsp;About Us
                      </h6>
                      <h6 className="text-light">
                        <i className="far fa-star"></i>&nbsp;Contact Us
                      </h6>
                      <h6 className="text-light">
                        <i className="far fa-star"></i>&nbsp;Privacy Policy
                      </h6>
                      <h6 className="text-light">
                        <i className="far fa-star"></i>&nbsp;Terms & Condition
                      </h6>
                    </div>
                    <p className="text-muted Copyright">
                      Copyright &copy;2021 All rights resereved.
                      <span className="line">Abhishek Verma</span>
                    </p>
                  </div>
                  <div className="col-md-5">
                    <div className="container">
                      <div className="Newsletter">
                        <h4 className="text-light">Newsletter</h4>
                        <p className="text-muted">Stay Updated</p>
                        <form className="subscribe">
                          <input
                            type="text"
                            placeholder="Your email address"
                            className="p-2 subscribe"
                          />
                          <input
                            type="submit"
                            value="Subscribe"
                            className="subscribebutton p-2"
                          />
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-2 col-sm-12 text-start followus">
                    <h4 className="text-light">Follow Us</h4>
                    <p className="text-muted">Let's be Social</p>
                    <div className="d-flex justify-content-between column">
                      <i className="fa-2x fab fa-facebook-f"></i>
                      <i className="fa-2x fab fa-instagram"></i>
                      <i className="fa-2x fab fa-twitter"></i>
                      <i className="fa-2x fab fa-linkedin"></i>
                      <i className="fa-2x fab fa-youtube-square"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </footer>
          {/* <!-- Footer Section Ends  --> */}
          {/* <!-- Cart Sidebar Starts --> */}
          <div className="cart-sidebar">
            <span className="cart-close-icon">
              <i className="fa-2x far fa-window-close"></i>
            </span>
            <div className="cart-title text-center">
              {/* <!-- <div> --> */}
              <i className="fa-2x fas fa-cart-plus p-2 CartButton"></i>
              <span>
                <button className="BNavbar2">
                  <h6 id="BNavbar2H6">0</h6>
                </button>
              </span>
              <span className="Bag">Bag</span>
              {/* <!-- </div> --> */}
              {/* <!-- <div> --> */}

              {/* <!-- </div> --> */}
            </div>
            <div className="cart-body"></div>
            {/* <!-- Subtotal Section starts --> */}
            <div className="subtotal">
              <div>SUBTOTAL</div>
              <div className="subtotal2">
                <h5 style={{ Color: "lightgreen" }} className="subtotal3">
                  $00.00
                </h5>
                <h6>OR UP TO 5 x $ 5.89</h6>
              </div>
            </div>
            {/* <!-- Subtotal Section ends --> */}

            <a href="/" className="cart-btn btn-purchase">
              CHECKOUT
            </a>
          </div>
          {/* <!-- Cart Sidebar Ends--> */}
          {/* <!-- Optional JavaScript; choose one of the two! --> */}
          {/* <!-- Option 1: Bootstrap Bundle with Popper --> */}
          <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4"
            crossorigin="anonymous"
          ></script>
          {/* <!-- Js for OrderBy Filter  --> */}
          <script></script>
          {/* <!-- Option 2: Separate Popper and Bootstrap JS --> */}
          {/* <!-- */}
          <script
            src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"
            integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p"
            crossorigin="anonymous"
          ></script>
          <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.min.js"
            integrity="sha384-Atwg2Pkwv9vp0ygtn1JAojH0nYbwNJLPhwyoVbhoPwBhjQPR5VtM2+xf0Uwh9KtT"
            crossorigin="anonymous"
          ></script>
          -->
          {/* <!-- Font Awesome CDN  --> */}
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
            integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
            crossorigin="anonymous"
            referrerpolicy="no-referrer"
          />
          {/* <!-- Font Awesome CDN  --> */}
        </body>
      </html>

      {/* <!-- Adding mix class to elements  --> */}
    </>
  );
}

export default Home;
