import React, { useRef, useState } from 'react';
import { FC } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export const CodeInput: FC = () => {
	const inputElement = useRef<HTMLInputElement>(null);
	const [input, setInput] = useState('');
	const [error, setError] = useState(false);
	const codes = ['sgp', 'cph', 'all'];

	const buttonType = !error ? 'primary' : 'danger';
	const buttonText = !error ? 'Enter' : 'Invalid Code';

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (codes.includes(input)) {
			window.location.pathname = `/${input}`;
		} else {
			setError(true);
			if (inputElement && inputElement.current) {
				setInput('');
				inputElement.current.focus();
			}
		}
	};
	return (
		<Form className="py-4 d-inline" noValidate onSubmit={handleSubmit}>
			<Row className="justify-content-center align-items-start">
				{/* <Col
					xs="auto"
					style={{
						position: 'relative',
						height: 'calc(48px + 1em)',
					}}
					// className="my-1"
				> */}
				<Form.Control
					ref={inputElement}
					type="text"
					value={input}
					onChange={(e) => {
						setInput(e.target.value);
						setError(false);
					}}
					isInvalid={error}
					placeholder="Enter Code"
					style={{
						minWidth: '160px',
						width: '70vw',
						maxWidth: '225px',
					}}
				/>
				<Row className="pt-2 px-0 justify-content-center align-items-start">
					<Col
						xs="auto"
						// className="my-1"
					>
						<Button
							variant={buttonType}
							type="submit"
							disabled={error}
						>
							{buttonText}
						</Button>
					</Col>
				</Row>
			</Row>
		</Form>
	);
};
