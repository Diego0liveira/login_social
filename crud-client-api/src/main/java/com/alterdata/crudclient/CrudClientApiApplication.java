package com.alterdata.crudclient;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.alterdata.crudclient.security.config.AppProperties;

@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class CrudClientApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(CrudClientApiApplication.class, args);
	}
}
