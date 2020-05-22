package com.alterdata.crudclient.domain.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import com.alterdata.crudclient.domain.model.Address;

public class AddressValidator implements ConstraintValidator<AddressValid, Address> {

	@Override
	public void initialize(AddressValid constraintAnnotation) {
	}

	@Override
	public boolean isValid(Address value, ConstraintValidatorContext context) {
		
		if (value == null) {
			return true;
		}

		if (value.getStreet() == null || 
			value.getNeighborhood() == null || 
			value.getState() == null || 
			value.getNation() == null || 
			value.getZipcode() == null) {
			return true;
		}

		if (value.getStreet().length() < 3 || value.getStreet().length() > 60 ) {
			return false;
		}
		
		if (value.getNeighborhood().length() < 3 || value.getNeighborhood().length() > 60 ) {
			return false;
		}
		
		if (value.getState().length() < 3 || value.getState().length() > 60 ) {
			return false;
		}
		
		if (value.getNation().length() < 3 || value.getNation().length() > 60 ) {
			return false;
		}
		
		if (value.getZipcode().length() < 8 || value.getZipcode().length() > 10 ) {
			return false;
		}

		return true;
	}

}
