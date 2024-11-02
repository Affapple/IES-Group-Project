package ies.carbox.api.RestAPI.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import ies.carbox.api.RestAPI.entity.User;
import ies.carbox.api.RestAPI.repository.UserRepository;

/**
 * userService
 */
public class UserService {
    UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<String> getListOfEcuIds(String userEmail) {
        User user = userRepository.findById(userEmail)
                    .orElseThrow( () -> new IllegalArgumentException(
           String.format("User with userId=\"%s\" not found", userEmail)
        ));

        return user.getCarsList();
    }

    public void removeUserCar(String userEmail, String carId) {
        User user = userRepository.findById(userEmail)
                    .orElseThrow( () -> new IllegalArgumentException(
           String.format("User with userId=\"%s\" not found", userEmail)
        ));

        List<String> carList = user.getCarsList();
        carList.remove(carId);

        userRepository.save(user);
    }
}
