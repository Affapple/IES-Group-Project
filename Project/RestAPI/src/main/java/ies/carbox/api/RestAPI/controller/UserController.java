package ies.carbox.api.RestAPI.controller;

import ies.carbox.api.RestAPI.entity.User;
import ies.carbox.api.RestAPI.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    // POST /user/createAccount
@PostMapping("/createAccount")
public ResponseEntity<User> createAccount(@Valid @RequestBody User user) {
    try {
        User createdUser = userService.createAccount(user);
        return ResponseEntity.status(201).body(createdUser);
    } catch (Exception e) {
        return ResponseEntity.badRequest().body(null);
    }
}

// POST /user/login
@PostMapping("/login")
public ResponseEntity<?> login(@RequestBody User loginRequest) {
    try {
        String token = userService.login(loginRequest.getUsername(), loginRequest.getPassword());
        return ResponseEntity.ok(token);
    } catch (Exception e) {
        return ResponseEntity.status(401).body("Invalid username or password");
    }
}

// PUT /user/updateAccount
@PutMapping("/updateAccount")
public ResponseEntity<User> updateAccount(@RequestBody User updatedUser) {
    try {
        User user = userService.updateAccount(updatedUser);
        return ResponseEntity.ok(user);
    } catch (Exception e) {
        return ResponseEntity.badRequest().body(null);
    }
}

// GET /user/account
@GetMapping("/account")
public ResponseEntity<User> getAccount(@RequestParam String userId) {
    Optional<User> user = userService.getAccount(userId);
    return user.map(ResponseEntity::ok)
               .orElseGet(() -> ResponseEntity.status(404).body(null));
}

// POST /user/logout
@PostMapping("/logout")
public ResponseEntity<String> logout() {
    return ResponseEntity.ok("Logged out successfully");
}
// TODO: Might need to add tokens for security or for session management


}
