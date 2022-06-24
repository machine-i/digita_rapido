const digitado = document.querySelector('#caixa-digita');
const palavrasTela = document.querySelector('#palavrasTela');
const tempoTela = document.querySelector('#tempoTela');
let palavrasArray = new Array();
let indicePalavra = 0;
let v;
let score = 0;
let clickBotao = 0, clickTecla = 0;
let tempoMax = 0, tempo = 0, fim = 0;

function limpar(d) { d.value = ''; }

function embaralhar(arr) {
    for (let i = arr.length; i; i--) {
        const iRandom = Math.floor(Math.random() * i);
        const item = arr[i - 1];
        arr[i - 1] = arr[iRandom];
        arr[iRandom] = item;
    }
}

function getPalavras() {

    while (palavrasTela.firstChild && palavrasArray.length > 0) {
        palavrasTela.removeChild(palavrasTela.firstChild);
        palavrasArray.pop();
    }

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

    clickBotao = 1;
    fim = 0;
    tempoMax = 30;
    tempo = 0

    digitado.focus();
}

function verifica() {
    if (digitado.value == palavrasArray[indicePalavra]) { score += 1 }
    if (digitado.value.trim()) { indicePalavra++ }
    if (indicePalavra == palavrasArray.length) {
        clearInterval(contarTempo);
        fim = 1;
        console.log(score);
    }
}

function tecla() {

    digitado.addEventListener('input', event => {
        clickTecla = 1;

        if (event.data == ' ') {
            verifica();
            // clearInterval(v);
            limpar(digitado);
        }
    }, false);

    // if (!fim) {
    //     v = setInterval(() => {
    //         console.log('ta funfando');

    //         if (digitado.value == palavrasArray[indicePalavra]) { console.log('foi') }
    //     }, 500);
    // }

    // digitado.addEventListener('blur', () => {
    //     clearInterval(v);
    // });

}

function tempoGame() {
    if (clickBotao && clickTecla) {
        tempo++
        tempoTela.innerHTML = tempoMax - tempo;
    }
}

let contarTempo = setInterval(() => {
    console.log('contando')
    tempoGame();
}, 1000)
