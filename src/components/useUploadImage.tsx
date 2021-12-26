import { useState, useEffect } from 'react';
import { db, storage } from '../firebase/config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import {
	doc,
	collection,
	addDoc,
	setDoc,
	serverTimestamp,
} from 'firebase/firestore';
import { getNewImageOrder } from '../functions/getNewImageOrder';
import { getImageList } from '../functions/getImageList';

export const useUploadImage = (
	imgFiles: File[],
	setImgFiles: React.Dispatch<React.SetStateAction<File[]>>
) => {
	const [file, setFile] = useState<File | null>(null);
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const uploadImage = async () => {
			if (imgFiles.length > 0) {
				const file = imgFiles[0];
				setFile(file);
				try {
					const docRef = await addDoc(collection(db, 'images'), {});
					const id = docRef.id;
					const storageRef = ref(storage, id);
					const uploadTask = uploadBytesResumable(storageRef, file);

					// Register three observers:
					// 1. 'state_changed' observer, called any time the upload state changes
					uploadTask.on(
						'state_changed',
						(snapshot) => {
							// Get task progress
							const percentage =
								(snapshot.bytesTransferred /
									snapshot.totalBytes) *
								100;
							setProgress(percentage);
						},
						// 2. Error observer, called on failure
						(err) => {
							console.log(err);
						},
						// 3. Completion observer, called on successful completion
						async () => {
							const downloadUrl = await getDownloadURL(
								uploadTask.snapshot.ref
							);

							const imageList = await getImageList(); // Use most up to date version of imageList
							const newImageOrder = getNewImageOrder(
								imageList,
								id
							);

							try {
								// Add/update image document in collection "images"
								await setDoc(doc(db, 'images', id), {
									url: downloadUrl,
									createdAt: serverTimestamp(),
								});

								// Add/update document "images/order"
								await setDoc(doc(db, 'images', 'order'), {
									customOrder: newImageOrder,
								});
							} catch (err) {
								console.error(err);
							}
							setFile(null);
							setImgFiles(imgFiles.slice(1));
							setProgress(0);
						}
					);
				} catch (err) {
					console.error(err);
					setFile(null);
					setImgFiles(imgFiles.slice(1));
					setProgress(0);
				}
			}
		};

		uploadImage();
	}, [imgFiles, setImgFiles]);

	return { file, progress };
};
