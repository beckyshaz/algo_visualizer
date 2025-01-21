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
    node.gain.value = 0.5;
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
        let currentElement = array[i];
        let j = i - 1;
        
        while (j >= 0 && array[j] > currentElement){
            
            moves.push({ indices: [j, j + 1], type: "comp" });
            array[j + 1] = array[j];
            
            moves.push({ indices: [j, j + 1], type: "swap" });
            j = j - 1;
        }
        array[j + 1] = currentElement;//no need to push the moves again since the
        //swap only happens in the loop
    
        //moves.push({ indices: [j + 1, i], type: "insert" });
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
    } else if (algorithm === 'merge') {
        moves = mergeSort(copy);
    }

    animate(moves);
}

/*function getMergeSortmoves(array) {
    const moves = [];
    if (array.length <= 1) return moves; // No moves needed for arrays of length 1 or less
    const auxiliaryArray = array.slice(); // Create a copy of the array for use in merging
    performMergeSort(array, 0, array.length - 1, auxiliaryArray, moves);
    return moves;
  }
  
  function performMergeSort(mainArray, startIdx, endIdx, auxiliaryArray, moves) {
    if (startIdx >= endIdx) return; // Base case: single-element subarrays
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    performMergeSort(auxiliaryArray, startIdx, middleIdx, mainArray, moves);
    performMergeSort(auxiliaryArray, middleIdx + 1, endIdx, mainArray, moves);
    mergeArrays(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, moves);
  }
  
  function mergeArrays(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, moves) {
    let leftIdx = startIdx;
    let rightIdx = middleIdx + 1;
    let sortedIdx = startIdx;
  
    // Merge the two halves
    while (leftIdx <= middleIdx && rightIdx <= endIdx) {
      // Record indices being compared
      moves.push({indices: [leftIdx, rightIdx], type: 'comp'});
      moves.push({indices: [leftIdx, rightIdx], type: 'comp'}); // To revert the color change later
  
      if (auxiliaryArray[leftIdx] <= auxiliaryArray[rightIdx]) {
        moves.push({indices: [sortedIdx, auxiliaryArray[leftIdx]], type: 'swap'}); // Overwrite with left element
        mainArray[sortedIdx++] = auxiliaryArray[leftIdx++];
      } else {
        moves.push({indices: [sortedIdx, auxiliaryArray[rightIdx]], type: 'swap'}); // Overwrite with right element
        mainArray[sortedIdx++] = auxiliaryArray[rightIdx++];
      }
    }
  
    // Copy remaining elements from the left half, if any
    while (leftIdx <= middleIdx) {
      moves.push({indices: [leftIdx, leftIdx], type: 'comp'}); // Highlight and revert for the same index
      moves.push({indices: [leftIdx, leftIdx], type: 'comp'});
      moves.push({indices: [sortedIdx, auxiliaryArray[leftIdx]], type: 'comp'}); // Overwrite with left element
      mainArray[sortedIdx++] = auxiliaryArray[leftIdx++];
    }
  
    // Copy remaining elements from the right half, if any
    while (rightIdx <= endIdx) {
      moves.push({indices: [rightIdx, rightIdx], type: 'comp'}); // Highlight and revert for the same index
      moves.push({indices: [rightIdx, rightIdx], type: 'comp'});
      moves.push({indices: [sortedIdx, auxiliaryArray[rightIdx]], type: 'swap'}); // Overwrite with right element
      mainArray[sortedIdx++] = auxiliaryArray[rightIdx++];
    }
  }
  */

/*function merge(left, right, moves){
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length){
        moves.push({indices: [left[leftIndex], right[rightIndex]], type: 'comp'});
        if (left[leftIndex] <= right[rightIndex]){
            result.push(left[leftIndex]);
            leftIndex++;
        }else{
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

function mergeSort(array){
    const moves = [];

    const mergeSortHelper = (array) => {
        if (array.length <= 1) {
            return array;
        }
        const middle = Math.floor(array.length / 2);
        const left = array.slice(0, middle);
        const right = array.slice(middle);

        return merge(mergeSortHelper(left), mergeSortHelper(right), moves);
    };
    mergeSortHelper(array);
    return moves;
}*/


/*function merge(left, right, moves, startIndex) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        moves.push({ indices: [startIndex + leftIndex, startIndex + rightIndex + left.length], type: "comp" });

        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            moves.push({ indices: [startIndex + result.length - 1], value: left[leftIndex], type: "merge" });
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            moves.push({ indices: [startIndex + result.length - 1], value: right[rightIndex], type: "merge" });
            rightIndex++;
        }
    }

    while (leftIndex < left.length) {
        result.push(left[leftIndex]);
        moves.push({ indices: [startIndex + result.length - 1], value: left[leftIndex], type: "merge" });
        leftIndex++;
    }

    while (rightIndex < right.length) {
        result.push(right[rightIndex]);
        moves.push({ indices: [startIndex + result.length - 1], value: right[rightIndex], type: "merge" });
        rightIndex++;
    }

    return result;
}

function mergeSort(array, moves = [], startIndex = 0) {
    if (array.length === 1) {
        return array;
    }

    const middle = Math.floor(array.length / 2);
    const left = mergeSort(array.slice(0, middle), moves, startIndex);
    const right = mergeSort(array.slice(middle), moves, startIndex + middle);

    return merge(left, right, moves, startIndex);
}
*/
const speedControl = document.getElementById("speedControl");
const speedValue = document.getElementById("speedValue");

let delay = speedControl.value

speedControl.addEventListener("input", function () {
    delay = speedControl.value;
    speedValue.textContent = `${delay}ms`;
  });

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
   /*else if (move.type === "merge") {
     array[i] = move.value; // Update the array with the merged value
    }*/
    playMusic(200 + array[i] * 700);
    playMusic(200 + array[j] * 500);
    showBars(move);
    setTimeout(function(){
        animate(moves);
    }, delay);
}

function showBars(move){
    container.innerHTML="";
    for(let i=0; i<array.length; i++){
        const bars=document.createElement("div");
        bars.style.height=array[i]*100+"%";
        bars.classList.add("bars");

        
        if (move && move.indices.includes(i)) {
            if (move.type === "swap") {
                bars.style.backgroundColor = "green"; // Green for swap
            } else if (move.type === "comp") {
                bars.style.backgroundColor = "yellow"; // Yellow for comparison
            } /*else if (move.type === "shift") {
                bars.style.backgroundColor = "red"; // Red for shift
            } else if (move.type === "insert") {
                bars.style.backgroundColor = "blue"; // Blue for insert
            }*/
        }
        container.appendChild(bars);
    }
}

start();
