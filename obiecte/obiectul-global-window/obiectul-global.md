# Obiectul global

Obiectul global se creează înainte ca motorul să intre în vreun context de execuție.

Obiectul global nu poate fi constructor pentru că motorul JavaScript nu-l dotează cu o metodă [\[Construct]] care să-i dea această putere. Tot la capitolul lipsuri întemeiate, mai adăugăm faptul că obiectul global nu are o metodă internă [\[Call]] care să-l transforme într-o funcție ce poate fi apelată.

Obiectul global are un slot intern [\[Prototype]], dar obiectul `prototype` este diferit pentru fiecare implementator.

Standardul spune că suplimentar proprietăților definite de specificații, mai sunt o serie în plus, care sunt definite de cei care implementează motorul JavaScript, cazul de zi cu zi fiind diferitele browsere. „Acestea pot să includă o proprietate a cărei valoare este chiar obiectul global în sine; de exemplu, în document object model al documentului HTML, proprietatea window a obiectului global este chiar însuși obiectul global”.

Obiectul global este parte a mediului lexical a programului care se execută.
