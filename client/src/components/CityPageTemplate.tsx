import React from 'react';
import { FC } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import latternImg from '../images/lattern-illustration.png';
import { MotionDiv } from './MotionDiv';

export const CityPageTemplate: FC = (props) => {
	return (
		<MotionDiv>
			<Container fluid className="h-100" style={{ marginTop: '76px' }}>
				<Row>
					<Col
						className="px-0 col-md-illustration col-lg-illustration "
						xs={12}
						lg={6}
						style={{
							height: 'calc(100vmax - 76px)',
							backgroundImage: `url(${latternImg})`,
							backgroundSize: 'cover',
							backgroundPosition: 'left top',
						}}
					></Col>
					<Col xs={12} lg={6} className="p-5" style={{}}>
						{props.children}
					</Col>
				</Row>
			</Container>
		</MotionDiv>
	);
};
