# Queue

Queue este o structură de date de tip FIFO (First In First Out).

```javascript
class Queue {
  #items;
  #capacity;

  /**
   * Inițializarea unui queue
   * @param capacity {number?}
   */
  constructor(capacity = Number.MAX_SAFE_INTEGER) {
    this.#items = [];
    this.#capacity = capacity;
  }

  /**
   * Verifică dacă este gol
   * @return {boolean}
   */
  isEmpty() {
    return this.#items.length === 0;
  }

  /**
   * Verifică dacă este plină
   * @return {boolean}
   */
  isFull() {
    return this.#items.length === this.#capacity;
  }

  /**
   * Întroduce/inserează un element la începutul queue-ului
   * @param element {any}
   */
  enqueue(element) {
    if (this.isFull()) {
      this.#items.pop()
    }
    this.#items.unshift(element);
  }

  /**
   * Elimină un element de la finalul queue-ului.
   * Returnează elementul șters.
   * Returnează null dacă este goală.
   * @return {*}
   */
  dequeue() {
    if (this.isEmpty()) {
      return null
    }
    return this.#items.pop();
  }

  /**
   * Returnarea primului element
   * @return {undefined | any}
   */
  front() {
    return this.#items[this.size() - 1];
  }

  /**
   * Returnează elementul de la final
   * @return {undefined | any}
   */
  back() {
    return this.#items[0];
  }

  /**
   * Returnează dimensiunea queue-ului
   * @return {number}
   */
  size() {
    return this.#items.length;
  }
}
```

## Queue cu elemente prioritare

Acest tip de `Queue` este o variantă în care elementelor li se pot conferi priorități care contează la momentul în care se face scoaterea elementelor din queue. Dacă două elemente au aceeași prioritate, acestea vor sta unul după altul.

```javascript
class Queue {
  /** @type {{ value: any; priority: number;}[]} */
  #items;
  #capacity;

  /**
   * Inițializarea unui queue
   * @param capacity {number?}
   */
  constructor(capacity = Number.MAX_SAFE_INTEGER) {
    this.#items = [];
    this.#capacity = capacity;
  }

  /**
   * Verifică dacă este gol
   * @return {boolean}
   */
  isEmpty() {
    return this.#items.length === 0;
  }

  /**
   * Verifică dacă este plin
   * @return {boolean}
   */
  isFull() {
    return this.#items.length === this.#capacity;
  }

  /**
   * Întroduce/inserează un element la începutul queue-ului
   * Elementul are o valoare și o prioritate
   * @param element {{ value: any; priority: number;}}
   */
  enqueue(element) {
    if (this.isEmpty()) {
      this.#items.push(element);
      return
    }
    if (this.isFull()) {
      this.#items.pop();
    }
    let isAdded = false;
    for (let i = 0; i < this.size(); i++) {
      if (element.priority < this.#items[i].priority) {
        this.#items.splice(i, 0, element);
        isAdded = true;
        break;
      }
    }

    if (!isAdded) {
      this.#items.push(element)
    }
  }

  /**
   * Elimină un element de la finalul queue-ului.
   * Returnează elementul șters.
   * Returnează null dacă este goală.
   * @return {*}
   */
  dequeue() {
    if (this.isEmpty()) {
      return null
    }
    return this.#items.pop().value;
  }

  /**
   * Retunează elementul din față
   * @return {undefined | any}
   */
  front() {
    return this.#items[this.size() - 1].value;
  }

  /**
   * Returează ultimul element
   * @return {undefined | any}
   */
  back() {
    return this.#items[0].value;
  }

  /**
   * Returnează dimensiunea queue-ului
   * @return {number}
   */
  size() {
    return this.#items.length;
  }
}
```

## Resurse

- [Writing Your Own JavaScript Data Structures | Oyster Lee | Feb 21, 2022](https://betterprogramming.pub/writing-your-own-javascript-data-structures-a63eca08c1ee)
