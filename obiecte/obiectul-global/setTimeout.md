# setTimeout

## Promisificare

```javascript
//definește promisiunea
let dupăCevaTimp = (perioada) => new Promise(resolve > {
  setTimeout(() => {
    resolve(true);
  }, perioada);
});

// funcția responsabilă
let apelDupăCevaTimp = (callback, perioada) => dupăCevaTimp(perioada).then().catch((error) => console.error);

apelDupăCevaTimp(() => console.log("Ceva"), 1500);
```
