const digitado = document.querySelector('#caixa-digita');
const palavrasTela = document.querySelector('#palavrasTela');
const tempoTela = document.querySelector('#tempoTela');

class DigitaRapido {
    constructor() {
        this.contarTempo;
        this.v;
        this.score = 0;
        this.palavrasArray = new Array();
        this.indicePalavra = 0;
        this.clickTecla = 0;
        this.tempoMax = 30;
        this.tempo = 0;
        this.fim = 0;
    }

    getPalavras() {
        console.log('getPalavras');
        console.log(this.palavrasArray.length);

        while (palavrasTela.firstChild) {
            palavrasTela.removeChild(palavrasTela.firstChild);
            this.palavrasArray.pop();
        }

        console.log(this.palavrasArray.length);

        let xmlHttp = new XMLHttpRequest();
        xmlHttp.open('GET', 'http://127.0.0.1:5500/json/palavras.json');

        xmlHttp.onreadystatechange = () => {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                let jsonPalavras = xmlHttp.responseText;

                let jsonPalavrasObj = JSON.parse(jsonPalavras);

                for (let p in jsonPalavrasObj.palavras) {
                    this.palavrasArray.push(jsonPalavrasObj.palavras[p]);
                }

                this.embaralhar(this.palavrasArray);

                for (let i in this.palavrasArray) {
                    let span = document.createElement('span');
                    span.className = 'm-1';
                    span.innerHTML = this.palavrasArray[i];

                    palavrasTela.appendChild(span);
                }

            } else if (xmlHttp.readyState == 4 && xmlHttp.status == 404) {
                document.querySelector('#palavrasTela').innerHTML = `Houve algum problema, tente novamente mais tarde! ʕ•ᴥ•ʔ`;
            }
        }

        xmlHttp.send();

        this.fim = 0;
        this.tempo = 0

        this.limpar(digitado);
        this.tecla();
        digitado.focus();
    }

    tecla() {
        this.tempoGame();
        digitado.addEventListener('input', event => {
            // console.log('ouvindo o digitado');
            this.clickTecla = 1;

            if (event.data == ' ') {
                this.verifica();
                this.limpar(digitado);
            }
        }, false);
    }

    limpar(d) {
        d.value = ''
    }

    embaralhar(arr) {
        for (let i = arr.length; i; i--) {
            const iRandom = Math.floor(Math.random() * i);
            const item = arr[i - 1];
            arr[i - 1] = arr[iRandom];
            arr[iRandom] = item;
        }
    }

    verifica() {
        if (digitado.value == this.palavrasArray[this.indicePalavra]) { this.score += 1 }
        if (digitado.value.trim()) { this.indicePalavra++ }
        if (this.indicePalavra == this.palavrasArray.length) {
            clearInterval(this.contarTempo);
            this.fim = 1;
            console.log(this.score);
        }
    }

    tempoGame() {
        this.contarTempo = setInterval(() => {
            // console.log('ta funfando');
            if (this.clickTecla) {
                this.tempo++
                tempoTela.innerHTML = this.tempoMax - this.tempo;
            }
        }, 1000)
    }
}

function start() {
    let digita_rapido = new DigitaRapido();
    digita_rapido.getPalavras();
}