Programmation Web L3 2020-2021
======================
 
**SU LiFang / 21957835 / Group B**
 
# Rendu Devoir Maison


### 1 Introduction
Cette application permet l'exécution d'un webserveur pour un fleuriste, permettant la vente de bouquets (personnalisables) pour les clients, ainsi que la conception des bouquets pour les employés. Il est conçu avec HTML, CSS , JavaScript, JQuery, coté client, nodejs, express, mysql , body parser côté serveur. en programmation modulaire.

Une vidéo de présentation est disponible ici : https://youtu.be/ZGRbf4xdDZM

Prérequis :
 - Mysql V8
 - Nodejs v14.16

### 2 Arborescence 
tree -I node_modules
.
├── README.md
├── main.html
├── main.js
├── package-lock.json
├── package.json
├── public
│   ├── css
│   │   ├── accueil_client.css
│   │   ├── accueil_employee.css
│   │   ├── bouquet_liste.css
│   │   ├── flower_liste.css
│   │   ├── main.css
│   │   └── panier_liste.css
│   ├── html
│   │   └── menu.html
│   ├── image
│   │   ├── bg1.jpeg
│   │   ├── bg2.jpeg
│   │   ├── bg4.jpeg
│   │   ├── bodrum.JPG
│   │   ├── chardons.jpeg
│   │   ├── daisy.jpeg
│   │   ├── gypsophila.jpeg
│   │   ├── lugano.JPG
│   │   ├── morzine.JPG
│   │   ├── ostuni.JPG
│   │   ├── patagonia.JPG
│   │   ├── pavots.jpeg
│   │   ├── penoy_w.jpg
│   │   ├── peony_p.jpg
│   │   ├── peony_r.jpg
│   │   ├── phalaire.jpeg
│   │   ├── positano.JPG
│   │   ├── ramis.jpg
│   │   ├── rose_r.jpeg
│   │   ├── san_marco.JPG
│   │   ├── sierra_nevada.JPG
│   │   ├── sunflower.jpg
│   │   ├── tulip_j.png
│   │   ├── tulip_r.jpg
│   │   ├── wadden.JPG
│   │   └── yukon.JPG
│   └── js
│       ├── bouquet.js
│       ├── client.js
│       ├── flower.js
│       └── server.js
├── src
│   ├── config
│   │   ├── db_async.js
│   │   └── su_lifang_fleuriste.sql
│   ├── middleware
│   │   └── admin.js
│   ├── model
│   │   ├── bouquetModel.js
│   │   ├── commandeModel.js
│   │   ├── panierModel.js
│   │   └── userModel.js
│   └── routes
│       ├── authentificationRoute.js
│       ├── bouquetRoute.js
│       ├── pageRoute.js
│       └── panierRoute.js
└── views
    ├── accueil_client.ejs
    ├── accueil_employee.ejs
    ├── bouquet-list.ejs
    ├── bouquet-perso.ejs
    ├── flower-list.ejs
    ├── history-list.ejs
    ├── identify.ejs
    ├── panier-list.ejs
    └── server_red.ejs

### 3 Installation
#### Mysql

La base Mysql doit être exécutée sur le port 3306
Le script `./src/config/su_lifang_fleuriste.sql` doit ensuite être exécuté via root afin de créer et initialiser les tables la base de données.

`mysql -u root`
`source ./src/config/su_lifang_fleuriste.sql`


#### Nodejs

- Le webserveur peut ensuite être exécuté via nodejs, avec la commande suivante : `npm run dev`

- L'application correctement lancée affichera le message suivant : `Server connected on 8080`

- L'application sera ensuite visible depuis n'importe quel navigateur sur l'adresse :  `http://localhost:8080/`

Cela vous demandant un nom d'utilisateur ainsi qu'un mot de passe.

### 4 Modélisation

Le script `./src/config/su_lifang_fleuriste.sql` modélise notre application et permet de créer plusieurs tables :

- user - contenant la liste des users

- etat - contenant la liste des états d'une commande

- bouquet - contenant la liste des bouquets achetables, prédéfinis ou non

- commandes - contenant la liste des commandes clientes, avec leur état, une commande consistant en un user, un type de bouquet, une quantité et un état

- flower - contenant la liste des fleurs disponibles pour la conception des bouquets

- composition - décrivant le detail de la composition florale de chaque bouquet, chaque ligne comprenant un id bouquet, un type de fleur et une quantite

Ce script procède aussi à des insertions à des fins de tests.
Ainsi divers users, bouquets prédéfinis et personnalisés, fleurs, compositions ainsi que des commandes sont enregistrées.
 
### 5 Tests
- Un user "Client" , login "test" , password "test" , comprenant des bouquets personnalisés  pré remplis, ainsi qu'un panier prérempli.
- Un second user "Client" , login "vide" , password "vide", simulant un nouvel utilisateur.
- Un user "Employee" , login "su" , password "su" , permettant de visualiser les bouquets personnalisés à concevoir.

#### Authentification - http://localhost:8080/
Les clients et les employés doivent s’identifier. cette page comprend une gestion des erreurs.
Les clients, après s'être identifiés, arrivent sur une page d'accueil leur sont proposés dynamiquement les bouquets du jour. 

