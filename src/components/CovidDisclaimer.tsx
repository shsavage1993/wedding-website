import React from 'react';
import { FC, useState } from 'react';
import Modal from 'react-bootstrap/Modal';

export const CovidDisclaimer: FC = () => {
	const [show, setShow] = useState(true);
	const handleClose = () => setShow(false);

	return (
		<Modal
			show={show}
			onHide={handleClose}
			backdrop="static"
			keyboard={false}
		>
			<Modal.Header closeButton>
				<Modal.Title>COVID-19 Disclaimer</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				Due to the ongoing coronavirus pandemic, we are obliged to place
				the safety of our guests as our utmost priority. We would like
				all guests to freely enjoy the celebrations without worry. As
				such, we ask that all guests follow governmental recommendations
				and guidelines for event attendance.
			</Modal.Body>
		</Modal>
	);
};
