class User{
  userID = '';
  username = '';
  email = '';
  password = '';

  apiURL = 'https://62efddcb57311485d129f278.mockapi.io';

  create(){
    let data = {
      Username: this.username,
      emailAdress: this.email,
      Password: this.password,
      Money: 0
    }

    data = JSON.stringify(data);

    fetch(this.apiURL + '/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    }).then(response => response.json()).then(data => {
      let session = new Session();
      session.userID = data.id;
      session.startSession();

      window.location.href = 'profile.html';
    });
  }

  login(){
    fetch(this.apiURL + '/user').then(response => response.json()).then(data => {
      let loginSuccessful = 0;
      data.forEach(user => {
        if(user.emailAdress === this.email && user.Password === this.password){
          let session = new Session();
          session.userID = user.id;
          session.startSession();
          loginSuccessful = 1;
          window.location.href = 'profile.html';
        }
      });

      if(loginSuccessful == 0){
        alert('Pogresan email ili lozinka');
      }

    });
  }

  async get(userID){
    let api = `${this.apiURL}/user/${userID}`;

    let response = await fetch(api);
    let data = await response.json();

    return data;
  }

  async takeMoney(userID, amout){
    let money = amout;
    let reportMoney = money;
    let api = `${this.apiURL}/user/${userID}`;

    let response = await fetch(api);
    let userData = await response.json();

    if(money <= userData.Money){
      let date = new Date();
      date.setTime(date.getTime());

      let data = {
        MoneyAddTaken: money,
        Date: date.toUTCString(),
        userID: userData.id
      }

      data = JSON.stringify(data);

      money = userData.Money - money;

      money = JSON.stringify(money);

      fetch(api, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: money
      }).then(response => response.json()).then(data => {
        console.log('sve je ok');
      });

      fetch(this.apiURL + '/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: data
      }).then(response => response.json()).then(data => {
        let report = document.createElement('div');
        report.classList.add('report');
        report.innerHTML = ` <div class="moneyTaken">
                                <label>-<span>${reportMoney}</span>$</label>
                              </div>
                              <div class="date">
                                <label>${data.Date}</label>
                              </div>`;
      });
    }else{
      alert("Nemate dovoljno novca na racunu");
    }
  }

  async addMoney(userID, amout){
    let money = amout;
    let reportMoney = money;
    let api = `${this.apiURL}/user/${userID}`;

    let response = await fetch(api);
    let userData = await response.json();

    if(true){
      let date = new Date();
      date.setTime(date.getTime());

      let data = {
        MoneyAddTaken: money,
        Date: date.toUTCString(),
        userID: userData.id
      }

      data = JSON.stringify(data);

      money = userData.Money + money;

      money = JSON.stringify(money);

      fetch(api, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: money
      }).then(response => response.json()).then(data => {
        console.log('sve je ok');
      });

      fetch(this.apiURL + '/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: data
      }).then(response => response.json()).then(data => {
        let report = document.createElement('div');
        report.classList.add('report');
        report.innerHTML = ` <div class="moneyTaken">
                                <label>+<span>${reportMoney}</span>$</label>
                              </div>
                              <div class="date">
                                <label>${data.Date}</label>
                              </div>`;
      });
    }
  }


}
