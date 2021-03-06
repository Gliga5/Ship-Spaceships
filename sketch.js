var ships = [];
var stars = [];
var zvezde = [];
var lasers = [];
var pogoni = [];
var wave;
var timer = 0;
var timer2 = 0;
var a = 1;
var lo = 0;
var readysetgo;
var canvas;
var sound;

function preload() {
    sound = loadSound('lobe.mp3');
}

function setup() {
    canvas = createCanvas(window.innerWidth, window.innerHeight - 3.501);
    sound.play();
    for (var i = 0; i < 5; i++) {
        ships[i] = new Ship();
        lasers[i] = new Laser(ships[i]);
    }
    for (var i = 0; i < 10; i++) {
        stars[i] = new Star(mouseX, mouseY);
    }
    for (var i = 0; i < 200; i++) {
        zvezde[i] = new Zvezde();
    }
    wave = new Wave();
}
window.onresize = function() {
    var w = window.innerWidth;
    var h = window.innerHeight;  
    canvas.size(w,h);
    width = w;
    height = h;
}
function draw() {
    background(35);
    for (var i = 0; i < zvezde.length; i++) {
        zvezde[i].display();
    }
    timer += 1;
    for (var i = 0; i < ships.length; i++) {
        if (timer > 100) {
            timer = 0;
            lo += 5;
            for (var knez = 0; knez < 5; knez++) {
                ships.push(new Ship());
                lasers.push(new Laser(ships[lo + knez]));
            }
        }
        lasers[i].display();
        lasers[i].update();
        ships[i].display();
        ships[i].update();
        if (ships[i].timer > 1400) {
            ships.splice(0, 5);
            lasers.splice(0, 5);
            lo -= 5;
            ships[i].timer = 0;
        }
        for (var j = 0; j < 10; j++) {
            if (ships[i].intersects(stars[j])) {
                textSize(100);
                fill(255, 0, 0);
                strokeWeight(5);
                text("GAME OVER", width/2 - 325, height/2 + 10);
                fill(255);
                textSize(45);
                text("Time: " + wave.number, width/2 - 125, height/2 + 75)
                sound.stop();
                ships[i].upd();
            }
        }
        for (var km = 0; km < 10; km++) {
            if (lasers[i].intersects(stars[km])) {
                textSize(100);
                fill(255, 0, 0);
                strokeWeight(5);
                text("GAME OVER", width/2 - 325, height/2 + 10);
                fill(255);
                textSize(45);
                text("Time: " + wave.number, width/2 - 125, height/2 + 75)
                sound.stop();
                lasers[i].upd();
            }
        }
    } 
    
    stars.push(new Star(mouseX, mouseY))
    for (var i = 0; i < stars.length; i++) {
        stars[i].display();
    }
    if (stars.length > 10) {
        stars.splice(0,1);
    }
    
    wave.display();
    wave.update();
    
    var r = 255;
    var g = 145;
    var b = 0;
    timer2 += a;
    
    if (timer2 > 100 && timer2 < 150) {
        textSize(100);
        stroke(0);
        strokeWeight(5);
        fill(0, 255, 0);
        text("GO", width/2 - 95, height/2 + 10);
    }
    
    if (timer2 > 50 && timer2 < 100) {
        textSize(100);
        stroke(0);
        strokeWeight(5);
        fill(255, 255, 0);
        text("SET", width/2 - 115, height/2 + 10);
    }
    
    if (timer2 > 0 && timer2 < 50) {
        textSize(100);
        stroke(0);
        strokeWeight(5);
        fill(255, 145, 0);
        text("READY", width/2 - 190, height/2 + 10);
    }
}
