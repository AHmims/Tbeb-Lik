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
  `MATRICULE_PAT` char(250) NOT NULL,
  `MATRICULE` char(250) NOT NULL,
  `ID_CNSLT` int(11) NOT NULL,
  `CODE_REF` char(250) DEFAULT NULL,
  `JOUR_REPOS` int(11) DEFAULT NULL,
  `MOTIF` text,
  `ATC` text,
  `TYPE` char(250) DEFAULT NULL,
  `DATE_CONSULTATION` datetime DEFAULT NULL,
  `ID_PIECE` int(11) DEFAULT NULL,
  `ID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID_CNSLT`),
  KEY `FK_CONSULTATION` (`MATRICULE`),
  KEY `FK_CONSULTATION2` (`MATRICULE_PAT`),
  KEY `FK_CONTIENT2` (`ID`),
  KEY `FK_CONTIENT3` (`ID_PIECE`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `consultation`
--

INSERT INTO `consultation` (`MATRICULE_PAT`, `MATRICULE`, `ID_CNSLT`, `CODE_REF`, `JOUR_REPOS`, `MOTIF`, `ATC`, `TYPE`, `DATE_CONSULTATION`, `ID_PIECE`, `ID`) VALUES
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
  `MATRICULE` char(250) NOT NULL,
  `ID_SPEC` int(11) NOT NULL,
  `ID_ADMIN` int(11) NOT NULL,
  `NOM_MED` char(250) DEFAULT NULL,
  `TEL` char(250) DEFAULT NULL,
  `EMAIL` char(250) DEFAULT NULL,
  `DISPONIBLE` tinyint(1) DEFAULT NULL,
  `VILLE` char(250) DEFAULT NULL,
  `PASSWORD` char(250) DEFAULT NULL,
  PRIMARY KEY (`MATRICULE`),
  KEY `FK_AJOUTER` (`ID_ADMIN`),
  KEY `FK_CONTIENT` (`ID_SPEC`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `medecin`
--

INSERT INTO `medecin` (`MATRICULE`, `ID_SPEC`, `ID_ADMIN`, `NOM_MED`, `TEL`, `EMAIL`, `DISPONIBLE`, `VILLE`, `PASSWORD`) VALUES
('bh150', 2, 1, 'Mohamed Elmehdi Choukri', '0614075409', 'medelmehdi.choukri@gmail.com', 1, NULL, '123456'),
('bh151', 2, 1, 'Kamili Zakaria', '0666663614', 'Zakaria@gmail.com', 1, NULL, '123456');

-- --------------------------------------------------------

--
-- Structure de la table `message`
--

DROP TABLE IF EXISTS `message`;
CREATE TABLE IF NOT EXISTS `message` (
  `id` int(11) NOT NULL,
  `Matricule_emmeter` char(250) NOT NULL,
  `contenu` text,
  `id_room` int(11) DEFAULT NULL,
  `date_envoi` datetime DEFAULT NULL,
  `type` text,
  `id_pieceJointes` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_CONSULTATION3` (`id_room`)
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

DROP TABLE IF EXISTS `room`;
CREATE TABLE IF NOT EXISTS `room` (
  `id` int(11) NOT NULL,
  `Matricule_Pat` char(250) DEFAULT NULL,
  `Matricule_Med` char(250) DEFAULT NULL,
  `Date_Debut` datetime DEFAULT NULL,
  `Date_Fin` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_CONSULTATION5` (`Matricule_Pat`),
  KEY `FK_CONSULTATION4` (`Matricule_Med`)
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
