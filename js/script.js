const digitado = document.querySelector('#caixa-digita');
const palavrasTela = document.querySelector('#palavrasTela');
const tempoTela = document.querySelector('#tempoTela');
let palavrasArray = new Array();
let indicePalavra = 0;
let v;
let score = 0;

function limpar(d) { d.value = ''; tecla() }

function embaralhar(arr) {
    for (let i = arr.length; i; i--) {
        const iRandom = Math.floor(Math.random() * i);
        const item = arr[i - 1];
        arr[i - 1] = arr[iRandom];
        arr[iRandom] = item;
    }
}

function getPalavras() {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', 'http://127.0.0.1:5500/json/palavras.json');

    xmlHttp.onreadystatechange = () => {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            let jsonPalavras = xmlHttp.responseText;

            let jsonPalavrasObj = JSON.parse(jsonPalavras);

            for (let p in jsonPalavrasObj.palavras) {
                palavrasArray.push(jsonPalavrasObj.palavras[p]);
            }

            embaralhar(palavrasArray);

            if (palavrasTela.hasChildNodes()) {
                while (palavrasTela.firstChild) {
                    palavrasTela.removeChild(palavrasTela.firstChild);
                }
            }

            for (let i in palavrasArray) {
                let span = document.createElement('span');
                span.className = 'm-1';
                span.innerHTML = palavrasArray[i];

                palavrasTela.appendChild(span);
            }

        } else if (xmlHttp.readyState == 4 && xmlHttp.status == 404) {
            document.querySelector('#palavrasTela').innerHTML = `Houve algum problema, tente novamente mais tarde! ʕ•ᴥ•ʔ`;
        }
    }

    xmlHttp.send();

    digitado.focus();
}

function verifica() {
    if (digitado.value == palavrasArray[indicePalavra]) { score++ }
    if (digitado.value.trim()) indicePalavra++;
}

function tecla() {

    digitado.addEventListener('input', event => {
        if (event.data == ' ') {
            verifica();
            clearInterval(v);
            limpar(digitado);
        }
    }, false);

    v = setInterval(() => {
        console.log('ta funfando');

        if (digitado.value == palavrasArray[indicePalavra]) {
            console.log('foi');
        }
    }, 500);

    digitado.addEventListener('blur', () => {
        clearInterval(v);
    });

}
