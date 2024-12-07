// Write a JS program to the smallest in the array.
let arr1 = [12, 2, 10, 1, 45, 100];

const result = arr1.reduce((acc, item) => {
    return acc <= item ? acc : item;
})

//console.log(result);

//Write a JS program to find the least frequent element of an array.

let arr2 = [3, 'c', 'c', 'c', 'a', 3, 'c', 3, 'c', 2, 2, 4, 4, 9, 9, 9];

const result2 = arr2.reduce((acc, item) => {
    acc = arr2.filter((item2) => item2 == item).length;
    let numberLeastFrequent = 0;
    
    return arr2.reduce((acc1, item3) => {
        acc1 = arr2.filter((item4) => item4 == item3).length;
        
        if (acc1 <= acc) {
            acc = acc1;
            numberLeastFrequent = item3;
        }

        return numberLeastFrequent;
    },0)
    
},0)


