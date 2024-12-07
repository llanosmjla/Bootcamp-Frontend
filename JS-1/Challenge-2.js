//Write a JS program to romeve duplicates in an array 

let arr1 = [7, 9, 1, 'a', 'a', 'f', 9, 4, 2, 'd', 'd'];

const result = arr1.reduce((acc, item) => {
    if (!acc.includes(item)) {
        acc.push(item);
    }
    return acc;
}, [])

//console.log(result);

//Write a JS program to concat arrays.

let data = [
    ["The", "little", "horse"],
    ["Plane", "over", "the", "ocean"],
    ["Chocolate", "ice", "cream", "is", "awesome"],
    ["I", "love", "coding"],
    ["I", "am", "a", "developer"]
]

//console.log(data[0]);
let aux;
const result2 = data.reduce((acc, item) => {
    acc.push(item.join(' '));
    return acc;
}, [])

console.log(result2);