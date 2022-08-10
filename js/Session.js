class Session{
  userID = '';

  startSession(){
    const date = new Date();
    date.setTime(date.getTime() + (2*24*60*60*1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = `userID=${this.userID};${expires}`;
  }

  getSession(){
    let name = 'userID=';
    let ca = document.cookie.split(';');

    for(let i = 0; i < ca.length; i++){
      let c = ca[i].substring(1, 8);
      if(c == name){
        let aaa = ca[i].substring(name.length+1, ca[i].length);

        return aaa;
      }
    }

    //let aaa = ca.length > 0 ? ca.substring(name.length, ca.length) : "";

    return "";
  }

  destroySession(){
    let cookies = document.cookie.split(';');

    for(let i = 0; i < cookies.length; i++){
      let cookie = cookies[i];
      let eqPos = cookie.indexOf('=');
      let name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }
}
