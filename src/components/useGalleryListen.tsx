import React from 'react';
import { useEffect } from 'react';
import { db } from '../firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';
import { getImageList } from '../functions/getImageList';
import { ImgListValues } from '../model/types';

export const useGalleryListen = (
	setImageList: React.Dispatch<
		React.SetStateAction<ImgListValues[] | undefined>
	>
) => {
	useEffect(() => {
		const unsub = onSnapshot(
			doc(db, 'images', 'order'),
			async (doc: any) => {
				// get image order
				const imgOrderObj = await doc.data();
				// if document is not found, set to empty state
				let imgCustomOrder = imgOrderObj ? imgOrderObj.customOrder : [];

				// get image list
				const imgList = await getImageList(imgCustomOrder);

				setImageList(imgList);
			},
			(error) => {
				console.log(error);
			}
		);

		return () => unsub();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
};
