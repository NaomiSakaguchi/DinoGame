// variáveis globais
const dino = document.querySelector('.dino');
const background = document.querySelector('.background'); 
let isJumping = false;
let position = 0;

// função para quando apertar o espaço, o dino pule, caso jã não esteja pulando
function handleKeyUp(event) {
    if(event.keyCode === 32) {
        if(!isJumping) {
            jump();
        }
    }
}
 // função para pular
function jump() {
    isJumping = true;

    let upInterval = setInterval(() => {
        if(position >= 150) {
            clearInterval(upInterval);
            
        // descendo
            let downInterval = setInterval(() => {
                if(position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 20);
        } else {
            // subindo
            position += 20;
            dino.style.bottom = position + 'px';
        }
    }, 20);
} 

 // função que cria cactos randomicamente
function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000; // gera um numero aleatório entre 0 e 1
    
    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        if(cactusPosition < -60) { // para remover o cacto que sai da tela, para evitar processamento desnecessario
            clearInterval(leftInterval);
            background.removeChild(cactus);
       } else if(cactusPosition > 0 && cactusPosition < 60 && position < 60) { // se o cacto estiver na tela e sua posição for menor que 60, significa que ele está em cima do dinossauro que não deverá estar pulando, ou seja, game over.
            clearInterval(leftInterval); // o cacto para de ir para esquerda
            document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
        } else {
            cactusPosition -= 10; // velocidade com que o cacto se move para a esquerda 
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

     //recursividade: função que invoca ela mesma dentro dela (espelho)
    setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keyup', handleKeyUp);
