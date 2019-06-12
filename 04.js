const dialog = document.querySelector('.dialog').textContent;
console.log(dialog.replace(/\s'|'\s/ig, '"'));





class InputInfo {
    constructor (name = '#name', tel = '#tel', email = '#email') {
        this.name = name;
        this.tel = tel;
        this.email = email;
        this._getClick();
    }

    _getClick() { //1
        const sendBtn = document.querySelector('.send-btn');
        sendBtn.addEventListener('click', () => {
            this._validName(this.name);
            this._validTel(this.tel);
            this._validEmail(this.email);
        });
    }

    _validName(input) { //3
        this.nameValue = document.querySelector(input).value;
        this.nameWarning = document.querySelector('.warning-name');
        const nameRegexp = new RegExp('[a-z]', 'ig');
        let result = nameRegexp.test(this.nameValue);
        this._validDisplay(result, input, this.nameWarning);
    }

    _validTel(input) { //3
        this.telValue = document.querySelector(input).value;
        this.telWarning = document.querySelector('.warning-tel');
        // console.log(/\+\d\(\d{3}\)\d{3}-\d{4}/.test(telNum));
        const telRegexp = new RegExp('\\+\\d\\(\\d{3}\\)\\d{3}-\\d{4}', '');
        let result = telRegexp.test(this.telValue);
        this._validDisplay(result, input, this.telWarning);
    }

    _validEmail(input) { //3
        this.emailValue = document.querySelector(input).value;
        this.emailWarning = document.querySelector('.warning-email');
        // console.log(/([a-z0-9]{2,})@([a-z]+)\.(ru|com)$/i.test(email));
        const emailRegexp = new RegExp('([a-z0-9]{2,})@([a-z]+)\\.(ru|com)$', 'i');
        let result = emailRegexp.test(this.emailValue);
        this._validDisplay(result, input, this.emailWarning);
    }

    _validDisplay (result, input, warning) {
        if (result) {
            console.log(result);
            document.querySelector(input).classList.remove('warning-border');
            warning.classList.remove('warning-text_visible');
            return;
        } else {
            console.log(result);
            document.querySelector(input).classList.add('warning-border');
            warning.classList.add('warning-text_visible');
        }
    }
}

const valid = new InputInfo();
