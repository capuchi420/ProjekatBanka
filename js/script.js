document.querySelector('div.form label span').addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('div.modal').style.display = 'block';
  document.querySelector('div.modal').style.animation = 'float .55s';
  document.querySelector('div.gradient').style.zIndex = '2000';
  document.querySelector('div.gradient').style.background = 'rgba(0,0,0,.9)';
});

document.querySelector('i').addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('div.modal').style.animation = 'close-float .6s';
  setTimeout(function(){
    document.querySelector('div.modal').style.display = 'none';
  }, 500);
  document.querySelector('div.gradient').style.zIndex = '100';
  document.querySelector('div.gradient').style.background = 'linear-gradient(to bottom, rgba(0,0,0,.7), rgba(0,0,0,.8))';
});
