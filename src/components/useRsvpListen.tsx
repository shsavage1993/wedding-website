import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { RsvpListValues } from '../model/types';

export const useRsvpListen = () => {
	const [rsvpList, setRsvpList] = useState<RsvpListValues[] | undefined>(
		undefined
	);

	useEffect(() => {
		const q = query(collection(db, 'rsvp'), orderBy('createdAt', 'asc'));
		const unsub = onSnapshot(
			q,
			async (querySnapshot) => {
				const rsvpList: RsvpListValues[] = [];
				querySnapshot.forEach((rsvpDoc) => {
					rsvpList.push({
						id: rsvpDoc.id,
						createdAt: rsvpDoc.data().createdAt.toDate(),
						firstName: rsvpDoc.data().firstName,
						lastName: rsvpDoc.data().lastName,
						email: rsvpDoc.data().email,
						phone: rsvpDoc.data().phone,
						singapore: rsvpDoc.data().singapore,
						copenhagen: rsvpDoc.data().copenhagen,
						dietaryReq: rsvpDoc.data().dietaryReq,
						other: rsvpDoc.data().other,
					});
				});

				setRsvpList(rsvpList);
			},
			(error) => {
				console.log(error);
			}
		);

		return () => unsub();
	}, []);

	return rsvpList;
};
