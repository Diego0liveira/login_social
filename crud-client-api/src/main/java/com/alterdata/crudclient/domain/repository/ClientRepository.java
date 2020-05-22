package com.alterdata.crudclient.domain.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.alterdata.crudclient.domain.model.Client;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {

	List<Client> findByNameContaining(String name);

}
