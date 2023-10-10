CREATE DATABASE mycontacts;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS categories (
  id UUID NOT NULl UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULl
);

CREATE TABLE IF NOT EXISTS contacts (
  id UUID NOT NULl UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULl,
  email VARCHAR UNIQUE,
  phone VARCHAR,
  category_id UUID,
  FOREIGN KEY(category_id) REFERENCES categories(id)
);


