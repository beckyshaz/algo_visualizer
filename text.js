function insertionSort(array){
    const moves = [];
    for(let i = 1; i < array.length; i++){
        let key = array[i];
        let j = i - 1;

        while (j >= 0 && array[j] > key){
            //moves.push({ indices: [j + 1, key], type: "comp" });
            array[j + 1] = array[j];
            j--;
        }
        array[j + 1] = key;
        //moves.push({ indices: [j + 1, key], type: "swap" });
    }
    return moves;
}


const array = [5, 2, 4, 6, 1];
const moves = insertionSort(array);
console.log("Sorted Array:", array);
console.log("Moves:", moves);

