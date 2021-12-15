import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';
import { getImageList } from '../functions/getImageList';
import { ImgListValues } from '../model/types';

export const useGalleryListen = () => {
	const [imageList, setImageList] = useState<ImgListValues[] | undefined>(
		undefined
	);

	useEffect(() => {
		const unsub = onSnapshot(
			doc(db, 'images', 'order'),
			async (doc: any) => {
				// get image order
				const imgOrderObj = await doc.data();
				// if document is not found, set to empty state
				let imgCustomOrder = imgOrderObj ? imgOrderObj.customOrder : [];

				// get image list
				const imageList = await getImageList(imgCustomOrder);

				setImageList(imageList);
			},
			(error) => {
				console.log(error);
			}
		);

		return () => unsub();
	}, []);

	return imageList;
};
