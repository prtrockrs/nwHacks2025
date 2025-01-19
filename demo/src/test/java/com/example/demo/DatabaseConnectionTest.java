package com.example.demo;

import static org.assertj.core.api.Assertions.assertThat;

import java.sql.Connection;
import java.sql.DriverManager;
import org.junit.jupiter.api.Test;

class DatabaseConnectionTest {

    @Test
    void testDatabaseConnection() {
        String url = "jdbc:mysql://localhost:3001/garden_base";
        String username ="root";
        String password ="";

        try(Connection connection = DriverManager.getConnection(url, username, password)) {
            assertThat(connection).isNotNull();
            System.out.println("Success!!!!!");
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Fail :()");
        }
    }
}