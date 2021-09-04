const App = {
  init: function () {
    Modal.init();
    Toast.init();
  },
};

const Modal = {
  id: 'modal',
  title: 'h5.modal-title',
  body: 'div.modal-body',
  type: {
    LOGIN: 1,
    SIGNUP: 2,
  },
  init: function () {
    const btnLogin = Helpers.getById('btn-login'),
      btnSignup = Helpers.getById('btn-signup'),
      btnSubmit = Helpers.getById('btn-submit'),
      modalId = Helpers.getById(this.id);

    btnLogin.addEventListener('click', () => this.buildByType(this.type.LOGIN));
    btnSignup.addEventListener('click', () =>
      this.buildByType(this.type.SIGNUP)
    );
    btnSubmit.addEventListener('click', () => this.submitByType());
    modalId.addEventListener('hide.bs.modal', () => {
      this.clean();
    });

    new bootstrap.Modal(modalId, { backdrop: 'static', keyboard: false });
  },
  buildByType: function (type) {
    if (type !== '') {
      if (type === this.type.LOGIN) {
        Helpers.getBySelector(this.title).textContent = 'Login';
        Helpers.modalForm('text', 'loginUser', 'User');
        Helpers.modalForm('password', 'loginPassword', 'Password');
        Helpers.setDataAttribute(
          Helpers.getById('btn-submit'),
          'submit-type',
          this.type.LOGIN
        );
      }
      if (type === this.type.SIGNUP) {
        Helpers.getBySelector(this.title).textContent = 'Sign-up';
        Helpers.modalForm('email', 'signupEmail', 'Email');
        Helpers.modalForm('text', 'signupUser', 'User');
        Helpers.modalForm('password', 'signupPassword', 'Password');
        Helpers.setDataAttribute(
          Helpers.getById('btn-submit'),
          'submit-type',
          this.type.SIGNUP
        );
      }

      bootstrap.Modal.getInstance(Helpers.getById(this.id)).show();
    }
  },
  submitByType: function () {
    const type = parseInt(
      Helpers.getDataAttribute(
        Helpers.getById('btn-submit'),
        'data-submit-type'
      )
    );

    // login
    if (type === this.type.LOGIN) {
      if (
        !Validator.validate(
          Helpers.getById('loginUser').value,
          Validator.REQUIRED
        )
      ) {
        Toast.show('Username can not be empty.');
      } else if (
        !Validator.validate(
          Helpers.getById('loginPassword').value,
          Validator.REQUIRED
        )
      ) {
        Toast.show('Password can not be empty');
      } else {
        Ajax.login(
          Helpers.getValueById('loginUser'),
          Helpers.getValueById('loginPassword')
        );
      }
    }

    // signup
    if (type === this.type.SIGNUP) {
      if (
        !Validator.validate(
          Helpers.getById('signupEmail').value,
          Validator.REQUIRED
        )
      ) {
        Toast.show('Email addres can not be empty.');
      } else if (
        !Validator.validate(
          Helpers.getById('signupUser').value,
          Validator.REQUIRED
        )
      ) {
        Toast.show('Username can not be empty.');
      } else if (
        !Validator.validate(
          Helpers.getById('signupPassword').value,
          Validator.REQUIRED
        )
      ) {
        Toast.show('Password can not be empty');
      } else {
        Ajax.signup(
          Helpers.getValueById('signupEmail'),
          Helpers.getValueById('signupUser'),
          Helpers.getValueById('signupPassword')
        );
      }
    }
  },
  clean: function () {
    Helpers.getBySelector(this.body).innerHTML = '';
  },
};

const Validator = {
  REQUIRED: 'REQUIRED',
  MIN_LENGTH: 'MIN_LENGTH',
  MAX_LENGTH: 'MAX_LENGTH',
  validate: function (value, flag, validatorValue) {
    switch (flag) {
      case this.REQUIRED:
        return value.trim().length > 0;
      case this.MIN_LENGTH:
        return value.trim().length > validatorValue;
      case this.MAX_LENGTH:
        return value.trim().length < validatorValue;
      default:
        break;
    }
  },
};

const Ajax = {
  url: {
    landing: 'http://127.0.0.1:5500/build/',
    app: 'http://localhost:4000',
  },
  signup: function (email, username, password) {
    const params = {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        username,
        password,
      }),
    };

    fetch(`${this.url.app}/signup`, params)
      //.then((response) => response.json())
      .then((data) => console.log(data));
  },
  login: function (username, password) {
    const params = {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    };

    fetch(`${this.url.app}/login`, params)
      .then((response) => response.json())
      .then((data) =>
        data.auth
          ? this.handleSuccess(data.token, data.redirect)
          : this.handleError(data.message)
      );
  },
  handleSuccess: function (token, redirect) {
    if (token !== null && redirect !== null) {
      Helpers.redirectForm(token, redirect);
    }
  },
  handleError: function () {},
};

const Toast = {
  id: 'toast',
  description: '',
  instance: {},
  init: function () {
    this.instance = new bootstrap.Toast(Helpers.getById(this.id), {});
  },
  show: function (message) {
    Helpers.getBySelector(`#${Toast.id} .toast-body`).textContent = message;
    this.instance.show();
  },
};

const Helpers = {
  getById: function (id) {
    return document.getElementById(id);
  },
  getBySelector: function (selector) {
    return document.querySelector(selector);
  },
  getValueById: function (id) {
    return document.getElementById(id).value.trim();
  },
  getDataAttribute: function (element, name) {
    return element.getAttribute(name);
  },
  setDataAttribute: function (element, name, value) {
    return element.setAttribute(`data-${name}`, value);
  },
  createNode: function (element) {
    return document.createElement(element);
  },
  append: function (parent, element) {
    return parent.appendChild(element);
  },
  modalForm: function (inputType, inputId, labelText) {
    const body = this.getBySelector(Modal.body);
    let container = this.createNode('div');
    let label = this.createNode('label');
    let input = this.createNode('input');

    container.classList.add('mb-3', 'mx-3');
    label.setAttribute('for', inputId);
    label.textContent = labelText;
    label.classList.add('form-label');
    input.setAttribute('id', inputId);
    input.setAttribute('type', inputType);
    input.classList.add('form-control');

    this.append(container, label);
    this.append(container, input);
    this.append(body, container);
  },
  redirectForm: function (hiddenValue, actionValue) {
    const form = this.createNode('form');
    const hidden = this.createNode('input');

    form.method = 'POST';
    form.action = actionValue;
    hidden.type = 'hidden';
    hidden.name = 'hidden';
    hidden.value = hiddenValue;
    this.append(this.getBySelector('body'), form);
    this.append(form, hidden);
    form.submit();
  },
};

(function () {
  App.init();
})();
