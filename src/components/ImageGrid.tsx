import React from 'react';
import { FC } from 'react';
import Gallery from 'react-photo-gallery';
import { arrayMoveImmutable } from 'array-move';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { Photo } from './Photo';
import { db } from '../firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import { ImgListValues } from '../model/types';
import { getNewImageOrder } from '../functions/getNewImageOrder';

interface ImageGridProps {
	imageList: ImgListValues[];
	setImageList: React.Dispatch<React.SetStateAction<ImgListValues[]>>;
	master: boolean;
}

export const ImageGrid: FC<ImageGridProps> = ({
	imageList,
	setImageList,
	master,
}) => {
	// const [items, setItems] = useState<
	// 	{
	// 		src: string;
	// 		width: number;
	// 		height: number;
	// 	}[]
	// >([]);

	// useEffect(() => {
	// 	const imgList = imageList.map((image) => ({
	// 		name: image.name,
	// 		src: image.url,
	// 		width: 1,
	// 		height: 1,
	// 	}));

	// 	setItems(imgList);
	// }, [imageList]);

	const SortablePhoto = SortableElement((item: any) => (
		<Photo imageList={imageList} master={master} {...item} />
	));
	const SortableGallery = SortableContainer(({ items }: any) => (
		<Gallery
			photos={items}
			// limitNodeSearch={(width) => Math.floor(width / 100)}
			margin={8}
			renderImage={(props) => (
				<SortablePhoto {...props} disabled={!master} />
			)}
		/>
	));

	const onSortEnd = async ({ oldIndex, newIndex }: any) => {
		const newImageList = arrayMoveImmutable(imageList, oldIndex, newIndex);
		setImageList(newImageList);
		const newImageOrder = getNewImageOrder(newImageList);
		console.log(newImageOrder);

		try {
			// Update document "images/order"
			await setDoc(doc(db, 'images', 'order'), {
				customOrder: newImageOrder,
			});
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<SortableGallery
			items={imageList}
			onSortEnd={onSortEnd}
			axis={'xy'}
			distance={1}
		/>

		// <Gallery
		// 	photos={imgList}
		// 	margin={8}
		// 	renderImage={(props) => <Photo {...props} />}
		// />

		// <div className="img-grid">
		// 	{imageList.map((image) => (
		// 		<div
		// 			className="img-wrap"
		// 			key={image.name}
		// 		>
		// 			<img src={image.src} alt={image.name} />
		// 		</div>
		// 	))}
		// </div>
	);
};
