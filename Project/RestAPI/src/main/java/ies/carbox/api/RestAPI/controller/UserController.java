package ies.carbox.api.RestAPI.controller;

import ies.carbox.api.RestAPI.CONSTANTS;
import ies.carbox.api.RestAPI.dtos.LoginUserDto;
import ies.carbox.api.RestAPI.dtos.RegisterUserDto;
import ies.carbox.api.RestAPI.entity.User;
import ies.carbox.api.RestAPI.service.AuthenticationService;
import ies.carbox.api.RestAPI.service.JwtService;
import ies.carbox.api.RestAPI.service.UserService;
import ies.carbox.api.RestAPI.token.AuthToken;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.Optional;

/**
 * UserController provides endpoints for user-related operations.
 *
 * <p>Endpoints include creating an account, logging in, updating account information,
 * retrieving account details, and logging out.</p>
 */
@RestController
@RequestMapping(CONSTANTS.apiBase + "/user") // Base path for all user-related requests
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AuthenticationService authenticationService;

    /**
     * Creates a new user account.
     *
     * <p>This endpoint is for user registration. It accepts a `User` object in the request body
     * and returns the created user object with a 201 status on success.</p>
     *
     * @param user The User object containing account information (validated with @Valid).
     * @return ResponseEntity containing the created User and HTTP status 201, or 400 if creation fails.
     */
    @PostMapping("/createAccount")
    public ResponseEntity<User> createAccount(@Valid @RequestBody RegisterUserDto user) {
        try {
            User createdUser = authenticationService.signup(user);
            return ResponseEntity.status(201).body(createdUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    /**
     * Authenticates a user and generates a token.
     *
     * <p>This endpoint is for user login. It accepts a `User` object with `username` and `password`
     * fields in the request body, and returns a token if authentication is successful.</p>
     *
     * @param loginRequest The User object containing login credentials.
     * @return ResponseEntity with a token (String) and HTTP status 200, or 401 if authentication fails.
     */
    @PostMapping("/login")
    public ResponseEntity<AuthToken> login(@RequestBody LoginUserDto loginRequest) {
        try {
            User authenticatedUser = authenticationService.authenticate(loginRequest);
            String jwtToken = jwtService.generateToken(authenticatedUser);

            AuthToken authToken = new AuthToken();
            authToken.setToken(jwtToken);
            authToken.setExpiresIn(jwtService.getExpirationTime());

            return ResponseEntity.ok(authToken);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(null);
        }
    }

    /**
     * Updates user account information.
     *
     * <p>This endpoint allows users to update their account details. It accepts an updated `User` object
     * and returns the updated user data.</p>
     *
     * @param updatedUser The User object containing updated information.
     * @return ResponseEntity with the updated User and HTTP status 200, or 400 if update fails.
     */
    @PutMapping("/updateAccount")
    public ResponseEntity<User> updateAccount(@RequestBody User updatedUser) {
        try {
            User user = userService.updateAccount(updatedUser);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(null);
        }
    }

    /**
     * Retrieves the account details for a specific user.
     *
     * <p>This endpoint is for fetching user account data. It requires a `userId` as a query parameter.</p>
     *
     * @param userId The ID of the user whose account data is being requested.
     * @return ResponseEntity with the User object and HTTP status 200, or 404 if user is not found.
     */
    @GetMapping("/account")
    public ResponseEntity<User> getAccount(@RequestParam String userId) {
        // WARN: BIrras vê isto: serve para obter o token dos headers
        // faz ctrl+f e pesquisa SecurityContextHolder
        // https://medium.com/@tericcabrel/implement-jwt-authentication-in-a-spring-boot-3-application-5839e4fd8fac
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<User> user = userService.getAccount(userId);
        return user.map(ResponseEntity::ok)
                   .orElseGet(() -> ResponseEntity.status(404).body(null));
    }

    /**
     * Logs out the user.
     *
     * <p>This endpoint performs user logout. It could be extended with token invalidation logic if needed.</p>
     *
     * @return ResponseEntity with a success message and HTTP status 200.
     */
    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        return ResponseEntity.ok("Logged out successfully");
    }

    // TODO: Consider adding token-based security for session management
}
