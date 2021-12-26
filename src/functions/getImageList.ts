import { db } from '../firebase/config';
import {
	collection,
	doc,
	query,
	where,
	getDoc,
	getDocs,
	deleteDoc,
} from 'firebase/firestore';
import { ImgListValues } from '../model/galleryTypes';
import { cleanImageDataOnDb } from './cleanImageDataOnDb';

export const getImageList = async (
	master?: boolean,
	imgCustomOrder?: string[]
) => {
	let imgList: ImgListValues[];
	if (!imgCustomOrder) {
		[imgCustomOrder, imgList] = await Promise.all([
			getFirebaseImageOrderList(),
			getFirebaseImageList(),
		]);
	} else {
		imgList = await getFirebaseImageList();
	}

	imgCustomOrder = imgCustomOrder!;
	const imgIdList = imgList.map((img) => img.id);
	if (
		JSON.stringify(imgIdList) === JSON.stringify([...imgCustomOrder].sort()) // sort is a mutable operation!
	) {
		//order image list using custom order
		imgList = imgCustomOrder.map(
			(id) => imgList.find((img) => img.id === id)!
		);
	} else {
		if (master) {
			cleanImageDataOnDb({
				firestoreImgIds: imgIdList,
				firestoreOrderIds: imgCustomOrder,
			});
		} else {
			// revert to default timestamp ordering if there is a mismatch
			console.log(
				'Image list and order list mismatch, reverting to default timestamp order'
			);
			imgList.sort((a, b) => b.timestamp - a.timestamp);
		}
	}

	return imgList;
};

export const getFirebaseImageOrderList = async () => {
	let imageCustomOrderList = [];

	const imgOrderRef = doc(db, 'images', 'order');
	const imgOrderSnap = await getDoc(imgOrderRef);

	if (imgOrderSnap.exists()) {
		imageCustomOrderList = imgOrderSnap.data().customOrder;
	}

	return imageCustomOrderList;
};

export const getFirebaseImageList = async (getIdList: boolean = false) => {
	let imageList: any = [];
	const q = query(collection(db, 'images'), where('__name__', '!=', 'order'));
	const imagesCollection = await getDocs(q);
	imagesCollection.forEach((imgDoc) => {
		if (JSON.stringify(imgDoc.data()) === '{}') {
			// Delete empty image document from db
			deleteDoc(doc(db, 'images', imgDoc.id));
		} else {
			if (getIdList) {
				imageList = imageList as string[];
				imageList.push(imgDoc.id);
			} else {
				imageList = imageList as ImgListValues[];
				imageList.push({
					id: imgDoc.id,
					src: imgDoc.data().url,
					timestamp: imgDoc.data().createdAt.toMillis(),
					width: 1,
					height: 1,
				});
			}
		}
	});

	return imageList;
};
