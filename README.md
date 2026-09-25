# RZCONCEPT

Site statique : ouvrir index.html ou servir ce dossier.

## Structure

- assets/js/content.js : reels, noms/photos/descriptions des espaces et tour.embedUrl.
- assets/js/spaces.js : sélection des espaces et visite intégrée.
- assets/js/app.js : reels et navigation.
- assets/js/motion.js : intro et animations.
- assets/css/ : styles responsive, palette bleu nuit #00001C, bleu #185DE8 et jaune #FFDA3D.

## Espaces et tour 360

Trois noms proposés avec compositions provisoires clairement signalées. Ajouter les photos dans assets/media puis renseigner image dans content.js. Mettre à jour les noms et descriptions et retirer la mention provisoire après validation. tour.embedUrl accepte une URL HTTPS d’intégration ; vide, la section affiche Prochainement. Le prestataire doit autoriser l’intégration iframe. Un lien externe accompagne la visite.

## Reels

Les trois lecteurs Instagram apparaissent directement. Leur lecture dépend des autorisations Instagram. Les liens directs restent disponibles. Le portfolio a été retiré à la demande du propriétaire.

## Vérification

Syntaxe JavaScript, liens internes, fichiers, navigation des espaces et gestion des URL 360 vérifiés. La vérification visuelle en navigateur reste à faire. Adresse Maps reprise du site original.

## Langues et contact

Sélecteur FR / EN / العربية, mémorisation locale et direction RTL pour l’arabe. languages.js traduit le contenu du site, y compris les espaces rendus dynamiquement ; les lecteurs tiers Instagram/Maps gardent leur interface propre. light.css alterne sections claires, reels bleus et contact jaune. Contact par Instagram existant, sans email ni téléphone inventé.

## Hero vidéo et galeries

Dans assets/js/content.js, renseigner hero.video avec le chemin MP4 et hero.poster avec une image. Fond dégradé affiché tant que la vidéo manque. Lecture muette, bouton pause et respect des mouvements réduits. Chaque espace possède une page espace-SLUG.html. Ajouter ses photos à gallery : [{ src: "assets/media/blue-room-01.jpg", alt: "Vue générale de Blue Room" }]. Sans photos : six emplacements explicitement marqués Photo à venir. Une galerie fournie ouvre les images en grand avec précédent/suivant, clavier et fermeture Échap.

## Photos du studio

Répartition visuelle : Blue Room 13/11/12 ; Le Salon 8/9/10/2 ; Creative Corner 6/5/7 ; Yellow Lounge 1/4. Ces groupes représentent des configurations, sans affirmer qu’il s’agit de pièces séparées. Photo 3 exclue du rendu pour artefacts visibles. Les originaux sont conservés ; les 12 versions JPEG de 1800 px sont utilisées par le site. Yellow Lounge est un nom descriptif proposé.
