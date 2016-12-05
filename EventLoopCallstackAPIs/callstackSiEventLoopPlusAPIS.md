# Relația între stivă, event loop și API-uri pentru a permite asincronicitatea

Comportamentul asincron este permis de relația dintre runtime-ul JavaScript, stiva de apeluri și API-urile web. Fiecare dintre ceste componente reprezintă tot atâtea fire de execuție.

## Stiva apelurilor - CALLSTACK

Contextul de execuție este un mecanism pentru a ține evidența evaluării codului la momentul în care acesta este rulat. La oricare moment în timp ceea ce rulează când arunci privirea se numește „running execution context” - contextul de execuție în efect sau care rulează, mai pe scurt **ce rulează pe moment**.

Pentru a ține evidența a ceea ce se rulează este nevoie de un „răboj” pe care să poți aduna și scădea ce intră și se termină de rulat - contextele de execuție. Un astfel de mecanism este organizat ca o stivă și se numește „execution context stack” - stiva contextelor de execuție.

Evaluarea codului care se face într-un „context de execuție în efect” în plină desfășurare, se poate suspenda din diferite motive. În acest moment este posibil ca un alt context de execuție să devină „context de execuție în efect” și să pornească evaloarea propriului cod. Mai târziu, codul suspendat poate deveni la rândul său „contextul de execuție în efect” și să reia evaluara codului de la momentul de unde s-a oprit. Această succesiune a contextelor de execuție în efect este gestionată cu ajutorul unei stive care funcționează pe principiul FIFO - first in, first out.

Această stivă este o structură de date care memorează locul unde te afli în timpul rulării unui program. Invocarea unei funcții introduce acea funcție în stivă, iar dacă returnăm dintr-o funcție, stiva este eliberată de funcție.

![Exemplificare a modului în care funcționează stiva de apeluri](CallStack.svg)

Funcțiile în JavaScript permit argumente care la rândul lor sunt funcții. Numim funcțiile care permit acest lucru funcții de ordin înalt („higher order functions). Unele funcții care intră ca argumente sunt gândite să aibe au un comportament special în sensul că așteaptă până la încheierea execuției funcției și din acel moment își încep execuția. Acestea se numesc callback-uri. Callback-urile au un caracter sincron (`[].foreach(callback`)) și la nevoie asincron (`websocket.connect(callback)`) în ceea ce privește execuția.

![Explicarea mecanismului de folosire a Event Loop în cazul apelurilor asincrone](asyncCuTimeOut.svg)

Pentru programarea execuției unui callback după ce întreg programul a fost executat și stiva este goală se poate forța cu un setTimeout având al doilea argument 0.

```js
setTimeout(function cb(){
  console.log('după');
}, 0);
```

# Referințe

Acest material a fost inspirat de prezetarea lui Philip Roberts: [What the heck is the event loop anyway?](https://www.youtube.com/watch?v=8aGhZQkoFbQ) de la JSConf EU 2014. Instrumentul de simulare „Loupe” este la [acest link](http://latentflip.com/loupe).
