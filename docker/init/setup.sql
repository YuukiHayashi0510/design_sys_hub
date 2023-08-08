-- must change your name and databasename, passward.
CREATE ROLE design_sh_admin LOGIN PASSWORD 'design_sh_psql';
CREATE DATABASE design_sh_admin;
GRANT ALL PRIVILEGES ON DATABASE design_sh_admin TO design_sh_admin;
ALTER ROLE design_sh_admin WITH CREATEROLE CREATEDB SUPERUSER;
