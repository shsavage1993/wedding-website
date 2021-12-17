const getNumberOfColumns = (
	containerWidth: number,
	targetRowHeight: number,
	minColumns: number,
	margin: number
) => {
	let nColumns = Math.floor(containerWidth / (targetRowHeight + margin * 2));
	nColumns = nColumns >= minColumns ? nColumns : minColumns;
	return nColumns ? nColumns : 1;
};

// get the height for a set of photos in a potential row
const getCommonHeight = (
	containerWidth: number,
	targetRowHeight: number,
	minColumns: number,
	margin: number
) => {
	const nColumns = getNumberOfColumns(
		containerWidth,
		targetRowHeight,
		minColumns,
		margin
	);
	const rowWidth = containerWidth - nColumns * (margin * 2);
	return rowWidth / nColumns;
};

export const computeGalleryLayout = ({
	containerWidth,
	targetRowHeight,
	minColumns,
	margin,
	photos,
}: {
	containerWidth: number;
	targetRowHeight: number;
	minColumns: number;
	margin: number;
	photos: any;
}) => {
	for (let i = 0; i < photos.length; ++i) {
		const height = getCommonHeight(
			containerWidth,
			targetRowHeight,
			minColumns,
			margin
		);
		photos[i].width = height;
		photos[i].height = height;
	}

	return photos;
};
