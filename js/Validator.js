class Validator{
  constructor(config, formID){
    this.config = config;
    this.formID = formID;
    this.erorrs = {};

    this.generateErrors();
    this.inputListener();
  }

  generateErrors(){
    for(let input in this.config){
      this.erorrs[input] = [];
    }
  }

  inputListener(){
    for(let input in this.config){
      let element = document.querySelector(`input[name="${input}"]`);
      element.addEventListener('input', this.validate.bind(this));
    }
  }

  validate(e){
    let elements = this.config;

    let input = e.target;
    let inputName = input.getAttribute('name');
    let inputValue = input.value;

    this.erorrs[inputName] = [];

    if(elements[inputName].req){
      if(inputValue === ''){
        this.erorrs[inputName].push('Polje je prazno');
      }
    }

    if(elements[inputName].email){
      if(!this.validateEmail(inputValue)){
        this.erorrs[inputName].push('Neispravna email adresa');
      }
    }

    if(inputValue.length < elements[inputName].minlength || inputValue.length > elements[inputName].maxlength){
      this.erorrs[inputName].push(`Polje mora imati minimalno ${elements[inputName].minlength} i maksimalno ${elements[inputName].maxlength} karaktera`);
    }

    if(elements[inputName].match){
      let matchElement = document.querySelector(`input[name="${elements[inputName].match}"]`);
      if(inputValue !== matchElement.value){
        this.erorrs[inputName].push('Lozinke se ne poklapaju');
      }

      if(this.erorrs[inputName].length === 0){
        this.erorrs[inputName] = [];
        this.erorrs[elements[inputName].match] = [];
      }
    }

    this.showErorrs(this.erorrs);
  }

  showErorrs(erorrs){
    for(let elem of document.querySelectorAll('ul')){
      elem.remove();
    }

    for(let key of Object.keys(erorrs)){
      let parentElement = document.querySelector(`input[name="${key}"]`).parentElement;
      let erorrsElement = document.createElement('ul');
      parentElement.appendChild(erorrsElement);

      erorrs[key].forEach(erorr => {
        let li = document.createElement('li');
        li.innerHTML = `<i class="fa-solid fa-exclamation"></i> ${erorr}`;

        erorrsElement.appendChild(li);
      });
    }
  }

  validateEmail(email){
    if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      return true;
    }
    return false;
  }

  validationPassed(){
    for(let key of Object.keys(this.erorrs)){
      if(this.erorrs[key].lenght > 0){
        return false;
      }

      return true;
    }
  }
}
