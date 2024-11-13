let product_area = document.querySelector('.products .products-boxes');
let close_btn = document.querySelector('.close');
let bag = document.querySelector('.bag');
let sideBar = document.querySelector('.sidebar');
let sidebarContent = document.querySelector('.sidebar .bottom-content');
let count = document.querySelector('.count h5');
let sidebarCount = document.querySelector('.sidebar-count h5');
let total = document.querySelector('.total span');
let products_box = document.querySelector('.products-box');
let getAddedItems = JSON.parse(localStorage.getItem('addedItem')) || [];
let getProducts = JSON.parse(localStorage.getItem('prods')) || products;
let totalprice_items = document.querySelector('.totalprice-items h1 span');
totalprice_items.innerHTML = localStorage.getItem('prices');
let get_url = localStorage.getItem('profile_img');
let prof_img = document.querySelectorAll('img.profile_img');
let profile_nav_img = document.querySelector('img.profile_nav_img');
let profile_nav_name = document.querySelector('h3.text');
console.log(profile_nav_name.innerHTML);

prof_img.forEach(e => {
    e.src = get_url || e.src;
})
let get_username = localStorage.getItem('username');
profile_nav_name.textContent = get_username;
if(getAddedItems){
    products_box.innerHTML = getAddedItems.map(e => {
        return `
        <div class="products-items">
                        <div class="product-img">
                            <img src="${e.product_img}" alt="${e.product_name}">
                        </div>
                        <div class="product-name-qty">
                            <h4>${e.product_name}</h4>
                            <p>Qty <span>${e.qty}</span></p>
                        </div>
                        <div class="product-price">
                            <div class="content">
                                <h5>$${e.price}</h5>
                                <p class='each-price'>each</p>     
                            </div>
                            
                        </div>
                    </div>
        `
    }).join('');
}
else{
    console.log('No products');
    
}



let addedItemIds = getAddedItems.map(item => item.id);

let fiterdata = products.filter(product => addedItemIds.includes(product.id));

// Update each price in the DOM
document.querySelectorAll('.each-price').forEach((e,i) => {
    if (fiterdata[i]) {
        e.innerHTML = `$${fiterdata[i].price}each`;
    }
});

// ==================================== CARD INFORMATIONS =====================================

var cleave = new Cleave('.cart-num', {
    creditCard: true,
    delimiter: '-',
    onCreditCardTypeChanged: function (type) {
        console.log(type);
        
        if(type == 'mastercard'){
            document.querySelector('.cart-number .mastercard').style.display = 'flex';
        }
        else if(type == 'visa'){
            document.querySelector('.cart-number .visa').style.display = 'flex';
        }
        else if(type == 'amex'){
            document.querySelector('.cart-number .amex').style.display = 'flex';
            
        }
        else if(type == 'unknown'){
            document.querySelector('.cart-number i').style.display = 'none';
            document.querySelector('.cart-number .mastercard').style.display = 'none';
            document.querySelector('.cart-number .amex').style.display = 'none';

        }
        
    }
});
var cleave = new Cleave('#card-date', {
    date: true,
    datePattern: ['m', 'y']
});


// ================================ CHECK INFORMATION INPUTS ====================================
let email = document.querySelector('#email');
let cart_num = document.querySelector('.cart-num');
let card_date = document.querySelector('#card-date');
let ccv = document.querySelector('#ccv');
let card_name_input = document.querySelector('#card-name-input');
let country = document.querySelector('#country');
let address1 = document.querySelector('#address-1');
let address2 = document.querySelector('#address-2');
let city = document.querySelector('#city');
let zip_code = document.querySelector('#zip-code');
let pay_button = document.querySelector('.pay-button');
pay_button.onclick = () => {
    if(email.value == '' || cart_num == '' || card_date.value == '' || ccv.value == '' || card_name_input.value == '' || country.value == '' || address1.value == '' || address2.value == '' || city.value == '' || zip_code.value == ''){
        alert('Enter the Data');
    }
    else{
        window.location = 'index.html';
    }
}


