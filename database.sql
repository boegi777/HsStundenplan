-- phpMyAdmin SQL Dump
-- version 4.8.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 03. Mai 2018 um 17:55
-- Server-Version: 10.1.31-MariaDB
-- PHP-Version: 7.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `stundenplan`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `benutzer`
--

CREATE TABLE `benutzer` (
  `id` int(32) NOT NULL,
  `name` varchar(32) NOT NULL,
  `passwort` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `benutzer`
--

INSERT INTO `benutzer` (`id`, `name`, `passwort`) VALUES
(0, 'paul', '1234');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `eintrag`
--

CREATE TABLE `eintrag` (
  `id` int(8) NOT NULL,
  `time` varchar(32) NOT NULL,
  `dayOne` varchar(32) NOT NULL,
  `dayTwo` varchar(32) NOT NULL,
  `dayThree` varchar(32) NOT NULL,
  `dayFour` varchar(32) NOT NULL,
  `dayFive` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `eintrag`
--

INSERT INTO `eintrag` (`id`, `time`, `dayOne`, `dayTwo`, `dayThree`, `dayFour`, `dayFive`) VALUES
(0, '08:15 - 09:45', 'ADS VL', '', 'Expo', 'CG VL', '3D Drucker'),
(1, '10:15 - 11:45', 'SE I UE', 'WEbTech VL', 'Expo', 'SE I VL', 'Block Ver.'),
(2, '12:30 - 14:00', 'ADS UE', '', 'Expo', 'CG I UE', 'Block Ver.'),
(3, '14:15 - 15:45', '', '', 'Expo', 'WebTech UE', 'Block Ver.'),
(4, '16:00 - 17:30', '', '', '', '', 'Block Ver.'),
(5, '17:30 - 19:00', '', '', '', '', 'Block Ver.');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
