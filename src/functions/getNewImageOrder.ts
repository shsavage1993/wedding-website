import { ImgListValues } from '../model/galleryTypes';

export const getNewImageOrder = (
	imageList: ImgListValues[],
	id: string | null = null
) => {
	// get list of image IDs
	const imageIdList = imageList.map((i) => i.id);

	if (id) {
		// Add new image to custom ordered image list
		imageIdList.unshift(id);
	}

	return imageIdList;
};
