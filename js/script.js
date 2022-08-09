let session = new Session();
session = session.getSession();

if(session !== ""){
  window.location.href = 'profile.html';
}

alert('Ukoliko \'Kreiraj novi nalog\' ili Login dugme ne rade, osvezite stranicu \'CTRL + SHIFT + R\'');

/*----------------------------------------------- Open and close modal -------------------------------------------------------*/
document.querySelector('span#kreirajNoviNalogBTN').addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('#modal').style.display = 'block';
  document.querySelector('#modal').style.animation = 'float .8s';
  document.querySelector('div.gradient').style.zIndex = '2000';
  document.querySelector('div.gradient').style.background = 'rgba(0,0,0,.9)';
});

document.querySelector('i').addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('#modal').style.animation = 'close-float .8s';
  setTimeout(function(){
    document.querySelector('#modal').style.display = 'none';
  }, 700);


  document.querySelector('div.gradient').style.zIndex = '100';
  document.querySelector('div.gradient').style.background = 'linear-gradient(to bottom, rgba(0,0,0,.7), rgba(0,0,0,.8))';
});

let config = {
  "username": {
    req: true,
    minlength: 4,
    maxlength: 30
  },

  "emailReg": {
    req: true,
    email: true,
    minlength: 0,
    maxlength: 30
  },

  "lozinka": {
    req: true,
    minlength: 8,
    maxlength: 30
  },

  "passwordReg": {
    req: true,
    minlength: 8,
    maxlength: 30,
    match: "repeat-password"
  },

  "repeat-password": {
    req: true,
    minlength: 8,
    maxlength: 30,
    match: "passwordReg"
  }
}

let validator = new Validator(config, '#regForm');

document.querySelector('#regForm').addEventListener('submit', e => {
  e.preventDefault();
  if(validator.validationPassed()){
    let user = new User();
    user.username = document.querySelector('#username').value;
    user.email = document.querySelector('#email').value;
    user.password = document.querySelector('#password').value;

    user.create();
  }else{
    alert('Polja nisu ispravno popunjena');
  }
});

document.querySelector('#loginForm').addEventListener('submit', e => {
  e.preventDefault();
  let email = document.querySelector('#loginEmail').value;
  let password = document.querySelector('#loginPassword').value;

  let user = new User();
  user.email = email;
  user.password = password;
  user.login();
});
