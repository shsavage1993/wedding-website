import React from 'react';
import { FC } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as formik from 'formik';
import { FormValues } from '../model/types';

interface RsvpFormEmailProps {
	values: FormValues;
	errors: formik.FormikErrors<FormValues>;
	handleChange: (e: React.ChangeEvent<any>) => void;
}

export const RsvpFormEmail: FC<RsvpFormEmailProps> = ({
	values,
	errors,
	handleChange,
}) => {
	return (
		<Row className="mb-4">
			<Form.Group as={Col} controlId="formEmail">
				<Form.Label>
					<h5>Email</h5>
				</Form.Label>
				<Form.Control
					type="email"
					placeholder="jane.doe@gmail.com"
					name="email"
					value={values.email}
					onChange={handleChange}
					isInvalid={!!errors.email}
				/>
				<Form.Control.Feedback type="invalid">
					{errors.email}
				</Form.Control.Feedback>
			</Form.Group>
		</Row>
	);
};
