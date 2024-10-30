package ies.carbox.api.RestAPI.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ies.carbox.api.RestAPI.entity.User;

/**
 * UserRepository
 */
public interface UserRepository extends JpaRepository<User, Long> {


}
