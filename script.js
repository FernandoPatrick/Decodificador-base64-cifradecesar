const select = document.getElementById("select");
const inputDeslocamento = document.getElementById("deslocamento");
const radioCodificar = document.getElementById("radioCodificar");
const radioDecodificar = document.getElementById("radioDecodificar");
const btnSubmit = document.getElementById("btnSubmit");
const formulario = document.getElementById("formulario");
const fieldset = document.getElementById("fieldset");
const legend = document.getElementById("legend");
const resultado = document.getElementById("resultado");
const alfabeto = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

select.addEventListener("change", handleChangeSelect);
radioCodificar.addEventListener("change", handleChangeRadio);
radioDecodificar.addEventListener("change", handleChangeRadio);
formulario.addEventListener("submit", handleSubmitForm);

function handleChangeSelect(event) {
  const isCifraCesar = event.target.value === "CIFRACESAR";

  if (isCifraCesar) {
    inputDeslocamento.style.display = "block";
    inputDeslocamento.required = true;
  } else {
    inputDeslocamento.value = "";
    inputDeslocamento.style.display = "none";
    inputDeslocamento.required = false;
  }
}

function handleChangeRadio(event) {
  const isCodificar = event.target.value === "CODIFICAR";
  const text = isCodificar ? "Codificar" : "Decodificar";

  btnSubmit.textContent = `${text} mensagem`;
}

function handleSubmitForm(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const values = Object.fromEntries(formData);
  const { mensagem, select, deslocamento, radio } = values;
  const result = getResult({
    mensagem,
    select,
    deslocamento: parseInt(deslocamento),
    radio,
  });
  const text =
    radio === "CODIFICAR" ? "Texto codificado" : "Texto decodificado";

  legend.textContent = text;
  resultado.textContent = result;
  fieldset.style.display = "block";
}

function getResult({ mensagem, select, deslocamento, radio }) {
  const isCodificar = radio === "CODIFICAR";
  const isCifraCesar = select === "CIFRACESAR";
  let result;

  if (isCifraCesar) {
    result = getResultCifraCesar(mensagem, deslocamento, isCodificar);
  } else {
    result = getResultBase64(mensagem, isCodificar);
  }

  return result;
}

function getResultCifraCesar(mensagem, deslocamento, isCodificar) {
  const regex = /[a-zA-Z]+/i;
  let result = "";

  for (let i = 0; i < mensagem.length; i++) {
    if (regex.test(mensagem[i])) {
      for (let j = 0; j < alfabeto.length; j++) {
        if (mensagem[i] === alfabeto[j]) {
          if (isCodificar) {
            result += alfabeto[(j + deslocamento) % alfabeto.length];
          } else {
            if (j < deslocamento) {
              result +=
                alfabeto[
                  (alfabeto.length - deslocamento + j) % alfabeto.length
                ];
            } else {
              result += alfabeto[(j - deslocamento) % alfabeto.length];
            }
          }
          break;
        }
      }
    } else {
      result += mensagem[i];
    }
  }
  return result;
}

function getResultBase64(mensagem, isCodificar) {
  return isCodificar ? btoa(mensagem) : atob(mensagem);
}
