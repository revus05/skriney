package com.example.skrineybackend.exception;

public class TelegramAlreadyLinkedException extends RuntimeException {
    public TelegramAlreadyLinkedException(String message) {
        super(message);
    }
}
