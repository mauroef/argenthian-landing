const App = {
  init: function () {
    Modal.init();
  },
};

const Modal = {
  id: 'modal',
  title: 'h5.modal-title',
  body: 'div.modal-body',
  type: {
    login: 1,
    signup: 2,
  },
  init: function () {
    const btnLogin = Helpers.getById('btnLogin'),
      btnSignup = Helpers.getById('btnSignup'),
      modalId = Helpers.getById(this.id);

    btnLogin.addEventListener('click', () => this.buildByType(this.type.login));
    btnSignup.addEventListener('click', () =>
      this.buildByType(this.type.signup)
    );
    modalId.addEventListener('hide.bs.modal', () => {
      this.clean();
    });

    new bootstrap.Modal(modalId);
  },
  buildByType: function (type) {
    if (type !== '') {
      if (type === this.type.login) {
        Helpers.getBySelector(this.title).textContent = 'Login';
        Helpers.formField('text', 'loginUser', 'User');
        Helpers.formField('password', 'loginPassword', 'Password');
      }
      if (type === this.type.signup) {
        Helpers.getBySelector(this.title).textContent = 'Sign-up';
        Helpers.formField('email', 'signupEmail', 'Email');
        Helpers.formField('text', 'signupUser', 'User');
        Helpers.formField('password', 'signupPassword', 'Password');
      }

      bootstrap.Modal.getInstance(Helpers.getById(this.id)).show();
    }
  },
  clean: function () {
    Helpers.getBySelector(this.body).innerHTML = '';
  },
};

const Helpers = {
  getById: function (id) {
    return document.getElementById(id);
  },
  getBySelector: function (selector) {
    return document.querySelector(selector);
  },
  createNode: function (element) {
    return document.createElement(element);
  },
  append: function (parent, element) {
    return parent.appendChild(element);
  },
  formField: function (inputType, inputId, labelText) {
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
};

(function () {
  App.init();
})();
