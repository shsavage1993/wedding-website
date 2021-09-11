import React from 'react';
import { FC } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PhoneInput from 'react-phone-input-2';
import '../components/PhoneInput.css';
import * as formik from 'formik';
import yup from './yup-extended';
import { useHistory } from 'react-router';
import { CodeProps } from '../model';
import { RsvpFormAttending } from './RsvpFormAttending';

const { Formik } = formik;

const schema = yup.object().shape({
	firstName: yup.string().required('Required'),
	lastName: yup.string().required('Required'),
	email: yup.string().email('Invalid email address').required('Required'),
	phone: yup.string().validatePhone('Invalid phone number'),
	// singapore: yup.bool().required('Required').oneOf([true], 'Required'),
	singapore: yup.bool().required(),
	copenhagen: yup.bool().required(),
	toast: yup.bool().required(),
	dietaryReq: yup.string(),
	dietaryOther: yup.string(),
});

export const RsvpForm: FC<CodeProps> = ({ code, sgp, cph }) => {
	const history = useHistory();

	return (
		<Formik
			initialValues={{
				firstName: '',
				lastName: '',
				email: '',
				phone: '',
				singapore: false,
				copenhagen: false,
				toast: false,
				dietaryReq: '',
				other: '',
			}}
			validationSchema={schema}
			validateOnChange={false}
			validateOnBlur={false}
			// onSubmit={async (values, { setSubmitting }) => {
			// 	await new Promise((r) => setTimeout(r, 500));
			// 	console.log('submitted');
			// 	setSubmitting(false);
			// }}
			onSubmit={() => {
				history.push(`/${code}/rsvp/success`);
			}}
			// onSubmit={(values, { setSubmitting }) => {
			// 	setTimeout(() => {
			// 		alert(JSON.stringify(values, null, 2));
			// 		setSubmitting(false);
			// 	}, 400);
			// }}
		>
			{({
				handleSubmit,
				handleChange,
				// handleBlur,
				setFieldValue,
				values,
				// touched,
				// isValid,
				errors,
			}) => (
				<Form noValidate onSubmit={handleSubmit}>
					<h1 className="mb-4">RSVP</h1>
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
								onChange={(phone) =>
									handleChange('phone')(phone)
								}
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

					<RsvpFormAttending
						sgp={sgp}
						cph={cph}
						values={values}
						errors={errors}
						setFieldValue={setFieldValue}
						handleChange={handleChange}
					/>

					{(values.singapore || values.copenhagen) && (
						<Row className="mb-4">
							<Form.Label>
								<h5>Toast</h5>
							</Form.Label>
							<Form.Group as={Col} controlId="formToast">
								<Form.Check
									inline
									required
									id="checkbox-toast"
									name="toast"
									type="checkbox"
									label="I would like to give a toast"
									onChange={handleChange}
									isInvalid={!!errors.toast}
								/>
							</Form.Group>
						</Row>
					)}

					{(values.singapore || values.copenhagen) && (
						<Row className="mb-4">
							<Form.Group as={Col} controlId="formDietaryReq">
								<Form.Label>
									<h5>Dietary Requirements</h5>
								</Form.Label>
								<Form.Control
									as="textarea"
									rows={3}
									name="dietaryReq"
									placeholder={`Please state any dietary requirements you may have...
(Leave blank if none)`}
									onChange={handleChange}
								/>
							</Form.Group>
						</Row>
					)}

					<Row className="mb-2">
						<Form.Group as={Col} controlId="formOther">
							<Form.Label>
								<h5>Anything Else</h5>
							</Form.Label>
							<Form.Control
								as="textarea"
								rows={3}
								name="other"
								placeholder={`Please let us know if you have any other questions or requests...
(Leave blank if none)`}
								onChange={handleChange}
							/>
						</Form.Group>
					</Row>

					<Button className="mt-4" type="submit">
						Submit
					</Button>
				</Form>
			)}
		</Formik>
	);
};
