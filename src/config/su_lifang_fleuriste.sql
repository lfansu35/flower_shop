drop database if exists su_lifang_fleuriste;
create database su_lifang_fleuriste;
use su_lifang_fleuriste;
drop user IF EXISTS 'dm_pw'@'localhost';
create user 'dm_pw'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
GRANT ALL PRIVILEGES ON *.*  TO 'dm_pw'@'localhost';
flush privileges;

DROP TABLE IF EXISTS composition CASCADE;
DROP TABLE IF EXISTS flower CASCADE;
DROP TABLE IF EXISTS commandes CASCADE;
DROP TABLE IF EXISTS bouquet CASCADE;
DROP TABLE IF EXISTS etat CASCADE;
DROP TABLE IF EXISTS user CASCADE;



CREATE TABLE user (  
  id_user INT NOT NULL AUTO_INCREMENT, 
  login_user varchar(50) NOT NULL,  
  password_user varchar(20) NOT NULL,  
  is_employee BOOLEAN,
  PRIMARY KEY(id_user)      
);

CREATE TABLE etat(
    id_etat INT NOT NULL,
    etat VARCHAR(20),
    PRIMARY KEY(id_etat)
);



CREATE TABLE bouquet(
    id_bouquet INT NOT NULL AUTO_INCREMENT,
    id_createur int default 0,
    nom_bouquet VARCHAR(20),
    photo_url text, 
	predefini boolean default false,
    PRIMARY KEY(id_bouquet)
);


CREATE TABLE commandes(
    id_commande INT NOT NULL AUTO_INCREMENT,
    id_user INT NOT NULL,
    id_bouquet INT NOT NULL, 
    quantity INT, 
    id_etat INT NOT NULL,
    create_date TIMESTAMP NOT NULL,
    completed BOOLEAN DEFAULT FALSE, 
    PRIMARY KEY(id_commande),
    FOREIGN KEY(id_etat) REFERENCES etat(id_etat),
    FOREIGN KEY(id_user) REFERENCES user(id_user),
    FOREIGN KEY(id_bouquet) REFERENCES bouquet(id_bouquet)
);

CREATE TABLE flower(
    id_flower INT NOT NULL AUTO_INCREMENT,
    nom_flower VARCHAR(20),
    prix_flower INT, 
    photo_url text, 
    PRIMARY KEY(id_flower)
);

CREATE TABLE composition(
    id_compo INT NOT NULL AUTO_INCREMENT,
    id_bouquet INT NOT NULL,
    id_flower INT NOT NULL, 
    quantity INT, 
    PRIMARY KEY(id_compo),
    FOREIGN KEY(id_flower) REFERENCES flower(id_flower),
    FOREIGN KEY(id_bouquet) REFERENCES bouquet(id_bouquet)
);


INSERT INTO user (login_user, password_user, is_employee)
VALUES
    ('su', 'su', TRUE),
    ('vide', 'vide', FALSE),
    ('lulu', 'lulu', FALSE),
    ('toto', 'toto', FALSE),
    ('tata', 'tata', FALSE),
    ('test', 'test', FALSE);


INSERT INTO bouquet (id_createur,nom_bouquet, photo_url,predefini)
VALUES
    (0,'Lugano', '/lugano.JPG',true),
    (0,'Bodrum', '/bodrum.JPG',true),
    (0,'Morzine', '/morzine.JPG',true),
    (0,'Ostuni', '/ostuni.JPG',true),
    (0,'Patagonia','/patagonia.JPG',true),
    (0,'Positano', '/positano.JPG',true),
    (0,'San Marco','/san_marco.JPG',true ),
    (0,'Sierra Nevada', '/sierra_nevada.JPG',true),
    (0,'Wadden', '/wadden.JPG',true),
    (0,'yukon', '/yukon.JPG',true),
    (6,'Saint Valentin', null,false),
    (6,'Paques', null,false)
    ;




INSERT INTO etat(id_etat, etat)
VALUES
    (0, 'Panier en cours'),
    (1, 'En preparation'),
    (2, 'Commande Completée');


INSERT INTO commandes( id_user, id_bouquet, quantity, id_etat, create_date)
VALUES
    (6, 1, 10, 2, NOW()),
    (3, 2, 9, 2, NOW()),
    (4, 3, 4, 0, NOW()),
    (5, 3, 6, 1, NOW()),
    (5, 3, 2, 1, NOW()), 
    (6, 4, 7, 2, NOW()),
    (6, 12, 3, 1, NOW()),
    (6, 5, 8, 2, NOW()),
    (6, 4, 11, 0, NOW()),
    (6, 11, 12, 0, NOW());


INSERT INTO flower(nom_flower, prix_flower, photo_url)
VALUES
    ('Paeonia Blanc', 5, '/penoy_w.jpg'),
    ('Paeonia Violet', 5, '/peony_p.jpg'),
    ('Paeonia Rose', 5, '/peony_r.jpg'),
    ('Rose Rouge', 5, '/rose_r.jpeg'),
    ('Tulipe Jaune ', 5, '/tulip_j.png'),
    ('Tulipe Rose ', 5, '/tulip_r.jpg'),
    ('Fleur de soleil', 5, '/sunflower.jpg'),
    ('Gypsophila', 5, '/gypsophila.jpeg'),
    ('Phalaire', 5, '/phalaire.jpeg'),
    ('Daisy Blanc', 5, '/daisy.jpeg'),
    ('Pavots', 5, '/pavots.jpeg'),
    ('Chardons', 5, '/chardons.jpeg'),
    ('Ramis', 5, '/ramis.jpg');


INSERT INTO composition(id_bouquet, id_flower, quantity)
VALUES
    (1, 2, 3),
    (1, 5, 3),
    (1, 6, 5),
    (1, 8, 2),
    (2, 2, 3),
    (2, 3, 4),
    (2, 4, 3),
    (2, 5, 3),
    (2, 8, 2),
    (3, 1, 3),
    (3, 3, 4),
    (3, 6, 3),
    (3, 8, 2),
    (4, 2, 3),
    (4, 3, 4),
    (4, 6, 3),
    (5, 1, 2),
    (5, 3, 3),
    (5, 4, 2),
    (5, 2, 3),
    (6, 1, 3),
    (6, 2, 2),
    (6, 3, 5),
    (6, 8, 2),
    (7, 1, 2),
    (7, 5, 3),
    (7, 6, 3),
    (8, 1, 3),
    (8, 3, 5),
    (8, 6, 4),
    (9, 3, 2),
    (9, 8, 1),
    (9, 11, 3),
    (9, 13, 3),
    (10, 3, 2),
    (10, 5, 3),
    (10, 8, 1),
    (10, 9, 1),
    (10, 13, 3),
	(11, 13, 3),
	(11, 2, 4),
	(11, 1, 5),
	(12, 13, 1),
	(12, 1, 2)
	;
    
commit;