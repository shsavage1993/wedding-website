import React from 'react';
import { FC } from 'react';
import { RsvpTemplate } from '../components/RsvpTemplate';
import { RsvpForm } from '../components/RsvpForm';
import { useHistory } from 'react-router-dom';
import { CodeProps } from '../model';
import { MotionDiv } from '../components/MotionDiv';
import { ConditionalWrapper } from '../components/ConditionalWrapper';

// interface RsvpPageProps {
// 	scrollToForm: boolean;
// }

// export const RsvpPage: FC<RsvpPageProps> = ({ scrollToForm }) => {

export const RsvpPage: FC<CodeProps> = ({ code, sgp, cph }) => {
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
		<ConditionalWrapper
			condition={!scrollToForm}
			wrapper={(children) => <MotionDiv>{children}</MotionDiv>}
		>
			<RsvpTemplate scrollToCol2={scrollToForm}>
				<RsvpForm code={code} sgp={sgp} cph={cph} />
			</RsvpTemplate>
		</ConditionalWrapper>
	);
};
