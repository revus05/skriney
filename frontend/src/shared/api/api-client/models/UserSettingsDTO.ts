/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type {BankAccountVisualDTO} from './BankAccountVisualDTO';
import type {CategoryDTO} from './CategoryDTO';
export type UserSettingsDTO = {
    /**
     * User's ui theme
     */
    userTheme: 'DARK' | 'LIGHT' | 'SYSTEM';
    /**
     * User's default currency
     */
    defaultCurrency: 'USD' | 'EUR' | 'JPY' | 'GBP' | 'AUD' | 'CAD' | 'CHF' | 'CNY' | 'HKD' | 'NZD' | 'SEK' | 'KRW' | 'SGD' | 'NOK' | 'MXN' | 'INR' | 'RUB' | 'ZAR' | 'TRY' | 'BRL' | 'TWD' | 'DKK' | 'PLN' | 'THB' | 'MYR' | 'IDR' | 'HUF' | 'CZK' | 'ILS' | 'CLP' | 'PHP' | 'AED' | 'COP' | 'SAR' | 'RON' | 'BGN' | 'KZT' | 'BYN';
    /**
     * Interface animation enabled
     */
    animationEnabled: boolean;
    /**
     * User's default category
     */
    defaultCategory?: CategoryDTO;
    /**
     * User's default bank account
     */
    defaultBankAccount?: BankAccountVisualDTO;
    /**
     * User's language
     */
    language?: 'EN' | 'RU';
};

