alert('Ukoliko se podaci ne ucitaju pretisnite \'CTRL + SHIFT + R\'');

let podigniBTN = document.querySelector('div.actions #podigniNovac');
podigniBTN.addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('#podigniModal').style.display = 'block';
  document.querySelector('div.gradient').style.zIndex = '2000';
  document.querySelector('div.gradient').style.background = 'rgba(0,0,0,.9)';
});

document.querySelector('div.actions #uplatiNovac').addEventListener('click', e => {
  e.preventDefault();
  document.querySelector('#uplatiModal').style.display = 'block';
  document.querySelector('div.gradient').style.zIndex = '2000';
  document.querySelector('div.gradient').style.background = 'rgba(0,0,0,.9)';
});

let session = new Session();
let sessionID = session.getSession();
let apiURL = 'https://62efddcb57311485d129f278.mockapi.io';

if(sessionID !== ""){
  async function showUserData(){
    let user = new User();
    user = await user.get(sessionID);

    document.querySelector('#username').innerText = user.Username;
    document.querySelector('#MONEY').innerText = user['Money'];
  }

  showUserData();

  async function showReports(){
    let user = new User();
    user = await user.get(sessionID);

    fetch(apiURL + '/report').then(response => response.json()).then(data => {
      for(let i = 0; i < data.length; i++){
        if(data[i].userID == user.id){
          if(data[i].Taken){
            let report = document.createElement('div');
            report.classList.add('report');
            report.innerHTML = ` <div class="moneyTaken">
                                    <label>-<span>${data[i].MoneyAddTaken}</span>$</label>
                                  </div>
                                  <div class="date">
                                    <label>${data[i].Date}</label>
                                  </div>`;

            document.querySelector('div.actionsDone').prepend(report);
          }else{
            let report = document.createElement('div');
            report.classList.add('report');
            report.innerHTML = ` <div class="moneyAdded">
                                    <label>+<span>${data[i].MoneyAddTaken}</span>$</label>
                                  </div>
                                  <div class="date">
                                    <label>${data[i].Date}</label>
                                  </div>`;

            document.querySelector('div.actionsDone').prepend(report);
          }
        }
      };

    });
  }

  showReports();

}else{
  window.location.href = '/';
}

document.querySelector('form#podigniForm').addEventListener('submit', e => {
  e.preventDefault();
  async function takeMoney(){
    let money = parseInt(document.querySelector('input#podigniAmout').value);
    let reportMoney = money;

    let user = new User();
    user = await user.get(sessionID);

    if(money <= user.Money){
      let date = new Date();
      date.setTime(date.getTime());

      let data = {
        MoneyAddTaken: money,
        Date: date.toUTCString(),
        userID: user.id,
        Taken: true
      }

      data = JSON.stringify(data);

      money = parseInt(user.Money) - money;

      let podaci = {
        Money: money
      }

      podaci = JSON.stringify(podaci);

      fetch(apiURL + '/user/' + user.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: podaci
      }).then(response => response.json()).then(data => {
        document.querySelector('#MONEY').innerText = data['Money'];
      });

      fetch(apiURL + '/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: data
      }).then(response => response.json()).then(data => {
        let report = document.createElement('div');
        report.classList.add('report');
        report.innerHTML = ` <div class="moneyTaken">
                                <label>-<span>${data.MoneyAddTaken}</span>$</label>
                              </div>
                              <div class="date">
                                <label>${data.Date}</label>
                              </div>`;

        document.querySelector('div.actionsDone').prepend(report);
      });
    }else{
      alert("Nemate dovoljno novca na racunu");
    }

    document.querySelector('#uplatiModal').style.display = 'none';
    document.querySelector('#podigniModal').style.display = 'none';
    document.querySelector('div.gradient').style.zIndex = '100';
    document.querySelector('div.gradient').style.background = 'linear-gradient(to bottom, rgba(0,0,0,.7), rgba(0,0,0,.8))';
  }

  takeMoney();
});

let uplatiFORM = document.querySelector('form#uplatiForm');
uplatiFORM.addEventListener('submit', e => {
  e.preventDefault();

  async function addMoney(){
    let money = parseInt(document.querySelector('input#uplatiAmout').value);
    let reportMoney = money;

    let user = new User();
    user = await user.get(sessionID);

    if(true){
      let date = new Date();
      date.setTime(date.getTime());

      let data = {
        MoneyAddTaken: money,
        Date: date.toUTCString(),
        userID: user.id,
        Taken: false
      }

      data = JSON.stringify(data);

      money = parseInt(user.Money) + money;
      let podaci = {
        Money: money
      }

      podaci = JSON.stringify(podaci);

      fetch(apiURL + '/user/' + user.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: podaci
      }).then(response => response.json()).then(data => {
        document.querySelector('#MONEY').innerText = data['Money'];
      });

      fetch(apiURL + '/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: data
      }).then(response => response.json()).then(data => {
        let report = document.createElement('div');
        report.classList.add('report');
        report.innerHTML = ` <div class="moneyAdded">
                                <label>+<span>${data.MoneyAddTaken}</span>$</label>
                              </div>
                              <div class="date">
                                <label>${data.Date}</label>
                              </div>`;

        document.querySelector('div.actionsDone').prepend(report);
      });
    }

    document.querySelector('#uplatiModal').style.display = 'none';
    document.querySelector('#podigniModal').style.display = 'none';
    document.querySelector('div.gradient').style.zIndex = '100';
    document.querySelector('div.gradient').style.background = 'linear-gradient(to bottom, rgba(0,0,0,.7), rgba(0,0,0,.8))';
  }

  addMoney();
});

document.querySelector('div.actions #odjaviSe').addEventListener('click', e => {
  e.preventDefault();

  session.destroySession();
  window.location.href = '/';
});

document.querySelector('i#close').addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('#uplatiModal').style.display = 'none';
  document.querySelector('#podigniModal').style.display = 'none';
  document.querySelector('div.gradient').style.zIndex = '100';
  document.querySelector('div.gradient').style.background = 'linear-gradient(to bottom, rgba(0,0,0,.7), rgba(0,0,0,.8))';
});
