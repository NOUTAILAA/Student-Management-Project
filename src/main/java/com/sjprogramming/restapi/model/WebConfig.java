package com.sjprogramming.restapi.model;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Permet CORS pour toutes les routes
            .allowedOrigins("http://localhost:3000") // Autorise l'origine frontend
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Méthodes autorisées
            .allowedHeaders("*") // Autorise tous les headers
            .allowCredentials(true); // Autorise les cookies et l'authentification par en-tête
    } }
