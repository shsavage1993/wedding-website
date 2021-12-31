export interface ImgListValues {
	id: string;
	src: string;
	timestamp: number;
	width: number;
	height: number;
}

export interface GalleryProps {
	photos: PhotoProps[];
	containerWidth: number;
	setContainerWidth: React.Dispatch<React.SetStateAction<number>>;
	onClick?: PhotoClickHandler<{}> | undefined;
	margin?: number | ((containerWidth: number) => number) | undefined;
	targetRowHeight?: number | ((containerWidth: number) => number) | undefined;
	minColumns?: number | ((containerWidth: number) => number) | undefined;
	renderImage?: React.ComponentType<RenderImageProps<{}>> | undefined;
}

type PhotoProps<CustomPhotoProps extends object = {}> = {
	/**
	 * the img src attribute value of the image
	 */
	src: string;
	/**
	 * srcSet attribute of the image
	 */
	srcSet?: string | string[];
	/**
	 * sizes attribute of the image
	 */
	sizes?: string | string[];
	/**
	 *  original width of the gallery image (only used for calculating aspect ratio)
	 */
	width: number;
	/**
	 *  original height of the gallery image (only used for calculating aspect ratio)
	 */
	height: number;
	/**
	 *  alt text of the gallery image
	 */
	alt?: string;
	/**
	 * key to be used on component
	 */
	key?: string;
} & CustomPhotoProps;

interface RenderImageProps<CustomPhotoProps extends object = {}> {
	/**
	 * margin prop optionally passed into Gallery by user
	 */
	margin?: string;
	/**
	 * the index of the photo within the Gallery
	 */
	index: number;
	/**
	 * the individual object passed into Gallery's
	 * photos array prop, with all the same props except recalculated height and width
	 */
	photo: PhotoProps<CustomPhotoProps>;
	onClick: renderImageClickHandler | null;
	top?: number;
	left?: number;
}

export type PhotoClickHandler<CustomPhotoProps extends object = {}> = (
	event: React.MouseEvent,
	photos: {
		index: number;
		next: PhotoProps<CustomPhotoProps> | null;
		photo: PhotoProps<CustomPhotoProps>;
		previous: PhotoProps<CustomPhotoProps> | null;
	}
) => void;

type renderImageClickHandler = (
	event: React.MouseEvent,
	photo: object & {
		index: number;
	}
) => void;
