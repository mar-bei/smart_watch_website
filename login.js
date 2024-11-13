let signupBtn = document.querySelector('.signin button');
let firstName = document.querySelector('#first-name');
let lastName = document.querySelector('#last-name');
let userName = document.querySelector('#username');
let password = document.querySelector('#password');
let confirmedPassword = document.querySelector('#confirmed_password');
let signinInputs = document.querySelectorAll('input');

let get_fristName = localStorage.getItem('firstName');
let get_lastName = localStorage.getItem('lastName');
let get_username = localStorage.getItem('username');
let get_password = localStorage.getItem('password');
let get_confPass = localStorage.getItem('confirPass');

signupBtn.onclick = () => {
    if(userName.value == get_username && password.value == get_password)
    {
        window.location = 'index.html';
    }
    else
    {
        alert('The informations are not correct')
    }
}

signinInputs.forEach(e => {
    e.onkeyup = (e) => {
        if(e.keyCode == 13)
        {
           if(userName.value == get_username && password.value == get_password)
            {
                window.location = 'index.html';
            }
            else
            {
                alert('The informations are not correct')
            }  
        }
       
    }
})