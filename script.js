const dino = document.querySelector('.dino');
let isJumping = false;

//const background = document.querySelector('.background');   

//console.log(dino);

function handleKeyUp(event) {
    if(event.keyCode === 32) {
        if(!isJumping) {
            jump();
        }
    }
}

function jump() {
    let position = 0;
    isJumping = true;

    // subindo
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
            position += 20;
            dino.style.bottom = position + 'px';
        }
    }, 20);
} 

document.addEventListener('keyup', handleKeyUp);
