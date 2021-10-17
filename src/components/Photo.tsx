import React from 'react';
import { FC, useRef } from 'react';
import { db, storage } from '../firebase/config';
import { ref, deleteObject } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { deleteDoc } from 'firebase/firestore';
import removeIcon from '../images/cancel_white_24dp.svg';
import { getNewImageOrder } from '../functions/getNewImageOrder';
import { ImgListValues } from '../model/types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

const imgWithClick = { cursor: 'pointer' };

interface RemoveImgIconProps {
	photoRef: React.RefObject<HTMLDivElement>;
	removeIconRef: React.RefObject<HTMLDivElement>;
	imageName: string;
	imageList: ImgListValues[];
}

const RemoveImgIcon: FC<RemoveImgIconProps> = ({
	photoRef,
	removeIconRef,
	imageName,
	imageList,
}) => {
	const handleRemoveImgIconClick = async (event: any) => {
		if (removeIconRef.current) {
			removeIconRef.current.style.display = 'none';
		}
		if (photoRef.current) {
			console.log(photoRef.current);
			photoRef.current.style.filter = 'grayscale(100%)';
		}

		// TODO: Create confirmation modal
		// clone imageList to modify it
		const imgList = [...imageList];
		const selectedImg = (img: ImgListValues) => img.name === imageName;
		const index = imgList.findIndex(selectedImg);
		if (index > -1) {
			imgList.splice(index, 1);
		}

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
	update: boolean;
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
	update,
}) => {
	const photoRef = useRef<HTMLDivElement>(null);
	const removeIconRef = useRef<HTMLDivElement>(null);

	const imgStyle: any = { objectFit: 'cover', opacity: update ? 0 : 1 };
	if (direction === 'column') {
		imgStyle.position = 'absolute';
		imgStyle.left = left;
		imgStyle.top = top;
	}

	const handleClick = (event: any) => {
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
			style={{ margin: margin, position: 'relative' }}
			ref={photoRef}
		>
			{master && (
				<RemoveImgIcon
					photoRef={photoRef}
					removeIconRef={removeIconRef}
					imageName={photo.name}
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
