const n=50;
const array=[];

function start(){
    for(let i=0; i<n; i++){
        array[i] = Math.random()
    }
    showBars();
}

let ctx = null;

function playMusic(freq){
    if(ctx == null){
        ctx = new(
            AudioContext ||
            webkitAudioContext ||
            window.webkitAudioContext
        )();
    }
    const duration = 0.1;
    const osc = ctx.createOscillator();
    const node = ctx.createGain();
    node.gain.value = 0.1;
    node.gain.linearRampToValueAtTime(
        0, ctx.currentTime + duration
    );
    osc.connect(node);
    osc.frequency.value = freq;
    osc.start();
    osc.stop(ctx.currentTime + duration);
    node.connect(ctx.destination);
}

function bubbleSort(array){
    const moves= [];
    let swapped;
    do{
        swapped = false;
        for(let i=0; i<array.length - 1; i++){
            moves.push({indices:[i, i + 1], type: "comp"});
            if(array[i] > array[i + 1]){
                let temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
                swapped = true;
                moves.push({indices:[i, i + 1], type: "swap"});
            }
        }
    }while(swapped);
    return moves;
}

function selectionSort(array) {
    const moves = [];
    for (let i = 0; i < array.length; i++) {
        let smallest = i;
        for (let j = i + 1; j < array.length; j++) {
            moves.push({ indices: [smallest, j], type: "comp" });
            if (array[j] < array[smallest]) {
                smallest = j;
            }
        }
        if (i !== smallest) {
            [array[i], array[smallest]] = [array[smallest], array[i]];
            moves.push({ indices: [i, smallest], type: "swap" });
        }
    }
    return moves;
}

function insertionSort(array){
    const moves = [];
    for (let i = 1; i < array.length; i++){
        let key = array[i];
        let j = i - 1;

        while (j >= 0 && array[j] > key){
            moves.push({ indices: [j, j + 1], type: "comp" });
            array[j + 1] = array[j];
            j--;
        }
        moves.push({ indices: [j, key], type: "swap" });
        array[j + 1] = key;
    }
    return moves;
}

function play(algorithm){
    const copy = [...array];
    let moves;
    if (algorithm === 'bubble'){
        moves = bubbleSort(copy);
    } else if (algorithm === 'selection'){
        moves = selectionSort(copy);
    } else if (algorithm === 'insertion'){
        moves = insertionSort(copy);
    }
    animate(moves);
}

function animate(moves){
    if (moves.length === 0){
        showBars();
        return;
    }
    const move = moves.shift();
    const [i, j] = move.indices;

    if(move.type == "swap"){
        [array[i], array[j]] = [array[j], array[i]];
    }
    playMusic(200 + array[i] * 500);
    playMusic(200 + array[j] * 500);
    showBars(move);
    setTimeout(function(){
        animate(moves);
    },10);
}

function showBars(move){
    container.innerHTML="";
    for(let i=0; i<array.length; i++){
        const bars=document.createElement("div");
        bars.style.height=array[i]*100+"%";
        bars.classList.add("bars");

        if(move && move.indices.includes(i)){
            bars.style.backgroundColor = move.type == "swap"?"green":"yellow";
        }
        container.appendChild(bars);
    }
}

start();