let updateSidebar = () => {
    let addedItem = JSON.parse(localStorage.getItem('addedItem')) || [];
    
    sidebarContent.innerHTML = addedItem.map(item => 
        `<div class="content">
            <img src="${item.product_img}" alt="product">
            <div class="product-name">
                <h3>${item.product_name}</h3>
            </div>
            <div class=${localStorage.getItem('mode') === '#fff' ? 'qty' : 'qty-dark' }>
                <button onclick="changeQuantity(${item.id}, -1)" class="mince">-</button>
                <input type="text" id="qtyNum" value="${item.qty}" readonly>
                <button onclick="changeQuantity(${item.id}, 1)" class="plus">+</button>
            </div>
            <div class="product-price">
                <h3>$${item.price}</h3>
            </div>
            <div onclick="deleteItem(${item.id})" class="delete">
                <i class="ri-delete-bin-6-fill trash"></i>
                <h3>DELETE</h3>
            </div>
        </div>`
    ).join('');

    count.innerHTML = addedItem.length;
    document.getElementById('product-items-length').innerHTML = addedItem.length;

    let sum = 0;
        addedItem.map(p => {
            // let pricee = p.price;
            sum += p.price;
            // console.log(sum);
            localStorage.setItem('prices', JSON.stringify(sum));
        })
        let getPrice =JSON.parse(localStorage.getItem('prices'));
        total.innerHTML = getPrice;
    
        if(addedItem == 0){
            total.innerHTML = 0;
           }
}
updateSidebar();
// ====================== OPEN & CLOSE SHOPPING CART FUNCTIONS ==============================
// Select the elements

// Add event listener to the bag element

bag.onclick = () => {
    sideBar.style.display = 'flex';
}

// ====================== OPEN & CLOSE SHOPPING CART FUNCTIONS ==============================
document.querySelectorAll('.sidebar .bag').forEach(e => {
    e.addEventListener('click', () => {
        if(document.querySelector('.sidebar').style.display == 'flex')
        {
            document.querySelector('.sidebar').style.display = 'none';
        }
        else
        {
            document.querySelector('.sidebar').style.display = 'flex';
        }
    });
})
// ================================= OPEN PROFILE FUNCTION====================================
let profile_img = document.querySelector('.profile_img');
let sideBar_profile_img = document.querySelector('.sidebar .rel .profile_img');

let profile_nav = document.querySelector('.profile_nav');
let profile_nav_closeBtn = document.querySelector('.profile_nav_closeBtn');
profile_img.onclick = () => {
    profile_nav.style.display = 'flex';
    profile_nav.style.translate = '0 0';
}
sideBar_profile_img.onclick = () => {
    profile_nav.style.display = 'flex';
    profile_nav.style.translate = '0 0';

}
// ================================= CLOSE PROFILE FUNCTION====================================
profile_nav_closeBtn.onclick = () => {
    profile_nav.style.display = 'none';
        profile_nav.style.translate = '100em 0';
}

