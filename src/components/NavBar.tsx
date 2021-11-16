import React from 'react';
import { FC, useContext } from 'react';
import { CodeContext, SgpContext, CphContext, AuthContext } from '../App';
import { LinkContainer } from 'react-router-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from '../images/logo.png';
import './NavBar.css';
import { useHistory, useLocation } from 'react-router';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';

export const NavBar: FC = () => {
	const code = useContext(CodeContext);
	const sgp = useContext(SgpContext);
	const cph = useContext(CphContext);

	const history = useHistory();
	const location = useLocation();
	const signedIn = useContext(AuthContext);

	const master = code === 'master' ? true : false;
	const navLinkClassName = master ? 'nav-link-master' : 'nav-link-general';

	const handleSignOut = () => {
		signOut(auth)
			.then(() => {
				// Sign-out successful.
				history.push(`/${code}/signout`);
			})
			.catch((error) => {
				// An error happened.
				console.log('Error signing out...');
				console.log(error);
			});
	};

	const navShadow = {
		boxShadow: `0px 0px 10px ${master ? '' : 'white'}`,
	};

	if ((master && signedIn) || sgp || cph) {
		// if current location is rsvp page and state is present (i.e. it has come from rsvp success/failed), update location descriptor to prevent rsvp link from being clickable (since we are already on rsvp page)
		const rsvpTo =
			location.pathname === `/${code}/rsvp` && location.state
				? {
						pathname: `/${code}/rsvp`,
						state: location.state,
				  }
				: `/${code}/rsvp`;

		let sgpLink = null;
		let cphLink = null;
		let signOutLink = null;

		if (sgp) {
			sgpLink = (
				<Nav.Item className="py-2">
					<div>
						<LinkContainer exact to={`/${code}/singapore`}>
							<Nav.Link
								className={navLinkClassName}
								active={false}
							>
								Singapore
							</Nav.Link>
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
							<Nav.Link
								className={navLinkClassName}
								active={false}
							>
								Copenhagen
							</Nav.Link>
						</LinkContainer>
					</div>
				</Nav.Item>
			);
		}

		if (master && signedIn) {
			signOutLink = (
				<Nav.Item
					className="py-2 nav-link-signout"
					onClick={handleSignOut}
				>
					<div>
						<Nav.Link active={false}>Sign Out</Nav.Link>
					</div>
				</Nav.Item>
			);
		}

		return (
			<Navbar
				className="py-0"
				collapseOnSelect
				bg={master ? 'dark' : 'light'}
				variant={master ? 'dark' : 'light'}
				fixed="top"
				expand="md"
				style={navShadow}
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
								style={
									master
										? { filter: 'brightness(0) invert(1)' }
										: {}
								}
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
										<Nav.Link
											className={navLinkClassName}
											active={false}
										>
											Home
										</Nav.Link>
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
										<Nav.Link
											className={navLinkClassName}
											active={false}
										>
											Gallery
										</Nav.Link>
									</LinkContainer>
								</div>
							</Nav.Item>
							<Nav.Item className="py-2">
								<div>
									<LinkContainer to={rsvpTo}>
										<Nav.Link
											className={navLinkClassName}
											active={false}
										>
											RSVP
										</Nav.Link>
									</LinkContainer>
								</div>
							</Nav.Item>
							{signOutLink}
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
				bg={master ? 'dark' : 'light'}
				variant={master ? 'dark' : 'light'}
				fixed="top"
				expand="md"
				style={navShadow}
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
								style={
									master
										? { filter: 'brightness(0) invert(1)' }
										: {}
								}
							/>
						</Navbar.Brand>
					</LinkContainer>
				</Container>
			</Navbar>
		);
	}
};
