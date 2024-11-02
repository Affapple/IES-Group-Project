package ies.carbox.api.RestAPI.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import ies.carbox.api.RestAPI.entity.User;

/**
 * UserRepository
 */
@Repository
public interface UserRepository extends MongoRepository<User, String> {

}
