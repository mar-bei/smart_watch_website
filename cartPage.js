let product_area = document.querySelector('.products .products-boxes');
let close_btn = document.querySelector('.close');
let bag = document.querySelector('.bag');
let sideBar = document.querySelector('.sidebar');
let sidebarContent = document.querySelector('.sidebar .bottom-content');
let count = document.querySelector('.count h5');
let sidebarCount = document.querySelector('.sidebar-count h5');
let total = document.querySelector('.total span');
let addedItem = localStorage.getItem('addedItem') ? JSON.parse(localStorage.getItem('addedItem')) : [];
let get_url = localStorage.getItem('profile_img');
let prof_img = document.querySelectorAll('img.profile_img');
prof_img.forEach(e => {
    e.src = get_url || e.src;
})
let profile_nav_name = document.querySelector('h3.text');

let get_username = localStorage.getItem('username');
profile_nav_name.innerHTML = get_username;
// ===================================== DRAW SIDEBAR CONTENT ==============================
let updateSidebar = () => {
    let addedItem = JSON.parse(localStorage.getItem('addedItem')) || [];
    
    sidebarContent.innerHTML = addedItem.map(item => 
        `<div class="content">
            <img src="${item.product_img}" alt="product">
            <div class="product-name">
                <h3>${item.product_name}</h3>
            </div>
            <div class=${localStorage.getItem('mode') === '#fff' ? 'qty' : 'qty-dark'}>
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
            count.innerHTML = addedItem.length;
            document.getElementById('product-items-length').innerHTML = addedItem.length;
}

// =============================== DELETE PRODCUT FROM SHOPPING CART =================
let deleteItem = (id) => {
    let getProductss = localStorage.getItem('prods') ? JSON.parse(localStorage.getItem('prods')) : products;

    let getAddedItem = JSON.parse(localStorage.getItem('addedItem'));
    let filterAddedProduct = getAddedItem.filter(e => e.id != id);
    localStorage.setItem('addedItem',JSON.stringify(filterAddedProduct));
    let addedItem = getAddedItem.map(e => e.id);
    console.log(addedItem);
    
    let getItem = getAddedItem.find(e => e.id == id);
    console.log(getItem);
    
    getProductss.map(e => {
        if(e.id == getItem.id)
        {
            e.added = false;
        }
    })
    localStorage.setItem('prods', JSON.stringify(getProductss));


        updateSidebar();
        let sum = 0;
                addedItem.map(p => {
                    sum += p.price;
                    localStorage.setItem('prices', JSON.stringify(sum));
                })

            let getPrice =JSON.parse(localStorage.getItem('prices'));
            total.innerHTML = getPrice;
  
            if(addedItem == 0){
                total.innerHTML = 0;
               }
               if(localStorage.getItem('mode') == '#000'){
                darkMode();
            }
            else{
                lightMode();
            }
        
        
            

}
// =========================== REMOVE FROM CART PAGE =================================

let removeFromCart = (id) => {

let getProductss = localStorage.getItem('prods') ? JSON.parse(localStorage.getItem('prods')) : products;

    let addedItem = JSON.parse(localStorage.getItem('addedItem'));
    let filterAddedItems = addedItem.filter(e => e.id !== id);
    let getItem = addedItem.find(e => e.id == id);
    localStorage.setItem('addedItem', JSON.stringify(filterAddedItems));
    
    getProductss.map(e => {
        if(e.id == getItem.id)
        {
            e.added = false;
        }
    })
    localStorage.setItem('prods', JSON.stringify(getProductss));
    if(localStorage.getItem('mode') == '#000'){
        darkMode();
    }
    else{
        lightMode();
    }


    updateSidebar();
    

}



// =========================================== CHANGE QUANTITY FUNCTION =====================================;
let changeQuantity = (id, change) => {
    let addedItem = JSON.parse(localStorage.getItem('addedItem')) || [];
    let item = addedItem.find(e => e.id === id);
    
        if (item) {
        item.qty += change;
        let pricee = item.qty;
        item.price += item.price;
        console.log(item.price);

        if (item.qty <= 0) {
            item.qty = 1;
        }
        
        localStorage.setItem('addedItem', JSON.stringify(addedItem));
        updateSidebar();
    }
}
// ============= ONLOAD FUNCTION ================================
window.onload = () => {
    updateSidebar();
    if(JSON.parse(localStorage.getItem('addedItem')))
    {
        product_area.innerHTML = JSON.parse(localStorage.getItem('addedItem')).map(e => {
            return `
                <div class=${localStorage.getItem('mode') === '#000' ? 'product-box-dark' : 'product-box'}>
                    <div class="product-img">
                        <img src="${e.product_img}" alt="${e.product_name}">
                    </div>
                    <div class="hover-items">
                        <i onclick='removeFromCart(${e.id})' class=${e.added == true ? "ri-shopping-cart-fill" : "ri-shopping-cart-line bag"}></i>
                    </div>
                    <div class="upper-items">
                        <h2 class="product-name">${e.product_name}</h2>
                    </div>
                    <p class="desc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis necessitatibus aspernatur sint molestias animi veritatis fugiat at voluptatibus quas culpa.</p>
                    <div class="bottom-items">
                        <h3 class="price">$${e.price}</h3>
                        <div class="rev">
                            <i class="ri-star-fill"></i>
                            <i class="ri-star-fill"></i>
                            <i class="ri-star-fill"></i>
                            <i class="ri-star-fill"></i>
                            <i class="ri-star-half-fill"></i>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
    }

}

