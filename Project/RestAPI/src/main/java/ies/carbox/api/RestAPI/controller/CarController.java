package ies.carbox.api.RestAPI.controller;

import ies.carbox.api.RestAPI.entity.Car;
import ies.carbox.api.RestAPI.entity.TripInfo;
import ies.carbox.api.RestAPI.entity.User;
import ies.carbox.api.RestAPI.service.CarService;
import ies.carbox.api.RestAPI.service.TripInfoService;
import ies.carbox.api.RestAPI.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.method.P;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import jakarta.validation.*;

@RestController
@RequestMapping("api/v1/vehicles")  // Base path for Car-related requests
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

    // 1. Get a list of all Cars
    @GetMapping
    public ResponseEntity<List<Car>> getAllCars(@RequestBody(required = true) User user) {
        String userEmail = user.getEmail();

        try {
            List<String> ecuIds = userService.getListOfEcuIds(userEmail);
            List<Car> cars = carService.getAllUserCars(ecuIds);
            return ResponseEntity.ok(cars);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // 2. Get a single Car by its ID
    @GetMapping("/data/")
    public ResponseEntity<Car> getCarById(
        @RequestParam(required = true, value = "id") String carId
    ) {
        try {
            Car car = carService.getCarById(carId);
            return ResponseEntity.ok(car);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // 4. Delete a Car by its ID
    @DeleteMapping("/{carId}")
    public ResponseEntity<String> deleteCar(
        @PathVariable(required = true) String carId,
        @RequestBody(required = true) User user
    ) {
        try {
            userService.removeUserCar(user.getEmail(), carId);
            return ResponseEntity.ok("Car removed successfully");

        } catch (IllegalArgumentException exception) {
            return ResponseEntity.notFound().build();
        }
    }


    // 5. Get all trips from a car by a car id
    // FIX: put carId on body would be cleaner(in both 5. and 6.), but could lead to potential
    // Issues for the user, if they are not worked out on frontend
    @GetMapping("/trips")
    public ResponseEntity<List<TripInfo>> getCarTrips(
        @RequestParam(required = true, name = "carId") String carId
        // @RequestBody(required = true) String carId
    ) {
        try {
            List<TripInfo> trips = tripInfoService.getTripInfoByCarId(carId);
            return ResponseEntity.ok(trips);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    // 6. Get all trips from a car by a car id
    @GetMapping("/trip/{tripId}")
    public ResponseEntity<TripInfo> getTrip(
        @RequestParam(required = true, name = "carId") String carId,
        // @RequestBody(required = true) String carId
        @PathVariable(required = true, name="tripId") String tripId
    ) {
        try {
            TripInfo trips = tripInfoService.getTripInfo(tripId, carId);
            return ResponseEntity.ok(trips);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
