import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import {
	doc,
	DocumentData,
	DocumentSnapshot,
	onSnapshot,
} from 'firebase/firestore';
import { getImageList } from '../functions/getImageList';
import { ImgListValues } from '../model/galleryTypes';

export const useGalleryListen = (master: boolean) => {
	const [imageList, setImageList] = useState<ImgListValues[] | undefined>(
		undefined
	);

	useEffect(() => {
		const unsub = onSnapshot(
			doc(db, 'images', 'order'),
			async (doc: DocumentSnapshot<DocumentData>) => {
				// get image order
				const imgOrderObj = doc.data();
				// if document is not found, set to empty state
				const imgCustomOrder: string[] = imgOrderObj
					? imgOrderObj.customOrder
					: [];

				// get image list
				const imageList = await getImageList(master, imgCustomOrder);

				setImageList(imageList);
			},
			(error) => {
				console.log(error);
			}
		);

		return () => unsub();
	}, [master]);

	return imageList;
};