// ========================================== DARK MODE =====================================================
let darkMode = () => {
    document.body.style.background = '#000';
    
        document.querySelectorAll('.hover-items i').forEach(box => {
            box.style.background = '#fff';
        });
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
        // document.querySelector('.sidebar .bottom-content .qty input').style.color = '#fff';
        document.querySelector('.sidebar .bottom-items .bottom-items-content').style.background = '#000';
        document.querySelector('.sidebar .bottom-items button:nth-child(1)').style.background = '#000'
        document.querySelectorAll('.sidebar .bottom-items button').forEach(e => {
            e.style.color = '#fff';
        })
    
        let addedItem = localStorage.getItem('addedItem') ? JSON.parse(localStorage.getItem('addedItem')) : [];
        product_area.innerHTML = addedItem.map(e => {
            return `
                <div class="product-box-dark">
                    <div class="product-img">
                        <img src="${e.product_img}" alt="${e.product_name}">
                    </div>
                    <div class="hover-items">
                        <i onclick='removeFromCart(${e.id})'  class=${e.added == true ? "ri-shopping-cart-fill" : "ri-shopping-cart-line bag"}></i>
                    </div>
                    <div class="upper-items">
                        <h2 class="product-name">${e.product_name}</h2>
                    </div>
                    <p class="desc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis necessitatibus aspernatur sint molestias animi veritatis fugiat at voluptatibus quas culpa.</p>
                    <div class="bottom-items">
                        <h3 class="price">$${e.price}</h3>
                        <div class="rev">
                            <i class="ri-star-fill"></i>
                            <i class="ri-star-fill"></i>
                            <i class="ri-star-fill"></i>
                            <i class="ri-star-fill"></i>
                            <i class="ri-star-half-fill"></i>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        
        document.getElementById('cartTitle').style.color = '#fff';
        // document.querySelector('.cart').style.borderBottom = '2px solid orangered';
        localStorage.setItem('mode',  document.body.style.background = '#000');
        updateSidebar();
    }
let lightMode = () => {
        document.querySelector('header').style.boxShadow = '0 0 0 0';
        document.querySelector('header').style.background = '#000';
        document.querySelector('header .rel').style.color = 'orangered';
        document.querySelector('header .rel').style.fontWeight= 'bolder';
        document.querySelector('.profile_nav').style.background = '#fff';
        document.querySelector('.profile_nav').style.color = '#000';
        document.querySelectorAll('.profile_nav .special_profile_nav').forEach(el => {
            el.style.background = '#fff';
            el.style.color = '#000';
            el.style.borderTop = 'none';
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
            e.style.color = '#000';
        })
        let addedItem = localStorage.getItem('addedItem') ? JSON.parse(localStorage.getItem('addedItem')) : [];
        product_area.innerHTML = addedItem.map(e => {
            return `
                <div class="product-box">
                    <div class="product-img">
                        <img src="${e.product_img}" alt="${e.product_name}">
                    </div>
                    <div class="hover-items">
                        <i onclick='removeFromCart(${e.id})'  class=${e.added == true ? "ri-shopping-cart-fill" : "ri-shopping-cart-line bag"}></i>
                    </div>
                    <div class="upper-items">
                        <h2 class="product-name">${e.product_name}</h2>
                    </div>
                    <p class="desc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis necessitatibus aspernatur sint molestias animi veritatis fugiat at voluptatibus quas culpa.</p>
                    <div class="bottom-items">
                        <h3 class="price">$${e.price}</h3>
                        <div class="rev">
                            <i class="ri-star-fill"></i>
                            <i class="ri-star-fill"></i>
                            <i class="ri-star-fill"></i>
                            <i class="ri-star-fill"></i>
                            <i class="ri-star-half-fill"></i>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    
        document.getElementById('cartTitle').style.color = '#000';
        localStorage.setItem('mode',  document.body.style.background = '#fff');
        updateSidebar();
}
if(localStorage.getItem("mode") === '#000'){
    darkMode();
}
else{
    lightMode();
}

// ================================= OPEN PROFILE FUNCTION====================================
let profile_img = document.querySelector('.profile_img');
let sideBar_profile_img = document.querySelector('.sidebar .rel .profile_img');

let profile_nav = document.querySelectorAll('.profile_nav');
let profile_nav_closeBtn = document.querySelector('.profile_nav_closeBtn');
profile_img.onclick = () => {
    profile_nav.forEach(e => {
        e.style.display = 'flex';
        e.style.translate = '0 0';
    })
}
sideBar_profile_img.onclick = () => {
    profile_nav.forEach(e => {
        e.style.display = 'flex';
        e.style.translate = '0 0';
    })

}
// ================================= CLOSE PROFILE FUNCTION====================================
profile_nav_closeBtn.onclick = () => {
    profile_nav.forEach(e => {
        e.style.display = 'none';
        e.style.translate = '100em 0';
    })
}

// ====================== OPEN & CLOSE SHOPPING CART FUNCTIONS ==============================
document.querySelectorAll('.bag').forEach(e => {
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


