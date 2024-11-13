let product_area = document.querySelector('.products .products-boxes');
let close_btn = document.querySelector('.close');
let bag = document.querySelector('.bag');
let sideBar = document.querySelector('.sidebar');
let sidebarContent = document.querySelector('.sidebar .bottom-content');
let count = document.querySelector('.count h5');
let sidebarCount = document.querySelector('.sidebar-count h5');
let total = document.querySelector('.total span');
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
// =============================== DRAW PRODUCTS =====================================

bag.onclick = () =>
    {
        sideBar.style.display = 'flex';
    }
// ===================================== DRAW SIDEBAR CONTENT ==============================
let updateSidebar = () => {
    let addedItem = JSON.parse(localStorage.getItem('addedItem')) || [];
    
    sidebarContent.innerHTML = addedItem.map(item => 
        `<div class="content">
            <img src="${item.product_img}" alt="product">
            <div class="product-name">
                <h3>${item.product_name}</h3>
            </div>
            <div class=${localStorage.getItem('mode') === '#000' ? 'qty-dark' : 'qty' }>
                <button onclick="changeQuantity(${item.id}, -1)" class="mince">-</button>
                <input type="text" id="qtyNum" value="${item.qty}" readonly>
                <button onclick="changeQuantity(${item.id}, 1)" class="plus">+</button>
            </div>
            <div class="product-price">
                <h3>$${item.price}</h3>
            </div>
            <div onclick="deleteItem(${item.id})" class="delete">
                <i class="ri-delete-bin-6-fill trash"></i>
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
// ===================================== DRAW FAVORITE CONTENT ==============================


// ====================== ADD PRODUCT TO SHOPPING CART FUNCTION ================================
let r = localStorage.getItem('prods') ? JSON.parse(localStorage.getItem('prods')) : products;

let addToCart = (id) =>
{
    if(localStorage.getItem('username')){
        let addedItem = JSON.parse(localStorage.getItem('addedItem')) ||  [];

        let getAddedItemm = addedItem.find(e => e.id == id);
        if(getAddedItemm)
        {
            let sum = 0;
            addedItem.map(p => {
                // let pricee = p.price;
                sum += p.price;
                // console.log(sum);
                localStorage.setItem('prices', JSON.stringify(sum));
            })
            let getPrice =JSON.parse(localStorage.getItem('prices'));
            total.innerHTML = getPrice;
            let l = r.find(e => e.id == id);
            
            addedItem = addedItem.filter(e => e.id !== id);
            l.added = false;
            
        }
        else
        {
            let filterProducts = r.find(e => e.id == id);
            addedItem.push(filterProducts)
            filterProducts.added = true;
            
           
            
        
        }
           
        localStorage.setItem('addedItem',JSON.stringify(addedItem))
        localStorage.setItem('prods', JSON.stringify(r));
        // updateSidebar();

        product_area.innerHTML = r.map(e => {
            return `
                <div class=${localStorage.getItem('mode') === '#000' ? 'product-box-dark' : 'product-box'}>
                        <div class="product-img">
                            <img src="${e.product_img}" alt="${e.product_name}">
                        </div>
                        <div class="hover-items">
                            <i onclick='addToCart(${e.id})'  class=${e.added == true ? "ri-shopping-cart-fill" : "ri-shopping-cart-line bag"}></i>
                            <i onclick='addToFavorite(${e.id})' class=${e.liked == true ? "ri-heart-3-fill" : "ri-heart-line"}></i>
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
        let sum = 0;
            addedItem.map(p => {
                sum += p.price;
                localStorage.setItem('prices', JSON.stringify(sum));
            })
            let getPrice =JSON.parse(localStorage.getItem('prices'));
            total.innerHTML = getPrice;
            updateSidebar();
            
    }
    else
    {
        window.location = 'login.html';
    }
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


// =============================== DELETE PRODCUT FROM SHOPPING CART =================
let deleteItem = (id) => {
    let getAddedItem = JSON.parse(localStorage.getItem('addedItem'));
    let filterAddedProduct = getAddedItem.filter(e => e.id != id);
    localStorage.setItem('addedItem',JSON.stringify(filterAddedProduct));
    let addedItem = JSON.parse(localStorage.getItem('addedItem'));

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
// =========================== ADD TO FAVORITE FUNCTION ===============================

let getProducts = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : products;
let getFav = JSON.parse(localStorage.getItem('favorite'));
let favItem = localStorage.getItem('favId') ? JSON.parse(localStorage.getItem('favId')) : [];

let addToFavorite = (id) =>
{
    if(localStorage.getItem('username'))
    {
        
        let fovoritedItem = favItem.find(e => e.id == id);
        if(fovoritedItem)
        {
            favItem = favItem.filter(e => e.id !== id)
            let l = r.find(e => e.id == id);
            l.liked = false;
        }
        else
        {
            let getId = r.find(e => e.id == id);
            favItem = [...favItem, getId];
            getId.liked = true;
                
                
        }
        localStorage.setItem('favId',JSON.stringify(favItem));
        localStorage.setItem('prods', JSON.stringify(r));
        product_area.innerHTML = r.map(e => {
            return `
                <div class=${localStorage.getItem('mode') === '#000' ? 'product-box-dark' : 'product-box'}>
                        <div class="product-img">
                            <img src="${e.product_img}" alt="${e.product_name}">
                        </div>
                        <div class="hover-items">
                            <i onclick='addToCart(${e.id})'  class=${e.added == true ? "ri-shopping-cart-fill" : "ri-shopping-cart-line bag"}></i>
                            <i onclick='addToFavorite(${e.id})' class=${e.liked == true ? "ri-heart-3-fill" : "ri-heart-line"}></i>
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
        let getMode = localStorage.getItem('mode');
        if(getMode === '#000')
        {
          darkMode();
        }
        else
        {
          product_area.innerHTML = JSON.parse(localStorage.getItem('prods')).map(e => {
              return `
                  <div class="product-box">
                      <div class="product-img">
                          <img src="${e.product_img}" alt="${e.product_name}">
                      </div>
                      <div class="hover-items">
                          <i onclick='addToCart(${e.id})' class=${e.added == true ? "ri-shopping-cart-fill" : "ri-shopping-cart-line bag"}></i>
                          <i onclick='addToFavorite(${e.id})' class=${e.liked == true ? "ri-heart-3-fill" : "ri-heart-line"}></i>
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
    else
    {
        window.location = 'login.html';
    }
};



// ================================ REFRESH PAGE FUNCTION ========================================================
window.onload = () => 
{
    updateSidebar();
    
    let getPords = localStorage.getItem('prods');
      if(getPords){
            getProducts = JSON.parse(getPords);
            product_area.innerHTML = getProducts.map(e => {
                return `
                    <div class=${localStorage.getItem('mode') === '#000' ? 'product-box-dark' : 'product-box'}>
                        <div class="product-img">
                            <img src="${e.product_img}" alt="${e.product_name}">
                        </div>
                        <div class="hover-items">
                            <i onclick='addToCart(${e.id})' class=${e.added == true ? "ri-shopping-cart-fill" : "ri-shopping-cart-line bag"}></i>
                            <i onclick='addToFavorite(${e.id})' class=${e.liked == true ? "ri-heart-3-fill" : "ri-heart-line"}></i>
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
      let getMode = localStorage.getItem('mode');
      if(getMode === '#000')
      {
        darkMode();
      }
      else
      {
        let getProds = localStorage.getItem('prods') ? JSON.parse(localStorage.getItem('prods')) : products;
        product_area.innerHTML = getProds.map(e => {
            return `
                <div class="product-box">
                    <div class="product-img">
                        <img src="${e.product_img}" alt="${e.product_name}">
                    </div>
                    <div class="hover-items">
                        <i onclick='addToCart(${e.id})' class=${e.added == true ? "ri-shopping-cart-fill" : "ri-shopping-cart-line bag"}></i>
                        <i onclick='addToFavorite(${e.id})' class=${e.liked == true ? "ri-heart-3-fill" : "ri-heart-line"}></i>
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
// ================================= OPEN PROFILE FUNCTION ====================================
let profile_img = document.querySelectorAll('.profile_img');
let sideBar_profile_img = document.getElementById('profile_img');

let profile_nav = document.querySelector('.profile_nav');
let profile_nav_closeBtn = document.querySelector('.profile_nav_closeBtn');
profile_img.onclick = () => {
    profile_nav.forEach(e => {
        e.style.display = 'flex';
        e.style.translate = '0 0';
    })
}
profile_img.forEach(e => {
    e.onclick = () => {
        profile_nav.style.display = 'flex';
        profile_nav.style.translate = '0 0';
    }
    
})
// ================================= CLOSE PROFILE FUNCTION ====================================
profile_nav_closeBtn.onclick = () => {
    profile_nav.style.display = 'none';

}


// ================================= DRAW FAVORITES PRODUCTS FUNCTION====================================
let toFavPage = () => {
    window.location = 'favoritePage.html';
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

    


    let getProds = localStorage.getItem('prods') ? JSON.parse(localStorage.getItem('prods')) : products;
    product_area.innerHTML = getProds.map(e => {
    return `
        <div class='product-box-dark'>
            <div class="product-img">
                <img src="${e.product_img}" alt="${e.product_name}">
            </div>
            <div class="hover-items">
                <i onclick='addToCart(${e.id})' class=${e.added == true ? "ri-shopping-cart-fill" : "ri-shopping-cart-line bag"}></i>
                <i onclick='addToFavorite(${e.id})' class=${e.liked == true ? "ri-heart-3-fill" : "ri-heart-line"}></i>
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
    localStorage.setItem('mode',  document.body.style.background = '#000');
    updateSidebar();
}
// ===================================== LIGHT MODE FUNCTION ===============================
let lightMode = () => {
    document.querySelector('header').style.boxShadow = '0 0 0 0';
    document.querySelector('header').style.background = '#000';
    document.querySelector('header .rel').style.color = 'orangered';
    document.querySelector('header .rel').style.fontWeight= 'bolder';
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
    let getProds = localStorage.getItem('prods') ? JSON.parse(localStorage.getItem('prods')) : products;
    product_area.innerHTML = getProds.map(e => {
        return `
            <div class="product-box">
                <div class="product-img">
                    <img src="${e.product_img}" alt="${e.product_name}">
                </div>
                <div class="hover-items">
                    <i onclick='addToCart(${e.id})' class=${e.added == true ? "ri-shopping-cart-fill" : "ri-shopping-cart-line bag"}></i>
                    <i onclick='addToFavorite(${e.id})' class=${e.liked == true ? "ri-heart-3-fill" : "ri-heart-line"}></i>
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
    localStorage.setItem('mode',  document.body.style.background = '#fff');
    updateSidebar();

}
// ============================== LOGOUT FUNCTION ===================================
let toLogout = () => {
    window.location = 'login.html';
}

// ================================== TO CART  PAGE =======================================
let toCart = () => {
    window.location = 'cartPage.html';
}
// ================================ SHOW PROFILE FUNCTION ======================================
let toProfile = () =>
    {
        window.location = 'profile.html';
    }
// ========================== To Checkout Page ===================================
let toCheckoutPage = () => {
    window.location = 'checkout.html'
}

let toHomePage = () => {
    window.location = 'index.html'
}

console.log(innerWidth,innerHeight);