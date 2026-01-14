/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type {UserSettingsDTO} from './UserSettingsDTO';
export type UserDTO = {
    /**
     * User uuid
     */
    uuid: string;
    /**
     * User image URL
     */
    image: string;
    /**
     * User color if no image
     */
    color: 'RED' | 'GREEN' | 'BLUE' | 'YELLOW' | 'ORANGE' | 'PINK' | 'CYAN' | 'MAGENTA' | 'GRAY' | 'BLACK';
    /**
     * Username
     */
    username: string;
    /**
     * Email address
     */
    email: string;
    /**
     * User settings
     */
    userSettings: UserSettingsDTO;
    /**
     * User's telegram id
     */
    telegramId: number;
    /**
     * Creation timestamp
     */
    createdAt: string;
    /**
     * Last update timestamp
     */
    updatedAt: string;
};

