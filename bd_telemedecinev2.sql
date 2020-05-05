create database tbeblikDB;
use tbeblikDB;
drop database tbeblikDB

create user 'tbeblikAdmin'@'localhost';
alter user 'tbeblikAdmin'@'localhost' IDENTIFIED BY 't2b0e2b0l5i1kadmin';
grant ALL on tbeblikDB.* to 'tbeblikAdmin'@'localhost';

set global log_bin_trust_function_creators=1;

DROP TABLE IF EXISTS `preConsultation`;
CREATE TABLE IF NOT EXISTS `preConsultation` (
	`idPreCons` char(250) not null,
	`dateCreation` datetime default now(),
	`motif` text,
	`atcd` text,
	`nbJourA` int(11) NOT NULL,
    `accepted` boolean default false,
	`MATRICULE_PAT` char(250) NOT NULL,
	PRIMARY KEY (`idPreCons`),
	KEY `FK_CONSULTATION2` (`MATRICULE_PAT`)
);
show triggers;
drop trigger assignNotifId;
DELIMITER //
CREATE TRIGGER assignNotifId
BEFORE INSERT
ON `preConsultation` FOR EACH ROW
BEGIN
	SET NEW.idPreCons = CONCAT('NOTIF-',(SELECT FLOOR(RAND()*(1000000-2))+1));
    SET NEW.dateCreation = now();
END;//
DELIMITER ;
/* */
-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  lun. 27 avr. 2020 à 01:06
-- Version du serveur :  5.7.26
-- Version de PHP :  7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `bd_telemedecinev1`
--

-- --------------------------------------------------------

