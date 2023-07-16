class ValidaFormulario {
  constructor() {
    this.formulario = document.querySelector(".formulario");
    this.evento();
  }

  evento() {
    this.formulario.addEventListener("submit", (e) => {
      this.handleSubmit(e);
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const camposValidos = this.camposValidos();
    const senhasValidas = this.senhasSaoValidas();

    if (camposValidos && senhasValidas) {
      alert("Formulario enviado");
      this.formulario.submit();
    }
  }

  camposValidos() {
    let valid = true;

    for (let errorText of this.formulario.querySelectorAll(".error-text")) {
      errorText.remove();
    }

    for (let campo of this.formulario.querySelectorAll(".validar")) {
      const label = campo.previousElementSibling.innerText;

      if (!campo.value) {
        this.criaErro(campo, `O campo "${label}" não pode estar em branco`);
        valid = false;
      }

      if (campo.classList.contains("cpf")) {
        if (!this.validaCPF(campo)) valid = false;
      }

      if (campo.classList.contains("usuario")) {
        if (!this.validaUsuario(campo)) valid = false;
      }
    }

    return valid;
  }

  senhasSaoValidas() {
    let valid = true;

    const senha = this.formulario.querySelector(".senha");
    const repetirSenha = this.formulario.querySelector(".repetir-senha");

    if (senha.value !== repetirSenha.value) {
      valid = false;
      this.criaErro(senha, "Campos senha e repetir senha precisam ser iguais");
      this.criaErro(
        repetirSenha,
        "Campos senha e repetir senha precisam ser iguais"
      );
    }

    if (senha.value.length < 6 || senha.value.length > 12) {
      valid = false;
      this.criaErro(senha, "A senha deve ter entre 6 e 12 caracteres");
    }

    return valid;
  }

  criaErro(pmCampo, pmMsg) {
    const div = document.createElement("div");
    (div.innerHTML = pmMsg), div.classList.add("error-text");
    pmCampo.insertAdjacentElement("afterend", div);
  }

  validaCPF(pmCampo) {
    const cpf = new ValidaCPF(pmCampo.value);
    if (!cpf.valida()) {
      this.criaErro(pmCampo, "CPF inválido.");
      return false;
    }
    return true;
  }

  validaUsuario(pmCampo) {
    const usuario = pmCampo.value;
    let valid = true;

    if (usuario.length < 3 || usuario.length > 12) {
      this.criaErro(pmCampo, "O usuário deve ter entre 3 e 12 caracteres");
      valid = false;
    }

    if (!usuario.match(/^[a-zA-Z0-9]+$/g)) {
      this.criaErro(
        pmCampo,
        "Nome de usuário deve conter apenas letras e/ou números"
      );
      valid = false;
    }
    return valid;
  }
}

const valida = new ValidaFormulario();
