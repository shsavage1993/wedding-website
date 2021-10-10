import React from 'react';
import { FC, useContext } from 'react';
import { SgpContext } from '../App';
import { CityPageTemplate } from '../components/CityPageTemplate';
import Image from 'react-bootstrap/Image';
import singaporeLogo from '../images/singapore-small.png';
import singaporeLogoColour from '../images/singapore-small-colour.png';

export const SingaporePage: FC = () => {
	const sgp = useContext(SgpContext);

	if (sgp) {
		return (
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
					Venue: Orchard Hotel Singapore
					<br />
					Dresscode: Cocktail
				</h5>

				<div className="py-2"></div>

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
				<h5 className="xs-h5 sm-h5">
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

				<div style={{ padding: '1.2rem' }}></div>

				<h5 className="xs-h5 sm-h5">Fun Customs & Traditions:</h5>
				<h6 className="xs-h6 sm-h6">
					<ul className="traditions-ul">
						<li>
							Red plays a vital role in Chinese weddings, because
							this color is associated with success, loyalty,
							honor, fertility, and love, amongst others. Because
							of this, decorations at Chinese weddings are
							generally in red, and so is the bride's dress.
						</li>
						<li>
							Before a Chinese wedding celebration, the groom will
							often go to the bride's house to collect her.
							However, the bride will be surrounded by a few of
							her girlfriends, who will tease the groom before
							handing over the bride. The girls will have to be
							bribed or convinced by the groom with pretends or
							envelopes with money before they will hand over
							their friend, the bride. Then, the bride and groom
							will bow to the bride's parents before taking her to
							the groom's house.
						</li>
						<li>
							The tea ceremony is to honor parents and always
							begins with prayer. Popular tea varieties used
							include: orange blossom, black dragon, green tea.
							The couple kneels on tea pillows facing the parents
							and take turns serving tea to each set of parents.
						</li>
						<li>
							Decorations in the hall will usually involve 囍 the
							"double joy" character, reserved solely for
							matrimonial usage. Colors are red and gold mostly,
							and banners with wishes in various different
							phrases, will also be hung on the doors and windows
							of the venue in order to wish the new couple well.
						</li>
						<li>
							As visitors to the wedding, you usually will give a
							red envelope to the bride and groom, with money
							inside it. Make sure you do not put anything in
							multiples of four, as four is an unlucky number in
							China.
						</li>
					</ul>
				</h6>

				<div style={{ padding: '1.1rem' }}></div>

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
				</h6>
			</CityPageTemplate>
		);
	} else {
		return null;
	}
};
