# CSI 3540 - Lab 5

Solution HTML + JavaScript (client-side only) pour le Laboratoire 5 de CSI 3540.

## Structure

- `lab5/index.html`
- `lab5/lab5.js`

## Exigences couvertes

- Validation de numéros de téléphone avec `RegExp` pour les formats:
  - `(123)456-7890`
  - `(123) 456-7890`
  - `123/456-7890`
  - `123-456-7890`
  - `123.456.7890`
  - `123 456 7890`
  - `1234567890`
- Génération d'expressions arithmétiques aléatoires avec `+ - * /`.
- Quiz utilisant `window.prompt()` et `eval()` pour comparer la réponse usager.
- Gestion de `Cancel` et des entrées invalides.
- Affichage des résultats directement sur la page.
- Bonus implémenté: `CircularQueue` en JavaScript + mini démo.

## How to run

1. Clone le repo.
2. Ouvre `lab5/index.html` dans un navigateur.
3. Aucun framework, build step ou dépendance.

## How to test

### 1) Validation téléphone

- Entrée: `(123)456-7890` -> `Numéro valide.`
- Entrée: `(123) 456-7890` -> `Numéro valide.`
- Entrée: `123/456-7890` -> `Numéro valide.`
- Entrée: `123-456-7890` -> `Numéro valide.`
- Entrée: `123.456.7890` -> `Numéro valide.`
- Entrée: `123 456 7890` -> `Numéro valide.`
- Entrée: `1234567890` -> `Numéro valide.`
- Entrée: `123-45-67890` -> `Numéro invalide.`
- Entrée: `abc` -> `Numéro invalide.`

### 2) Quiz arithmétique

1. Clique `Faire un quiz`.
2. Le prompt affiche une expression.
3. Entre une valeur numérique:
   - Bonne valeur -> `Correct. Résultat: ...`
   - Mauvaise valeur -> `Faux. Résultat attendu: ...`
4. Clique `Cancel` -> `Quiz annulé.`
5. Entre `abc` -> `Entrée invalide: veuillez entrer un nombre.`

### 3) Bonus CircularQueue

1. Clique `Exécuter demoQueue()`.
2. Vérifie la trace de test (`enqueue`, `dequeue`, `isFull`, `peek`, état final).
