// import React from 'react';
import { FC } from 'react';
import { MotionDiv } from '../components/MotionDiv';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import { RsvpTable } from '../components/RsvpTable';

export const MasterRsvpPage: FC = () => {
	return (
		<MotionDiv>
			<Container fluid className="h-100" style={{ marginTop: '76px' }}>
				<Col className="p-5 h-100">
					<RsvpTable />
				</Col>
			</Container>
		</MotionDiv>
	);
};
