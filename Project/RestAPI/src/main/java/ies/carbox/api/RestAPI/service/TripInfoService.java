package ies.carbox.api.RestAPI.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ies.carbox.api.RestAPI.entity.TripInfo;
import ies.carbox.api.RestAPI.repository.TripInfoRepository;

/**
 * TripInfoService
 */
@Service
public class TripInfoService {
    TripInfoRepository tripInfoRepository;
    CacheService cacheService;

    @Autowired
    public TripInfoService(TripInfoRepository tripInfoRepository, CacheService cacheService) {
        this.tripInfoRepository = tripInfoRepository;
        this.cacheService = cacheService;
    }

    public List<TripInfo> getTripInfoByCarId(String carId) {
        List<TripInfo> trips;
        
        trips = tripInfoRepository.findByCarId(carId)
                .orElseThrow(
                        () -> new IllegalArgumentException(
                                String.format("No trips found for car %s", carId)));

        cacheService.saveTrip(trips, carId);
        return trips;
    }

    public TripInfo getTripInfo(String tripId, String carId) throws IllegalArgumentException {
        List<TripInfo> trips = getTripInfoByCarId(carId);
        for (TripInfo trip : trips) {
            if (trip.getTripId().equals(tripId)) {
                return trip;
            }
        }
        throw new IllegalArgumentException(
                String.format("Trip %s not found for car %s", tripId, carId));
    }

    public TripInfo getLatestTripInfo(String carId) {
        // Put in repository findFirstByCarIdOrderByDateDesc
        List<TripInfo> trips= cacheService.getCarTrips(carId);
        if (trips != null) {
            return trips.get(trips.size() - 1);
        }
        trips = tripInfoRepository.findByCarId(carId)
                .orElseThrow(
                        () -> new IllegalArgumentException(
                                String.format("No trips found for car %s", carId)));

        cacheService.saveTrip(trips, carId);
        return trips.get(trips.size() - 1);
    }
}