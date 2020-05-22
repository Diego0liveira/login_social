package com.alterdata.crudclient.api.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.alterdata.crudclient.domain.model.Client;
import com.alterdata.crudclient.domain.model.services.ClientService;
import com.alterdata.crudclient.domain.repository.ClientRepository;

@RestController
@RequestMapping("/clients")
public class ClientController {
	
	@Autowired
	private ClientRepository clientRepositiry;
	
	@Autowired
	private ClientService clientService;
	

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Client create(@Valid @RequestBody Client client) {
		return clientService.save(client);
	}
	
           
	@PutMapping("/{clientId}")
	public ResponseEntity<Client> update(@Valid @PathVariable Long clientId, @RequestBody Client client) {
		
		if (!clientRepositiry.existsById(clientId)) {
			return ResponseEntity.notFound().build();
		}
		
		client.setId(clientId);
		client = clientService.save(client);
		
		return ResponseEntity.ok(client);
	}


	@GetMapping("/search")
	public List<Client> search() {
		return clientRepositiry.findAll();
	}
	
	
	@PostMapping("/search")
	public List<Client> searchFilters(@RequestBody Client client) {
		return clientRepositiry.findByNameContaining(client.getName());
	}
	

	@GetMapping("/{clientId}")
	public ResponseEntity<Client> get(@PathVariable Long clientId) {
		Optional<Client> client = clientRepositiry.findById(clientId);
		
		if (client.isPresent()) {
			return ResponseEntity.ok(client.get());
		}
		
		return ResponseEntity.notFound().build();
	}
	

	@DeleteMapping("/{clientId}")
	public ResponseEntity<Void> delete(@PathVariable Long clientId) {
		
		if (!clientRepositiry.existsById(clientId)) {
			return ResponseEntity.notFound().build();
		}
		
		clientService.delete(clientId);
		return ResponseEntity.noContent().build();
	}
	
}
