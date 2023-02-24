CREATE DATABASE mp_datawarehouse;
USE mp_datawarehouse;

CREATE TABLE `movies` (
  `id` int(11)NOT NULL DEFAULT 0,
  `name` varchar(100) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `rank` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `movies_name` (`name`)
);

CREATE TABLE `movie_genre` (
  `movie_id` int(11) NOT NULL,
  `genre` varchar(100) NOT NULL,
  PRIMARY KEY (`movie_id`,`genre`),
  KEY `movies_genres_and_id` (`movie_id`),
  CONSTRAINT `movies_genres_fk` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `actors` (
  `id` int(11) NOT NULL DEFAULT 0,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `gender` char(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `actors_first_name` (`first_name`),
  KEY `actors_last_name` (`last_name`)
);

CREATE TABLE `roles` (
  `actor_id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `role` varchar(100) NOT NULL,
  PRIMARY KEY (`actor_id`,`movie_id`,`role`),
  KEY `actor_id` (`actor_id`),
  KEY `movie_id` (`movie_id`),
  CONSTRAINT `roles_fk1` FOREIGN KEY (`actor_id`) REFERENCES `actors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `roles_fk2` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

ALTER TABLE `movie_genre` ADD INDEX `genre_index` (`genre`);
ALTER TABLE `roles` ADD INDEX `role_index` (`role`);
ALTER TABLE `movies` ADD INDEX `rank_index` (`rank`);


CREATE TABLE `rating_fact` (
  `movie_id` int(11),
  `actor_id` int(11),
  `genre` varchar(100),
  `role` varchar(100),
  `rank` float,
  PRIMARY KEY (`movie_id`),
  CONSTRAINT `movie_fk` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `actor_fk` FOREIGN KEY (`actor_id`) REFERENCES `actors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `genre_fk` FOREIGN KEY (`genre`) REFERENCES `movie_genre` (`genre`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `role_fk` FOREIGN KEY (`role`) REFERENCES `roles` (`role`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `rank_fk` FOREIGN KEY (`rank`) REFERENCES `movies` (`rank`) ON DELETE CASCADE ON UPDATE CASCADE
);