#### Accueil client - http://localhost:8080/accueil_client
Le passage de la souris sur les bouquets entraîne une animation sophistiquée. 
Un menu "sidebar" est présent sur la gauche permettant plusieurs options :


#### Achat de bouquets - http://localhost:8080/bouquet
Liste l'ensemble des bouquets prédéfinis proposés par le fleuriste.

Le client peut visualiser graphiquement les photos bouquets,avec leur nom,  zoomer dessus en passant la souris sur la photo, visualiser la composition exacte des bouquets, leur prix, et y ajouter une quantité dans son panier.
    
Un filtre de prix est présent en haut de page permettant de lister uniquement les bouquets dans une fourchette de prix.

L'ajout de bouquets mène le client sur la page panier, ou il pourra valider la commande.
                    

#### Créez vos bouquets - http://localhost:8080/flower
Permet la création de bouquets personnalisés. L'ensemble des fleurs disponibles y sont listés, le client peut zoomer sur chaque fleur en passant la souris sur l'image.

Le client peut alors choisir une quantité de chaque type de fleur, nommer son bouquet personnalisé pour l'ajouter dans sa liste de bouquets personnalisés.


#### Vos bouquets personnalisés - http://localhost:8080/personnalise
Liste l'ensemble des bouquets personnalisés du client, permet au client de re-visualiser la composition de ses bouquets personnalisés, et d'en ajouter une certaine quantité dans son panier, ou il pourra valider la commande.

Cette page est liée à l'user logué, ainsi un user ne pourra visualiser les bouquets personnalisés des autres utilisateurs.

#### Votre panier - http://localhost:8080/panier
Liste l'ensemble des bouquets, prédéfinis ou personnalisés, avec leur quantité, ayant étés ajoutés par l'user, étant non validés.
Cette page permet de supprimer une commande non validée, de visualiser le montant total de la commande, et de valider le panier.
La validation du panier simule le paiement et  change l'état des commandes :
    - Commande complétée -> pour les bouquets prédéfinis qui sont immédiatement disponibles
    - En préparation  -> pour les bouquets personnalisés, dès lors un employé du fleuriste doit concevoir le bouquet et le valider, ce qui completera la commande.
                
#### Historique des commandes - http://localhost:8080/history
Cette page permet de visualiser l'historique et le statut des commandes du client, détaillant bouquet, quantité , prix unitaire et prix total.

#### Log out - http://localhost:8080/logout
Ce lien permet de se deconnecter proprement et redirige vers la page d'aithentification

Les employés arrivent sur une page d'accueil spécifique, différente de la page client.

#### Accueil employee - http://localhost:8080/accueil_employee
Cette page permet de visualiser l'ensemble des bouquets personnalisés à concevoir selon leur date de création, avec une représentation graphique de la composition à résaliser.
Lorsque le ou les bouquets sont créés, l'employé peut changer l'état de la commande. 
Cela supprime la ligne de la page employé, qui ne visualise que les commandes à concevoir.
 
### 6 Ajoute de nouveaux éléments via Mysql
L'application est évolutive, de nouveaux elements insérés étant directement intégrés dans le site.

- User :
    * `INSERT INTO user (login_user, password_user, is_employee) VALUES ('employe', 'employe', TRUE)`
    * `INSERT INTO user (login_user, password_user, is_employee) VALUES ('client', 'client', false)`

- Nouvelles fleurs ( l'image devant être stockée dans .\public\image ) :
    * `INSERT INTO flower(nom_flower, prix_flower, photo_url) VALUES ('NouvelleFleur', 10, '/newflower.jpg')`

- Nouveaux bouquets prédéfinis ( l'image devant être stockée dans .\public\image ) 
    * `INSERT INTO bouquet (id_createur,nom_bouquet, photo_url,predefini) VALUES (0,'NewBouquet', '/newbouquet.jpg',true);`
    * `INSERT INTO composition(id_bouquet, id_flower, quantity) VALUES ((select max(id_bouquet) from bouquet),2,50 );`

 ### 7 Conclusion
 Ce site traite l’ensemble des points abordés sur le sujet, il est pleinement fonctionnel pour les clients et les employés. 
 L’écran d’authentification comprend une gestion d’erreur, la page d’accueil client comprend une animation sophistiquée.
 L’illustration graphique des bouquets à acheter, à concevoir et à réaliser est effectuée.
 La programmation est modulaire séparant les parties CSS / HTML / javascript(jquery) en plusieurs fichiers.
 Aucune erreur JS n’est a remonter , les HTMLS / CSS sont valides (testé avec validator.w3.org).

### 8 Références
- Image des bouquets et des flowers : 
    * https://www.bergamotte.fr/
    * https://www.maisonsdumonde.com/FR/fr
- CSS Tutorial : 
    * https://codepip.com/games/flexbox-froggy/
    * https://codepip.com/games/grid-garden/
- HTML Tutorial : 
    * https://www.w3schools.com/
- JavaScript Tutorial : 
    * https://www.w3schools.com/js/default.asp
