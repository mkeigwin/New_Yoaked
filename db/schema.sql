BEGIN;

DROP TABLE IF EXISTS exercise;
DROP TABLE IF EXISTS users;

CREATE TABLE exercise (
  id            SERIAL PRIMARY KEY,
  start         TEXT,
  saved         TEXT,
  wow           TEXT,
  username      VARCHAR
);


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR NOT NULL UNIQUE,
  password VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT current_timestamp
);


COMMIT;
