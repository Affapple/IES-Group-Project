package ies.carbox.api.RestAPI.service;

import java.util.List;
import java.util.Optional;

import org.apache.commons.lang3.tuple.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import ies.carbox.api.RestAPI.dtos.RegisterUserDto;
import ies.carbox.api.RestAPI.entity.User;
import ies.carbox.api.RestAPI.repository.UserRepository;
import jakarta.persistence.Tuple;

/**
 * userService
 */
/*
    * This class is responsible for handling the user's account
 */
@Service
public class UserService implements UserDetailsService {
    UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Boolean belongsToUser(String ecuId, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                    .orElseThrow( () -> new IllegalArgumentException(
           String.format("User with userId=\"%s\" not found", userEmail)
        ));
        return user.getCarsList().stream().anyMatch(car -> car.get("ecu_id").equals(ecuId));
    }


    // ! Maybe correct this later to be email and not username
    // May not be necessary this method
    @Override
    public User loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<Tuple> getListOfEcuIds(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                    .orElseThrow( () -> new IllegalArgumentException(
           String.format("User with userId=\"%s\" not found", userEmail)
        ));
        return user.getCarsList();
    }

    public User removeUserCar(String userEmail, String carId) {
        User user = userRepository.findByEmail(userEmail)
                    .orElseThrow( () -> new IllegalArgumentException(
           String.format("User with userId=\"%s\" not found", userEmail)
        ));
        userRepository.deleteByEmail(user.getEmail());
        
        List<Tuple> carList = user.getCarsList();
        for (Tuple car : carList) {
            if (car.get("ecu_id").equals(carId)) {
                carList.remove(car);
                break;
            }
        }
        user.setCarsList(carList);
        return user;
    }

    public User addUserCar(String userEmail, String vehicleId, String vehicleName) {
        User user = userRepository.findByEmail(userEmail)
                    .orElseThrow( () -> new IllegalArgumentException(
           String.format("User with userId=\"%s\" not found", userEmail)
        ));
        userRepository.deleteByEmail(user.getEmail());
        List<Tuple> carList = user.getCarsList();
        Pair<String, String> newCar = Pair.of(vehicleId, vehicleName);
        carList.add((Tuple) newCar);
        user.setCarsList(carList);
        return user;
    }

    public Void delUser(User user) {
        userRepository.delete(user);
        return null;
    }

    public Optional<User> getAccount(String userEmail) {
        return userRepository.findByEmail(userEmail);
    }


    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
