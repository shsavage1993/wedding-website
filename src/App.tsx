import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './fonts.css';
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import Container from 'react-bootstrap/Container';
import { NavBar } from './components/NavBar';
import { Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import { useLocation } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { SingaporePage } from './pages/SingaporePage';
import { CopenhagenPage } from './pages/CopenhagenPage';
import { GalleryPage } from './pages/GalleryPage';
import { RsvpPage } from './pages/RsvpPage';
import { RsvpSuccessPage } from './pages/RsvpSuccessPage';
import { RsvpErrorPage } from './pages/RsvpErrorPage';

// Create context for variables used throughout application
export const CodeContext = React.createContext('');
export const SgpContext = React.createContext(false);
export const CphContext = React.createContext(false);

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
		default:
			code = '';
	}

	const routeParams = ':code(sgp|cph|all)'; // only accept valid codes for route

	return (
		<CodeContext.Provider value={code}>
			<SgpContext.Provider value={sgp}>
				<CphContext.Provider value={cph}>
					<AnimatePresence exitBeforeEnter initial={true}>
						<Container
							fluid
							id="main"
							className="px-0 vh-100 d-flex flex-column"
							style={{ visibility: 'hidden' }}
						>
							<NavBar />
							<Switch location={location} key={location.pathname}>
								<Route
									path="/"
									exact
									render={() => <HomePage />}
								/>
								<Route
									path={`/${routeParams}`}
									exact
									render={() => <HomePage />}
								/>
								<Route
									path={`/${routeParams}/singapore`}
									render={() => <SingaporePage />}
								/>
								<Route
									path={`/${routeParams}/copenhagen`}
									render={() => <CopenhagenPage />}
								/>
								<Route
									path={`/${routeParams}/gallery`}
									render={() => <GalleryPage />}
								/>
								<Route
									path={`/${routeParams}/rsvp`}
									exact
									render={() => <RsvpPage />}
								/>
								<Route
									path={`/${routeParams}/rsvp/success`}
									exact
									render={() => <RsvpSuccessPage />}
								/>
								<Route
									path={`/${routeParams}/rsvp/error`}
									exact
									render={() => <RsvpErrorPage />}
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
				</CphContext.Provider>
			</SgpContext.Provider>
		</CodeContext.Provider>
	);
}

export default App;
