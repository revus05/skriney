package com.example.skrineybackend.service;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Service;

@Service
public class CookieService {
  public void createJwtCookie(HttpServletResponse response, String value, int maxAge) {
    Cookie jwtCookie = new Cookie("jwt", value);

    jwtCookie.setHttpOnly(true);

    jwtCookie.setSecure(true);
    jwtCookie.setAttribute("SameSite", "Lax");

    jwtCookie.setPath("/");
    jwtCookie.setMaxAge(maxAge);

    response.addCookie(jwtCookie);
  }
}
