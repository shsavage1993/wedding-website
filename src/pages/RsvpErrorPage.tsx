import React from 'react';
import { FC, useContext } from 'react';
import { CodeContext } from '../App';
import { RsvpTemplate } from '../components/RsvpTemplate';
import { LinkContainer } from 'react-router-bootstrap';
import Button from 'react-bootstrap/Button';
import { useLocation } from 'react-router';

interface stateType {
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

export const RsvpErrorPage: FC = () => {
	const code = useContext(CodeContext);

	const location = useLocation<stateType>();
	const fromPath = { from: window.location.pathname };

	const locState = location.state
		? {
				...location.state,
				...fromPath,
		  }
		: fromPath;

	const rsvpTo = {
		pathname: `/${code}/rsvp`,
		state: locState,
	};

	return (
		<RsvpTemplate scrollToCol2>
			<h1 className="mb-4">Error!</h1>
			<h6>
				Unfortunately, something has happened and your response has not
				been recorded.
				<br />
				Please try again or contact us directly.
			</h6>
			<LinkContainer exact to={rsvpTo}>
				<Button className="mt-4">Back</Button>
			</LinkContainer>
		</RsvpTemplate>
	);
};
