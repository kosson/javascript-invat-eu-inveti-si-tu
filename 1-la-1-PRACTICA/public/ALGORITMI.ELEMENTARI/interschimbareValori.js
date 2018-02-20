/*Varianta cu variabilă intermediară*/
// let a = 1, b = 2, temp;
// console.log(a, b);
// temp = a;
// a = b;
// b = temp;
// console.log(a, b);


/*Variantă folosind identitățile
x = (x - y) + y
y = ((x - y) + b) - (x - y) */
let x = 1, y = 2;
console.log(x, y);
x = x - y;  // 1 - 2 = -1
y = x + y;  // 1 + 2 = 3
x = y - x;  // 3 - 1 = 2
console.log(x, y);
