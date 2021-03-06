import React from 'react';
import { FC, useContext } from 'react';
import { SgpContext, CphContext } from '../App';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as formik from 'formik';
import { FormValues } from '../model/rsvpTypes';

interface RsvpFormAttendingProps {
	values: FormValues;
	errors: formik.FormikErrors<FormValues>;
	setFieldValue: (
		field: string,
		value: any,
		shouldValidate?: boolean | undefined
	) => void;
	handleChange: (e: React.ChangeEvent<any>) => void;
}

export const RsvpFormAttending: FC<RsvpFormAttendingProps> = ({
	values,
	errors,
	setFieldValue,
	handleChange,
}) => {
	const sgp = useContext(SgpContext);
	const cph = useContext(CphContext);

	if (sgp && cph) {
		return (
			<Row className="mb-4">
				<Form.Label>
					<h5>Attending</h5>
				</Form.Label>
				<Form.Group as={Col} controlId="formCountries">
					<Form.Check
						inline
						required
						id="checkbox-singapore"
						name="singapore"
						type="checkbox"
						label="Singapore"
						checked={values.singapore}
						onChange={handleChange}
						isInvalid={!!errors.singapore}
					/>
					<Form.Check
						inline
						required
						id="checkbox-copenhagen"
						name="copenhagen"
						type="checkbox"
						label="Copenhagen"
						checked={values.copenhagen}
						onChange={handleChange}
						isInvalid={!!errors.copenhagen}
					/>
					<Form.Text className="d-block text-muted">
						Please leave both unchecked if you are unable to attend
					</Form.Text>
				</Form.Group>
			</Row>
		);
	} else if (sgp || cph) {
		const city = sgp ? 'singapore' : 'copenhagen';

		return (
			<Row className="mb-4">
				<Form.Label>
					<h5>Attending</h5>
				</Form.Label>
				<Form.Group as={Col} controlId="formCountries">
					<Form.Check
						inline
						required
						id="checkbox-yes"
						name={city}
						checked={values[city]}
						type="checkbox"
						label="Yes"
						onChange={handleChange}
					/>
					<Form.Check
						inline
						required
						id="checkbox-no"
						name="{city}"
						checked={!values[city]}
						type="checkbox"
						label="No"
						onChange={(e) => setFieldValue(city, !e.target.checked)}
					/>
				</Form.Group>
			</Row>
		);
	} else {
		return null;
	}
};
