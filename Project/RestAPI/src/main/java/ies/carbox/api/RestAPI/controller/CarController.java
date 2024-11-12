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
import io.swagger.annotations.*;

/**
 * CarController provides endpoints for managing cars, including viewing, associating cars to users, 
 * retrieving car data and trips, and removing car associations.
 */
@RestController
@RequestMapping("api/v1/vehicles")  // Base path for Car-related requests
@Api(tags = "Car Management", description = "Endpoints for managing car data and associations")
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
    @ApiOperation("Retrieve all cars owned by a specific user")
    @ApiResponses({
        @ApiResponse(code = 200, message = "Cars retrieved successfully"),
        @ApiResponse(code = 404, message = "User not found")
    })
    public ResponseEntity<List<Car>> getAllCars(
        @ApiParam("User object containing user's email") @RequestBody(required = true) User user
    ) {
        String userEmail = user.getEmail();

        try {
            List<String> ecuIds = userService.getListOfEcuIds(userEmail);
            List<Car> cars = carService.getAllUserCars(ecuIds);
            return ResponseEntity.ok(cars);
        } catch (IllegalArgumentException e) {
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
    @ApiOperation("Associate a car with a user")
    @ApiResponses({
        @ApiResponse(code = 200, message = "Car associated with user successfully"),
        @ApiResponse(code = 404, message = "User or car not found")
    })
    public ResponseEntity<Car> associateCarToUser(
        @ApiParam("User object containing user's email") @RequestBody(required = true) User user,
        @ApiParam("ID of the car to be associated") @PathVariable(required = true, name = "carId") String ecuId
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
    @ApiOperation("Retrieve car data by car ID")
    @ApiResponses({
        @ApiResponse(code = 200, message = "Car data retrieved successfully"),
        @ApiResponse(code = 404, message = "Car not found")
    })
    public ResponseEntity<Car> getCarById(
        @ApiParam("ID of the car to retrieve") @RequestParam(required = true, value = "carId") String carId
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
    @ApiOperation("Retrieve the latest live information of a car by car ID")
    @ApiResponses({
        @ApiResponse(code = 200, message = "Latest car data retrieved successfully"),
        @ApiResponse(code = 404, message = "Car not found")
    })
    public ResponseEntity<CarLiveInfo> getCarLatestInfo(
        @ApiParam("ID of the car to retrieve live data for") @PathVariable(required = true, value = "carId") String carId
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
    @ApiOperation("Dissociate a car from a user by car ID")
    @ApiResponses({
        @ApiResponse(code = 200, message = "Car dissociated from user successfully"),
        @ApiResponse(code = 404, message = "User or car not found")
    })
    public ResponseEntity<String> deleteCar(
        @ApiParam("ID of the car to be removed from user") @PathVariable(required = true) String carId,
        @ApiParam("User object containing user's email") @RequestBody(required = true) User user
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
    @ApiOperation("Retrieve all trips made by a car")
    @ApiResponses({
        @ApiResponse(code = 200, message = "Trips retrieved successfully"),
        @ApiResponse(code = 404, message = "Car not found or no trips available")
    })
    public ResponseEntity<List<TripInfo>> getCarTrips(
        @ApiParam("ID of the car to retrieve trips for") @RequestParam(required = true, name = "carId") String carId
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
    @ApiOperation("Retrieve a specific trip made by a car")
    @ApiResponses({
        @ApiResponse(code = 200, message = "Trip retrieved successfully"),
        @ApiResponse(code = 404, message = "Trip or car not found")
    })
    public ResponseEntity<TripInfo> getTrip(
        @ApiParam("ID of the car related to the trip") @PathVariable(required = true, name = "carId") String carId,
        @ApiParam("ID of the trip to retrieve") @PathVariable(required = true, name="tripId") String tripId
    ) {
        try {
            TripInfo trips = tripInfoService.getTripInfo(tripId, carId);
            return ResponseEntity.ok(trips);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
