IF DB_ID('afm_auth_db') IS NULL
BEGIN
  CREATE DATABASE afm_auth_db;
END
GO

IF SUSER_ID('afm') IS NULL
BEGIN
  -- NOTE: Provide a strong password via SQLCMD variable, e.g.:
  -- sqlcmd -v AFM_LOGIN_PASSWORD="Str0ng!Passw0rd#ChangeMe"
  CREATE LOGIN afm WITH PASSWORD = '$(AFM_LOGIN_PASSWORD)', CHECK_POLICY = ON, CHECK_EXPIRATION = ON;
END
GO

USE afm_auth_db;
GO

IF USER_ID('afm') IS NULL
BEGIN
  CREATE USER afm FOR LOGIN afm;
END
GO

ALTER ROLE db_owner ADD MEMBER afm;
GO
