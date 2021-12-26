import React from 'react';
import { FC } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FormValues } from '../model/rsvpTypes';

interface RsvpFormDietaryReqProps {
	values: FormValues;
	handleChange: (e: React.ChangeEvent<any>) => void;
}

export const RsvpFormDietraryReq: FC<RsvpFormDietaryReqProps> = ({
	values,
	handleChange,
}) => {
	if (values.singapore || values.copenhagen) {
		return (
			<Row className="mb-4">
				<Form.Group as={Col} controlId="formDietaryReq">
					<Form.Label>
						<h5>Dietary Requirements</h5>
					</Form.Label>
					<Form.Control
						as="textarea"
						rows={3}
						name="dietaryReq"
						value={values.dietaryReq}
						placeholder={`Please state any dietary requirements you may have...
(Leave blank if none)`}
						onChange={handleChange}
					/>
				</Form.Group>
			</Row>
		);
	} else {
		return null;
	}
};
