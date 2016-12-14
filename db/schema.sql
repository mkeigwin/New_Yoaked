BEGIN;

DROP TABLE IF EXISTS exercise;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS secretStuff;

-- added from Dan Pease Auth Temp
CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  username VARCHAR NOT NULL UNIQUE,
  password VARCHAR NOT NULL UNIQUE
);

CREATE TABLE exercise (
  id            SERIAL PRIMARY KEY,
  start         TEXT,
  wow           TEXT,
  user_id       INT,
  saved         TEXT
);


CREATE TABLE secretstuff(
  secret_id SERIAL PRIMARY KEY,
  mySecret VARCHAR NOT NULL,
  myOtherSecret VARCHAR NOT NULL
);

-- BILL MAYO EXCLUSIVE
ALTER TABLE ONLY exercise
  ADD CONSTRAINT user_users_id_fkey
  FOREIGN KEY (user_id)
  REFERENCES users(user_id);

-- ALTER TABLE ONLY exercise
--   ADD CONSTRAINT exercise_user_id_fkey
--   FOREIGN KEY (user_id)
--   REFERENCES users(user_id);

COMMIT;
