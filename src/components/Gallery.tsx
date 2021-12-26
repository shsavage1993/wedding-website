import React, { FC, useState, useLayoutEffect, useRef } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { Photo } from './Photo';
import { computeGalleryLayout } from '../functions/computeGalleryLayout';
import { GalleryProps } from '../model/galleryTypes';

const Gallery: FC<GalleryProps> = ({
	photos,
	onClick,
	margin,
	targetRowHeight,
	minColumns,
	renderImage,
}) => {
	const [containerWidth, setContainerWidth] = useState(0);
	const galleryEl = useRef(null);

	useLayoutEffect(() => {
		let animationFrameID: number | null = null;
		const observer = new ResizeObserver((entries) => {
			// only do something if width changes
			const newWidth = entries[0].contentRect.width;
			if (containerWidth !== newWidth) {
				// put in an animation frame to stop "benign errors" from
				// ResizObserver https://stackoverflow.com/questions/49384120/resizeobserver-loop-limit-exceeded
				animationFrameID = window.requestAnimationFrame(() => {
					setContainerWidth(Math.floor(newWidth));
				});
			}
		});
		observer.observe(galleryEl.current!);
		return () => {
			observer.disconnect();
			window.cancelAnimationFrame(animationFrameID!);
		};
	});

	const handleClick = (
		event: React.MouseEvent,
		{ index }: { index: number }
	) => {
		onClick!(event, {
			index,
			photo: photos[index],
			previous: photos[index - 1] || null,
			next: photos[index + 1] || null,
		});
	};

	// no containerWidth until after first render with refs, skip calculations and render nothing
	if (!containerWidth) return <div ref={galleryEl}>&nbsp;</div>;
	// subtract 1 pixel because the browser may round up a pixel
	const width = containerWidth - 1;
	let galleryStyle: any, thumbs: any;

	if (typeof margin === 'function') {
		margin = margin(containerWidth);
	}

	if (typeof targetRowHeight === 'function') {
		targetRowHeight = targetRowHeight(containerWidth);
	}

	if (typeof minColumns === 'function') {
		minColumns = minColumns(containerWidth);
	}

	galleryStyle = { display: 'flex', flexWrap: 'wrap', flexDirection: 'row' };
	targetRowHeight = targetRowHeight!;
	minColumns = minColumns!;
	margin = margin!;
	thumbs = computeGalleryLayout({
		containerWidth: width,
		targetRowHeight,
		minColumns,
		margin,
		photos,
	});

	const renderComponent: any = renderImage || Photo;
	return (
		<div className="react-photo-gallery--gallery">
			<div ref={galleryEl} style={galleryStyle}>
				{thumbs!.map((thumb: any, index: number) => {
					const { left, top, containerHeight, ...photo } = thumb;
					return renderComponent({
						left,
						top,
						key: thumb.key || thumb.src,
						containerHeight,
						index,
						margin,
						onClick: onClick ? handleClick : null,
						photo,
					});
				})}
			</div>
		</div>
	);
};

export const MemoizedGallery = React.memo(Gallery);

Gallery.defaultProps = {
	margin: 2,
	targetRowHeight: 300,
	minColumns: 1,
};
