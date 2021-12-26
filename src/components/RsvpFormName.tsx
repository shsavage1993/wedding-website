import React from 'react';
import { FC } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../components/PhoneInput.css';
import { FormValues } from '../model/rsvpTypes';
import * as formik from 'formik';

interface RsvpFormNameProps {
	values: FormValues;
	errors: formik.FormikErrors<FormValues>;
	handleChange: (e: React.ChangeEvent<any>) => void;
}

export const RsvpFormName: FC<RsvpFormNameProps> = ({
	values,
	errors,
	handleChange,
}) => {
	return (
		<Row>
			<Form.Group
				className="mb-4"
				as={Col}
				md="6"
				controlId="formFirstName"
			>
				<Form.Label>
					<h5>First Name</h5>
				</Form.Label>
				<Form.Control
					type="text"
					placeholder="Jane"
					name="firstName"
					value={values.firstName}
					onChange={handleChange}
					isInvalid={!!errors.firstName}
				/>
				<Form.Control.Feedback type="invalid">
					{errors.firstName}
				</Form.Control.Feedback>
			</Form.Group>
			<Form.Group
				className="mb-4"
				as={Col}
				md="6"
				controlId="formLastName"
			>
				<Form.Label>
					<h5>Last Name</h5>
				</Form.Label>
				<Form.Control
					type="text"
					placeholder="Doe"
					name="lastName"
					value={values.lastName}
					onChange={handleChange}
					isInvalid={!!errors.lastName}
				/>
				<Form.Control.Feedback type="invalid">
					{errors.lastName}
				</Form.Control.Feedback>
			</Form.Group>
		</Row>
	);
};
