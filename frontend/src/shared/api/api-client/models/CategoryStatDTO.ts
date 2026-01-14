/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CategoryStatDTO = {
    /**
     * Category uuid
     */
    uuid: string;
    /**
     * Category total balance
     */
    totalBalanceInUsd: number;
    /**
     * Each currency balance
     */
    currencyBalances: Record<string, number>;
};

