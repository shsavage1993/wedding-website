// import React from 'react';
import { FC } from 'react';
// import { useGalleryListen } from '../components/useGalleryListen';
// import { useRsvpListen } from './useRsvpListen';
import Image from 'react-bootstrap/Image';
import logo from '../images/logo-seal-red.png';

export const MasterWelcome: FC = () => {
	// const imageList = useGalleryListen();

	// const rsvpList = useRsvpListen();

	// const singaporeGuests = null;

	// const copenhagenGuests = null;

	return (
		<div className="d-flex flex-column align-items-center">
			<h1
				className="pt-3 xs-ballet lg-ballet  msg-wrapper"
				style={{
					// marginLeft: '-0.5rem',
					paddingBottom: '3%',
					lineHeight: '130%',
				}}
			>
				Welcome
				<br />
				Master
			</h1>
			<Image
				className="xs-logo-seal lg-logo-seal"
				src={logo}
				style={{ paddingBottom: '3%' }}
			/>
		</div>
	);
};
