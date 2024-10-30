package ies.carbox.api.RestAPI.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ies.carbox.api.RestAPI.entity.Car;

/**
 * CarRepository
 */
public interface CarRepository extends JpaRepository<Car, Long> {


}
