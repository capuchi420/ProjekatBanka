let config = {
  "username": {
    req: true,
    minlength: 4,
    maxlength: 30
  },

  "email": {
    req: true,
    email: true,
    minlength: 0,
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

  "password": {
    req: true,
    minlength: 8,
    maxlength: 30,
    match: "repeat-password"
  },

  "repeat-password": {
    req: true,
    minlength: 8,
    maxlength: 30,
    match: "password"
  }
}

let validator = new Validator(config);
let submitBTN = document.querySelectorAll('input[type="submit"]');
submitBTN.forEach((item) => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
  });
});


document.querySelector('div.form label span').addEventListener('click', (e) => {
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
