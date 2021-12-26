import { db, storage } from '../firebase/config';
import { doc, deleteDoc, setDoc } from 'firebase/firestore';
import { ref, listAll, deleteObject } from 'firebase/storage';
import {
	getFirebaseImageList,
	getFirebaseImageOrderList,
} from './getImageList';

export const cleanImageDataOnDb = async ({
	firestoreImgIds,
	firestoreOrderIds,
}: {
	firestoreImgIds: string[];
	firestoreOrderIds: string[];
}) => {
	try {
		console.log('cleaning');

		// get firestoreOrderIds
		if (!firestoreImgIds || !firestoreOrderIds) {
			[firestoreImgIds, firestoreOrderIds] = await Promise.all([
				getFirebaseImageList(true),
				getFirebaseImageOrderList(),
			]);
		}

		// Create reference to storage
		const storageRef = ref(storage);
		const storageImgIds: string[] = [];

		// Append all ids of images in storage
		const storageItemRefs = await listAll(storageRef);

		storageItemRefs.items.forEach((itemRef) => {
			storageImgIds.push(itemRef.name);
		});

		const idArrays = [firestoreImgIds, firestoreOrderIds, storageImgIds];
		const commonIds = idArrays.reduce((a, b) =>
			a.filter((c) => b.includes(c))
		);

		const firestoreImgIdsToDelete = getIdsToDelete(
			firestoreImgIds,
			commonIds
		);
		const storageImgIdsToDelete = getIdsToDelete(storageImgIds, commonIds);
		const firestoreOrderIdsToDelete = getIdsToDelete(
			firestoreOrderIds,
			commonIds
		);

		// Group image and image document deletion operations and execute
		const deleteOperations: Promise<void>[] = [];
		for (const id of firestoreImgIdsToDelete) {
			deleteOperations.push(deleteDoc(doc(db, 'images', id)));
		}
		for (const id of storageImgIdsToDelete) {
			deleteOperations.push(deleteObject(ref(storage, id)));
		}
		await Promise.all(deleteOperations);

		console.log('image and image document deletion operations executed');

		// Update images order document
		const newImageOrder = firestoreOrderIds.filter((id) => {
			// remove ids to be deleted
			return !firestoreOrderIdsToDelete.has(id);
		});

		setDoc(doc(db, 'images', 'order'), {
			customOrder: newImageOrder,
		});
	} catch (err) {
		console.error(err);
	}
};

const getIdsToDelete = (idList: string[], commonIds: string[]) => {
	const idsToRemove: Set<string> = new Set([]);
	for (const id of idList) {
		if (!commonIds.includes(id)) {
			idsToRemove.add(id);
		}
	}

	return idsToRemove;
};
