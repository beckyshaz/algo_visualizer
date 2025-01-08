const n=50;
const array=[];

function start(){
    for(let i=0; i<n; i++){
        array[i] = Math.random()
    }
    showBars();
}

function bubbleSort(array){
    do{
        var swapped=false;
        for(let i=0; i<array.length - 1; i++){
            if(array[i] > array[i + 1]){
                let temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
                swapped = true;
            }
        }
    }while(swapped);
}

function play(){
    bubbleSort(array);
    showBars();
}

function showBars(){
    container.innerHTML="";
    for(let i=0; i<array.length; i++){
        const bars=document.createElement("div");
        bars.style.height=array[i]*100+"%";
        bars.classList.add("bars");
        container.appendChild(bars);
    }
}

start();