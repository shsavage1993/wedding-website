import React from 'react';
import { FC, useContext } from 'react';
import { CphContext } from '../App';
import { CityPageTemplate } from '../components/CityPageTemplate';
import Image from 'react-bootstrap/Image';
import copenhagenLogo from '../images/copenhagen-small-clipped.png';
import copenhagenLogoColour from '../images/copenhagen-small-clipped-colour.png';

export const CopenhagenPage: FC = () => {
	const cph = useContext(CphContext);

	if (cph) {
		return (
			<CityPageTemplate>
				<h1
					className="pt-2 xs-ballet-program lg-ballet-program msg-wrapper"
					style={{
						marginLeft: '-0.5rem',
					}}
				>
					Copenhagen
				</h1>

				<div className="py-3"></div>

				<h5 className="xs-h5 sm-h5">
					Date: 21 May 2022
					<br />
					Time: 18:00 - 03:00
					<br />
					Venue: Villa Copenhagen
					<br />
					Dresscode: Black Tie
				</h5>

				<div className="py-1"></div>

				<div className="xs-city-logo-program sm-city-logo-program d-flex flex-column justify-content-center align-items-center">
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
				</div>
				<div className="pt-2 pb-3"></div>

				<h3>Schedule:</h3>
				<h5 className="xs-h5 sm-h5">
					18:00: Arrival of the Guests
					<br />
					18:30: Guests Seated
					<br />
					19:00: Banquet Service
					<br />
					20:30: Toasts
					<br />
					21:30: Cake cutting
					<br />
					23:00: Party
					<br />
					03:00: Carriages Home
				</h5>

				<div style={{ padding: '1.2rem' }}></div>

				<h5 className="xs-h5 sm-h5">
					<b>Covid guidance:</b>
				</h5>
				<h6 className="xs-h6 sm-h6">
					<b>
						The limit on indoor and outdoor gatherings is 500
						people. Restaurants and cafes are open. For indoor
						dining, you will need to have a 'corona pass' (full
						vaccination, a negative test taken within 72 hours, or a
						positive test taken between 14 days and 12 weeks ago).
						For outdoor dining, a 'corona pass' is not required.
					</b>
				</h6>
			</CityPageTemplate>
		);
	} else {
		return null;
	}
};
