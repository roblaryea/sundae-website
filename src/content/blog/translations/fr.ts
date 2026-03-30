import type { BlogLocaleTranslations } from '../types';
import { frBatch2BlogTranslations } from './fr-batch-2';
import { frBatch3BlogTranslations } from './fr-batch-3';
import { frBatch4BlogTranslations } from './fr-batch-4';
import { frBatch5BlogTranslations } from './fr-batch-5';
import { frBatch6BlogTranslations } from './fr-batch-6';
import { frBatch7BlogTranslations } from './fr-batch-7';
import { frBatch8BlogTranslations } from './fr-batch-8';
import { frBatch9BlogTranslations } from './fr-batch-9';
import { frBatch10BlogTranslations } from './fr-batch-10';
import { frBatch11BlogTranslations } from './fr-batch-11';
import { frBatch12BlogTranslations } from './fr-batch-12';
import { frBatch13BlogTranslations } from './fr-batch-13';
import { frBatch14BlogTranslations } from './fr-batch-14';

export const frBlogTranslations: BlogLocaleTranslations = {
  'inside-sundae-canvas': {
    status: 'translated',
    title: "À l'intérieur de Sundae Core : transformer automatiquement des données brutes en tableaux de bord clairs",
    summary:
      'Sundae Core unifie les données POS, de main-d’œuvre, de stock et financières dans des tableaux de bord opérationnels en temps réel. Découvrez comment la normalisation automatique des données élimine le reporting manuel.',
    readTime: '8 min de lecture',
    content: `## Introduction

Les exploitants de restaurants perdent plus de 10 heures par semaine à construire des rapports manuellement. Ils exportent des fichiers CSV depuis les systèmes POS, téléchargent les données de paie depuis les plateformes RH, récupèrent les niveaux de stock depuis les logiciels de gestion et extraient les données financières depuis les outils comptables, puis passent des heures dans Excel à essayer de réconcilier les formats, corriger les erreurs de données et créer des visualisations. Au moment où le rapport est prêt, les données sont déjà obsolètes et le moment de décision est passé. **Sundae Core élimine complètement cela** en unifiant automatiquement chaque source de données dans un seul tableau de bord opérationnel en temps réel. Ce n’est pas juste un autre outil de BI - c’est une intelligence décisionnelle conçue spécialement pour les opérations de restauration multi-sites.

## Pourquoi cela compte pour les exploitants de restaurants

Les exploitants multi-sites font face à une complexité particulière. Chaque établissement génère des milliers de transactions quotidiennes à travers les systèmes POS, de main-d’œuvre, de stock et de retours clients. Le reporting traditionnel oblige les opérateurs à consolider ces données manuellement, ce qui crée trois problèmes critiques:

- **Perte de temps**: les équipes finance passent 10 à 15 heures par semaine à construire des rapports au lieu d’analyser les insights
- **Décisions retardées**: une fois les données compilées, le moment de décision est déjà passé
- **Angles morts**: les processus manuels manquent des modèles et des anomalies que les systèmes automatisés détectent instantanément
- **Incohérence**: différents membres de l’équipe produisent différentes versions du "même" rapport avec des chiffres contradictoires

Le coût est mesurable: les opérateurs gérant plus de 20 sites perdent généralement 2 à 3 points de marge par an à cause de décisions retardées par des cycles de reporting lents.

## Les limites des outils traditionnels

La plupart des groupes de restauration s’appuient sur une pile technologique fragmentée: POS pour les transactions, logiciels de paie pour la main-d’œuvre, gestion de stock pour le COGS, logiciels comptables pour les finances et plateformes de retours clients pour le ressenti. Chaque système utilise des formats de données, des rythmes de mise à jour et des conventions de nommage différents.

L’approche traditionnelle exige:

1. **Exports manuels**: télécharger des fichiers CSV depuis chaque système
2. **Nettoyage des données**: corriger les erreurs de formatage, réconcilier les différences de nommage, gérer les valeurs manquantes
3. **Gymnastique Excel**: construire des formules, créer des tableaux croisés dynamiques et générer des graphiques
4. **Diffusion**: envoyer des PDF statiques déjà obsolètes au moment où ils sont envoyés

Ce processus réactif et manuel crée une visibilité en 1D - vous voyez ce qui s’est passé la semaine dernière, mais sans le contexte pour comprendre pourquoi cela s’est produit ni quoi faire ensuite.

## Comment Sundae change la donne

Sundae Core unifie automatiquement chaque source de données dans un seul tableau de bord opérationnel offrant une intelligence 4D en temps réel:

- **Sundae Scout** normalise automatiquement les données provenant de toutes les sources - aucun mappage manuel des champs ni export CSV requis
- **Sundae Core** visualise les données unifiées avec des tableaux de bord spécifiques aux rôles pour les opérateurs, la finance, le marketing et les RH
- **Sundae Core** surveille les tableaux de bord en continu et vous alerte des anomalies avant qu’elles ne deviennent des crises
- **Sundae Watchtower** ajoute un contexte concurrentiel montrant comment vos indicateurs se comparent aux benchmarks du marché
- **Sundae Core** vous permet de poser des questions en langage courant: "Pourquoi la main-d’œuvre a-t-elle bondi au site 12 mardi dernier ?"

La transformation est fondamentale: on passe d’un reporting manuel qui montre ce qui s’est passé la semaine dernière à une intelligence automatisée qui montre ce qui se passe maintenant et ce qu’il faut faire ensuite.

## Scénarios concrets

**Scénario 1: Détection des écarts de main-d’œuvre**

Un groupe fast-casual de 30 sites passait 12 heures par semaine à construire des rapports de main-d’œuvre. Au moment où la finance a identifié un site dépassant le plan de 4 points, il était déjà trop tard - l’écart s’était accumulé pendant trois semaines.

Après la mise en place de Sundae Core:

- Les tableaux de bord de main-d’œuvre en temps réel se mettaient à jour toutes les heures via l’intégration de paie
- Sundae Core a détecté l’écart en moins de 24 heures
- L’équipe opérations a immédiatement appliqué des ajustements de planning
- Résultat: 47 k$ de dépassements supplémentaires de main-d’œuvre évités, et 10 heures par semaine économisées pour l’équipe finance

**Scénario 2: Analyse d’un coût alimentaire**

Un groupe de restaurants à Dubaï a remarqué que le coût alimentaire augmentait globalement, sans parvenir à identifier quels sites ou quels éléments du menu étaient à l’origine de la hausse. Le reporting traditionnel exigeait de comparer manuellement les données de mix POS avec les coûts de facturation sur 8 fournisseurs différents.

Avec Sundae Core:

- Les tableaux de bord COGS automatisés affichaient le coût alimentaire par site, catégorie et article en temps réel
- Ils ont identifié que 3 sites avaient des problèmes de contrôle des portions sur des produits à fort volume
- Les opérations ont mis en œuvre des actions correctives en moins de 48 heures
- Résultat: réduction du coût alimentaire de 1,8 point sur l’ensemble du portefeuille, soit l’équivalent de 180 k$ par an

**Scénario 3: Comparaison des performances du portefeuille**

Un opérateur franchisé gérant 45 sites sur les marchés du CCG avait du mal à benchmarker les performances entre différents concepts et zones géographiques. Le reporting manuel rendait la comparaison des sites longue et incohérente.

Vue unifiée de Sundae Core:

- Des classements de performance en temps réel montrant quels sites excellent en efficacité de main-d’œuvre, satisfaction client et revenu par mètre carré
- Identification des meilleures pratiques: que font différemment les 10 meilleurs sites ?
- Reproduction systématique de l’excellence sur l’ensemble du portefeuille
- Résultat: les sites du dernier quartile ont amélioré leur efficacité opérationnelle de 2,2 points en 90 jours

## L’impact mesurable

Les opérateurs qui déploient Sundae Core obtiennent généralement:

- **Gain de temps**: réduction de 10 à 15 heures par semaine du temps consacré au reporting manuel
- **Décisions plus rapides**: détection et traitement des problèmes en 24 à 48 heures au lieu de plusieurs semaines
- **Amélioration des marges**: gain de 1 à 3 points sur la main-d’œuvre, le COGS et les coûts maîtrisables
- **Meilleure visibilité**: les tableaux de bord en temps réel remplacent les rapports statiques hebdomadaires ou mensuels
- **Cohérence**: une source unique de vérité élimine les versions contradictoires des rapports
- **Scalabilité**: l’ajout de nouveaux sites ou de nouvelles sources de données prend des heures, pas des mois

Le calcul du ROI est simple: si votre équipe économise 12 heures par semaine à 75 $/heure de coût de main-d’œuvre, cela représente 47 k$ par an de gain de temps direct - avant même de compter l’impact de meilleures décisions prises grâce à l’intelligence en temps réel.

## Checklist opérateur: comment démarrer

**Étape 1: Identifier vos points de douleur actuels**

- Combien d’heures votre équipe passe-t-elle à construire les rapports hebdomadaires ?
- À quelle vitesse détectez-vous et traitez-vous les problèmes opérationnels ?
- Différents membres de l’équipe ont-ils des versions différentes des "mêmes" chiffres ?

**Étape 2: Connecter vos sources de données**

- Système POS (transactions, mix, ventes)
- Plateforme paie/RH (heures de main-d’œuvre, coûts, planning)
- Gestion de stock (COGS, pertes, niveaux de par)
- Logiciel comptable (P&L, réel vs budget)
- Plateformes de retours clients (avis, scores de satisfaction)

**Étape 3: Configurer des tableaux de bord par rôle**

- Opérations: efficacité de la main-d’œuvre, nombre de transactions, débit
- Finance: réel du P&L vs plan, coûts maîtrisables, rentabilité des sites
- Marketing: fréquence des clients, ticket moyen, efficacité des promotions
- RH: turnover, coût de main-d’œuvre par site, conformité du planning

**Étape 4: Mettre en place votre rythme opérationnel**

- Quotidien: examiner les tableaux de bord en temps réel pour détecter les anomalies
- Hebdomadaire: réunion opérations centrée sur les exceptions signalées par Insights
- Mensuel: revue stratégique utilisant la 4D Intelligence (Réel vs Plan vs Benchmark vs Prévision)

## Conclusion et appel à l’action

Sundae Core transforme les données de restauration d’une contrainte de reporting en un actif opérationnel. Au lieu de perdre du temps à construire des rapports manuellement, les opérateurs obtiennent une intelligence en temps réel qui montre ce qui se passe maintenant, comment cela se compare au plan et au marché, et quoi faire ensuite.

La différence entre un reporting réactif et une intelligence proactive est mesurable: décisions plus rapides, meilleures marges et plus de temps consacré à la stratégie plutôt qu’à l’archéologie des données. Découvrez Sundae Core avec vos propres données - **réservez une démo** pour voir comment les tableaux de bord automatisés éliminent le reporting manuel et débloquent de meilleures décisions sur l’ensemble de votre portefeuille.`,
  },
  'why-nexus-replaces-dashboard-suite': {
    status: 'translated',
    title: 'Pourquoi Sundae Core remplace la moitié de votre suite de tableaux de bord',
    summary:
      'La plupart des opérateurs utilisent 5 tableaux de bord ou plus pour trouver des réponses. Sundae Core vous permet de poser des questions en langage courant et d’obtenir des réponses instantanées, riches en contexte. Fini la chasse aux tableaux de bord.',
    readTime: '7 min de lecture',
    content: `## Introduction

L’exploitant moyen d’un restaurant utilise 5 à 7 tableaux de bord différents chaque jour: POS pour les ventes, système de main-d’œuvre pour le planning, inventaire pour le COGS, comptabilité pour le P&L, retours clients pour la satisfaction. Trouver une seule réponse exige d’identifier quel tableau de bord contient les données, de se connecter, de naviguer dans les menus, de sélectionner des plages de dates, d’appliquer des filtres et de faire soi-même l’analyse. Au moment où vous avez une réponse, le moment de décision est passé et vous avez perdu 15 minutes en archéologie des données. **Sundae Core coupe court à ce cycle** en permettant aux opérateurs de poser des questions en langage courant et d’obtenir une réponse accompagnée du contexte 4D. Au lieu de passer d’un outil à l’autre, l’équipe peut rester concentrée sur la décision elle-même.

## Pourquoi cela compte pour les exploitants de restaurants

Les exploitants multi-sites prennent chaque semaine des centaines de décisions opérationnelles. Le BI traditionnel basé sur des tableaux de bord exige de savoir où regarder, comment filtrer et comment interpréter des indicateurs isolés. Cela crée trois inefficacités critiques:

- **Changement de contexte**: passer d’un tableau de bord à l’autre brise la concentration et fait perdre du temps
- **Courbe d’apprentissage**: les nouveaux membres de l’équipe ont besoin de semaines pour apprendre où se trouve chaque indicateur
- **Charge d’analyse**: il faut encore comprendre ce que signifient les chiffres et quoi faire ensuite
- **Réponse lente**: au moment où vous atteignez le bon tableau de bord, formatez la requête et extrayez les insights, le moment est déjà passé

Le résultat est prévisible: les opérateurs passent plus de temps à chercher des données qu’à agir sur les insights, et les décisions critiques sont retardées parce qu’il est trop pénible de trouver les réponses.

## Les limites des outils traditionnels

Les plateformes BI traditionnelles ont été conçues pour les analystes, pas pour les opérateurs. Elles partent du principe que vous savez:

- Quel tableau de bord contient la réponse
- Comment construire la bonne requête
- Quels filtres appliquer
- Comment interpréter l’indicateur isolé

Un flux de travail typique ressemble à ceci:

1. "Pourquoi les ventes ont-elles chuté au site 8 hier ?"
2. Se connecter au tableau de bord POS, sélectionner le site 8, choisir la date d’hier
3. Voir les ventes baisser de 12 %, mais sans contexte pour expliquer pourquoi
4. Passer au tableau de bord de main-d’œuvre pour vérifier le planning
5. Passer à l’API météo pour voir si des facteurs externes comptent
6. Passer à l’intelligence concurrentielle pour voir l’activité du marché
7. Synthétiser manuellement quatre sources de données pour formuler une hypothèse
8. Le moment de décision est passé - vous analysez désormais hier au lieu d’agir aujourd’hui

Ce workflow réactif, fondé sur la navigation de tableau de bord en tableau de bord, explique pourquoi la plupart des opérateurs s’en remettent au simple instinct au lieu de décisions fondées sur les données.

## Comment Sundae change la donne

Sundae Core utilise l’IA conversationnelle pour vous permettre de poser des questions directement et d’obtenir des réponses instantanées avec un contexte 4D complet:

**Posez la question en langage courant:**

"Pourquoi la main-d’œuvre a-t-elle bondi au site 12 mardi dernier ?"

**Obtenez une intelligence 4D instantanée:**

- **Réel**: la main-d’œuvre a atteint 34,2 %, soit +5,1 points par rapport au mardi précédent
- **Plan**: l’objectif était de 29,1 %, avec un écart de +5,1 points
- **Benchmark**: la médiane du marché est de 28,7 %, vous êtes donc 5,5 points au-dessus du marché
- **Prévision**: la tendance est à 33,8 % cette semaine sans intervention

**Avec analyse des causes racines:**

- Erreur de planning: 3 employés FOH supplémentaires pendant les heures creuses
- Chevauchement de formation: 2 nouvelles recrues sur le même service ont réduit l’efficacité
- Facteur externe: une promotion concurrente a provoqué une hausse inhabituelle du trafic

**Avec action recommandée:**

- Immédiat: ajuster le planning d’aujourd’hui pour éviter une répétition
- Court terme: étaler la formation des nouvelles recrues pour éviter une perte d’efficacité
- Stratégique: revoir l’automatisation du planning pour prévenir de futures erreurs

Le workflow change lui aussi. Au lieu de naviguer dans des tableaux de bord pour trouver des indicateurs isolés, vous posez une question directe et obtenez une réponse prescriptive avec le contexte de soutien déjà assemblé.

## Scénarios concrets

**Scénario 1: Réunion opérationnelle hebdomadaire**

Approche traditionnelle: le manager opérations passe 2 heures avant la réunion à extraire des rapports de 6 tableaux de bord, à construire des synthèses Excel et à préparer des slides. La réunion ne revient que sur ce qui s’est passé la semaine dernière, sans contexte sur les raisons ni sur les actions à prendre.

Avec Sundae Intelligence:

- Le manager demande: "Montrez-moi les 5 principaux problèmes de performance cette semaine"
- Sundae Intelligence identifie instantanément: un écart de main-d’œuvre sur 3 sites, une dérive du food cost sur 2 sites, une satisfaction client en baisse sur 1 site
- Chaque problème inclut un contexte 4D, une analyse de la cause racine et des actions recommandées
- La réunion opérationnelle devient une discussion stratégique sur les solutions plutôt qu’un simple point de statut
- Résultat: 2 heures économisées chaque semaine, des décisions prises plus vite avec un meilleur contexte

**Scénario 2: Analyse financière**

Le DAF constate que le coût global de la main-d’œuvre augmente, mais doit comprendre quels sites, quels rôles et quelles périodes alimentent cette hausse. L’approche traditionnelle exige d’interroger le système de paie, d’exporter les données, de construire des tableaux croisés et d’analyser les tendances.

Avec Sundae Intelligence:

- Le DAF demande: "Pourquoi le coût de la main-d’œuvre augmente-t-il sur l’ensemble du portefeuille ?"
- Sundae Intelligence analyse tous les sites et identifie: 12 sites au-dessus du plan à cause d’inefficacités de planning, 5 sites impactés par des hausses de salaire minimum, 3 sites surstaffés par rapport au volume de transactions
- Décompose l’impact par site et affiche une comparaison 4D (Réel vs Plan vs Benchmark vs Prévision)
- Recommande des actions: mettre en place une optimisation du planning sur les 12 sites, ajuster les budgets pour les hausses de salaires, recalibrer les effectifs sur les sites surstaffés
- Résultat: le DAF obtient une analyse complète en 30 secondes au lieu de 3 heures

**Scénario 3: Efficacité marketing**

Le responsable marketing a lancé une promotion sur 15 sites mais doit comprendre rapidement le ROI pour décider d’un déploiement à l’échelle du portefeuille.

Avec Sundae Intelligence:

- Il demande: "Quel est le ROI de la promotion de la semaine dernière ?"
- Sundae Intelligence analyse les données de transaction, calcule le revenu incrémental, prend en compte le coût de la remise et compare aux sites témoins
- Affiche une vue 4D: gain réel vs gain prévu vs performance promotionnelle de référence vs résultats prédits en cas de déploiement
- Identifie: la promotion a très bien fonctionné sur 10 sites, mais a sous-performé sur 5 sites
- Recommande: étendre aux sites similaires et éviter l’extension aux sites dont le profil ressemble à celui des sous-performeurs
- Résultat: une décision fondée sur les données en quelques minutes au lieu de plusieurs jours

## L’impact mesurable

Les opérateurs qui utilisent Sundae Core obtiennent:

- **Gain de temps**: réduction de 60 à 70 % du temps passé à trouver des réponses
- **Décisions plus rapides**: le cycle moyen de décision passe de plusieurs jours à quelques heures
- **Meilleurs résultats**: le contexte 4D mène à des décisions plus éclairées
- **Moins de tableaux de bord**: les opérateurs éliminent 3 à 5 tableaux de bord à usage unique
- **Onboarding plus simple**: les nouveaux membres deviennent productifs immédiatement sans apprendre plusieurs systèmes
- **Focalisation stratégique**: le temps est consacré aux solutions plutôt qu’à l’archéologie des données

Ce gain de temps est facile à quantifier: si votre équipe opérations économise 5 heures par semaine à 85 $/heure de coût complet, cela représente 22 k$ par an avant même de compter le gain lié à des décisions plus rapides et meilleures.

## Checklist opérateur: comment démarrer

**Étape 1: Identifier votre douleur actuelle liée aux tableaux de bord**

- Combien de tableaux de bord utilisez-vous chaque jour ?
- Combien de temps passez-vous à trouver des réponses par rapport à agir sur les insights ?
- Combien de temps faut-il à de nouveaux membres de l’équipe pour devenir autonomes ?

**Étape 2: Connecter Sundae Intelligence à vos données**

- POS (ventes, transactions, mix)
- Main-d’œuvre (heures, coûts, planning)
- Inventaire (COGS, pertes)
- Finance (P&L, budgets)
- Intelligence concurrentielle (intégration Watchtower)

**Étape 3: Commencer à poser des questions**

- Commencez par vos questions les plus fréquentes: "Pourquoi les ventes ont-elles baissé ?" "Où la main-d’œuvre dépasse-t-elle le plan ?" "Quels sites sous-performent ?"
- Sundae Intelligence apprend votre langage et améliore ses réponses au fil du temps
- Enregistrez les questions fréquentes comme raccourcis pour votre équipe

**Étape 4: Remplacer les tableaux de bord de manière systématique**

- Identifiez quels tableaux de bord à usage unique Sundae Intelligence remplace mieux
- Supprimez les outils redondants pour réaliser des économies
- Concentrez les tableaux de bord restants sur les besoins de visualisation spécialisés

## Conclusion et appel à l’action

L’intelligence dans la restauration s’éloigne de la navigation permanente entre tableaux de bord pour aller vers des questions directes accompagnées de contexte. Au lieu de chercher des indicateurs isolés dans 7 systèmes différents, les opérateurs peuvent poser ce dont ils ont besoin en langage courant et obtenir une réponse exploitable.

Sundae Core aide les équipes à passer moins de temps à chercher des chiffres et plus de temps à bien les utiliser. **Réservez une démo** pour voir comment Sundae Intelligence peut remplacer les tableaux de bord redondants et rendre les décisions du quotidien plus simples à exécuter.`,
  },
  ...frBatch2BlogTranslations,
  ...frBatch3BlogTranslations,
  ...frBatch4BlogTranslations,
  ...frBatch5BlogTranslations,
  ...frBatch6BlogTranslations,
  ...frBatch7BlogTranslations,
  ...frBatch8BlogTranslations,
  ...frBatch9BlogTranslations,
  ...frBatch10BlogTranslations,
  ...frBatch11BlogTranslations,
  ...frBatch12BlogTranslations,
  ...frBatch13BlogTranslations,
  ...frBatch14BlogTranslations,
};
