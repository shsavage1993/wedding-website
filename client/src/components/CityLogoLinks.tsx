import React from 'react';
import { FC } from 'react';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import singaporeLogo from '../images/singapore-small.png';
import singaporeLogoColour from '../images/singapore-small-colour.png';
import copenhagenLogo from '../images/copenhagen-small-clipped.png';
import copenhagenLogoColour from '../images/copenhagen-small-clipped-colour.png';
import { LinkContainer } from 'react-router-bootstrap';
import { Countdown } from './Countdown';
import { CodeProps } from '../model';

export const CityLogoLinks: FC<CodeProps> = ({ code, sgp, cph }) => {
	let sgpLink = null;
	let cphLink = null;

	if (sgp) {
		sgpLink = (
			<LinkContainer
				exact
				to={`/${code}/singapore`}
				style={{ margin: '0px 3%' }}
			>
				<div className="xs-city-logo lg-city-logo d-flex flex-column  justify-content-center align-items-center">
					<div
						className="city-logo-div"
						style={{
							paddingBottom: 'calc(100% / 500 * 240)',
						}}
					>
						<Image
							className="city-logo"
							src={singaporeLogoColour}
							width="100%"
						/>
						<Image
							className="city-logo city-logo-top"
							src={singaporeLogo}
							width="100%"
						/>
					</div>
					<h6 className="m-0">Singapore</h6>
					<Countdown date="04/23/2022" />
				</div>
			</LinkContainer>
		);
	}
	if (cph) {
		cphLink = (
			<LinkContainer
				exact
				to={`/${code}/copenhagen`}
				style={{ margin: '0px 3%' }}
			>
				<div className="xs-city-logo lg-city-logo d-flex flex-column justify-content-end align-items-center">
					<div
						className="city-logo-div"
						style={{
							paddingBottom: 'calc(100% / 500 * 200)',
						}}
					>
						<Image
							className="city-logo"
							src={copenhagenLogoColour}
							width="100%"
						/>
						<Image
							className="city-logo city-logo-top"
							src={copenhagenLogo}
							width="100%"
						/>
					</div>
					<h6 className="m-0">Copenhagen</h6>
					<Countdown date="05/21/2022" />
				</div>
			</LinkContainer>
		);
	}

	return (
		<Nav
			className={`w-${
				(+sgp + +cph) * 50
			} d-flex justify-content-center align-items-stretch`}
		>
			{sgpLink}
			{cphLink}
		</Nav>
	);
};
