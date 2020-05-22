package com.alterdata.crudclient.domain.model.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alterdata.crudclient.domain.model.Address;
import com.alterdata.crudclient.domain.repository.AddressRepository;

@Service
public class AddressService {

	@Autowired
	private AddressRepository addressRepository;
	
	
	public Address save(Address address) {
		
		List<Address> addressExisted = addressRepository
			.findByAndStreetAndNeighborhoodAndStateAndNationAndZipcodeAndComplement(
				address.getStreet(), 
				address.getNeighborhood(), 
				address.getState(), 
				address.getNation(), 
				address.getZipcode(), 
				address.getComplement());
		
		if (addressExisted != null && !addressExisted.isEmpty()) {
			return addressExisted.get(0);
		}
		
		return addressRepository.saveAndFlush(address);
	}
	
	
	public void delete (Long idAddress) {
		addressRepository.deleteById(idAddress);
	}
}
