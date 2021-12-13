import React from 'react';
import { FC, useContext } from 'react';
import { LoadPage } from '../components/LoadPage';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MotionDiv } from '../components/MotionDiv';
import welcomeImg from '../images/welcome-illustration.png';
import logo from '../images/logo-seal-red.png';
import { MasterSignIn } from '../components/MasterSignIn';
import { MasterWelcome } from '../components/MasterWelcome';
import { AuthContext } from '../App';

export const MasterPage: FC = () => {
	const signedIn = useContext(AuthContext);

	let component = null;

	if (signedIn === false) {
		component = <MasterSignIn />;
	} else if (signedIn === true) {
		component = <MasterWelcome />;
	}

	const imageSources = [welcomeImg, logo];

	const masterPage = (
		<MotionDiv>
			<Container fluid className="h-100" style={{ marginTop: '76px' }}>
				<Row>
					<Col
						className="px-0 col-md-illustration col-lg-illustration"
						xs={12}
						lg={6}
						style={{
							height: 'calc(100vmax - 76px)',
							backgroundImage: `url(${welcomeImg})`,
							backgroundColor: '#FFE3DE',
							backgroundSize: 'contain',
							backgroundRepeat: 'no-repeat',
							backgroundPosition: 'center center',
						}}
					></Col>
					<Col
						xs={12}
						lg={6}
						className="mx-0 d-flex flex-column justify-content-around align-items-center"
						style={{ minHeight: 'calc(100vh - 76px)' }}
					>
						<div className="spacing"></div>
						{component}
						<div className="spacing"></div>
					</Col>
				</Row>
			</Container>
		</MotionDiv>
	);

	return <LoadPage imageSources={imageSources} page={masterPage} />;
};
