let signupBtn = document.querySelector('.signin button');
let firstName = document.querySelector('#first-name');
let lastName = document.querySelector('#last-name');
let userName = document.querySelector('#username');
let password = document.querySelector('#password');
let confirmedPassword = document.querySelector('#confirmed_password');
let signupInputs = document.querySelectorAll('input');

signupBtn.onclick = () => {
    if(firstName.value == '' || lastName.value == '' || password.value == ''){
        alert('Enter The Data');
    }
    else
    {
        localStorage.setItem('firstName', firstName.value);
        localStorage.setItem('lastName', lastName.value);
        localStorage.setItem('username', userName.value);
        localStorage.setItem('password', password.value);
        localStorage.setItem('confirPass', confirmedPassword.value);
        window.location = 'login.html';
       
    }
    if(localStorage.getItem('password') !== localStorage.getItem('confirPass'))
    {
        alert('The password is not correct')
    }
}

signupInputs.forEach(e => {
    e.onkeyup = (e) => {
        if(e.keyCode == 13)
        {
            if(firstName.value == '' || lastName.value == '' || password.value == ''){
                alert('Enter The Data');
            }
            else
            {
                localStorage.setItem('firstName', firstName.value);
                localStorage.setItem('lastName', lastName.value);
                localStorage.setItem('username', userName.value);
                localStorage.setItem('password', password.value);
                localStorage.setItem('confirPass', confirmedPassword.value);
                window.location = 'login.html';
               
            }
            if(localStorage.getItem('password') !== localStorage.getItem('confirPass'))
            {
                alert('The password is not correct')
            }
        }
    }
})
let toLoginPage = () => {
}

