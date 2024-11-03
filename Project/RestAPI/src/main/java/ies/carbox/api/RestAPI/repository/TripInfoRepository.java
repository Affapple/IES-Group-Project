package ies.carbox.api.RestAPI.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import ies.carbox.api.RestAPI.entity.TripInfo;
import ies.carbox.api.RestAPI.entity.TripInfoId;

/**
 * TripInfoRepository
 */
@Repository
public interface TripInfoRepository extends MongoRepository<TripInfo, TripInfoId> {
    Optional<List<TripInfo>> findByTripInfoId_CarId(String carId);
    Optional<TripInfo> findByTripInfoId_CarIdAndTripInfoId_TripId(String carId, String tripId);
}
