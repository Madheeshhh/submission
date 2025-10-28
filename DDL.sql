create schema training
go

CREATE TABLE training.[User] (
    UserId INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    DOB DATE NOT NULL,
    Email NVARCHAR(100) UNIQUE NOT NULL,
    Phone NVARCHAR(15),
    UserType NVARCHAR(20) CHECK (UserType IN ('NormalUser', 'BankUser')),
    GuardianId INT NULL,
    POAUserId INT NULL,
    CONSTRAINT FK_User_Guardian FOREIGN KEY (GuardianId) REFERENCES training.[User](UserId),
    CONSTRAINT FK_User_POA FOREIGN KEY (POAUserId) REFERENCES training.[User](UserId)
);
GO


CREATE TABLE training.Bank (
    BankId INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    IFSC_Prefix NVARCHAR(10) NOT NULL UNIQUE,
    Headquarters NVARCHAR(200)
);
GO

CREATE TABLE training.Branch (
    BranchId INT IDENTITY(1,1) PRIMARY KEY,
    BankId INT NOT NULL,
    IFSC NVARCHAR(20) UNIQUE NOT NULL,
    Address NVARCHAR(255),
    ManagerId INT NULL,  -- Optional: link to a user who is the branch manager
    CONSTRAINT FK_Branch_Bank FOREIGN KEY (BankId) REFERENCES training.Bank(BankId),
    CONSTRAINT FK_Branch_Manager FOREIGN KEY (ManagerId) REFERENCES training.[User](UserId)
);
GO


CREATE TABLE training.Currency (
    CurrencyCode NVARCHAR(10) PRIMARY KEY,
    Name NVARCHAR(50),
);
GO


CREATE TABLE training.Account (
    AccountId INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL,
    BranchId INT NOT NULL,
    AccountType NVARCHAR(20) CHECK (AccountType IN ('Savings', 'Current', 'Term_Deposit')),
    Balance DECIMAL(18,2) DEFAULT 0 CHECK (Balance >= 0),
    CurrencyCode NVARCHAR(10) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_Account_User FOREIGN KEY (UserId) REFERENCES training.[User](UserId),
    CONSTRAINT FK_Account_Branch FOREIGN KEY (BranchId) REFERENCES training.Branch(BranchId),
    CONSTRAINT FK_Account_Currency FOREIGN KEY (CurrencyCode) REFERENCES training.Currency(CurrencyCode)
);
GO


CREATE TABLE training.[Transaction] (
    TransactionId INT IDENTITY(1,1) PRIMARY KEY,
    AccountId INT NOT NULL,
    Type NVARCHAR(20) CHECK (Type IN ('Deposit', 'Withdrawal', 'Transfer')),
    Amount DECIMAL(18,2) NOT NULL CHECK (Amount > 0),
    Date DATETIME DEFAULT GETDATE(),
    Status NVARCHAR(20) CHECK (Status IN ('Success', 'Pending', 'Failed')),
    CONSTRAINT FK_Transaction_Account FOREIGN KEY (AccountId) REFERENCES training.Account(AccountId)
);
GO


CREATE TABLE training.Role (
    RoleId INT IDENTITY(1,1) PRIMARY KEY,
    RoleName NVARCHAR(50) UNIQUE NOT NULL
);
GO

CREATE TABLE training.Permission (
    PermissionId INT IDENTITY(1,1) PRIMARY KEY,
    PermissionName NVARCHAR(100) UNIQUE NOT NULL
);
GO

CREATE TABLE training.UserRole (
    UserId INT NOT NULL,
    RoleId INT NOT NULL,
    PRIMARY KEY (UserId, RoleId),
    CONSTRAINT FK_UserRole_User FOREIGN KEY (UserId) REFERENCES training.[User](UserId),
    CONSTRAINT FK_UserRole_Role FOREIGN KEY (RoleId) REFERENCES training.Role(RoleId)
);
GO


CREATE TABLE training.RolePermission (
    RoleId INT NOT NULL,
    PermissionId INT NOT NULL,
    PRIMARY KEY (RoleId, PermissionId),
    CONSTRAINT FK_RolePermission_Role FOREIGN KEY (RoleId) REFERENCES training.Role(RoleId),
    CONSTRAINT FK_RolePermission_Permission FOREIGN KEY (PermissionId) REFERENCES training.Permission(PermissionId)
);
GO
