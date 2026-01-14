/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type BankAccountDTO = {
    /**
     * Bank Account uuid
     */
    uuid: string;
    /**
     * Money on the bank account
     */
    balanceInUsd: number;
    /**
     * Each currency balance
     */
    currencyBalances: Record<string, number>;
    /**
     * Bank Account title
     */
    title: string;
    /**
     * Bank Account emoji
     */
    emoji: string;
    /**
     * Creation timestamp
     */
    createdAt: string;
    /**
     * Last update timestamp
     */
    updatedAt: string;
};

