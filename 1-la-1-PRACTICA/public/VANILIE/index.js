// let arr = ['ceva','altceva','după', 'abac'];
// let x = 10;
// function bubbleSort (arr) {
//   const len = arr.length;
//   for (let index = len - 1; index >= 0; index--) {
//     for (let idxInt = 1; idxInt <= index; idxInt++) {
//       let temp;/*?*/
//       if (arr[idxInt - 1] > arr[idxInt]) {
//         temp = arr[idxInt - 1];
//         arr[idxInt - 1] = arr[idxInt];
//         arr[idxInt] = temp;
//       };
//    };
//  };
//  return arr;
// };
// console.log(bubbleSort(arr));

let canvas = document.querySelector('#canvas');
let context = canvas.getContext('2d');


context.strokeStyle = "blue";
context.lineWidth = 4;


context.moveTo(150, 150);
context.lineTo(200, 150);

context.rect(50, 50, 50, 50);

context.font = "20px Verdana";
context.fillStyle = 'red';
context.fillText("Teste", 200, 250);

// nu uita să pui la final această metodă
context.stroke();
