import React from 'react';
import { FC, useRef } from 'react';
import { db, storage } from '../firebase/config';
import { ref, deleteObject } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { deleteDoc } from 'firebase/firestore';
import removeIcon from '../images/cancel_white_24dp.svg';
import { getNewImageOrder } from '../functions/getNewImageOrder';
import { ImgListValues } from '../model/galleryTypes';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './lazy-load-image-background-effect.css';

const imgWithClick = { cursor: 'pointer' };

interface RemoveImgIconProps {
	photoRef: React.RefObject<HTMLDivElement>;
	removeIconRef: React.RefObject<HTMLDivElement>;
	imageId: string;
	imageList: ImgListValues[];
}

const RemoveImgIcon: FC<RemoveImgIconProps> = ({
	photoRef,
	removeIconRef,
	imageId,
	imageList,
}) => {
	const handleRemoveImgIconClick = async (event: any) => {
		if (removeIconRef.current) {
			removeIconRef.current.style.display = 'none';
		}
		if (photoRef.current) {
			photoRef.current.style.filter = 'grayscale(100%)';
		}

		// clone imageList to modify it
		const imgList = [...imageList];
		// get index of image in imageList
		const selectedImg = (img: ImgListValues) => img.id === imageId;
		const index = imgList.findIndex(selectedImg);
		if (index > -1) {
			imgList.splice(index, 1);
		}

		const newImageOrder = getNewImageOrder(imgList);

		try {
			// Delete image document from firestore
			await deleteDoc(doc(db, 'images', imageId));

			await Promise.all([
				// Delete image from storage
				deleteObject(ref(storage, imageId)),
				// Update document "images/order"
				setDoc(doc(db, 'images', 'order'), {
					customOrder: newImageOrder,
				}),
			]);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div ref={removeIconRef} className="remove-img-icon">
			<img
				className="remove-img-icon-img"
				src={removeIcon}
				alt="Remove"
				onClick={handleRemoveImgIconClick}
			/>
		</div>
	);
};

export interface PhotoProps {
	index: number;
	onClick: any;
	photo: any;
	margin?: string;
	top?: number;
	left?: number;
	imageList: ImgListValues[];
	master: boolean;
	update: boolean;
}

export const Photo: FC<PhotoProps> = ({
	index,
	onClick,
	photo,
	margin,
	top,
	left,
	imageList,
	master,
	update,
}) => {
	const photoRef = useRef<HTMLDivElement>(null);
	const removeIconRef = useRef<HTMLDivElement>(null);

	const imgStyle: any = { objectFit: 'cover' };

	const handleClick = (event: React.MouseEvent<Element, MouseEvent>) => {
		onClick(event, { photo, index });
	};

	const handleBeforeLoad = () => {
		if (removeIconRef.current) {
			removeIconRef.current.style.display = 'none';
		}
	};

	const handleAfterLoad = () => {
		if (removeIconRef.current) {
			removeIconRef.current.style.display = 'block';
		}
	};

	return (
		<div
			className="photo-div"
			style={{
				margin: margin,
				position: 'relative',
				opacity: update ? 0.2 : 1,
				// visibility: update ? 'hidden' : 'visible',
			}}
			ref={photoRef}
		>
			{master && (
				<RemoveImgIcon
					photoRef={photoRef}
					removeIconRef={removeIconRef}
					imageId={photo.id}
					imageList={imageList}
				/>
			)}
			<LazyLoadImage
				className="photo"
				style={onClick ? { ...imgStyle, ...imgWithClick } : imgStyle}
				{...photo}
				onClick={onClick ? handleClick : null}
				alt="img"
				effect="opacity"
				beforeLoad={handleBeforeLoad}
				afterLoad={handleAfterLoad}
			/>
		</div>
	);
};
