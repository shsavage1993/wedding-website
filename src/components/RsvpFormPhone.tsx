import React from 'react';
import { FC } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PhoneInput from 'react-phone-input-2';
import '../components/PhoneInput.css';
import { FormValues } from '../model/types';
import * as formik from 'formik';

interface RsvpFormPhoneProps {
	values: FormValues;
	errors: formik.FormikErrors<FormValues>;
	// handleChange: (fieldName: string) => (input: string) => void;
	handleChange: {
		(e: React.ChangeEvent<any>): void;
		<T = string | React.ChangeEvent<any>>(
			field: T
		): T extends React.ChangeEvent<any>
			? void
			: (e: string | React.ChangeEvent<any>) => void;
	};
}

export const RsvpFormPhone: FC<RsvpFormPhoneProps> = ({
	values,
	errors,
	handleChange,
}) => {
	return (
		<Row className="mb-4">
			<Form.Group as={Col} controlId="formPhone">
				<Form.Label>
					<h5>Phone Number (Optional)</h5>
				</Form.Label>
				<PhoneInput
					placeholder="Enter phone number"
					preferredCountries={['sg', 'dk', 'gb']}
					preserveOrder={['preferredCountries']}
					value={values.phone}
					onChange={(phone) => handleChange('phone')(phone)} // custom handleChange for phone input
					// Formik's handleChange accepts 2 types of arguments:
					// Field name [string]: in this case it returns a functions to which you can pass the change event or value directly
					// Change event: in this case it will get the name of the field to update from the change event itself
					// https://stackoverflow.com/questions/61222416/cannot-extract-phone-number-input-from-custom-made-field-using-formik
					isValid={!!errors.phone ? false : true}
				/>
				<div
					className="invalid-feedback"
					style={{
						display: errors.phone ? 'block' : 'none',
					}}
				>
					{errors.phone}
				</div>
			</Form.Group>
		</Row>
	);
};
