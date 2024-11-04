package ies.carbox.api.RestAPI.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ies.carbox.api.RestAPI.entity.Car;
import ies.carbox.api.RestAPI.entity.CarLiveInfo;
import ies.carbox.api.RestAPI.entity.TripInfo;
import ies.carbox.api.RestAPI.entity.User;
import ies.carbox.api.RestAPI.service.CarService;
import ies.carbox.api.RestAPI.service.TripInfoService;
import ies.carbox.api.RestAPI.service.UserService;

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

    /**
     * GET /api/v1/vehicles
     *
     * Get User owned cars
     *
     * @param user User
     * @return List<Car>
     */
    @GetMapping
    public ResponseEntity<List<Car>> getAllCars(
        @RequestBody(required = true) User user
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
     * GET /api/v1/vehicles/addVehicle/{carId}
     *
     * Associate a car to a User
     *
     * @param user User
     * @return operation result
     */
    @PostMapping("/addVehicle/{carId}")
    public ResponseEntity<Car> associateCarToUser(
        @RequestBody(required = true) User user,
        @PathVariable(required = true, name = "carId") String ecuId
    ) {
        String userEmail = user.getEmail();

        try {
            return ResponseEntity.status(500).build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * GET /api/v1/vehicles/data
     * Get data of the car carId
     *
     * @param carId String Id of the car
     * @return Car
     */
    @GetMapping("/data")
    public ResponseEntity<Car> getCarById(
        @RequestParam(required = true, value = "carId") String carId
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
     * GET /api/v1/vehicles/{carId}
     * Get latest data of car
     *
     * @param carId String Id of the car
     * @return CarLiveInfo
     */
    @GetMapping("/{carId}")
    public ResponseEntity<CarLiveInfo> getCarLatestInfo(
        @PathVariable(required = true, value = "carId") String carId
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
     * GET /api/v1/vehicles/{carId}
     * Delete association of a user to a car
     *
     * @param carId Id of the car to be dissasociated
     * @return result String with status
     */
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


    /**
     * GET /api/v1/vehicles/trips
     * Gets all trips made by a Car
     *
     * @param carId Id of the car
     * @returns List<TripInfo>
     */
    @GetMapping("/trips")
    public ResponseEntity<List<TripInfo>> getCarTrips(
        // FIX: If necessary, make consistent with get /trip
        @RequestParam(required = true, name = "carId") String carId
        // @RequestBody(required = true) String carId
    ) {
        // FIX: put carId on body would be cleaner(in both 5. and 6.), but could lead to potential
        // Issues for the user, if they are not worked out on frontend
        try {
            System.out.println("Getting trips");
            List<TripInfo> trips = tripInfoService.getTripInfoByCarId(carId);
            System.out.println("Got " + trips);
            return ResponseEntity.ok(trips);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * GET /api/v1/vehicles/trip/{carId}/{tripId}
     * Get a trip made by a Car
     *
     * @param carId Id of the car
     * @param tripId Id of the trip
     *
     * @returns CarTrip
     */
    @GetMapping("/trip/{carId}/{tripId}")
    public ResponseEntity<TripInfo> getTrip(
        @PathVariable(required = true, name = "carId") String carId,
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
