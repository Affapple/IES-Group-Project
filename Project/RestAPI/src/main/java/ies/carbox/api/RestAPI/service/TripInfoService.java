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

    @Autowired
    public TripInfoService(TripInfoRepository tripInfos) {
        this.tripInfoRepository = tripInfos;
    }


    public List<TripInfo> getTripInfoByCarId(String carId) {
        return tripInfoRepository.findByCarId(carId)
                .orElseThrow(
                    () -> new IllegalArgumentException (
                        String.format("No trips found for car %s", carId)
                    )
                );
    }

    public TripInfo getTripInfo(String tripId, String carId) {
        return tripInfoRepository.findByCarIdAndTripId(carId, tripId)
                .orElseThrow(
                    () -> new IllegalArgumentException (
                        String.format("Trip of id (tripId=%s, carId=%s) found for car", tripId, carId)
                    )
                );
    }

    public TripInfo getLatestTripInfo(String carId) {
        List<TripInfo> trips = tripInfoRepository.findByCarId(carId)
                .orElseThrow(
                    () -> new IllegalArgumentException (
                        String.format("No trips found for car %s", carId)
                    )
                );
        return trips.get(trips.size() - 1);
    }

}
