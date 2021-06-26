# FinalizationRegistry

Un obiect `FinalizationRegistry` îți permite să execuți un callback atunci când un obiect este cules la coșul de gunoi. Uneori aceste obiecte se mai numesc și *finalizers*.

```javascript
const registry = new FinalizationRegistry(heldValue => {
  // ....
});
registry.register(obiectul, "ceva la final");
```

În cazul în care, într-o etapă ulterioară, vei dori să scoți obiectul urmărit din registru, ai posibilitatea să pasezi drept al treilea argument un element care să acționeze scoaterea. De regulă va fi același obiect.

```javascript
registry.register(obiectul, "ceva la final", obiectul);
registry.unregister(obiectul);
```

Poate să nu fie același obiect cel care joacă rol de token.
