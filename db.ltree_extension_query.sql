-- database query to add 'path' to "messages" table

-- EXTENSION for ltree
CREATE EXTENSION IF NOT EXISTS ltree;
ALTER TABLE "messages" ADD COLUMN path ltree;