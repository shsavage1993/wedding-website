import React from 'react';
import { FC, useContext } from 'react';
import { CodeContext } from '../App';
import { RsvpTemplate } from '../components/RsvpTemplate';
import { RsvpForm } from '../components/RsvpForm';
import { useHistory } from 'react-router-dom';
import { MotionDiv } from '../components/MotionDiv';
import { ConditionalWrapper } from '../components/ConditionalWrapper';

// interface RsvpPageProps {
// 	scrollToForm: boolean;
// }

// export const RsvpPage: FC<RsvpPageProps> = ({ scrollToForm }) => {

export const RsvpPage: FC = () => {
	const code = useContext(CodeContext);
	const history: any = useHistory();
	let scrollToForm: boolean;

	try {
		const fromRsvpStatus =
			history.location.state.from === `/${code}/rsvp/success` ||
			history.location.state.from === `/${code}/rsvp/error`;
		scrollToForm = fromRsvpStatus ? true : false;
	} catch {
		scrollToForm = false;
	}

	return (
		// if not scrolling to form, add page transition
		<ConditionalWrapper
			condition={!scrollToForm}
			wrapper={(children) => <MotionDiv>{children}</MotionDiv>}
		>
			<RsvpTemplate scrollToCol2={scrollToForm}>
				<RsvpForm />
			</RsvpTemplate>
		</ConditionalWrapper>
	);
};
