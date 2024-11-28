package ies.carbox.api.RestAPI.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import ies.carbox.api.RestAPI.entity.User;
import ies.carbox.api.RestAPI.CONSTANTS;
import ies.carbox.api.RestAPI.entity.Car;
import ies.carbox.api.RestAPI.service.UserService;
import ies.carbox.api.RestAPI.service.CarService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(CONSTANTS.apiBase + "/admin")
public class AdminController {

        /**
     * Gets a list of all cars and their associated users. For admin purposes only.
     * 
     */
    @Autowired
    private UserService userService;

    @Autowired
    private CarService carService;


    @GetMapping("/users") // to get all the users through admin
    @Operation(
        summary = "Get all users",
        description = "Get a list of all users",
        responses = {
            @ApiResponse(
                responseCode = "200", 
                description = "List of all users", 
                content = @Content(schema = @Schema(implementation = User.class))
            ),
            @ApiResponse(responseCode = "403", description = "Unauthorized access")
        }
    )
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }



    @GetMapping("/cars") // to get all the cars through admin
    @Operation(
        summary = "Get all cars",
        description = "Get a list of all cars",
        responses = {
            @ApiResponse(
                responseCode = "200", 
                description = "List of all cars", 
                content = @Content(schema = @Schema(implementation = User.class))
            ),
            @ApiResponse(responseCode = "403", description = "Unauthorized access")
        }
    )
    public ResponseEntity<List<Car>> getAllCars() {
        List<Car> cars = carService.getAllCars();       // ! Add getAllCars method in CarService or add new service and repository for admin
        return ResponseEntity.ok(cars);
    }


    @GetMapping("/user/{email}") // to get a specific user through admin
    @Operation(
        summary = "Get a specific user",
        description = "Get a specific user",
        responses = {
            @ApiResponse(
                responseCode = "200", 
                description = "Specific user", 
                content = @Content(schema = @Schema(implementation = User.class))
            ),
            @ApiResponse(responseCode = "403", description = "Unauthorized access")
        }
    )

    public ResponseEntity<User> loadUserByUsername(@PathVariable String email) {
        User user = userService.loadUserByUsername(email);    //(email); // ! Add loadUserByUsername method in UserService
        return ResponseEntity.ok(user);
    }

// TODO FIX: AO FAZER SEARHC BY ID CRIARÀ BAD REQUEST
// Porque email nao pode estar na url
    @GetMapping("/cars/{user_email}") // to get all the cars of a specific user through admin
    @Operation(
        summary = "Get all cars of a specific user",
        description = "Get a list of all cars of a specific user",
        responses = {
            @ApiResponse(
                responseCode = "200", 
                description = "List of all cars of a specific user", 
                content = @Content(schema = @Schema(implementation = User.class))
            ),
            @ApiResponse(responseCode = "403", description = "Unauthorized access")
        }
    )
    // user id will always correspond to email
    public ResponseEntity<List<Car>> getAllUserCars(@PathVariable List<String> ecuIds) {
        // Fazer pesquisa por variavel de body
        List<Car> cars = carService.getAllUserCars(ecuIds);
        return ResponseEntity.ok(cars);

    }
}