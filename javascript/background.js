const canvas = document.getElementById("background");
const ctx = canvas.getContext('2d');
ctx.canvas.width = innerWidth;
ctx.canvas.height = innerHeight;
const symbol_size = 25;
var streams = []
var startCounter = 0;


class Symbol {
    constructor(x, y, speed) {
        this.speed = speed;
        this.x = x;
        this.y = y;
        this.symbol = null;
        this.setRandomSymbol();
        this.changeCharacter = Math.round(Math.random() * 80 + 5);
    }
    setRandomSymbol() {
        if(startCounter % this.changeCharacter == 0 || this.symbol === null) {
            this.symbol_val = 65 + Math.round(Math.random() * 58);
            this.symbol = String.fromCharCode(this.symbol_val)
        }
    }
    draw() {
        this.setRandomSymbol();
        ctx.font = symbol_size + "px Arial";
        ctx.fillStyle = "rgb(0, 255, 70)";
        ctx.fillText(this.symbol, this.x, this.y);
    }

    update() {
        if(this.y >= innerHeight) {
            this.y = 0;
        } else {
            this.y += this.speed;
        }
        this.draw();
    }

    
}

class Stream {
    constructor(x) {
        this.x = x;
        this.speed = Math.round(Math.random() * 10 + 5);
        this.totalCharacters = Math.random() * 25 + 5;
        this.symbols = [];
        this.init();
    }

    init() {
        this.y = Math.random() * -1000;
        for(let i = 0; i < this.totalCharacters; i++) {
            this.symbols.push(new Symbol(this.x, this.y - i * symbol_size, this.speed));
        }
    }

    update() {
        for(var i = 0; i < this.totalCharacters; i++) {
            this.symbols[i].update();
        }
    }
}
function init() {
    if(streams.length !== 0) {
        streams = [];
    }
    for(let i = 0; i < Math.round(innerWidth/symbol_size); i++) {
        streams.push(new Stream(i* symbol_size));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    startCounter++;
    for(let i = 0; i < streams.length; i++) {
        streams[i].update();
    }
}
init();
animate();

addEventListener("resize", function() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});