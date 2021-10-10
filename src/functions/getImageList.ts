import { db } from '../firebase/config';
import {
	collection,
	doc,
	query,
	where,
	getDoc,
	getDocs,
} from 'firebase/firestore';
import { ImgListValues } from '../model/types';

export const getImageList = async (imgCustomOrder: number[] | null = null) => {
	// get image list
	let imgList: Array<ImgListValues> = [];
	const q = query(collection(db, 'images'), where('__name__', '!=', 'order'));
	const imagesCollection = await getDocs(q);
	imagesCollection.forEach((imgDoc) => {
		imgList.push({
			name: imgDoc.id,
			src: imgDoc.data().url,
			timestamp: imgDoc.data().createdAt.toMillis(),
			width: 1,
			height: 1,
			loading: 'lazy',
		});
	});

	if (!imgCustomOrder) {
		const imgOrderRef = doc(db, 'images', 'order');
		const imgOrderSnap = await getDoc(imgOrderRef);

		if (imgOrderSnap.exists()) {
			imgCustomOrder = imgOrderSnap.data().customOrder;
		} else {
			imgCustomOrder = [];
		}
	}

	if (imgCustomOrder && imgCustomOrder.length === imgList.length) {
		//order image list using custom order
		imgList = imgCustomOrder.map((i: number) => imgList[i]);
	} else {
		// revert to default timestamp ordering if there is a mismatch
		console.log(
			'Image list and order list mismatch, reverting to default timestamp order'
		);
		imgList.sort((a, b) => b.timestamp - a.timestamp);
	}

	return imgList;
};
