/*(function insertionSort(array) {
    const moves = [];

    console.log("Initial array:", array);

    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;

        console.log(`Current key (${key}) at index ${i}`);

        while (j >= 0 && array[j] > key) {
            console.log(`Comparing ${array[j]} and ${key}`);
            moves.push({ indices: [j, j + 1], type: "comp" }); // Log comparison
            array[j + 1] = array[j]; // Shift the element
            moves.push({ indices: [j, j + 1], type: "swap" }); // Log the shift
            j--;
        }

        console.log(`Inserting key (${key}) at index ${j + 1}`);
        array[j + 1] = key; // Place the key at its correct position
        moves.push({ indices: [j + 1, i], type: "insert" }); // Log the insertion

        console.log("Array state:", array); // Debug current array state
    }

    console.log("Final sorted array:", array);
    console.log("Moves:", moves);

    return moves;
}

// Test the function
const array = [5, 2, 4, 6, 1];
const moves = insertionSort(array);
console.log("Sorted Array:", array);
console.log("Moves:", moves);
*/




function insertionSort(array) {
    const moves = [];

    console.log("Initial array:", array);

    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;

        console.log(`Current key (${key}) at index ${i}`);

        // Start comparing and shifting
        while (j >= 0 && array[j] > key) {
            console.log(`Comparing ${array[j]} and ${key}`);
            moves.push({ indices: [j, j + 1], type: "comp" }); // Log comparison

            array[j + 1] = array[j]; // Shift the element
            moves.push({ indices: [j + 1, j], type: "shift" }); // Log the shift
            j--;
        }

        // Insert the key into its correct position
        console.log(`Inserting key (${key}) at index ${j + 1}`);
        array[j + 1] = key; // Place the key at its correct position
        if (j + 1 !== i) {
            moves.push({ indices: [j + 1, i], type: "insert" }); // Log the insertion
        }

        console.log("Array state:", array); // Debug current array state
    }

    console.log("Final sorted array:", array);
    console.log("Moves:", moves);

    return moves;
}

// Test the function
const array = [5, 2, 4, 6, 1];
const moves = insertionSort(array);
console.log("Sorted Array:", array);
console.log("Moves:", moves);
