package ies.carbox.api.RestAPI.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import ies.carbox.api.RestAPI.entity.User;

/**
 * UserRepository
 */
public interface UserRepository extends MongoRepository<User, Long> {


}
