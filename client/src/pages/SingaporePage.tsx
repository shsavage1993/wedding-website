import React from 'react';
import { FC } from 'react';
import { CityPageTemplate } from '../components/CityPageTemplate';
import { CodeProps } from '../model';

export const SingaporePage: FC<CodeProps> = ({ code, sgp, cph }) => {
	if (sgp) {
		return (
			<CityPageTemplate>
				<h1>Singapore</h1>
				<h5>Date: 23 April 2022</h5>
				<h5>Time: 18 30 - 24 00</h5>
				<h5>Venue: Orchard Hotel Singapore</h5>
				<h5>Dresscode: Cocktail</h5>

				<h3>Schedule:</h3>
				<h5>18 30: Arrival of the Guests</h5>
				<h5>19 00: Guests Seated</h5>
				<h5>19 30: Banquet Service</h5>
				<h5>20 45: Toasts</h5>
				<h5>23 00: Banquet Ends</h5>
				<h5>00 00: Carriages Home</h5>

				<h5>
					{' '}
					Fun Customs & Traditions:
					<ul>
						<li>
							Red plays a vital role in Chinese weddings, because
							this color is associated with success, loyalty,
							honor, fertility, and love, amongst others. Because
							of this, decorations at Chinese weddings are
							generally in red, and so is the bride's dress.{' '}
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
					</ul>{' '}
				</h5>

				<h5>
					Covid guidance:
					<br />
					Wedding reception All vaccinated^ : 250 attendees Group size
					limited to 5 persons^^. 1 reception only.
				</h5>
			</CityPageTemplate>
		);
	} else {
		return null;
	}
};
