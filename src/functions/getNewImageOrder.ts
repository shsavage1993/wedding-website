// import { ImgListValues } from '../model/types';

export const getNewImageOrder = (
	imageList: { name: string }[],
	file: File | null = null
) => {
	// get list of image file names
	let imageNameList = imageList.map((i) => i.name);

	if (file) {
		// Remove new image from list if it already exists
		const index = imageNameList.indexOf(file.name);
		if (index > -1) {
			imageNameList.splice(index, 1);
		}

		// Add new image to custom ordered image list
		imageNameList.unshift(file.name);
	}

	// update alphabetically ordered image list
	const imageNameListAlpha = [...imageNameList].sort();

	//Reverse transformation
	const newImageOrder = imageNameList.map((i) =>
		imageNameListAlpha.indexOf(i)
	);

	return newImageOrder;
};
