import React from 'react';
import { FC } from 'react';
import { db, storage } from '../firebase/config';
import { ref, deleteObject } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { deleteDoc } from 'firebase/firestore';
import removeIcon from '../images/cancel_white_24dp.svg';
import { getNewImageOrder } from '../functions/getNewImageOrder';
import { ImgListValues } from '../model/types';

const imgWithClick = { cursor: 'pointer' };

interface RemoveImgIconProps {
	imageName: string;
	imageList: ImgListValues[];
	// setImageList: React.Dispatch<React.SetStateAction<ImgListValues[]>>;
}

const RemoveImgIcon: FC<RemoveImgIconProps> = ({
	imageName,
	imageList,
	// setImageList,
}) => {
	const handleRemoveImgIconClick = async (event: any) => {
		// TODO: Create confirmation modal
		// clone imageList to modify it
		const imgList = [...imageList];
		const selectedImg = (img: ImgListValues) => img.name === imageName;
		const index = imgList.findIndex(selectedImg);
		if (index > -1) {
			imgList.splice(index, 1);
		}

		// setImageList(imgList)

		const newImageOrder = getNewImageOrder(imgList);

		try {
			// Delete image from storage
			const imgRef = ref(storage, imageName);
			await deleteObject(imgRef);
			// Delete document for associated image from db
			await deleteDoc(doc(db, 'images', imageName));
			// Update document "images/order"
			await setDoc(doc(db, 'images', 'order'), {
				customOrder: newImageOrder,
			});
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="remove-img-icon">
			<img
				className="remove-img-icon-img"
				src={removeIcon}
				alt="Remove"
				onClick={handleRemoveImgIconClick}
			/>
		</div>
	);
};

interface PhotoProps {
	index: any;
	onClick: any;
	photo: any;
	margin?: any;
	direction: any;
	top?: any;
	left?: any;
	imageList: ImgListValues[];
	master: boolean;
}

export const Photo: FC<PhotoProps> = ({
	index,
	onClick,
	photo,
	margin,
	direction,
	top,
	left,
	imageList,
	master,
}) => {
	const imgStyle: any = { margin: margin, objectFit: 'cover' };
	if (direction === 'column') {
		imgStyle.position = 'absolute';
		imgStyle.left = left;
		imgStyle.top = top;
	}

	const handleClick = (event: any) => {
		onClick(event, { photo, index });
	};

	return (
		<div className="photo-div" style={{ position: 'relative' }}>
			{master && (
				<RemoveImgIcon imageName={photo.name} imageList={imageList} />
			)}
			<img
				className="photo"
				style={onClick ? { ...imgStyle, ...imgWithClick } : imgStyle}
				{...photo}
				onClick={onClick ? handleClick : null}
				alt="img"
			/>
		</div>
	);
};
