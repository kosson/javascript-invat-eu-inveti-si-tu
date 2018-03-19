let arr = ['ceva','altceva','după', 'abac'];
function bubbleSort (arr) {
  const len = arr.length;
  for (let index = len - 1; index >= 0; index--) {
    for (let idxInt = 1; idxInt <= index; idxInt++) {
      let temp;
      if (arr[idxInt - 1] > arr[idxInt]) {
        temp = arr[idxInt - 1];
        arr[idxInt - 1] = arr[idxInt];
        arr[idxInt] = temp;
      };
   };
 };
 return arr;
};
console.log(bubbleSort(arr));
