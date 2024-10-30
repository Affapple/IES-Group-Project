package ies.carbox.api.RestAPI.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ies.carbox.api.RestAPI.entity.CarLiveInfo;

/**
 * CarLiveInfoRepository
 */
public interface CarLiveInfoRepository extends JpaRepository<CarLiveInfo, Long> {


}
