package ies.carbox.api.RestAPI.service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import ies.carbox.api.RestAPI.entity.CarLiveInfo;
import ies.carbox.api.RestAPI.entity.TripInfo;
import ies.carbox.api.RestAPI.entity.User;
import ies.carbox.api.RestAPI.repository.CacheRepository;


@Service
public class CacheService {
    @Autowired
    CacheRepository cacheRepository;


    public void saveTrip(TripInfo trip, String email) {
        cacheRepository.saveTrip(trip, email);
    }

    public void saveTrip(List<TripInfo> trips, String email) {
        cacheRepository.saveTrip(trips, email);
    }

    public List<TripInfo> getUserTrips(String email) {
        return cacheRepository.getUserTrips(email);
    }


    public void saveUser(User user) {
        cacheRepository.saveUser(user);
    }

    public User getUser(String email) {
        return cacheRepository.getUser(email);
    }

    public void saveLiveData(CarLiveInfo live_data, String email) {
        cacheRepository.saveLiveData(live_data, email);
    }

    public void saveLiveData(List<CarLiveInfo> live_datas, String email) {
        cacheRepository.saveLiveData(live_datas, email);
    }

    public List<CarLiveInfo> getLiveData(String email) {
        return cacheRepository.getLiveData(email);
    }

    public void deleteUser(String email) {
        cacheRepository.deleteUser(email);
    }
}
