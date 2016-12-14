BEGIN;

DROP TABLE IF EXISTS exercise;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS secretStuff;

CREATE TABLE exercise (
  id            SERIAL PRIMARY KEY,
  start         TEXT,
  saved         TEXT,
  wow           TEXT,
);

-- added from Dan Pease Auth Temp
CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  username VARCHAR NOT NULL UNIQUE,
  password VARCHAR NOT NULL UNIQUE
);

CREATE TABLE secretstuff(
  secret_id SERIAL PRIMARY KEY,
  mySecret VARCHAR NOT NULL,
  myOtherSecret VARCHAR NOT NULL
);

COMMIT;
