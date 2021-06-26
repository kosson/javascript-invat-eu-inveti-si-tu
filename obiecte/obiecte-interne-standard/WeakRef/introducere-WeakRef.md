# WeakRef

Acest obiect îți permite să ții o legătură slabă la un alt obiect. Acest lucru înseamnă că i se permite obiectului legat să fie distrus (*colectat la gunoi*). Obiectul legat poartă denumirea de *țintă* sau *referent*.

Un lucru important care trebuie menționat este acela că un obiect care este o referință slabă, nu este același cu obiectul referit.

Exemplul oferit de Mozilla MDN este cazul unui contor care se oprește din numărat dacă obiectul dispare.

```javascript
class Counter {
  constructor(element) {
    // Stabilește o referință slabă la elementul DOM
    this.ref = new WeakRef(element);
    this.start();
  }

  start() {
    if (this.timer) {
      return;
    }

    this.count = 0;

    const tick = () => {
      // Ia un element din obiect, dacă acesta mai există
      const element = this.ref.deref();
      if (element) {
        element.textContent = ++this.count;
      } else {
        // Cazul în care elementul nu mai există
        console.log("The element is gone.");
        this.stop();
        this.ref = null;
      }
    };

    tick();
    this.timer = setInterval(tick, 1000);
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = 0;
    }
  }
}

const counter = new Counter(document.getElementById("counter"));
setTimeout(() => {
  document.getElementById("counter").remove();
}, 5000);
```

## Resurse

- [WeakRef | Mozilla MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakRef)
