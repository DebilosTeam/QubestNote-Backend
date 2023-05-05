-- CreateTable
CREATE TABLE "server_configuration" (
    "id" SERIAL NOT NULL,
    "smtpHost" TEXT,
    "smtpPort" INTEGER,
    "smtpSecure" BOOLEAN,
    "smtpUser" TEXT,
    "smtpPassword" TEXT,
    "totpIssuer" TEXT DEFAULT 'QubestNote',

    CONSTRAINT "server_configuration_pkey" PRIMARY KEY ("id")
);

INSERT INTO "server_configuration" ("smtpHost", "smtpPort", "smtpSecure", "smtpUser", "smtpPassword", "totpIssuer")
VALUES ('', 25, false, '', '', '');
