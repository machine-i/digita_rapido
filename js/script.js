let digitado = document.querySelector('#caixa-digita');
let palavras = ['machine', 'segundo'];

let p1 = document.querySelector('#p1');
let p2 = document.querySelector('#p2');

function limpar(d) { d.value = ''; tecla() }

function tecla() {
    document.addEventListener('keydown', event => {
        if (event.key == ' ') {
            limpar(digitado);
        }
    })
}

const verifica = setInterval(() => {
    if (palavras.indexOf(digitado.value) != -1 && !p1.classList.contains('text-info')) {
        p1.classList += 'text-info';
    }
}, 10)
