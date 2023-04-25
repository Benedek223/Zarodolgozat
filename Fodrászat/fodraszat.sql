-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2023. Ápr 25. 09:38
-- Kiszolgáló verziója: 10.4.25-MariaDB
-- PHP verzió: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `fodraszat`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalok`
--

CREATE TABLE `felhasznalok` (
  `id` int(11) NOT NULL,
  `felhasznalo` varchar(255) NOT NULL,
  `jelszo` varchar(255) NOT NULL,
  `rang` int(11) NOT NULL,
  `bejelentkezve` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `felhasznalok`
--

INSERT INTO `felhasznalok` (`id`, `felhasznalo`, `jelszo`, `rang`, `bejelentkezve`) VALUES
(6, 'admin', '123', 1, 0),
(20, 'Tesztalany', 'Teszt123', 0, 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `idopontok`
--

CREATE TABLE `idopontok` (
  `FelhasznaloID` int(11) NOT NULL,
  `ora` int(2) NOT NULL,
  `nap` int(2) NOT NULL,
  `honap` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `idopontok`
--

INSERT INTO `idopontok` (`FelhasznaloID`, `ora`, `nap`, `honap`) VALUES
(22, 17, 6, 9);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kepek`
--

CREATE TABLE `kepek` (
  `kepID` int(255) NOT NULL,
  `kepnev` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `kepek`
--

INSERT INTO `kepek` (`kepID`, `kepnev`) VALUES
(6, '6.png'),
(9, '3.png'),
(10, '4.png'),
(11, '5.png'),
(12, '7.png'),
(13, '8.png');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `felhasznalok`
--
ALTER TABLE `felhasznalok`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `idopontok`
--
ALTER TABLE `idopontok`
  ADD PRIMARY KEY (`FelhasznaloID`);

--
-- A tábla indexei `kepek`
--
ALTER TABLE `kepek`
  ADD PRIMARY KEY (`kepID`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `felhasznalok`
--
ALTER TABLE `felhasznalok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT a táblához `idopontok`
--
ALTER TABLE `idopontok`
  MODIFY `FelhasznaloID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT a táblához `kepek`
--
ALTER TABLE `kepek`
  MODIFY `kepID` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
