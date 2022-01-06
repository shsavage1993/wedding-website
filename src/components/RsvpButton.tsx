import React from 'react';
import { FC, useContext } from 'react';
import { CodeContext } from '../App';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router';

export const RsvpButton: FC = () => {
	const code = useContext(CodeContext);
	const history = useHistory();

	const handleClick = () => {
		history.push(`/${code}/rsvp`);
	};

	return (
		<Button
			className="xs-rsvp-button sm-rsvp-button"
			variant="outlined"
			disableElevation
			onClick={handleClick}
		>
			RSVP
		</Button>
	);
};
