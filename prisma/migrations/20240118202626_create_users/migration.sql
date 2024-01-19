-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "secretKey" TEXT DEFAULT '',
    "totpStatus" BOOLEAN DEFAULT false,
    "emailConfirmed" BOOLEAN DEFAULT false,
    "confirmationToken" TEXT DEFAULT '',
    "isDisabled" BOOLEAN DEFAULT false,
    "nickname" TEXT DEFAULT '',
    "avatarUrl" TEXT DEFAULT '',
    "description" TEXT DEFAULT '',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
