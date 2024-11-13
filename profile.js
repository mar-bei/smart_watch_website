let product_area = document.querySelector('.products .products-boxes');
let close_btn = document.querySelector('.close');
let bag = document.querySelector('.bag');
let sideBar = document.querySelector('.sidebar');
let sidebarContent = document.querySelector('.sidebar .bottom-content');
let count = document.querySelector('.count h5');
let sidebarCount = document.querySelector('.sidebar-count h5');
let total = document.querySelector('.total span');
let signupBtn = document.querySelector('.signin button');
let firstName = document.querySelector('#first-name');
let lastName = document.querySelector('#last-name');
let userName = document.querySelector('#username');
let password = document.querySelector('#password');
let confirmedPassword = document.querySelector('#confirmed_password');
let firstName_section = document.querySelector('.firstName-section input');
let lastName_section = document.querySelector('.lastName-section input');
let userName_section = document.querySelector('.userName-section input');
let password_section = document.querySelector('.password-section input');
let left_side_name = document.querySelector('.left_side_name h3');
let inpuut = document.querySelectorAll('input');
let confirm_btn = document.querySelector('.confirm');
let refuse_btn = document.querySelector('.refuse');
let confirmation_content = document.querySelector('.confirmation-content');
let get_fristName = localStorage.getItem('firstName');
let get_lastName = localStorage.getItem('lastName');
let get_username = localStorage.getItem('username');
let get_password = localStorage.getItem('password');
let get_confPass = localStorage.getItem('confirPass');
let get_url = localStorage.getItem('profile_img');
let prof_img = document.querySelectorAll('img.profile_img');
prof_img.forEach(e => {
    e.src = get_url || e.src;
})
let profile_nav_name = document.querySelector('h3.text');
profile_nav_name.textContent = get_username;
firstName_section.value = get_fristName;
lastName_section.value = get_lastName;
userName_section.value = get_username;
password_section.value = get_password;
left_side_name.innerHTML = get_username;

