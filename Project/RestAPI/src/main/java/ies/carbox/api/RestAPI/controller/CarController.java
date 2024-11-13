package ies.carbox.api.RestAPI.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import ies.carbox.api.RestAPI.entity.Car;
import ies.carbox.api.RestAPI.entity.CarLiveInfo;
import ies.carbox.api.RestAPI.entity.TripInfo;
import ies.carbox.api.RestAPI.entity.User;
import ies.carbox.api.RestAPI.service.CarService;
import ies.carbox.api.RestAPI.service.TripInfoService;
import ies.carbox.api.RestAPI.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.Parameter;
import ies.carbox.api.RestAPI.CONSTANTS;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

/**
 * CarController provides endpoints for managing cars, including viewing, associating cars to users, 
 * retrieving car data and trips, and removing car associations.
 */
@RestController
@RequestMapping(CONSTANTS.baseUrl + "/vehicles")  // Base path for Car-related requests

public class CarController {

    private final CarService carService;
    private final UserService userService;
    private final TripInfoService tripInfoService;

    @Autowired
    public CarController(CarService carService, UserService userService, TripInfoService tripInfoService ) {
        this.carService = carService;
        this.userService = userService;
        this.tripInfoService = tripInfoService;
    }

    /**
     * Retrieves a list of cars owned by the specified user.
     *
     * @param user The User object representing the user whose cars are to be retrieved.
     * @return A list of Car objects associated with the user.
     */
    @GetMapping
    @Operation(summary = "Retrieve all cars owned by a specific user", description = "Retrieve a list of cars owned by a user")
    @ApiResponse(responseCode = "200", description = "Cars retrieved successfully")
    @ApiResponse(responseCode = "404", description = "User not found")
    public ResponseEntity<List<Car>> getAllCars(
        @Parameter(description = "User object containing user's email") @RequestBody(required = true) User user
    ) {
        System.out.println("Hello");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("Hello2 ");
        String userEmail = user.getEmail();
        System.err.println("Getting user cars");

        try {
            List<String> ecuIds = userService.getListOfEcuIds(userEmail);
            List<Car> cars = carService.getAllUserCars(ecuIds);
            return ResponseEntity.ok(cars);
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Associates a car with a user.
     *
     * @param user The User object containing user's email.
     * @param ecuId The ID of the car to be associated with the user.
     * @return The associated Car object on success.
     */
    @PostMapping("/addVehicle/{carId}")
    @Operation(summary = "Associate a car with a user", description = "Associates a car with the specified user")
    @ApiResponse(responseCode = "200", description = "Car associated with user successfully")
    @ApiResponse(responseCode = "404", description = "User or car not found")
    public ResponseEntity<Car> associateCarToUser(
        @Parameter(description = "User object containing user's email") @RequestBody(required = true) User user,
        @Parameter(description = "ID of the car to be associated") @PathVariable(required = true, name = "carId") String ecuId
    ) {
        String userEmail = user.getEmail();

        try {
            return ResponseEntity.status(500).build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Retrieves data for a specific car by its ID.
     *
     * @param carId The ID of the car to retrieve data for.
     * @return The Car object containing data of the specified car.
     */
    @GetMapping("/data")
    @Operation(summary = "Retrieve car data by car ID", description = "Retrieve detailed car data by specifying car ID")
    @ApiResponse(responseCode = "200", description = "Car data retrieved successfully")
    @ApiResponse(responseCode = "404", description = "Car not found")
    public ResponseEntity<Car> getCarById(
        @Parameter(description = "ID of the car to retrieve") @RequestParam(required = true, value = "carId") String carId
    ) {
        try {
            Car car = carService.getCarById(carId);
            return ResponseEntity.ok(car);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Retrieves the latest live information for a specified car.
     *
     * @param carId The ID of the car for which to retrieve the latest information.
     * @return The CarLiveInfo object containing the latest data of the specified car.
     */
    @GetMapping("/{carId}")
    @Operation(summary = "Retrieve the latest live information of a car by car ID", description = "Retrieve the latest live data for a specific car")
    @ApiResponse(responseCode = "200", description = "Latest car data retrieved successfully")
    @ApiResponse(responseCode = "404", description = "Car not found")
    public ResponseEntity<CarLiveInfo> getCarLatestInfo(
        @Parameter(description = "ID of the car to retrieve live data for") @PathVariable(required = true, value = "carId") String carId
    ) {
        try {
            CarLiveInfo car = carService.getLatestCarData(carId);
            return ResponseEntity.ok(car);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Deletes the association of a car from a user.
     *
     * @param carId The ID of the car to be dissociated.
     * @param user The User object containing user's email.
     * @return A status message indicating the result of the deletion.
     */
    @DeleteMapping("/{carId}")
    @Operation(summary = "Dissociate a car from a user by car ID", description = "Removes the association of a car from a user")
    @ApiResponse(responseCode = "200", description = "Car dissociated from user successfully")
    @ApiResponse(responseCode = "404", description = "User or car not found")
    public ResponseEntity<String> deleteCar(
        @Parameter(description = "ID of the car to be removed from user") @PathVariable(required = true) String carId,
        @Parameter(description = "User object containing user's email") @RequestBody(required = true) User user
    ) {
        try {
            userService.removeUserCar(user.getEmail(), carId);
            return ResponseEntity.ok("Car removed successfully");

        } catch (IllegalArgumentException exception) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Retrieves all trips made by a specific car.
     *
     * @param carId The ID of the car to retrieve trips for.
     * @return A list of TripInfo objects for the specified car.
     */
    @GetMapping("/trips")
    @Operation(summary = "Retrieve all trips made by a car", description = "Retrieve a list of trips associated with a specific car")
    @ApiResponse(responseCode = "200", description = "Trips retrieved successfully")
    @ApiResponse(responseCode = "404", description = "Car not found or no trips available")
    public ResponseEntity<List<TripInfo>> getCarTrips(
        @Parameter(description = "ID of the car to retrieve trips for") @RequestParam(required = true, name = "carId") String carId
    ) {
        try {
            List<TripInfo> trips = tripInfoService.getTripInfoByCarId(carId);
            return ResponseEntity.ok(trips);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Retrieves a specific trip made by a car.
     *
     * @param carId The ID of the car for the trip.
     * @param tripId The ID of the trip to retrieve.
     * @return The TripInfo object containing data for the specified trip.
     */
    @GetMapping("/trip/{carId}/{tripId}")
    @Operation(summary = "Retrieve a specific trip made by a car", description = "Retrieve detailed information of a specific trip associated with a car")
    @ApiResponse(responseCode = "200", description = "Trip retrieved successfully")
    @ApiResponse(responseCode = "404", description = "Trip or car not found")
    public ResponseEntity<TripInfo> getTrip(
        @Parameter(description = "ID of the car related to the trip") @PathVariable(required = true, name = "carId") String carId,
        @Parameter(description = "ID of the trip to retrieve") @PathVariable(required = true, name="tripId") String tripId
    ) {
        try {
            TripInfo trips = tripInfoService.getTripInfo(tripId, carId);
            return ResponseEntity.ok(trips);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
