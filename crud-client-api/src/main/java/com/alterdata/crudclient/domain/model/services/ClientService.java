package com.alterdata.crudclient.domain.model.services;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alterdata.crudclient.domain.model.Address;
import com.alterdata.crudclient.domain.model.Client;
import com.alterdata.crudclient.domain.repository.ClientRepository;
import com.alterdata.crudclient.exception.BusinessException;

@Service
public class ClientService {

	@Autowired
	private ClientRepository clientRepository;
	
	@Autowired
	private AddressService addressService;
	
	
	public Client save(Client client) {
		
		if (client.getBirthday().isBefore(LocalDate.now())) {
			new BusinessException("Birthday cannot be later than the current date.");
		}
		
		if (client.getAddress() != null) {
			Address address = addressService.save(client.getAddress());
			client.setAddress(address);
		}
	
		return clientRepository.save(client);
	}
	

	public void delete(Long idClient) {
		clientRepository.deleteById(idClient);
	}
}
