const n=50;
const array=[];

function start(){
    for(let i=0; i<n; i++){
        array[i] = Math.random()
    }
    showBars();
}

function bubbleSort(array){
    const swaps = [];
    let swapped;
    do{
        swapped = false;
        for(let i=0; i<array.length - 1; i++){
            if(array[i] > array[i + 1]){
                let temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
                swapped = true;
                swaps.push([i, i + 1]);
            }
        }
    }while(swapped);
    return swaps;
}

function play(){
    const copy = [...array];
    const swaps = bubbleSort(copy);
    animate(swaps);
}

function animate(swaps){
    if (swaps.length === 0){
        showBars();
        return;
    }
    const [i, j] = swaps.shift();
    [array[i], array[j]] = [array[j], array[i]];
    showBars([i, j]);
    setTimeout(function(){
        animate(swaps);
    },50);
}

function showBars(index){
    container.innerHTML="";
    for(let i=0; i<array.length; i++){
        const bars=document.createElement("div");
        bars.style.height=array[i]*100+"%";
        bars.classList.add("bars");

        if(index && index.includes(i)){
            bars.style.backgroundColor="green";
        }
        container.appendChild(bars);
    }
}

start();