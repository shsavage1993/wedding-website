import React from 'react';
import { useEffect } from 'react';
import { db } from '../firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';
import { getImageList } from '../functions/getImageList';
import { ImgListValues } from '../model/types';

export const useGalleryListen = (
	setImageList: React.Dispatch<React.SetStateAction<ImgListValues[]>>
) => {
	useEffect(() => {
		const unsub = onSnapshot(
			doc(db, 'images', 'order'),
			async (doc: any) => {
				try {
					// get image order
					const imgOrderObj = await doc.data();
					// if document is not found, set to empty state
					let imgCustomOrder = imgOrderObj
						? imgOrderObj.customOrder
						: [];

					// get image list
					const imgList = await getImageList(imgCustomOrder);

					setImageList(imgList);
				} catch (err) {
					console.log(err);
				}
			}
		);

		return () => unsub();
	}, [setImageList]);
};
