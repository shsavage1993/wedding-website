import React from 'react';
import { FC } from 'react';
import { CityPageTemplate } from '../components/CityPageTemplate';
import { CodeProps } from '../model';

export const CopenhagenPage: FC<CodeProps> = ({ code, sgp, cph }) => {
	if (cph) {
		return (
			<CityPageTemplate>
				<h1>Denmark</h1>
				<h5>Date: 21 May 2022</h5>
				<h5>Time: 18 00 - 03 00</h5>
				<h5>Venue: Villa Copenhagen</h5>
				<h5>Dresscode: Black Tie</h5>

				<h3>Schedule:</h3>
				<h5>18 00: Arrival of the Guests</h5>
				<h5>18 30: Guests Seated</h5>
				<h5>19 00: Banquet Service</h5>
				<h5>20 30: Toasts</h5>
				<h5>21 30: Cake cutting</h5>
				<h5>23 00: Party</h5>
				<h5>03 00: Carriages Home</h5>

				<h5>
					Covid guidance:
					<br />
					The limit on indoor and outdoor gatherings is 500 people.
					Restaurants and cafes are open. For indoor dining, you will
					need to have a 'corona pass' (full vaccination, a negative
					test taken within 72 hours, or a positive test taken between
					14 days and 12 weeks ago). For outdoor dining, a 'corona
					pass' is not required.
				</h5>
			</CityPageTemplate>
		);
	} else {
		return null;
	}
};
