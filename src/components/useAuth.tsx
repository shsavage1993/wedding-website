import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';

export const useAuth = () => {
	const [signedIn, setSignedIn] = useState<boolean | undefined>(undefined);

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (user) => {
			if (user) {
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/firebase.User
				// const uid = user.uid;
				// console.log(user.uid);
				setSignedIn(true);
				// ...
			} else {
				// User is signed out
				setSignedIn(false);
			}
		});

		return () => unsub();
	}, []);

	return signedIn;
};
