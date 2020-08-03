# import

Această declarație este folosită pentru a importa legături live care sunt exportate de alt modul. Modulele importate se află în **strict mode**.

Această declarație nu poate fi folosită în scripturi incluse în pagină, cu excepția celor a căror taguri au atributul `type="module"`. Legăturile importate de la un modul se numesc live pentru că acestea pot fi actualizate de respectivul modul.

```javascript
import defaultExport from "nume-modul";
import * as name from "nume-modul";
import { export1 } from "nume-modul";
import { export1 as alias1 } from "nume-modul";
import { export1 , export2 } from "nume-modul";
import { foo , bar } from "nume-modul/calea/către/un_fișier/exportat/nume_fișier";
import { export1 , export2 as alias2 , [...] } from "nume-modul";
import defaultExport, { export1 [ , [...] ] } from "nume-modul";
import defaultExport, * as name from "nume-modul";
import "nume-modul";
var promise = import("nume-modul");
```

Există chiar și o funcție dinamică `import()` care nu are nevoie de scripturi `type="module"`.
