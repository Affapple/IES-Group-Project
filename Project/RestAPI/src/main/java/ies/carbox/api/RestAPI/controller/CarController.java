package ies.carbox.api.RestAPI.controller;

import ies.carbox.api.RestAPI.entity.Car;
import ies.carbox.api.RestAPI.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import jakarta.validation.*;

@RestController
@RequestMapping("/cars")  // Base path for Car-related requests
public class CarController {

    private final CarService carService;

    @Autowired
    public CarController(CarService carService) {
        this.carService = carService;
    }

    // 1. Create a new Car
    @PostMapping
    public ResponseEntity<Car> createCar(@Valid @RequestBody Car car) {
        carService.createCar(car);
        return ResponseEntity.ok(car);
    }

    
    // 2. Get a list of all Cars
    @GetMapping
    public ResponseEntity<List<Car>> getAllCars() {
        List<Car> cars = carService.getAllUserCars();
        return ResponseEntity.ok(cars);
    }



    // 3. Get a single Car by its ID
    @GetMapping("/{carId}")
    public ResponseEntity<Car> getCarById(@PathVariable String carId) {
        Car car = carService.getCarUserById(carId);
        if (car != null) {
            return ResponseEntity.ok(car);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    // 4. Update an existing Car
    @PutMapping("/{carId}")
    // TODO:


    // 5. Delete a Car by its ID
    @DeleteMapping("/{carId}")
    public void deleteCar(@PathVariable String carId) {
        carService.deleteCarById(carId);
    }

}
