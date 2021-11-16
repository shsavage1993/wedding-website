import React from 'react';
import { FC, useState, useContext } from 'react';
import { CodeContext } from '../App';
import { useHistory } from 'react-router';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as formik from 'formik';
import * as yup from 'yup';
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import logo from '../images/logo-seal-red.png';
import Image from 'react-bootstrap/Image';

const { Formik } = formik;

const schema = yup.object().shape({
	// email: yup.string().email('Invalid email address').required('Required'),
	// password: yup.string().required(),
	email: yup.string(),
	password: yup.string(),
});

export const MasterSignIn: FC = () => {
	const [error, setError] = useState('');

	const code = useContext(CodeContext);
	const history = useHistory();

	return (
		<Formik
			initialValues={{
				email: '',
				password: '',
			}}
			validationSchema={schema}
			validateOnChange={false}
			validateOnBlur={false}
			onSubmit={async (values, { setSubmitting }) => {
				signInWithEmailAndPassword(auth, values.email, values.password)
					.then((userCredential) => {
						// Signed in
						history.push(`/${code}/welcome`);
					})
					.catch((error) => {
						const errorCode = error.code;
						setError(`Error: ${errorCode}!`);
					});
				setSubmitting(false);
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
				<Form
					className="text-center"
					noValidate
					onSubmit={handleSubmit}
				>
					<Image
						className="xs-master-seal sm-master-seal mb-5"
						src={logo}
					/>

					<Form.Group
						className="mt-3 mb-2 xs-master-login-input sm-master-login-input text-start"
						controlId="formEmail"
					>
						<Form.Control
							type="email"
							placeholder="Email"
							name="email"
							value={values.email}
							onChange={handleChange}
							isInvalid={!!errors.email}
						/>
						<Form.Control.Feedback type="invalid">
							{errors.email}
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group
						className="mb-1 xs-master-login-input sm-master-login-input text-start"
						controlId="formPassword"
					>
						<Form.Control
							type="password"
							placeholder="Password"
							name="password"
							value={values.password}
							onChange={handleChange}
							isInvalid={!!errors.password}
						/>
						<Form.Control.Feedback type="invalid">
							{errors.password}
						</Form.Control.Feedback>
					</Form.Group>

					<div
						className="invalid-feedback mt-2 text-start"
						style={{ display: 'block', padding: '0 0.15rem' }}
					>
						{error}
					</div>

					<Button className="w-100 mt-4" type="submit" variant="dark">
						Login
					</Button>
				</Form>
			)}
		</Formik>
	);
};
