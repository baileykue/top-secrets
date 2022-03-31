DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS secrets CASCADE;

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username TEXT NOT NULL,
  password_hash TEXT NOT NULL
);

CREATE TABLE secrets (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  user_id BIGINT REFERENCES users(id)
);

INSERT INTO
  secrets (title, description)
VALUES
  ('Hello, freinds!', '65 degrees eating crackers with cheese'),
  ('Making coffee', 'gots to get that bean water');
