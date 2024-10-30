package ies.carbox.api.RestAPI.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import ies.carbox.api.RestAPI.entity.CarLiveInfo;
import ies.carbox.api.RestAPI.entity.CarLiveInfoId;

/**
 * Repository interface for accessing and managing {@link CarLiveInfo} entities in the MongoDB database.
 *
 * <p>This interface extends {@link MongoRepository}, providing CRUD operations and custom query methods
 * for the {@link CarLiveInfo} entity, which represents real-time information about cars.</p>
 * 
 * <p>The repository uses {@link CarLiveInfoId} as the ID type for the {@link CarLiveInfo} entity.</p>
 */
public interface CarLiveInfoRepository extends MongoRepository<CarLiveInfo, CarLiveInfoId> {
    // Additional custom query methods can be defined here if needed.
}
