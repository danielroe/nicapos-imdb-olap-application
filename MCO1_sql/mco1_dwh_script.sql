CREATE DATABASE mco1_datawarehouse;
USE mco1_datawarehouse;

ALTER TABLE imdb_ijs.actors RENAME mco1_datawarehouse.actors_dim;
ALTER TABLE imdb_ijs.roles RENAME mco1_datawarehouse.roles_dim;
ALTER TABLE imdb_ijs.movies_genres RENAME mco1_datawarehouse.movie_genres_dim;
ALTER TABLE imdb_ijs.movies RENAME mco1_datawarehouse.movies_dim;

CREATE TABLE `rating_fact` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `movie_id` int(11),
  `actor_id` int(11),
  `genre` varchar(100),
  `role` varchar(100),
  `rank` float,
  `year` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`))
SELECT r.movie_id, r.actor_id, r.role, m.year, m.rank
FROM movies_dim m
LEFT JOIN movie_genres_dim mg ON m.id = mg.movie_id
LEFT JOIN roles_dim r ON m.id = r.movie_id
LEFT JOIN actors_dim a ON r.actor_id = a.id;

ALTER TABLE rating_fact 
ADD FOREIGN KEY (`movie_id`) REFERENCES `movies_dim` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD FOREIGN KEY (`actor_id`) REFERENCES `actors_dim` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD FOREIGN KEY (`movie_id`) REFERENCES `roles_dim` (`movie_id`) ON DELETE CASCADE ON UPDATE CASCADE;






