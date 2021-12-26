import React from 'react';
import { FC } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FormValues } from '../model/rsvpTypes';

interface RsvpFormOtherProps {
	values: FormValues;
	handleChange: (e: React.ChangeEvent<any>) => void;
}
export const RsvpFormOther: FC<RsvpFormOtherProps> = ({
	values,
	handleChange,
}) => {
	return (
		<Row className="mb-2">
			<Form.Group as={Col} controlId="formOther">
				<Form.Label>
					<h5>Additional Information</h5>
				</Form.Label>
				<Form.Control
					as="textarea"
					rows={3}
					name="other"
					value={values.other}
					placeholder={`Please let us know if you have any other questions or requests...
(Leave blank if none)`}
					onChange={handleChange}
				/>
			</Form.Group>
		</Row>
	);
};
