package ies.carbox.api.RestAPI.service;

import ies.carbox.api.RestAPI.entity.Car;
import ies.carbox.api.RestAPI.entity.CarLiveInfo;
import ies.carbox.api.RestAPI.entity.User;
import ies.carbox.api.RestAPI.repository.CarLiveInfoRepository;
import ies.carbox.api.RestAPI.repository.CarRepository;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;

/**
 * Service class for managing {@link Car} entities.
 *
 * <p>This service provides methods to create, retrieve, update, and delete cars,
 * as well as to fetch cars associated with a specific user.</p>
 *
 * <p>Note: The methods are designed to interact with a repository layer
 * to handle data persistence and retrieval.</p>
 */
public class CarService {
    CarRepository carRepository;
    CarLiveInfoRepository carLiveInfoRepository;

    /**
     * Default constructor for the CarService.
     */
    @Autowired
    public CarService(CarRepository carRepository, CarLiveInfoRepository carLiveInfoRepository) {
        this.carRepository = carRepository;
        this.carLiveInfoRepository = carLiveInfoRepository;
    }

    /**
     * Retrieves all cars associated with the current user.
     *
     * @param ecuIds List of ecuIds owned by the {@link User}
     *
     * @return a list of {@link Car} entities owned by the {@link User}
     */
    public List<Car> getAllUserCars(List<String> ecuIds) {
        List<Car> carList = new ArrayList<>();
        for (String ecuId : ecuIds) {
            // They MUST exist, otherwise something is very wrong
            try {
                Car car = carRepository.findById(ecuId).get();
                carList.add(car);

                // FIX: Dar improve a esta parte para guardar os dados no CarInfo?
                CarLiveInfo latestStatus = getLatestCarData(car.getEcuId());
                if (latestStatus == null) {
                    continue;
                }

                car.setLocation(latestStatus.getLocation());
                car.setLocation(latestStatus.getLocation());
            } catch (NoSuchElementException elementException) {
                System.err.println("User add a non existent car! ecuID = \""+ecuId+"\"");
                continue;
            }
        }

        return carList;
    }

    public CarLiveInfo getLatestCarData(String ecuId) {
        List<CarLiveInfo> carLiveInfos = carLiveInfoRepository.findByCarLiveInfoId_carId(ecuId);
        Date latestDate = new Date(0);
        CarLiveInfo latestInfo = null;

        for(CarLiveInfo carInfo : carLiveInfos) {
            if (0 < carInfo.getId().getTripDate().compareTo(latestDate)) {
                latestInfo = carInfo;
                latestDate = carInfo.getId().getTripDate();
            }
        }
        return latestInfo;
    }

    /**
     * Retrieves a specific car by its ID for the user.
     *
     * @param carId the ID of the car to retrieve
     * @return the {@link Car} entity associated with the specified ID, or null if not found
     */
    public Car getCarById(String carId) {
        // Implementation to retrieve a car by ID
        return carRepository
                .findById(carId)
                .orElseThrow(() -> new IllegalArgumentException("Car with carId \""+carId+"\" does not exist!"));
    }

    /**
     * Updates an existing {@link Car} entity in the database.
     *
     * @param car the {@link Car} entity with updated information
     */
    public void updateCar(Car car) {
        // Implementation to update the car entity
    }

    /**
     * Deletes a specific car by its ID.
     *
     * @param carId the ID of the car to delete
     */
    public void deleteCarById(String carId) {
        // Implementation to delete the car entity
    }

    /**
     * Retrieves statistics related to a specific car.
     *
     * <p>This method may involve fetching various metrics or statistics
     * associated with the car, which could be represented by a separate class.</p>
     *
     * @param carId the ID of the car for which to retrieve statistics
     */
    public void getCarStats(String carId) {
        // Implementation to retrieve car statistics
        // Potentially calls another service or utility class for stats
    }
}
