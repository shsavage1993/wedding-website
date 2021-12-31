import React from 'react';
import { FC, useState, useCallback } from 'react';
import { Gallery } from './Gallery';
import { arrayMoveImmutable } from 'array-move';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { Photo } from './Photo';
import { GalleryCarousel } from './GalleryCarousel';
import { db } from '../firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import { ImgListValues } from '../model/galleryTypes';
import { getNewImageOrder } from '../functions/getNewImageOrder';

interface ImageGridProps {
	imageList: ImgListValues[];
	setImageList: React.Dispatch<React.SetStateAction<ImgListValues[]>>;
	master: boolean;
	update: boolean;
	setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ImageGrid: FC<ImageGridProps> = ({
	imageList,
	setImageList,
	master,
	update,
	setUpdate,
}) => {
	const [containerWidth, setContainerWidth] = useState(0);

	const SortablePhoto = SortableElement((item: any) => (
		<Photo
			imageList={imageList}
			update={update}
			master={master}
			{...item}
		/>
	));
	const SortableGallery = SortableContainer(({ items, onClick }: any) => (
		<Gallery
			photos={items}
			containerWidth={containerWidth}
			setContainerWidth={setContainerWidth}
			onClick={onClick}
			margin={2}
			targetRowHeight={(width) =>
				width <= 600 ? 150 : width <= 1015 ? 200 : 250
			}
			minColumns={(width) => (width <= 240 ? 1 : width <= 600 ? 2 : 3)}
			renderImage={(props) =>
				master ? (
					<SortablePhoto {...props} />
				) : (
					<Photo
						imageList={imageList}
						update={update}
						master={master}
						{...props}
					/>
				)
			}
		/>
	));

	const onSortEnd = async ({ oldIndex, newIndex }: any) => {
		if (oldIndex === newIndex) {
			return null;
		}
		setUpdate(true);
		const newImageList = arrayMoveImmutable(imageList, oldIndex, newIndex);
		setImageList(newImageList);

		const newImageOrder = getNewImageOrder(newImageList);
		try {
			// Update document "images/order"
			await setDoc(doc(db, 'images', 'order'), {
				customOrder: newImageOrder,
			});
		} catch (err) {
			console.error(err);
		}

		setUpdate(false);
	};

	const [selectedImage, setSelectedImage] = useState(0);
	const [carouselIsOpen, setCarouselIsOpen] = useState(false);

	const openCarousel = useCallback((event, { photo, index }) => {
		setSelectedImage(index);
		disableScroll();
		setCarouselIsOpen(true);
	}, []);

	const closeCarousel = () => {
		setCarouselIsOpen(false);
		enableScroll();
	};

	return (
		<>
			<SortableGallery
				items={imageList}
				onClick={!master ? openCarousel : null}
				onSortEnd={onSortEnd}
				axis={'xy'}
				distance={1} // elements to only become sortable after being dragged a certain number of pixels
				disableAutoscroll={true}
			/>
			{!master ? (
				<GalleryCarousel
					photos={imageList}
					selected={selectedImage}
					show={carouselIsOpen}
					handleClose={closeCarousel}
				/>
			) : null}
		</>
	);
};

export const MemoizedImageGrid = React.memo(ImageGrid);

function disableScroll() {
	// Get the current page scroll position
	const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	const scrollLeft =
		window.pageXOffset || document.documentElement.scrollLeft;

	// if any scroll is attempted, set this to the previous value
	window.onscroll = function () {
		window.scrollTo(scrollLeft, scrollTop);
	};
}

function enableScroll() {
	window.onscroll = function () {};
}
