import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { NavBar } from './components/NavBar';
import { Switch, Route } from 'react-router-dom';
// import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { SingaporePage } from './pages/SingaporePage';
import { CopenhagenPage } from './pages/CopenhagenPage';
import { GalleryPage } from './pages/GalleryPage';
import { RsvpPage } from './pages/RsvpPage';
import { RsvpSuccessPage } from './pages/RsvpSuccessPage';
import { RsvpErrorPage } from './pages/RsvpErrorPage';
import './App.css';
import './fonts.css';
import { Redirect } from 'react-router';
import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

function App() {
	const location = useLocation();

	let code = location.pathname.split('/')[1];

	let sgp = false;
	let cph = false;

	switch (code) {
		case 'sgp':
			sgp = true;
			break;
		case 'cph':
			cph = true;
			break;
		case 'all':
			sgp = true;
			cph = true;
			break;
		// default:
		// 	return null;
	}

	if (!sgp && !cph) {
		code = '';
	}

	const routeParams = ':code(sgp|cph|all)';

	return (
		<AnimatePresence exitBeforeEnter initial={true}>
			<Container
				fluid
				id="main"
				className="px-1 vh-100 d-flex flex-column"
				style={{ display: 'none' }}
			>
				<NavBar code={code} sgp={sgp} cph={cph} />
				<Switch location={location} key={location.pathname}>
					<Route
						path="/"
						exact
						render={() => (
							<HomePage code={code} sgp={sgp} cph={cph} />
						)}
					/>
					<Route
						path={`/${routeParams}`}
						exact
						render={() => (
							<HomePage code={code} sgp={sgp} cph={cph} />
						)}
					/>
					<Route
						path={`/${routeParams}/singapore`}
						render={() => (
							<SingaporePage code={code} sgp={sgp} cph={cph} />
						)}
					/>
					<Route
						path={`/${routeParams}/copenhagen`}
						render={() => (
							<CopenhagenPage code={code} sgp={sgp} cph={cph} />
						)}
					/>
					<Route
						path={`/${routeParams}/gallery`}
						render={() => (
							<GalleryPage code={code} sgp={sgp} cph={cph} />
						)}
					/>
					<Route
						path={`/${routeParams}/rsvp`}
						exact
						render={() => (
							<RsvpPage code={code} sgp={sgp} cph={cph} />
						)}
					/>
					<Route
						path={`/${routeParams}/rsvp/success`}
						exact
						render={() => (
							<RsvpSuccessPage code={code} sgp={sgp} cph={cph} />
						)}
					/>
					<Route
						path={`/${routeParams}/rsvp/error`}
						exact
						render={() => (
							<RsvpErrorPage code={code} sgp={sgp} cph={cph} />
						)}
					/>
					<Route
						render={() => (
							<Redirect
								to={{
									pathname: `/${code}`,
								}}
							/>
						)}
					/>
				</Switch>
			</Container>
		</AnimatePresence>
	);
}

export default App;