--
-- Structure de la table `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `ID_ADMIN` int(11) NOT NULL,
  `EMAIL` char(250) DEFAULT NULL,
  `PASSWORD` char(250) DEFAULT NULL,
  PRIMARY KEY (`ID_ADMIN`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `admin`
--

INSERT INTO `admin` (`ID_ADMIN`, `EMAIL`, `PASSWORD`) VALUES
(1, 'admin@gmail.com', '123456');

-- --------------------------------------------------------

--
-- Structure de la table `certification_medical`
--

DROP TABLE IF EXISTS `certification_medical`;
CREATE TABLE IF NOT EXISTS `certification_medical` (
  `ID` int(11) NOT NULL,
  `DOCUMENT` longblob,
  `ID_Sender` char(250) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `consultation`
--

DROP TABLE IF EXISTS `consultation`;
CREATE TABLE IF NOT EXISTS `consultation` (
	`JOUR_REPOS` int(11) DEFAULT -1,
	`DATE_CONSULTATION` datetime NOT NULL,
	`Matricule_Med` char(250) NOT NULL,
    `commentaire` text,
	`idPreCons` char(250) NOT NULL,
	KEY `FK_CONSULTATION` (`Matricule_Med`),
	KEY `FK_CONTIENT3` (`idPreCons`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `consultation`
--

INSERT INTO `consultation` (`MATRICULE_PAT`, `Matricule_Med`, `ID_CNSLT`, `CODE_REF`, `JOUR_REPOS`, `MOTIF`, `ATC`, `TYPE`, `DATE_CONSULTATION`, `ID_PIECE`, `ID`) VALUES
('BH82982', '', 1, 'REF CONS', 5, NULL, NULL, NULL, '2020-04-26 00:00:00', NULL, NULL),
('BH82900', '', 2, 'CODE REF', 6, NULL, NULL, NULL, '2020-04-29 00:00:00', NULL, NULL),
('BH82901', '', 3, 'FDFD', 4, 'GGG', 'GGG', NULL, '2020-05-18 00:00:00', NULL, NULL),
('BH82902', '', 4, 'CODE REF', 6, NULL, NULL, NULL, '2020-05-19 00:00:00', NULL, NULL),
('BH82903', '', 5, 'FDFD', 4, 'GGG', 'GGG', NULL, '2020-05-04 00:00:00', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `medecin`
--

DROP TABLE IF EXISTS `medecin`;
CREATE TABLE IF NOT EXISTS `medecin` (
  `Matricule_Med` char(250) NOT NULL,
  `ID_SPEC` int(11) NOT NULL,
  `ID_ADMIN` int(11) NOT NULL,
  `NOM_MED` char(250) DEFAULT NULL,
  `TEL` char(250) DEFAULT NULL,
  `EMAIL` char(250) DEFAULT NULL,
  `DISPONIBLE` tinyint(1) DEFAULT NULL,
  `VILLE` char(250) DEFAULT NULL,
  `PASSWORD` char(250) DEFAULT NULL,
  PRIMARY KEY (`Matricule_Med`),
  KEY `FK_AJOUTER` (`ID_ADMIN`),
  KEY `FK_CONTIENT` (`ID_SPEC`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `medecin`
--

INSERT INTO `medecin` (`Matricule_Med`, `ID_SPEC`, `ID_ADMIN`, `NOM_MED`, `TEL`, `EMAIL`, `DISPONIBLE`, `VILLE`, `PASSWORD`) VALUES
('bh150', 2, 1, 'Mohamed Elmehdi Choukri', '0614075409', 'medelmehdi.choukri@gmail.com', 1, NULL, '123456'),
('bh151', 2, 1, 'Kamili Zakaria', '0666663614', 'Zakaria@gmail.com', 1, NULL, '123456');

-- --------------------------------------------------------

--
-- Structure de la table `message`
--

DROP TABLE IF EXISTS `message`;
CREATE TABLE IF NOT EXISTS `message` (
  `messageId` int(11) auto_increment,
  `Matricule_emmeter` char(250) NOT NULL,
  `contenu` text,
  `roomId` char(250) DEFAULT NULL,
  `date_envoi` datetime DEFAULT NULL,
  `type` text,
  `id_pieceJointes` int(11) DEFAULT NULL,
  PRIMARY KEY (`messageId`),
  KEY `FK_CONSULTATION3` (`roomId`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `ordonnance`
--

DROP TABLE IF EXISTS `ordonnance`;
CREATE TABLE IF NOT EXISTS `ordonnance` (
  `ID_ord` int(11) NOT NULL,
  `DOCUMENT` longblob,
  `ID_Sender` char(250) DEFAULT NULL,
  PRIMARY KEY (`ID_ord`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `patients`
--

DROP TABLE IF EXISTS `patients`;
CREATE TABLE IF NOT EXISTS `patients` (
  `CIN` char(250) DEFAULT NULL,
  `MATRICULE_PAT` char(250) NOT NULL,
  `NOM_PAT` char(250) DEFAULT NULL,
  `Prenom_PAT` char(250) DEFAULT NULL,
  `PASSWORD` char(250) DEFAULT NULL,
  `Date_Emb` date DEFAULT NULL,
  `Date_Naissence` date DEFAULT NULL,
  `Tel` char(250) DEFAULT NULL,
  `ADRESS` char(250) DEFAULT NULL,
  `Date_Retrait` date DEFAULT NULL,
  `Direction` char(250) DEFAULT NULL,
  `Genre` char(250) DEFAULT NULL,
  PRIMARY KEY (`MATRICULE_PAT`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `patients`
--

INSERT INTO `patients` (`CIN`, `MATRICULE_PAT`, `NOM_PAT`, `Prenom_PAT`, `PASSWORD`, `Date_Emb`, `Date_Naissence`, `Tel`, `ADRESS`, `Date_Retrait`, `Direction`, `Genre`) VALUES
('HH112313', 'BH82982', 'Chraiki', 'Mohammed', '123456', '2014-06-07', '1995-02-26', '0614075409', '173 safi II', '2048-06-06', 'FIT', 'Homme'),
('HH112300', 'BH82900', 'Chaloumi', 'Fadwa', '123456', '2014-06-07', '1985-02-26', '0614075409', 'Plateau', '2048-06-06', 'FIT', 'Femme'),
('HH112301', 'BH82901', 'Filali', 'Hamza', '123456', '2014-06-07', '1956-02-26', '0614075409', 'Saada', '2048-06-06', 'FIT', 'Homme'),
('HH112302', 'BH82902', 'Kamal', 'Said', '123456', '2014-06-07', '1972-02-26', '0614075409', '173 safi II', '2048-06-06', 'FIT', 'Homme'),
('HH112303', 'BH82903', 'Adelane', 'Imane', '123456', '2014-06-07', '1988-02-26', '0614075409', 'Azib darri', '2048-06-06', 'FIT', 'Femme'),
('HH112304', 'BH82904', 'Yezza', 'Asmae', '123456', '2014-06-07', '1968-02-26', '0614075409', '173 safi II', '2048-06-06', 'FIT', 'Femme');

-- --------------------------------------------------------

--
-- Structure de la table `room`
--
drop table if exists `appUser`;
create table if not exists `appUser` (
	`userId` char(250) NOT NULL,
    `userType` char(7) not null,
    `socket` char(250) not null,
    `online` boolean,
    `linkedMedecinMatricule` char(250) default null,
    `roomId` char(250) default null
)
DELIMITER //
CREATE TRIGGER createRoom
BEFORE INSERT
ON `appUser` FOR EACH ROW
BEGIN
	DECLARE roomUniqueId varchar(250) default null;
	if new.userType = 'Patient' then
		SET roomUniqueId = CONCAT('cRoom-',(SELECT FLOOR(RAND()*(100000-2))+1));
		SET new.roomId = roomUniqueId;
        -- ----
		insert into `room` (roomId,userPatientMatricule)
			values(new.roomId,new.userId);
    end if;
END;//
DELIMITER ;
-- -----------------------------------

DROP TABLE IF EXISTS `room`;
CREATE TABLE IF NOT EXISTS `room` (
  `roomId` char(250) NOT NULL,
  `userPatientMatricule` char(250) NOT NULL,
  `userMedecinMatricule` char(250) DEFAULT NULL,
  PRIMARY KEY (`roomId`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `specialites`
--

DROP TABLE IF EXISTS `specialites`;
CREATE TABLE IF NOT EXISTS `specialites` (
  `ID_SPEC` int(11) NOT NULL,
  `NOM_SPEC` char(250) DEFAULT NULL,
  PRIMARY KEY (`ID_SPEC`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `specialites`
--

INSERT INTO `specialites` (`ID_SPEC`, `NOM_SPEC`) VALUES
(1, 'Medecine génerale'),
(2, 'Cardiologie');

-- --------------------------------------------------------

--
-- Structure de la table `type_repos`
--

DROP TABLE IF EXISTS `type_repos`;
CREATE TABLE IF NOT EXISTS `type_repos` (
  `ID_TYPE` int(11) NOT NULL,
  `DESCRIPTION` char(250) DEFAULT NULL,
  PRIMARY KEY (`ID_TYPE`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `type_repos`
--

INSERT INTO `type_repos` (`ID_TYPE`, `DESCRIPTION`) VALUES
(1, 'Repos accident de travail'),
(2, 'Repos maladie longue durée'),
(3, 'Repos maladie'),
(4, 'Consultation santé au travail'),
(5, 'Consultation médicale spontanée');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;



-- PLAYGROUND ---------------------

select * from specialites;

select m.NOM_MED,s.NOM_SPEC from medecin as m,specialites as s
	where m.ID_SPEC = s.ID_SPEC;

select * from consultation;
delete from consultation where commentaire = '';
select * from preconsultation;
delete from preconsultation where accepted = 1;
select * from patients;

insert into preconsultation(idPreCons,dateCreation,motif,atcd,nbJourA,MATRICULE_PAT) values (null, default, 'motif', 'atcd', 3,'BH82900');

select * from medecin;
select * from appUser;
select * from room;
delete from appUser where appUser.userId = 'HG97';
update appUser set linkedMedecinMatricule = null where userId = 'BH82903';
update room set userMedecinMatricule = 'HG97' where roomId = 'cRoom-97615';
drop table room;
insert into appUser (userId,userType,socket,online) values('HG97','Medecin','/socket',true);
insert into preConsultation values('x',default,'txt','txt',1,0,'BH82904');
delete from preConsultation where idPreCons <> 'x';
delete from room where roomId <>'ss';
delete from appUser where roomId = null;
select * from preConsultation;
select * from consultation;
select * from patients;
delete from preConsultation where MATRICULE_PAT = 'BH82899';

-- ---
select a.*,p.NOM_PAT,p.Prenom_PAT
from appUser as a,patients as p
where a.linkedMedecinMatricule = 'bh151'
and a.userId = p.MATRICULE_PAT;

-- -----
delete from appUser where userId = 'BH82903';
UPDATE appUser SET socket = 'sdqsdq',online = false WHERE userId = 'BH82903';
-- -----
SELECT r.roomId 
FROM preConsultation AS p,room AS r
WHERE p.MATRICULE_PAT = r.userPatientMatricule
AND p.idPreCons = '';
-- -----
select roomId from appUser where socket = '/chat#AStOtKYel13N87dkAAAA' AND userId in (select * from room)

select r.roomId from room as r,appUser as a1
where (r.userPatientMatricule = a1.userId OR r.userMedecinMatricule = a1.userId)
and a1.socket = '/chat#AStOtKYel13N87dkAAAA'
-- ----
update appUser set linkedMedecinMatricule = null where userId ='BH82903';
update room set userMedecinMatricule = null where roomId = 'cRoom-97615';
-- ---
SELECT COUNT(idPreCons) AS nb FROM consultation WHERE idPreCons = 'NOTIF-530846';
-- ----
delete from consultation where Matricule_Med = 'HG97';
-- ---- 
SELECT concat(NOM_PAT,' ',Prenom_PAT) AS nom,TIMESTAMPDIFF(YEAR, Date_Naissence, CURDATE()) AS age,Tel AS tel FROM patients WHERE MATRICULE_PAT = '';
-- ----
SELECT c.JOUR_REPOS,p.* 
FROM preConsultation as p,consultation as c
WHERE p.idPreCons = c.idPreCons;

select p.accepted,c.DATE_CONSULTATION from preConsultation as p,consultation as c where p.idPreCons = c.idPreCons;
select * from consultation;

update consultation set JOUR_REPOS = -1 where idPreCons= 'NOTIF-530846';
update consultation set idPreCons = 'NOTIF-530846' where idPreCons= 'NOTIF-677351';
delete from preConsultation where accepted = true;
delete from consultation where idPreCons <> 'r';
-- ----
select count(*) from preConsultation where MATRICULE_PAT = 'BH82903' AND idPreCons not in (select idPreCons from consultation where JOUR_REPOS >= 0);
select count(*) from preConsultation as p,consultation as c
where p.MATRICULE_PAT = 'BH82903' 
and p.idPreCons = c.idPreCons
and c.JOUR_REPOS <= -1;
-- ----
select * from consultation where JOUR_REPOS <= -1 AND idPreCons in (select idPreCons from preConsultation where MATRICULE_PAT = 'BH82903')
-- ----
WHERE accepted = FALSE 
AND  MATRICULE_PAT = 'BH82904'
ORDER BY dateCreation DESC LIMIT 1;
-- ----
select * from medecin;
select * from appUser;
select * from room;
select * from patients;

select NOM_PAT,Prenom_PAT,Direction 
from patients 
where MATRICULE_PAT in (select userPatientMatricule from room where userMedecinMatricule = 'HG97');
-- ---
SELECT a.userId,a.online,CONCAT(p.NOM_PAT,' ',p.Prenom_PAT) as nom,n.idPreCons
FROM appUser AS a,patients AS p,preConsultation AS n 
WHERE a.linkedMedecinMatricule = 'HG97' 
AND a.userId = p.MATRICULE_PAT
AND a.userId = n.MATRICULE_PAT
AND a.userId = 'BH82982';
-- ---
select * from appUser where userId = 'BH82982';
-- ----
SELECT a.userId,a.online,CONCAT(p.NOM_PAT,' ',p.Prenom_PAT) as nom,n.idPreCons FROM appUser AS a,patients AS p,preConsultation AS n WHERE a.linkedMedecinMatricule = 'XQC' AND a.userId = p.MATRICULE_PAT AND a.userId = n.MATRICULE_PAT;