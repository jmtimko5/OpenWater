CREATE TABLE AppUser
(
  id SERIAL NOT NULL PRIMARY KEY,
  username VARCHAR(256) NOT NULL,
  location VARCHAR(256),
  time_added TIMESTAMP WITHOUT TIME ZONE DEFAULT (now() at time zone 'utc')
);

CREATE TABLE Site
(
  id SERIAL NOT NULL PRIMARY KEY,
  creator_id INTEGER REFERENCES AppUser(id) ON DELETE SET NULL,
  name VARCHAR(256) NOT NULL,
  lat_lng POINT NOT NULL,
  description TEXT NOT NULL,
  time_added TIMESTAMP WITHOUT TIME ZONE DEFAULT (now() at time zone 'utc')
);

CREATE TABLE Review
(
  id SERIAL NOT NULL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES AppUser(id) ON DELETE CASCADE,
  site_id INTEGER NOT NULL REFERENCES Site(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 0 and rating <=5),
  message TEXT NOT NULL,
  time_added TIMESTAMP WITHOUT TIME ZONE DEFAULT (now() at time zone 'utc')
);

INSERT INTO AppUser (username, location) VALUES ('Demo', 'Durham');

INSERT INTO Site (creator_id, name, lat_lng, description) VALUES (1, 'Site1', '90,90', 'Great dive!');
INSERT INTO Site (creator_id, name, lat_lng, description) VALUES (1, 'Site2', '50,-50', 'Other dive!');

INSERT INTO Review (user_id, site_id, rating, message) VALUES (1, 1, 5, 'Amazing');
INSERT INTO Review (user_id, site_id, rating, message) VALUES (1, 1, 4, 'Good');
INSERT INTO Review (user_id, site_id, rating, message) VALUES (1, 2, 1, 'Bad');
