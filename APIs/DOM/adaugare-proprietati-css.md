## Adăugarea de proprietăți CSS unui element

Uneori este necesară adăugarea dinamică a unei propietăți CSS unui element

```javascript
var elementTintit = document.getElementById('ținta'),
    obiectPentruStilizare = elementTintit.style;

obiectPentruStilizare.color = "red";
obiectPentruStilizare.width = "2em";
```
