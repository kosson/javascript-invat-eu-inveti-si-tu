# Data Blocks

Blocurile de date sunt un tip de lucru al standardului ECMAScript.

**Spune standardul**

> Tipul specificației Data Block este folosit pentru a descrie o secvență distinctă și mutabilă de valori numerice cu dimensiunea în bytes (8 biți). O valoare Data Block este creată cu un număr fix de bytes, care idividual au fiecare valoarea 0.

Standardul ne lămurește că pentru a putea accesa bytes din blocul de date, se va folosi o notație similară cu cea a array-urilor. Astfel, vom avea o secvență de elemente, fiecare fiind câte un byte, care va fi inițiată de la `0`. Ca o concluzie, vom putea accesa fiecare byte din blocul de date, atâta vreme cât cunoaștem poziția/indexul.

## Shared Data Blocks

**Spune standardul**

> Un bloc de date care rezidă în memorie și care poate fi referit de agenți multipli simultan este desemnat a fi un Shared Data Block.

Un Shared Data Block are o identitate, dar este liber de adresă, adică nu este legat de nicio adresă virtuală mapat de vreun proces. Legătura este doar la setul de locații în memorie unde rezidă. Shared Data Blocks sunt diferite de Data Blocks.

## Referințe

- [6.2.7Data Blocks, ECMAScript 2017](https://www.ecma-international.org/ecma-262/8.0/#sec-data-blocks)
- [27 Memory Model, ECMAScript 2017](https://www.ecma-international.org/ecma-262/8.0/#sec-memory-model)
