package com.shiwirockztar.springAtlas.models;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

/**
 * Modelo de Usuarios
 *
 * @version 1.0.0 2022-10-02
 * @author Jose leonardo poveda <shiwirockztar@gmail.com.co>
 * @since 1.0.0
 */
public class Users {
    /**
     * Identificador del usuario
     */
    @Id
    @Getter @Setter
    private  String id;

    /**
     * Nombre del usuario
     */
    @Getter @Setter
    private String name;

    /**
     * Apellido del usuario
     */
    @Getter @Setter
    private String surName;

    /**
     * Tipo de documento del usuario
     */
    @Getter @Setter
    private String documentType;

    /**
     * Numero de documento del usuario
     */
    @Getter @Setter
    private String document;

    /**
     * Correo del usuario
     */
    @Getter @Setter
    private String email;

    /**
     * Direccion del usuario
     */
    @Getter @Setter
    private String address;

    /**
     * Ciudad del usuario
     */
    @Getter @Setter
    private String city;

    /**
     * Nivel del usuario
     */
    @Getter @Setter
    private String level;

    /**
     * Estado del usuario
     */
    @Getter @Setter
    private Number state;

    /**
     * Estado del usuario
     */
    @Getter @Setter
    private String password;
}