// ============================= DARK MODE FUNCTION ==================================
let darkMode = () => {
    document.body.style.background = '#000';
    document.body.style.color = '#fff';
    document.querySelectorAll('input').forEach(e => {
        e.style.background = '#000';
        e.style.border = '1px solid #fff';
        e.style.borderRadius = '0';
        e.style.color = '#fff';
    })
    document.querySelectorAll('.card-date-cvc input, .city-zip-code input, input.address1,input.address2').forEach(e => {
        e.style.borderTop = 'none';
    })
    

    document.querySelector('header').style.boxShadow = '0 3px 17px #484747';
    document.querySelector('header').style.background = '#000';
    document.querySelector('header .rel').style.color = 'orangered';
    document.querySelector('header .rel').style.fontWeight= 'bolder';
    document.querySelector('.profile_nav').style.background = '#000';
    document.querySelector('.profile_nav').style.color = '#fff';
    document.querySelectorAll('.profile_nav .special_profile_nav').forEach(el => {
        el.style.background = '#000';
        el.style.color = '#fff';
    })
    document.querySelector('.profile_nav .profile_nav_mode').style.borderTop = 'none';
    document.querySelector('.profile_nav .profile_nav_mode').style.borderRight = 'none';
    document.querySelector('.profile_nav_darkMode').style.display = 'none';
    document.querySelector('.profile_nav_lightMode').style.display = 'flex';

    document.querySelector('.sidebar').style.background = '#000';
    document.querySelector('.sidebar').style.color = '#fff';
    document.querySelectorAll('.sidebar .bottom-content .qty button').forEach(e => {
        e.style.color = '#fff';
    })
    document.querySelector('.sidebar .bottom-items .bottom-items-content').style.background = '#000';
    document.querySelector('.sidebar .bottom-items button:nth-child(1)').style.background = '#000'
    document.querySelectorAll('.sidebar .bottom-items button').forEach(e => {
        e.style.color = '#fff';
    })
    document.querySelector('.cart-number i').style.color = '#fff';
    localStorage.setItem('mode',  document.body.style.background = '#000');

}
// ============================= LIGHT MODE FUNCTION ==================================
let lightMode = () =>{
    document.body.style.background = '#fff';
    document.body.style.color = '#000';
    document.querySelectorAll('input').forEach(e => {
        e.style.background = '#fff';
        e.style.border = '1px solid #000';
        e.style.borderRadius = '0.2em';
        e.style.color = '#000';
    })
    document.querySelectorAll('.card-date-cvc input, .city-zip-code input, input.address1,input.address2').forEach(e => {
        e.style.borderTop = 'none';
    })
    

    document.querySelector('header').style.boxShadow = '0 0 0 0';
    document.querySelector('header').style.background = '#000';
    document.querySelector('header .rel').style.color = 'orangered';
    document.querySelector('header .rel').style.fontWeight= 'bolder';
    document.querySelector('.profile_nav').style.background = '#fff';
    document.querySelector('.profile_nav').style.color = '#000';
    document.querySelectorAll('.profile_nav .special_profile_nav').forEach(el => {
        el.style.background = '#fff';
        el.style.color = '#000';
    })
    document.querySelector('.profile_nav .profile_nav_mode').style.borderTop = 'none';
    document.querySelector('.profile_nav .profile_nav_mode').style.borderRight = 'none';
    document.querySelector('.profile_nav_darkMode').style.display = 'flex';
    document.querySelector('.profile_nav_lightMode').style.display = 'none';

    document.querySelector('.sidebar').style.background = '#fff';
    document.querySelector('.sidebar').style.color = '#000';
    document.querySelectorAll('.sidebar .bottom-content .qty button').forEach(e => {
        e.style.color = '#000';
    })
    document.querySelector('.sidebar .bottom-items .bottom-items-content').style.background = '#fff';
    document.querySelector('.sidebar .bottom-items button:nth-child(1)').style.background = '#fff'
    document.querySelectorAll('.sidebar .bottom-items button').forEach(e => {
        e.style.color = '#fff';
    })
    document.querySelector('.cart-number i').style.color = 'blue';
    localStorage.setItem('mode',  document.body.style.background = '#fff');

   
}
if(localStorage.getItem('mode') === '#000'){
    darkMode();
}
else{
    lightMode();
}


// ============================== LOGOUT FUNCTION ===================================
let toLogout = () => {
    window.location = 'login.html';
}
// ================================ SHOW PROFILE FUNCTION ======================================
let toProfile = () =>
{
    window.location = 'profile.html';
}
// ================================== TO CART  PAGE =======================================
let toCart = () => {
    window.location = 'cartPage.html';
}
// ========================== To Checkout Page ===================================
let toCheckoutPage = () => {
    window.location = 'checkout.html'
}
// ================================= DRAW FAVORITES PRODUCTS FUNCTION====================================
let toFavPage = () => {
    window.location = 'favoritePage.html';
}
let toHomePage = () => {
    window.location = 'index.html';
}
