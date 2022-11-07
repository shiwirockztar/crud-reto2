package com.shiwirockztar.springAtlas.controllers;

import com.shiwirockztar.springAtlas.models.Users;
import com.shiwirockztar.springAtlas.utils.JWTUtil;
import com.shiwirockztar.springAtlas.repository.IUserRepository;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Controlador para los Usuarios CRUD
 *
 * @version 1.0.0 2022-10-02
 * @author Jose leonardo poveda <shiwirockztar@gmail.com.co>
 * @since 1.0.0
 */
@RestController
@RequestMapping(path = "/users/api/v1")
@CrossOrigin(origins = "*",methods = {RequestMethod.POST, RequestMethod.GET,RequestMethod.PUT,RequestMethod.DELETE})
public class UserController {

    @Autowired private IUserRepository userRepository;
    @Autowired private MongoTemplate mongoTemplate;
    @Autowired private JWTUtil jwtUtil;

    /**
     * Ruta de la Api encargada en crear el usuario
     *
     * @return Objeto Response en formato JSON con una contraseña encriptada
     *
     * @author Jose leonardo poveda <shiwirockztar@gmail.com.co>
     * @since 1.0.0
     */
    @PostMapping("/create")
    public Users create(@Validated @RequestBody  Users user) {
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hash = argon2.hash(1, 1024, 1, user.getPassword());
        user.setPassword(hash);
        return userRepository.insert(user);
    }

    /**
     * Ruta de la Api encargada en devolver todos los usuarios leidos
     *
     * @return Objeto Response en formato JSON
     *
     * @author Jose leonardo poveda <shiwirockztar@gmail.com.co>
     * @since 2.0.0
     */
    @GetMapping("/read")
    public List<Users> read(@RequestHeader (value = "Authorization") String token)  {
        if (!check(token)){return null;}
        return userRepository.findAll();
    }

    /**
     * Ruta de la Api encargada en devolver todos los usuarios leidos
     *
     * @return Bolean
     *
     * @author Jose leonardo poveda <shiwirockztar@gmail.com.co>
     * @since 2.0.0
     */
    private boolean check(String token) {
        String usuarioId = jwtUtil.getKey(token);
        return usuarioId != null;
    }

    /**
     * Ruta de la Api encargada en modificar el usuario elegido
     *
     * @return Objeto Response en formato JSON
     *
     * @author Jose leonardo poveda <shiwirockztar@gmail.com.co>
     * @since 1.0.0
     */
    @PutMapping("/update")
    public Users update( @Validated @RequestBody  Users user) {
        return userRepository.save(user);
    }


    /**
     * Ruta de la Api encargada en eliminar el usuario elegido mediante la id
     *
     * @return Objeto Response en formato JSON
     *
     * @author Jose leonardo poveda <shiwirockztar@gmail.com.co>
     * @since 1.0.0
     */
    @DeleteMapping("/delete/{id}")
    public void delete(@RequestHeader (value = "Authorization") String token, @PathVariable String id) {
        if (!check(token)){return;}
        userRepository.deleteById(id);
    }

    // Complement actions
    /**
     * Ruta de la Api encargada de buscar usuarios con el mismo ID
     *
     * @return Lista de objeto Response en formato JSON
     *
     * @author Jose leonardo poveda <shiwirockztar@gmail.com.co>
     * @since 1.0.0
     */
    @GetMapping(value = "/findUser/{id}")
    public List<Users> findUserById(@PathVariable(value = "id") String id) {
        return userRepository.findUserById(id);
    }

    /**
     * Ruta de la Api encargada de validar los datos del login sean correctos
     * mediante el email y la clave
     *
     * @return Lista de objeto Response en formato JSON
     *
     * @author Jose leonardo poveda <shiwirockztar@gmail.com.co>
     * @since 2.0.0
     */
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public List<String> login(@RequestBody Users users) {
        List<String> stringArray = new ArrayList<String>();
        Users logged = getUserEmail(users);
        if (logged != null){
            String tokenJwt = jwtUtil.create(String.valueOf(logged.getId()), logged.getEmail() );
            stringArray.add(tokenJwt);
            stringArray.add(logged.getName());
            return stringArray;
        }
        return stringArray;
    }

    /**
     * Metodo que retorna el usuario si el email coincide con alguno real y luego verifica si el hash de la contraseña coincide
     *
     * @param users Objeto de usuario
     *
     * @author Jose leonardo poveda <shiwirockztar@gmail.com.co>
     * @since 2.0.0
     */
    public Users getUserEmail(Users users) {

        String email= users.getEmail();
        List<Users> lista = userRepository.findByEmail(email);

        // No existe un usuario
        if (lista.isEmpty()) {
            return null;
        }
        String passwordHashed = lista.get(0).getPassword();
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);

        // Existe un usuario con la misma clave hash
        if (argon2.verify(passwordHashed, users.getPassword())) {
            System.out.println(email);
            System.out.println(lista.get(0));
            return lista.get(0);
        }

        // Contraseña erronea
        return null;
    }
}
