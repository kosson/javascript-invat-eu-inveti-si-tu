# Interfața Storage

Este o interfață care oferă acces la stocare locală și la stocare de sesiune.

Există două mecanisme: `sessionStorage` și `localStorage`.

Obiectul `Storage` folosit de `sessionStorage` va constitui câte o zonă de stocare pentru fiecare origine câtă vreme browserul este deschis. Datele supraviețuiesc reîncărcării paginii.

Dacă dorești ca datele să persiste chiar dacă browserul este închis, se va folosi `localStorage`.
