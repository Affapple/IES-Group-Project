package ies.carbox.api.RestAPI.controller;

import ies.carbox.api.RestAPI.entity.User;
import ies.carbox.api.RestAPI.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.Optional;
import io.swagger.annotations.*;

/**
 * UserController provides endpoints for managing user accounts, including registration, login, 
 * updating account details, retrieving user information, and logout.
 */
@RestController
@RequestMapping("/api/v1/user")
@Api(tags = "User Management", description = "Endpoints for user account operations")
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
    @ApiOperation("Register a new user account")
    @ApiResponses({
        @ApiResponse(code = 201, message = "User created successfully"),
        @ApiResponse(code = 400, message = "Invalid user details or creation failed")
    })
    public ResponseEntity<User> createAccount(
            @ApiParam("User object with account details") @Valid @RequestBody User user) {
        
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
    @ApiOperation("Authenticate user and generate token")
    @ApiResponses({
        @ApiResponse(code = 200, message = "User authenticated successfully"),
        @ApiResponse(code = 401, message = "Invalid username or password")
    })
    public ResponseEntity<String> login(
            @ApiParam("User object with login credentials") @RequestBody User loginRequest) {
        
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
    @ApiOperation("Update user account information")
    @ApiResponses({
        @ApiResponse(code = 200, message = "User account updated successfully"),
        @ApiResponse(code = 400, message = "Invalid data or update failed")
    })
    public ResponseEntity<User> updateAccount(
            @ApiParam("Updated User object") @RequestBody User updatedUser) {
        
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
    @ApiOperation("Retrieve user account details by user ID")
    @ApiResponses({
        @ApiResponse(code = 200, message = "User found and returned successfully"),
        @ApiResponse(code = 404, message = "User not found")
    })
    public ResponseEntity<User> getAccount(
            @ApiParam("ID of the user") @RequestParam String userId) {
        
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
    @ApiOperation("Logout user")
    @ApiResponses({
        @ApiResponse(code = 200, message = "User logged out successfully")
    })
    public ResponseEntity<String> logout() {
        return ResponseEntity.ok("Logged out successfully");
    }

    // TODO: Consider adding token-based security for session management
}
