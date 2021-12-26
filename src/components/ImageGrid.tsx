import React from 'react';
import { FC } from 'react';
import { MemoizedGallery } from './Gallery';
import { arrayMoveImmutable } from 'array-move';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { Photo } from './Photo';
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
	const SortablePhoto = SortableElement((item: any) => (
		<Photo
			imageList={imageList}
			update={update}
			master={master}
			{...item}
		/>
	));
	const SortableGallery = SortableContainer(({ items }: any) => (
		<MemoizedGallery
			photos={items}
			// limitNodeSearch={(width) => Math.floor(width / 100)}
			margin={2}
			targetRowHeight={(width) =>
				width <= 600 ? 150 : width <= 1015 ? 200 : 250
			}
			minColumns={(width) => (width <= 240 ? 1 : width <= 600 ? 2 : 3)}
			renderImage={(props) => (
				<SortablePhoto {...props} disabled={!master} />
			)}
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

	return (
		<SortableGallery
			items={imageList}
			onSortEnd={onSortEnd}
			axis={'xy'}
			distance={1} // elements to only become sortable after being dragged a certain number of pixels
			disableAutoscroll={true}
		/>
	);
};
