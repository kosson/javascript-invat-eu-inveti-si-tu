# Intl.RelativeTimeFormat

Oferă posibilitatea de a formata date calendaristice relative la un anumit moment în timp cu scopul de a le prezenta în formule mai umane.

```javascript
const rtf = new Intl.RelativeTimeFormat("en", {
    localeMatcher: "best fit", // other values: "lookup"
    numeric: "always", // other values: "auto"
    style: "long", // other values: "short" or "narrow"
});

function getDifferenceInDays (fromDate, toDate) {
  const diff = Math.floor((fromDate - toDate) / (1000*60*60*24));
  return rtf.format(diff, "day");
}

getDifferenceInDays(new Date('2022-02-12T16:10:23.000Z'), new Date());
// '135 days ago'
```