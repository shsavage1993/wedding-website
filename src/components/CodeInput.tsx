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
	const codes = ['master', 'YS25q', '0eBAB', 'Moy0a']; // ['master', 'sgp', 'cph', 'all']

	const buttonType = !error ? 'dark' : 'danger';
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
				<Row className="py-2 px-0 justify-content-center align-items-start">
					<Col xs="auto">
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
