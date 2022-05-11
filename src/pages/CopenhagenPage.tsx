import React from 'react';
import { FC, useContext, useLayoutEffect, useRef } from 'react';
import { CodeContext, CphContext } from '../App';
import { LoadPage } from '../components/LoadPage';
import { CityPageTemplate } from '../components/CityPageTemplate';
import { RsvpButton } from '../components/RsvpButton';
import Image from 'react-bootstrap/Image';
import latternImg from '../images/lattern-illustration.png';
import copenhagenLogo from '../images/copenhagen-small-clipped.png';
import copenhagenLogoColour from '../images/copenhagen-small-clipped-colour.png';
import { Redirect } from 'react-router';
import ResizeObserver from 'resize-observer-polyfill';

export const CopenhagenPage: FC = () => {
	const code = useContext(CodeContext);
	const cph = useContext(CphContext);
	const accountsRef = useRef<HTMLDivElement>(null);

	const imageSources = [latternImg, copenhagenLogo, copenhagenLogoColour];

	useLayoutEffect(() => {
		const observer = new ResizeObserver((entries) => {
			// only do something if width changes
			const accountsDiv = accountsRef.current!;
			const dkkDiv = accountsDiv.firstElementChild! as HTMLElement;
			const gbpDiv = accountsDiv.lastElementChild! as HTMLElement;

			const accountsDivWidth = entries[0].contentRect.width;
			const dkkAccountWidth = dkkDiv.getBoundingClientRect().width;
			const gbpAccountWidth = gbpDiv.getBoundingClientRect().width;

			const accountsWidth =
				dkkAccountWidth +
				gbpAccountWidth +
				parseFloat(getComputedStyle(accountsDiv).columnGap);

			if (accountsDivWidth >= accountsWidth) {
				// accountsDiv.style.justifyContent = 'space-evenly';
				gbpDiv.style.width = 'auto';
				dkkDiv.style.textAlign = 'left';
				gbpDiv.style.textAlign = 'left';
			} else {
				// accountsDiv.style.justifyContent = 'flex-start';
				// gbpDiv.style.width = `${dkkAccountWidth}px`;
				dkkDiv.style.textAlign = 'center';
				gbpDiv.style.textAlign = 'center';
			}
		});
		if (accountsRef.current) {
			observer.observe(accountsRef.current);
		}
		return () => {
			observer.disconnect();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [accountsRef.current]);

	if (cph) {
		const copenhagenPage = (
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
					Venue:{' '}
					<a
						href="https://www.google.com/maps/place/Villa+Copenhagen/@55.6714149,12.5676969,15z/data=!4m8!3m7!1s0x0:0x93c823393bdc1527!5m2!4m1!1i2!8m2!3d55.6714149!4d12.5676969"
						target="_blank" // open a link in a new tab
						rel="noopener noreferrer" // prevent a type of phishing known as tabnabbing
						// see https://www.freecodecamp.org/news/how-to-use-html-to-open-link-in-new-tab/ for explanation
					>
						Villa Copenhagen
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
				<h5 className="xs-h5 sm-h5" style={{ marginBottom: 0 }}>
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
				<div style={{ padding: '1.7rem' }}></div>
				<h5 className="xs-h5 sm-h5 semi-bold">Toastmaster:</h5>
				<h6 className="xs-h6 sm-h6" style={{ marginBottom: 0 }}>
					We are pleased to have Jesper as our Toastmaster for the
					day. Should you wish to make a toast, please contact him at:
					<div style={{ padding: '0.75rem' }}></div>
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<div>
							<span className="semi-bold">Email: </span>
							<a
								href="mailto:jesstaervilladsen@gmail.com"
								target="_blank" // open a link in a new tab
								rel="noopener noreferrer" // prevent a type of phishing known as tabnabbing
								// see https://www.freecodecamp.org/news/how-to-use-html-to-open-link-in-new-tab/ for explanation
							>
								jesstaervilladsen@gmail.com
							</a>
							<br />
							<span className="semi-bold">Phone: </span>
							+45 30 49 19 84
						</div>
					</div>
				</h6>
				<div style={{ padding: '1.7rem' }}></div>
				<h5 className="xs-h5 sm-h5 semi-bold">Ønskeseddel:</h5>
				<h6 className="xs-h6 sm-h6" style={{ marginBottom: 0 }}>
					I stedet for en traditionel ønskeseddel, ønsker vi os penge,
					hvilket følger traditionen i Singapore. Det har også den
					praktiske vinkel at vi ubesværet kan få vores gaver med på
					flyrejsen hjem til London.
					<div style={{ padding: '1rem' }}></div>
					Unfortunately, as we are no longer resident in Denmark, we
					would like to follow the Singapore tradition of wedding
					gifts in the form of red packets (money). We hope this will
					help with the logistics and make things simpler for our
					guests and ourselves.
					<div style={{ padding: '1rem' }}></div>
					Please find bank details below:
					<div style={{ padding: '0.75rem' }}></div>
					<div
						ref={accountsRef}
						style={{
							display: 'flex',
							justifyContent: 'space-evenly',
							flexWrap: 'wrap',
							columnGap: '2rem',
							rowGap: '1.5rem',
						}}
					>
						<div style={{ whiteSpace: 'nowrap' }}>
							<span className="semi-bold">DKK</span>
							<br />
							Michelle Savage
							<br />
							Sort Code: 0164
							<br />
							Account No: 6288478889
						</div>
						<div style={{ whiteSpace: 'nowrap' }}>
							<span className="semi-bold">GBP</span>
							<br />
							Michelle Savage
							<br />
							Sort Code: 40-17-10
							<br />
							Account No: 12220563
						</div>
					</div>
				</h6>
				<div style={{ padding: '1.7rem' }}></div>
				<h5 className="xs-h5 sm-h5 semi-bold">Accommodation:</h5>
				<h6
					className="xs-h6 sm-h6"
					style={{
						marginBottom: '0.3rem',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					For guests requiring accommodation in Copenhagen, we provide
					the below recommendations:
					<div style={{ padding: '0.75rem' }}></div>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							textAlign: 'justify',
							width: '80%',
						}}
					>
						<div
							className="semi-bold"
							style={{
								textAlign: 'center',
								// width: '100%',
							}}
						>
							Villa Copenhagen
						</div>
						<div>
							Villa offers reduced rates on their{' '}
							<a
								href="https://villacopenhagen.com/rooms/"
								target="_blank" // open a link in a new tab
								rel="noopener noreferrer" // prevent a type of phishing known as tabnabbing
								// see https://www.freecodecamp.org/news/how-to-use-html-to-open-link-in-new-tab/ for explanation
							>
								rooms
							</a>{' '}
							in connection with our wedding:
							<div
								style={{
									display: 'flex',
									justifyContent: 'center',
									margin: '0.75rem 0px',
								}}
							>
								<table
									style={{
										border: '0px',
										width: '80%',
										maxWidth: '300px',
									}}
								>
									<tbody>
										<tr>
											<td>Standard dbl</td>
											<td className="td-right">1895</td>
										</tr>
										<tr>
											<td>Superior dbl</td>
											<td className="td-right">2095</td>
										</tr>
										<tr>
											<td>Deluxe dbl</td>
											<td className="td-right">3295</td>
										</tr>
										<tr>
											<td>Junior Suite dbl</td>
											<td className="td-right">4295</td>
										</tr>
									</tbody>
								</table>
							</div>
							If you would like to stay in the Hotel after the
							party, please contact{' '}
							<a
								href="mailto:elsa.weman@villacph.com"
								target="_blank" // open a link in a new tab
								rel="noopener noreferrer" // prevent a type of phishing known as tabnabbing
								// see https://www.freecodecamp.org/news/how-to-use-html-to-open-link-in-new-tab/ for explanation
							>
								elsa.weman@villacph.com
							</a>
							.
						</div>
						<div style={{ padding: '0.75rem' }}></div>
						{/* https://www.marriott.com/hotels/travel/cphox-moxy-copenhagen-sydhavnen/ */}
						<div
							className="semi-bold"
							style={{
								textAlign: 'center',
								// width: '100%',
							}}
						>
							Moxy Sydhavn
						</div>
						<div>
							If you would like to stay in this hotel, please{' '}
							<a
								href="https://www.marriott.com/en-us/hotels/cphox-moxy-copenhagen-sydhavnen/overview/"
								target="_blank" // open a link in a new tab
								rel="noopener noreferrer" // prevent a type of phishing known as tabnabbing
								// see https://www.freecodecamp.org/news/how-to-use-html-to-open-link-in-new-tab/ for explanation
							>
								book
							</a>{' '}
							with the hotel directly.
						</div>
					</div>
				</h6>
				{/* <div style={{ padding: '1.2rem' }}></div>

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
				</h6> */}
			</CityPageTemplate>
		);

		return <LoadPage imageSources={imageSources} page={copenhagenPage} />;
	} else {
		return <Redirect to={`/${code}`} />;
	}
};
