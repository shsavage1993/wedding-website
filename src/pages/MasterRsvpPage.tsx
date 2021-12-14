// import React from 'react';
import { FC, useContext } from 'react';
import { CodeContext, AuthContext } from '../App';
import { Redirect } from 'react-router';
import { MotionDiv } from '../components/MotionDiv';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import { RsvpTable } from '../components/RsvpTable';

export const MasterRsvpPage: FC = () => {
	const signedIn = useContext(AuthContext);
	const code = useContext(CodeContext);

	if (signedIn === true) {
		return (
			<MotionDiv>
				<Container
					fluid
					className="h-100"
					style={{ marginTop: '76px' }}
				>
					<Col className="p-5 h-100">
						<RsvpTable />
					</Col>
				</Container>
			</MotionDiv>
		);
	} else if (signedIn === false) {
		return <Redirect to={`/${code}`} />;
	} else {
		return null;
	}
};
