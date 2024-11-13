package ies.carbox.api.RestAPI.controller;

import ies.carbox.api.RestAPI.entity.User;
import ies.carbox.api.RestAPI.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.Optional;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;

/**
 * UserController provides endpoints for managing user accounts, including registration, login, 
 * updating account details, retrieving user information, and logout.
 */
@RestController
@RequestMapping("/api/v1/user")
@io.swagger.v3.oas.annotations.tags.Tag(name = "User Management", description = "Endpoints for user account operations")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Registers a new user account.
     *
     * @param user The User object containing registration information.
     * @return ResponseEntity with the created User object and HTTP status 201, or 400 if creation fails.
     */
    @PostMapping("/createAccount")
    @Operation(
        summary = "Register a new user account", 
        description = "Create a new user account with the provided user details",
        responses = {
            @ApiResponse(
                responseCode = "201", 
                description = "User created successfully", 
                content = @Content(schema = @Schema(implementation = User.class))
            ),
            @ApiResponse(responseCode = "400", description = "Invalid user details or creation failed")
        }
    )
    public ResponseEntity<User> createAccount(
            @Parameter(description = "User object with account details") @Valid @RequestBody User user) {
        
        try {
            User createdUser = userService.createAccount(user);
            return ResponseEntity.status(201).body(createdUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    /**
     * Authenticates a user and generates a token.
     *
     * @param loginRequest User object containing login credentials.
     * @return ResponseEntity with token (String) and HTTP status 200, or 401 if authentication fails.
     */
    @PostMapping("/login")
    @Operation(
        summary = "Authenticate user and generate token", 
        description = "Authenticate the user and generate an authentication token",
        responses = {
            @ApiResponse(responseCode = "200", description = "User authenticated successfully"),
            @ApiResponse(responseCode = "401", description = "Invalid username or password")
        }
    )
    public ResponseEntity<String> login(
            @Parameter(description = "User object with login credentials") @RequestBody User loginRequest) {
        
        try {
            String token = userService.login(loginRequest.getUsername(), loginRequest.getPassword());
            return ResponseEntity.ok(token);
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }

    /**
     * Updates user account information.
     *
     * @param updatedUser The User object containing updated information.
     * @return ResponseEntity with updated User object and HTTP status 200, or 400 if update fails.
     */
    @PutMapping("/updateAccount")
    @Operation(
        summary = "Update user account information", 
        description = "Update the user account with the provided details",
        responses = {
            @ApiResponse(
                responseCode = "200", 
                description = "User account updated successfully", 
                content = @Content(schema = @Schema(implementation = User.class))
            ),
            @ApiResponse(responseCode = "400", description = "Invalid data or update failed")
        }
    )
    public ResponseEntity<User> updateAccount(
            @Parameter(description = "Updated User object with new details") @RequestBody User updatedUser) {
        
        try {
            User user = userService.updateAccount(updatedUser);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    /**
     * Retrieves account details for a specific user.
     *
     * @param userId The ID of the user whose details are requested.
     * @return ResponseEntity with User object and HTTP status 200, or 404 if user is not found.
     */
    @GetMapping("/account")
    @Operation(
        summary = "Retrieve user account details by user ID", 
        description = "Retrieve the details of a user account based on user ID",
        responses = {
            @ApiResponse(
                responseCode = "200", 
                description = "User found and returned successfully", 
                content = @Content(schema = @Schema(implementation = User.class))
            ),
            @ApiResponse(responseCode = "404", description = "User not found")
        }
    )
    public ResponseEntity<User> getAccount(
            @Parameter(description = "ID of the user") @RequestParam String userId) {
        
        Optional<User> user = userService.getAccount(userId);
        return user.map(ResponseEntity::ok)
                   .orElseGet(() -> ResponseEntity.status(404).body(null));
    }

    /**
     * Logs out the user.
     *
     * @return ResponseEntity with a success message and HTTP status 200.
     */
    @PostMapping("/logout")
    @Operation(
        summary = "Logout user", 
        description = "Logs out the current user",
        responses = {
            @ApiResponse(responseCode = "200", description = "User logged out successfully")
        }
    )
    public ResponseEntity<String> logout() {
        return ResponseEntity.ok("Logged out successfully");
    }
}
