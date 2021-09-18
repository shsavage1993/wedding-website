import React from 'react';
import { FC, useContext } from 'react';
import { CodeContext, SgpContext, CphContext } from '../App';
import { LinkContainer } from 'react-router-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from '../images/logo.png';
import './NavBar.css';
import { useLocation } from 'react-router';

export const NavBar: FC = () => {
	const code = useContext(CodeContext);
	const sgp = useContext(SgpContext);
	const cph = useContext(CphContext);

	const location = useLocation();

	const rsvpTo =
		location.pathname === `/${code}/rsvp` && location.state
			? {
					pathname: `/${code}/rsvp`,
					state: location.state,
			  }
			: `/${code}/rsvp`;

	if (sgp || cph) {
		let sgpLink = null;
		let cphLink = null;

		if (sgp) {
			sgpLink = (
				<Nav.Item className="py-2">
					<div>
						<LinkContainer exact to={`/${code}/singapore`}>
							<Nav.Link active={false}>Singapore</Nav.Link>
						</LinkContainer>
					</div>
				</Nav.Item>
			);
		}

		if (cph) {
			cphLink = (
				<Nav.Item className="py-2">
					<div>
						<LinkContainer exact to={`/${code}/copenhagen`}>
							<Nav.Link active={false}>Copenhagen</Nav.Link>
						</LinkContainer>
					</div>
				</Nav.Item>
			);
		}

		return (
			<Navbar
				className="py-0"
				collapseOnSelect
				bg="light"
				variant="light"
				fixed="top"
				expand="md"
			>
				<Container fluid className="px-0">
					<LinkContainer exact to={`/${code}`}>
						<Navbar.Brand className="py-2 ms-3">
							<img
								className="d-inline-block align-top"
								src={logo}
								width="60"
								height="60"
								alt=""
							/>
						</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle
						className="me-3"
						aria-controls="navbar-nav"
					/>
					<Navbar.Collapse
						id="navbar-nav"
						className="justify-content-end"
					>
						<Nav fill>
							<Nav.Item className="py-2">
								<div>
									<LinkContainer exact to={`/${code}`}>
										<Nav.Link active={false}>Home</Nav.Link>
									</LinkContainer>
								</div>
							</Nav.Item>
							{sgpLink}
							{cphLink}
							<Nav.Item className="py-2">
								<div>
									<LinkContainer
										exact
										to={`/${code}/gallery`}
									>
										<Nav.Link active={false}>
											Gallery
										</Nav.Link>
									</LinkContainer>
								</div>
							</Nav.Item>
							<Nav.Item className="py-2">
								<div>
									<LinkContainer to={rsvpTo}>
										<Nav.Link active={false}>RSVP</Nav.Link>
									</LinkContainer>
								</div>
							</Nav.Item>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		);
	} else {
		return (
			<Navbar
				className="py-0"
				collapseOnSelect
				bg="light"
				variant="light"
				fixed="top"
				expand="md"
			>
				<Container fluid className="px-0">
					<LinkContainer exact to={`/${code}`}>
						<Navbar.Brand className="py-2 ms-3">
							<img
								className="d-inline-block align-top"
								src={logo}
								width="60"
								height="60"
								alt=""
							/>
						</Navbar.Brand>
					</LinkContainer>
				</Container>
			</Navbar>
		);
	}
};
