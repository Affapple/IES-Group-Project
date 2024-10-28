package ies.carbox.api.RestAPI.entity;
import lombok.*;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import jakarta.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tbl_users")
public class User {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter @Setter
    private Long id;

    @Column(nullable=false, name="username")
    @Getter @Setter
    private String username;

    @Column(nullable=false, name="password")
    // Password setter done down below
    @Getter 
    private String password;

    /**
     * Gets an decrypted password, encrypts its and saves it in the object
     * @param password decrypted password
     * @return void
     */
    public void setPassword(String password) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        this.password = encoder.encode(password);
    }

    @Override
    public String toString() {
        return "User [id=" + id + ", password= *********"  + ", username=" + username + "]";
    }
}