// ===================================== DRAW SIDEBAR CONTENT ==============================
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
// =============================== DELETE PRODCUT FROM SHOPPING CART =================
let deleteItem = (id) => {
    let getAddedItem = JSON.parse(localStorage.getItem('addedItem'));
    let filterAddedProduct = getAddedItem.filter(e => e.id != id);
    localStorage.setItem('addedItem',JSON.stringify(filterAddedProduct));
    let addedItem = JSON.parse(localStorage.getItem('addedItem'));

        updateSidebar();
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
// ================================= CHANGE QUANTITY FUNCTION ==============================;
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

let toFavPage = () =>
{
    window.location = 'favoritePage.html';
}

// ================================ EDIT PROFILE ==================================
let editProfile = () => 
{
    inpuut.forEach(e => {
        e.value= '';
        e.onkeyup = (e) =>
        {
            if(e.keyCode === 13)
            {
                localStorage.setItem('firstName',firstName_section.value);
                localStorage.setItem('lastName',lastName_section.value);
                localStorage.setItem('username',userName_section.value);
                localStorage.setItem('password',password_section.value);
                let get_username = localStorage.getItem('username');
                left_side_name.innerHTML = get_username;
                profile_nav_name.innerHTML = get_username;
            
            }
        }
    })
    
}

// ============================== LOGOUT FUNCTION ========================================
let toLogout = () => {
    window.location = 'login.html';
}
// ========================================== DARK MODE =====================================================
let darkMode = () => {
    let product_area_box = document.querySelectorAll('.product-box');
        document.body.style.background = '#000';
        product_area_box.forEach(box => {
            box.style.background = '#ff4500';
            box.style.color = '#fff';
    
        });
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
        document.querySelector('.sidebar .bottom-items .bottom-items-content').style.background = '#000';
        document.querySelector('.sidebar .bottom-items button:nth-child(1)').style.background = '#000'
        document.querySelectorAll('.sidebar .bottom-items button').forEach(e => {
            e.style.color = '#fff';
        })
        document.querySelector('.left_side').style.background = '#000';
        document.querySelector('.left_side').style.marginTop = '0.4em';
        document.querySelector('.left_side').style.color = '#fff';
        document.querySelectorAll('.left_side .special_left_side').forEach(el => {
            el.style.background = '#000';
        })
        document.querySelector('.left_side .left_side_mode').style.borderTop = 'none';
        document.querySelector('.left_side .left_side_mode').style.borderRight = 'none';
        document.querySelector('.left_side_darkMode').style.display = 'none';
        document.querySelector('.left_side_lightMode').style.display = 'flex';
        document.querySelector('.profile-graph').style.background = '#000';
        document.querySelector('.profile-graph-content').style.background = '#000';
        document.querySelector('.profile-graph-content').style.border = '3px solid #fff';
        document.querySelector('.profile-graph-content').style.borderRight = 'none';
        document.querySelector('.profile-graph-content .percentage-visit').style.background = '#000';
        document.querySelector('.profile_informations .profile-informations-content').style.background = '#000';
        document.querySelector('.profile-graph-content h2').style.color = 'orangered';
        document.querySelectorAll('.profile-informations-content input').forEach(e => {
            e.style.background = '#000';
        })
        document.querySelectorAll('.profile-informations-content input').forEach(e => {
            e.style.border = ' 2px solid orangered';
        })        
        document.querySelectorAll('.profile-informations-content input').forEach(e => {
            e.style.color = '#fff';
        }) 
        document.querySelectorAll('.profile-graph-content .percentage-visit li').forEach(e => {
            e.style.borderBottom = '1.3px solid #fff';
        });
        document.querySelectorAll('.profile-graph-content .percentage-days ul li div').forEach(e => {
            e.style.color = '#fff';
        });
       
        document.querySelectorAll('.profile-graph-content .percentage-visit li div').forEach(e => {
            e.style.color = '#fff';
        })
        confirmation_content.style.background = '#000';
        confirmation_content.style.color = '#fff';
        confirm_btn.style.color = '#fff';
        refuse_btn.style.color = '#fff';

        document.querySelectorAll('.profile-graph-content .percentage-visit li').forEach(e => {
            e.style.setProperty('--before-border', '1.5px solid #fff');
        })

       

        localStorage.setItem('mode',  document.body.style.background = '#000');
        updateSidebar();
    }

// ======================================== LIGHT MODE FUNCTION ===========================================
let lightMode = () => {
    let product_area_box = document.querySelectorAll('.product-box');
    
        document.body.style.background = '#fff';
        product_area_box.forEach(box => {
            box.style.background = '#ff4500';
            box.style.color = '#fff';
    
        });
        document.querySelectorAll('.hover-items i').forEach(box => {
            box.style.background = '#fff';
        });
        document.querySelector('header').style.boxShadow = '0 0 0 #000';
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
            e.style.color = '#000';
        })
        document.querySelector('.left_side').style.background = '#fff';
        document.querySelector('.left_side').style.marginTop = '0';

        document.querySelector('.left_side').style.color = '#000';
        // document.querySelector('.left_side').style.boxShadow = '3px -3px 17px #484747';
        document.querySelectorAll('.left_side .special_left_side').forEach(el => {
            el.style.background = '#fff';
        })
        document.querySelector('.left_side .left_side_mode').style.borderTop = 'none';
        document.querySelector('.left_side .left_side_mode').style.borderRight = 'none';
        document.querySelector('.left_side_darkMode').style.display = 'flex';
        document.querySelector('.left_side_lightMode').style.display = 'none';
        document.querySelector('.profile-graph').style.background = '#fff';
        document.querySelector('.profile-graph-content').style.background = '#fff';
        document.querySelector('.profile-graph-content').style.border = '3px solid #000';
        document.querySelector('.profile-graph-content').style.borderRight = 'none';
        document.querySelector('.profile-graph-content .percentage-visit').style.background = '#fff';
        document.querySelector('.profile_informations .profile-informations-content').style.background = '#fff';
        document.querySelector('.profile-graph-content h2').style.color = '#000';

        document.querySelectorAll('.profile-informations-content input').forEach(e => {
            e.style.background = '#fff';
        })
        document.querySelectorAll('.profile-informations-content input').forEach(e => {
            e.style.border = ' 2px solid #000';
        })        
        document.querySelectorAll('.profile-informations-content input').forEach(e => {
            e.style.color = '#000';
        })

            
        document.querySelectorAll('.profile-graph-content .percentage-visit li').forEach(e => {
            e.style.borderBottom = '1px solid #000';
        });
        document.querySelectorAll('.profile-graph-content .percentage-days ul li div').forEach(e => {
            e.style.color = '#000';
        });
        document.querySelectorAll('.profile-graph-content .percentage-visit li::before').forEach(e => {
            e.style.borderBottom = '1px solid #000';
        });
        document.querySelectorAll('.profile-graph-content .percentage-visit li div').forEach(e => {
            e.style.color = '#000';
        })
        confirmation_content.style.background = '#fff';
        confirmation_content.style.color = '#000';
        confirm_btn.style.color = '#000';
        refuse_btn.style.color = '#000';

        document.querySelectorAll('.profile-graph-content .percentage-visit li').forEach(e => {
            e.style.setProperty('--before-border', '1px solid #000');
        })
    localStorage.setItem('mode', '#fff');
    updateSidebar();
}

// ===================================== ONLOAD PADE FUNCTION ===========================================
window.onload = () =>
    {
        updateSidebar();
      let getMode = localStorage.getItem('mode');

        if(getMode === '#000')
            {
              darkMode();
            }
            else
            {
                lightMode();
            }
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



// ============================== CHANGE PROFILE IMAGE =========================================
let prof_img_input = document.querySelector('#profile_image');

prof_img_input.onchange = () => {
    let img_file = prof_img_input.files[0];
    let reader = new FileReader();
    reader.addEventListener('load', () => {
        let img_url = reader.result;
        localStorage.setItem('profile_img', img_url);
        let get_url = localStorage.getItem('profile_img');
        let prof_img = document.querySelectorAll('img.profile_img');
prof_img.forEach(e => {
    e.src = get_url || e.src;
})
        
    })
    reader.readAsDataURL(img_file);

  
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
// ======================================== REMOVE ACCOUNT FUNCTION ========================================
let removeAcc = () => {
    confirmation_content.style.display = 'flex';
    confirm_btn.onclick = () => {
        localStorage.clear();
        window.location = 'signup.html';
    }
    refuse_btn.onclick = () => {
        confirmation_content.style.display = 'none';  
    }

}

let toHomePage = () => {
    window.location = 'index.html';
}