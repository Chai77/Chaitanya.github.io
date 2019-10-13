var start = "I am a <u>";
var end = "</u>";
var values = ["Software Developer", "Student", "Teacher"];
var startCounter = 0;
var tag = document.getElementById("Im");
var currentVal = 0;
tag.innerHTML = start + values[1] + end;

function anim() {
    requestAnimationFrame(anim);
    startCounter++;
    if(startCounter % 101 === 0) {
        tag.innerHTML = start + values[increment()] + end;
    }
}

function increment() {
    currentVal++;
    if(currentVal > values.length - 1) {
        currentVal = 0;
    }
    return currentVal;
}
anim();