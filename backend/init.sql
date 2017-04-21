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
  lat FLOAT NOT NULL,
  lng FLOAT NOT NULL,
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

INSERT INTO AppUser (username, location) VALUES ('Joe', 'Durham');
INSERT INTO AppUser (username, location) VALUES ('Professor Board', 'Durham');
INSERT INTO AppUser (username, location) VALUES ('Alice', 'New York');
INSERT INTO AppUser (username, location) VALUES ('Bob', 'Los Angeles');
