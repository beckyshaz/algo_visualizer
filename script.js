const n=50;
const array=[];

for(let i=0; i<n; i++){
    array[i] = Math.random()

}


for(let i=0; i<array.length; i++){
    const bars=document.createElement("div");
    bars.style.height=array[i]*100+"%";
    bars.classList.add("bars");
    container.appendChild(bars);
}