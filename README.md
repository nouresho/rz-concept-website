# RZCONCEPT — Creative Studio

Site statique responsive, sans installation ni compilation. Ouvrir `index.html` ou servir le dossier avec un serveur HTTP local. L'ancien site reste dans `rzconcept.html` comme référence.

## Organisation

- `index.html` : contenu et sections principales.
- `assets/css/style.css` : identité visuelle et responsive.
- `assets/js/content.js` : projets et reels à personnaliser.
- `assets/js/app.js` : filtres, fiches projet, menu mobile et lecteur vidéo.
- `assets/media/` : logo et futurs médias.
- `docs/CONTENU.md` : checklist éditoriale avant publication.

## Ajouter une réalisation

Modifier `window.RZ_CONTENT.projects` dans `assets/js/content.js`. Les catégories acceptées sont `branding`, `photo` et `digital`. Les projets actuels sont des concepts de démonstration explicitement identifiés, pas des références clients.

## Ajouter un reel

Créer `assets/media/reels/`, puis y déposer les MP4 et leurs affiches JPG/WebP. Renseigner `src` et `poster` pour chaque reel dans `content.js`. Le bouton de lecture apparaît automatiquement si `src` est renseigné. Lecture avec contrôles natifs, arrêt à la fermeture et message en cas de vidéo indisponible. Préférer du MP4 H.264 vertical 9:16, compressé pour le web. Inclure les sous-titres dans la vidéo si nécessaire.

## Publication

Déployer le dossier complet sur un hébergement statique. Sur GitHub Pages, sélectionner la branche publiée et le dossier racine. Aucun formulaire ni traitement de données n'est configuré : les contacts ouvrent le compte Instagram existant. Les polices Google nécessitent une connexion ; une police système prend le relais hors ligne.

Le site n'est pas encore publié par cette modification. Remplacer les concepts, ajouter les vraies vidéos et vérifier les informations avant publication.

## Palette de marque

Couleurs extraites du logo fourni : bleu nuit `#00001C`, bleu `#185DE8`, avec blanc pour les fonds et le contraste. Les transparences utilisent uniquement ces couleurs.

## Animations et logo

Logo original dans la navigation, le pied de page et la composition principale. Entrée progressive du hero, apparition des sections au défilement, transitions de survol, filtres et fenêtres de projet. Les animations respectent la préférence système de réduction des mouvements. Aucun écran de chargement ne bloque la navigation.

## Direction immersive

La feuille `assets/css/immersive.css` adapte la composition au modèle visuel fourni : fond bleu nuit, halos bleus, navigation vitrée, cartes verticales arrondies et superposées. Les compositions sont abstraites et utilisent le logo original ; les vrais médias restent à fournir.

## Reels Instagram intégrés

Les trois liens fournis sont configurés dans `content.js` via `instagram`, sans paramètres de suivi. Les trois lecteurs Instagram sont affichés directement dans la section reels et chargés dès l’ouverture de la page, sans carte intermédiaire ni fenêtre modale. Chaque lecteur propose aussi un lien direct. La lecture automatique dépend d’Instagram et du navigateur. Instagram peut limiter la lecture selon la confidentialité du compte, les réglages d’intégration, la connexion ou le navigateur. Les visuels sont ceux du lecteur Instagram, sans miniature extraite. Les titres sont neutres car les vidéos n’ont pas pu être consultées.

Publication portfolio ajoutée : https://www.instagram.com/p/C8nIBzjOdXw/ — intégration directe dans Tout voir et le filtre Instagram, avec lien de secours. Le contenu distant reste soumis aux autorisations Instagram.

## Jaune et animations

Accent jaune choisi : `#FFDA3D` (ajout demandé ; code exact à ajuster si une charte est fournie). `motion.css` et `motion.js` gèrent une intro logo de 1,8 seconde maximum, une fois par session, les apparitions au défilement et les interactions des cartes. Toute interaction interrompt l’intro. Le mode réduction des mouvements la désactive. Les animations entourent les lecteurs Instagram sans modifier leurs commandes internes.

## Localisation

Carte Google Maps ajoutée en bas de page avec chargement différé, lien de secours et itinéraire. Adresse et coordonnées reprises du site original : 30.4259884, -9.5699393. Apparition au défilement, transition de bordure et signal jaune bref ; les commandes natives de la carte restent accessibles.
