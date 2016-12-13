// deocamdata doar Chrome

var arr = ['w', 'y', 'k', 'o', 'p'];
var eArr = arr.values();
// your browser must support for..of loop
// and let-scoped variables in for loops
for (var letter of eArr) {
  console.log(letter);
}

var arr2 = ['w', 'y', 'k', 'o', 'p'];
var eArr2 = arr2.values();
console.log(eArr2.next().value); // w
