# Promise.prototype.then()

Această metodă returnează la rândul său un alt obiect `Promise` care are nevoie să fie prelucrat. Metoda `then()` acceptă două argumente, care sunt callback-uri. Primul callback va prelucra rezultatele dacă acestea există. În caz contrar, cel de-al doilea callback va procesa eroarea. Cel de-al doilea callback este opțional.

Poți să înțelegi necesitatea callback-urilor ca niște acțiuni de răspus în cazurile posibile `fullfiled` ori `rejected`. Primul callback, cel al succesului și îndeplinirii acțiunii primește un singur argument, care este valoarea obținută în sine. Callbackul este executat cu prima ocazie când stiva se eliberează. Callback-ul în cazul `rejected` acceptă un argument acesta fiind și motivul pentru care nu s-a încheiat cu succes acțiunea.
