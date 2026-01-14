/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type {CategoryDTO} from './CategoryDTO';
export type TransactionDTO = {
    /**
     * Transaction uuid
     */
    uuid: string;
    /**
     * Transaction amount
     */
    amount: number;
    /**
     * Transaction amount in USD
     */
    amountInUsd: number;
    /**
     * Transaction category
     */
    currency: 'USD' | 'EUR' | 'JPY' | 'GBP' | 'AUD' | 'CAD' | 'CHF' | 'CNY' | 'HKD' | 'NZD' | 'SEK' | 'KRW' | 'SGD' | 'NOK' | 'MXN' | 'INR' | 'RUB' | 'ZAR' | 'TRY' | 'BRL' | 'TWD' | 'DKK' | 'PLN' | 'THB' | 'MYR' | 'IDR' | 'HUF' | 'CZK' | 'ILS' | 'CLP' | 'PHP' | 'AED' | 'COP' | 'SAR' | 'RON' | 'BGN' | 'KZT' | 'BYN';
    /**
     * Optional user description
     */
    description: string;
    /**
     * Creation timestamp
     */
    createdAt: string;
    /**
     * Last update timestamp
     */
    updatedAt: string;
    /**
     * Connection to bank account
     */
    bankAccountUuid?: string;
    /**
     * transaction category
     */
    category?: CategoryDTO;
};

