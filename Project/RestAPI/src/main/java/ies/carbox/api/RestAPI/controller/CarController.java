package ies.carbox.api.RestAPI.entity;

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

    
    // 2. Get a list of all Cars


    // 3. Get a single Car by its ID


    // 4. Update an existing Car


    // 5. Delete a Car by its ID

}
