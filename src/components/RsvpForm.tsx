import React from 'react';
import { FC, useContext } from 'react';
import { CodeContext } from '../App';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as formik from 'formik';
import yup from './yup-extended';
import { useHistory } from 'react-router';
import { RsvpFormName } from './RsvpFormName';
import { RsvpFormEmail } from './RsvpFormEmail';
import { RsvpFormPhone } from './RsvpFormPhone';
import { RsvpFormAttending } from './RsvpFormAttending';
import { RsvpFormDietraryReq } from './RsvpFormDietaryReq';
import { RsvpFormOther } from './RsvpFormOther';
import axios from 'axios';

interface formType {
	formValues: {
		firstName: string;
		lastName: string;
		email: string;
		phone: string;
		singapore: boolean;
		copenhagen: boolean;
		dietaryReq: string;
		other: string;
	};
}

const { Formik } = formik;

const schema = yup.object().shape({
	firstName: yup.string().required('Required'),
	lastName: yup.string().required('Required'),
	email: yup.string().email('Invalid email address').required('Required'),
	phone: yup.string().validatePhone('Invalid phone number'),
	singapore: yup.bool().required(),
	copenhagen: yup.bool().required(),
	dietaryReq: yup.string(),
	dietaryOther: yup.string(),
});

export const RsvpForm: FC = () => {
	const code = useContext(CodeContext);

	const history = useHistory<formType>();
	const initValues =
		history.location.state && history.location.state.formValues
			? history.location.state.formValues
			: {
					firstName: '',
					lastName: '',
					email: '',
					phone: '',
					singapore: false,
					copenhagen: false,
					dietaryReq: '',
					other: '',
			  };

	return (
		<Formik
			initialValues={initValues}
			validationSchema={schema}
			validateOnChange={false}
			validateOnBlur={false}
			// onSubmit={async (values, { setSubmitting }) => {
			// 	try {
			// 		if (values.phone) {
			// 			values.phone =
			// 				values.phone[0] !== '+'
			// 					? '+' + values.phone
			// 					: values.phone;
			// 		}
			// 		// throw new Error();
			// 		const res = await axios.post(
			// 			'http://localhost:3080/api/rsvp',
			// 			values
			// 		);
			// 		console.log(await res);
			// 		setSubmitting(false);
			// 		history.push(`/${code}/rsvp/success`);
			// 	} catch (err) {
			// 		setSubmitting(false);
			// 		history.push({
			// 			pathname: `/${code}/rsvp/error`,
			// 			state: { formValues: values },
			// 		});
			// 	}
			// }}
			onSubmit={(values, { setSubmitting }) => {
				setTimeout(() => {
					alert(JSON.stringify(values, null, 2));
					setSubmitting(false);
				}, 400);
			}}
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

					<RsvpFormName
						values={values}
						errors={errors}
						handleChange={handleChange}
					/>

					<RsvpFormEmail
						values={values}
						errors={errors}
						handleChange={handleChange}
					/>

					<RsvpFormPhone
						values={values}
						errors={errors}
						handleChange={handleChange}
					/>

					<RsvpFormAttending
						values={values}
						errors={errors}
						setFieldValue={setFieldValue}
						handleChange={handleChange}
					/>

					<RsvpFormDietraryReq
						values={values}
						handleChange={handleChange}
					/>

					<RsvpFormOther
						values={values}
						handleChange={handleChange}
					/>

					<Button className="mt-4" type="submit">
						Submit
					</Button>
				</Form>
			)}
		</Formik>
	);
};
