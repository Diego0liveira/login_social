package com.alterdata.crudclient.domain.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.alterdata.crudclient.domain.model.Address;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {

	public List<Address> findByAndStreetAndNeighborhoodAndStateAndNationAndZipcodeAndComplement(
			String street, 
			String neighborhood, 
			String state, 
			String nation, 
			String zipcode, 
			String complement);
}
