import React from 'react';
import { FC, useContext } from 'react';
import { CodeContext, SgpContext } from '../App';
import { LoadPage } from '../components/LoadPage';
import { CityPageTemplate } from '../components/CityPageTemplate';
import { RsvpButton } from '../components/RsvpButton';
import Image from 'react-bootstrap/Image';
import latternImg from '../images/lattern-illustration.png';
import singaporeLogo from '../images/singapore-small.png';
import singaporeLogoColour from '../images/singapore-small-colour.png';
import { Redirect } from 'react-router';

export const SingaporePage: FC = () => {
	const code = useContext(CodeContext);
	const sgp = useContext(SgpContext);

	if (sgp) {
		const imageSources = [latternImg, singaporeLogo, singaporeLogoColour];

		const singaporePage = (
			<CityPageTemplate>
				<h1
					className="pt-2 xs-ballet-program lg-ballet-program msg-wrapper"
					style={{
						marginLeft: '-0.5rem',
					}}
				>
					Singapore
				</h1>

				<div className="py-3"></div>

				<h5 className="xs-h5 sm-h5">
					Date: 23 April 2022
					<br />
					Time: 18:30 - 24:00
					<br />
					Venue:{' '}
					<a
						href="https://www.google.com/maps/place/Orchard+Hotel+Singapore/@1.3075,103.8286111,15z/data=!4m8!3m7!1s0x0:0x2dd9483a55dcece2!5m2!4m1!1i2!8m2!3d1.3075!4d103.8286111"
						target="_blank" // open a link in a new tab
						rel="noopener noreferrer" // prevent a type of phishing known as tabnabbing
						// see https://www.freecodecamp.org/news/how-to-use-html-to-open-link-in-new-tab/ for explanation
					>
						Orchard Hotel Singapore
					</a>
					<br />
					Dresscode: Formal/Cocktail
				</h5>

				<div className="py-2"></div>

				<RsvpButton />

				<div className="py-3"></div>

				<div className="xs-city-logo-program sm-city-logo-program d-flex flex-column justify-content-center align-items-center">
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
				</div>
				<div className="pt-2 pb-3"></div>

				<h3>Schedule:</h3>
				<h5 className="xs-h5 sm-h5" style={{ marginBottom: 0 }}>
					18:30: Arrival of the Guests
					<br />
					19:00: Guests Seated
					<br />
					19:30: Banquet Service
					<br />
					20:45: Toasts
					<br />
					23:00: Banquet Ends
					<br />
					00:00: Carriages Home
				</h5>

				<div style={{ padding: '1.7rem' }}></div>

				<h5 className="xs-h5 sm-h5 semi-bold">
					Fun Customs & Traditions:
				</h5>
				<h6 className="xs-h6 sm-h6" style={{ marginBottom: '0.3rem' }}>
					<ul className="traditions-ul">
						<li>
							Red plays a vital role in Chinese weddings, as it is
							associated with success, loyalty, honor, fertility,
							and love. Decorations in the hall will usually
							involve 囍 the "double joy" character, reserved
							solely for matrimonial usage.
						</li>
						<li>
							Before a Chinese wedding celebration, the groom will
							go to the bride's house and must complete a series
							of challenges to win over the bridesmaids in order
							to see his bride.
						</li>
						<li>
							The tea ceremony is to honour parents. The couple
							kneels on tea pillows facing the parents and take
							turns serving tea to each set of parents.
						</li>
						<li>
							Visitors to the wedding will usually give a red
							envelope with money to the bride and groom. Make
							sure not to put anything in multiples of four, as
							four is an unlucky number in Chinese tradition.
						</li>
					</ul>
				</h6>

				{/* <div style={{ padding: '1.1rem' }}></div>

				<h5 className="xs-h5 sm-h5">
					<b>Covid guidance:</b>
				</h5>
				<h6 className="xs-h6 sm-h6">
					<b>
						The limit on wedding receptions at external venues is
						250 people, with group sizes of up to 5 attendees. All
						attendees must undergo Pre-Event Testing (PET) unless
						fully vaccinated or recovered from COVID-19, or a child
						aged 12 years or below.
					</b>
				</h6> */}
			</CityPageTemplate>
		);

		return <LoadPage imageSources={imageSources} page={singaporePage} />;
	} else {
		return <Redirect to={`/${code}`} />;
	}
};
