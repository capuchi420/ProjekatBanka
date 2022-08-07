document.querySelector('#podigniNovac').addEventListener('click', e => {
  e.preventDefault();
  document.querySelector('#modalAction').style.display = 'block';
  document.querySelector('div.gradient').style.zIndex = '2000';
  document.querySelector('div.gradient').style.background = 'rgba(0,0,0,.9)';

  document.querySelector('div.form form label span').innerText = "podignete";
  document.querySelector('input.actionExe').value = "Podigni novac";
  document.querySelector('input.actionExe').style.background = '#00a931';
});

document.querySelector('#uplatiNovac').addEventListener('click', e => {
  e.preventDefault();
  document.querySelector('#modalAction').style.display = 'block';
  document.querySelector('div.gradient').style.zIndex = '2000';
  document.querySelector('div.gradient').style.background = 'rgba(0,0,0,.9)';

  document.querySelector('div.form form label span').innerText = "uplatite";
  document.querySelector('input.actionExe').value = "Uplati novac";
  document.querySelector('input.actionExe').style.background = '#4786fa';
});

document.querySelector('i#close').addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('#modalAction').style.display = 'none';
  document.querySelector('div.gradient').style.zIndex = '100';
  document.querySelector('div.gradient').style.background = 'linear-gradient(to bottom, rgba(0,0,0,.7), rgba(0,0,0,.8))';
});