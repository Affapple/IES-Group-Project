package ies.carbox.api.RestAPI.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(info = @Info(title = "Carbox API", version = "1.0", description = "Car Management API Documentation"))
public class OpenApiConfig {
    // Optional: Custom configuration for OpenAPI
}
