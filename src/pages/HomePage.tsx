import React from 'react';
import { FC, useContext } from 'react';
import { SgpContext, CphContext } from '../App';
import { LoadPage } from '../components/LoadPage';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { CityLogoLinks } from '../components/CityLogoLinks';
import { CodeInput } from '../components/CodeInput';
import { MotionDiv } from '../components/MotionDiv';
import welcomeImg from '../images/welcome-illustration.png';
import logo from '../images/logo-seal-red.png';
import singaporeLogo from '../images/singapore-small.png';
import singaporeLogoColour from '../images/singapore-small-colour.png';
import copenhagenLogo from '../images/copenhagen-small-clipped.png';
import copenhagenLogoColour from '../images/copenhagen-small-clipped-colour.png';
import { CovidDisclaimer } from '../components/CovidDisclaimer';

export const HomePage: FC = () => {
	const sgp = useContext(SgpContext);
	const cph = useContext(CphContext);

	let component;

	if (sgp || cph) {
		component = (
			<>
				<CovidDisclaimer />
				<CityLogoLinks />
			</>
		);
	} else {
		component = <CodeInput />;
	}

	const imageSources = [
		welcomeImg,
		logo,
		singaporeLogo,
		copenhagenLogo,
		singaporeLogoColour,
		copenhagenLogoColour,
	];

	const homePage = (
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
						className="d-flex flex-column justify-content-around align-items-center"
						style={{ minHeight: 'calc(100vh - 76px)' }}
					>
						<div className="spacing"></div>
						<h1
							className="pt-3 xs-ballet lg-ballet msg-wrapper"
							style={{
								marginLeft: '-0.5rem',
								paddingBottom: '3%',
							}}
						>
							Please join us at <br /> our wedding!
						</h1>
						<Image
							className="xs-logo-seal lg-logo-seal"
							src={logo}
							style={{ paddingBottom: '3%' }}
						/>
						{component}
						<div className="spacing"></div>
					</Col>
				</Row>
			</Container>
		</MotionDiv>
	);

	return <LoadPage imageSources={imageSources} page={homePage} />;
};
