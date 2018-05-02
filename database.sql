-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Erstellungszeit: 02. Mai 2018 um 13:54
-- Server-Version: 5.6.34
-- PHP-Version: 7.1.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Datenbank: `stundenplan`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Eintrag`
--

CREATE TABLE `Eintrag` (
  `id` int(8) NOT NULL,
  `time` varchar(32) NOT NULL,
  `dayOne` varchar(32) NOT NULL,
  `dayTwo` varchar(32) NOT NULL,
  `dayThree` varchar(32) NOT NULL,
  `dayFour` varchar(32) NOT NULL,
  `dayFive` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `Eintrag`
--

INSERT INTO `Eintrag` (`id`, `time`, `dayOne`, `dayTwo`, `dayThree`, `dayFour`, `dayFive`) VALUES
(0, '08:15 - 09:45', 'ADS VL', '', 'Expo', 'CG VL', '3D Drucker'),
(1, '10:15 - 11:45', 'SE I UE', 'WEbTech VL', 'Expo', 'SE I VL', 'Block Ver.'),
(2, '12:30 - 14:00', 'ADS UE', '', 'Expo', 'CG I UE', 'Block Ver.'),
(3, '14:15 - 15:45', '', '', 'Expo', 'WebTech UE', 'Block Ver.'),
(4, '16:00 - 17:30', '', '', '', '', 'Block Ver.'),
(5, '17:30 - 19:00', '', '', '', '', 'Block Ver.');

