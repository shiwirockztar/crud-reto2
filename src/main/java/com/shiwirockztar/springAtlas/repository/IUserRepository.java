package com.shiwirockztar.springAtlas.repository;

import com.shiwirockztar.springAtlas.models.Users;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repositorio para la entidad Usuario
 *
 * @version 2.0.0 2022-10-17
 * @author Jose leonardo poveda <shiwirockztar@gmail.com.co>
 * @since 2.0.0
 */
@Repository
public interface IUserRepository extends MongoRepository<Users,String> {

    // Query seleccion

    @Query("{'email': ?0}")
    List<Users> findByEmail( String email);

    @Query("{'id': ?0}")
    List<Users> findUserById( String id);

    @Query("{'name': ?0}")
    List<Users> findByName( String name);


    // para no ver los campos nulos toca acceder al application.yml y cambiar
    // default-property-inclusion: non_default  => default-property-inclusion: non_null
    // en 0 los volvera nulos los campos - en 1 volvera nulos los demas campos no escojidos (los campos nulos no se veran)
    @Query(value = "{'email': ?0}", fields ="{'surName': 1, 'city': 1}")
    List<Users> selectByEmail( String email);

    // Busqueda por similares
    @Query("{'email':{'$regex' : '?0', '$options' : 'i'}}")
    List<Users> findEmail( String email);


    // Busqueda por rango
    @Query("{'state':{'$gt' : '?0', '$lt' : '?1'}}")
    List<Users> findBetwen( int minN, int maxn);

    // Interseccion
    @Query("{'name': ?0,'email': ?1}")
    List<Users> findByNameAndEmail( String name, String email);


}
