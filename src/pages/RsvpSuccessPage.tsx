import React from 'react';
import { FC, useContext } from 'react';
import { CodeContext } from '../App';
import { RsvpTemplate } from '../components/RsvpTemplate';
import { LinkContainer } from 'react-router-bootstrap';
import Button from 'react-bootstrap/Button';

export const RsvpSuccessPage: FC = () => {
	const code = useContext(CodeContext);

	return (
		<RsvpTemplate scrollToCol2>
			<h1 className="mb-4">Success!</h1>
			<h6>
				You response has been successfully recorded.
				<br />
				We thank you and hope to see you soon!
			</h6>
			<LinkContainer
				exact
				to={{
					pathname: `/${code}/rsvp`,
					state: { from: window.location.pathname },
				}}
			>
				<Button className="mt-4" variant="dark">
					Back
				</Button>
			</LinkContainer>
		</RsvpTemplate>
	);
};
