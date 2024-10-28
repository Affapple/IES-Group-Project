package ies.carbox.api.RestAPI.service;

import ies.carbox.api.RestAPI.entity.Car;
import java.util.List;

/*
 * When building this, we have to have in consideration the names
 * And also because, for example, getAllCars shouldn't return all cars from the database
 * But all cars belonging to the user
 */


public class CarService {

    public CarService() {
    }

    public void createCar(Car car) {
    }

    public List<Car> getAllUserCars() {
        return null;
    }

    public Car getCarUserById(String carId) {
        return null;
    }

    public void updateCar(Car car) {
    }

    public void deleteCarById(String carId) {
    }

    public void getCarStats(String carId) {

        // Maybe inside this function we call all the stats
        // Maybe we do a class for car stats
    }
    
}


