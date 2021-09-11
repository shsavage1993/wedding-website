import React from 'react';
import { FC } from 'react';
import { RsvpTemplate } from '../components/RsvpTemplate';
import { LinkContainer } from 'react-router-bootstrap';
import Button from 'react-bootstrap/Button';
import { CodeProps } from '../model';

export const RsvpErrorPage: FC<CodeProps> = ({ code, sgp, cph }) => {
	return (
		<RsvpTemplate scrollToCol2>
			<h1 className="mb-4">Error!</h1>
			<h6>
				Unfortunately, something has happened and your response has not
				been recorded.
				<br />
				Please try again or contact us directly.
			</h6>
			<LinkContainer
				exact
				to={{
					pathname: `/${code}/rsvp`,
					state: { from: window.location.pathname },
				}}
			>
				<Button className="mt-4">Back</Button>
			</LinkContainer>
		</RsvpTemplate>
	);
};
