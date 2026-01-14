-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('USD', 'EUR', 'JPY', 'GBP', 'AUD', 'CAD', 'CHF', 'CNY', 'HKD', 'NZD', 'SEK', 'KRW', 'SGD', 'NOK', 'MXN', 'INR', 'RUB', 'ZAR', 'TRY', 'BRL', 'TWD', 'DKK', 'PLN', 'THB', 'MYR', 'IDR', 'HUF', 'CZK', 'ILS', 'CLP', 'PHP', 'AED', 'COP', 'SAR', 'RON', 'BGN', 'KZT', 'BYN');

-- CreateTable
CREATE TABLE "User" (
    "telegramId" TEXT NOT NULL,
    "uuid" TEXT NOT NULL,
    "useDefaultCategory" BOOLEAN NOT NULL DEFAULT false,
    "useDefaultCurrency" BOOLEAN NOT NULL DEFAULT true,
    "useDefaultBankAccount" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("telegramId")
);
