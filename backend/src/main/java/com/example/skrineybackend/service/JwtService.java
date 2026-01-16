package com.example.skrineybackend.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

import java.net.URI;
import java.net.URISyntaxException;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import javax.crypto.SecretKey;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

@Service
public class JwtService {
  @Value("${app.jwt.secret}")
  private String SECRET_KEY;

  private static final long EXPIRATION_TIME = 86400000;
  private SecretKey key;

  @PostConstruct
  public void init() {
    this.key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
  }

  public String generateToken(String uuid) {
    return Jwts.builder()
        .setSubject(uuid)
        .setIssuedAt(new Date(System.currentTimeMillis()))
        .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
        .signWith(key)
        .compact();
  }

  public boolean validateToken(String token) {
    try {
      Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
      return true;
    } catch (JwtException | IllegalArgumentException e) {
      return false;
    }
  }

  public String getUuidFromToken(String token) {
    Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
    return claims.get("sub", String.class);
  }

  public Authentication getAuthentication(String token) {
    String uuid = getUuidFromToken(token);
    List<SimpleGrantedAuthority> authorities = Collections.emptyList();
    User principal = new User(uuid, "", authorities);

    return new UsernamePasswordAuthenticationToken(principal, token, authorities);
  }

  public Cookie createJwtCookie(HttpServletRequest request, String value, int maxAge) {
    Cookie jwtCookie = new Cookie("jwt", value);

    jwtCookie.setHttpOnly(true);
    jwtCookie.setSecure(true);
    jwtCookie.setAttribute("SameSite", "Lax");
    jwtCookie.setPath("/");
    jwtCookie.setMaxAge(maxAge);

    String Host = request.getHeader("Origin");

    String domain = extractDomain(Host);

    jwtCookie.setDomain(domain);

    return jwtCookie;
  }

  private String extractDomain(String origin) {
    try {
      URI uri = new URI(origin);
      String host = uri.getHost();

      if (host == null) {
        return null;
      }

      if (host.startsWith("www.")) {
        host = host.substring(4);
      }

      if (host.startsWith("api.")) {
        host = host.substring(4);
      }

      return host;
    } catch (URISyntaxException e) {
      System.err.println("Invalid CORS_ORIGIN: " + origin);
    }
    return null;
  }
}
