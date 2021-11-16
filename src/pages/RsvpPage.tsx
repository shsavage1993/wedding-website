import React from 'react';
import { FC, useContext } from 'react';
import { CodeContext } from '../App';
import { LoadPage } from '../components/LoadPage';
import { RsvpTemplate } from '../components/RsvpTemplate';
import { RsvpForm } from '../components/RsvpForm';
import { useHistory } from 'react-router-dom';
import { MotionDiv } from '../components/MotionDiv';
import { ConditionalWrapper } from '../components/ConditionalWrapper';
import teaImg from '../images/tea-illustration.png';

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

	const imageSources = [teaImg];

	const rsvpPage = (
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

	return <LoadPage imageSources={imageSources} page={rsvpPage} />;
};
