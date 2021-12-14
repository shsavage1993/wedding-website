import { FC, useContext } from 'react';
import { CodeContext, AuthContext } from '../App';
import { Redirect } from 'react-router';
import { GalleryPage } from './GalleryPage';

export const MasterGalleryPage: FC = () => {
	const signedIn = useContext(AuthContext);
	const code = useContext(CodeContext);

	if (signedIn === true) {
		return <GalleryPage master={true} />;
	} else if (signedIn === false) {
		return <Redirect to={`/${code}`} />;
	} else {
		return null;
	}
};
