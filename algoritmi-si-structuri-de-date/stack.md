# Stack

Stack este o structură de date de tip LIFO (Last In First Out) sau FILO (First In Last Out).

Este utilă pentru prelucrarea datelor în ordine de la primele, la ultimele. O soluție/clasă care implementează această structură este cea oferită de Oyster Lee:

```javascript
class Stack {
  #items;

  constructor() {
    this.#items = []
  }

  /**
   * Verifică dacă stack-ul este gol
   * @return {boolean}
   */
  isEmpty() {
    return this.#items.length === 0;
  }

  /**
   * Întroduce/inserează un element în capul stack-ului
   * @param element {any}
   */
  push(element) {
    this.#items.unshift(element);
  }

  /**
   * Elimină un element din capul stack-ului, null dacă este gol
   * Este returnat elementul eliminat
   * @return {null | any}
   */
  pop() {
    if (this.isEmpty()) {
      return null;
    }
    return this.#items.shift();
  }

  /**
   * Returnează elementul din cap sau null dacă este gol
   * @return {null | any}
   */
  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.#items[0];
  }

  /**
   * Returnează dimensiunea stack-ului
   * @return {number}
   */
  size() {
    return this.#items.length;
  }
}
```

## Resurse

- [Writing Your Own JavaScript Data Structures | Oyster Lee | Feb 21, 2022](https://betterprogramming.pub/writing-your-own-javascript-data-structures-a63eca08c1ee)
