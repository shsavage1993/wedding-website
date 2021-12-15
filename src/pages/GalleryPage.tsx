import '../components/gallery.css';
import React from 'react';
import { FC, useState, useEffect, useRef } from 'react';
import { MotionDiv } from '../components/MotionDiv';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import { LinearProgress } from '@material-ui/core';
import { UploadPhoto } from '../components/UploadPhoto';
import { ImageGrid } from '../components/ImageGrid';
import { useGalleryListen } from '../components/useGalleryListen';
import ResizeObserver from 'rc-resize-observer';

interface GalleryPageProps {
	master?: boolean;
}

export const GalleryPage: FC<GalleryPageProps> = ({ master = false }) => {
	const [loading, setLoading] = useState(true);
	const [update, setUpdate] = useState<boolean>(true);
	const gridRef = useRef<HTMLDivElement>(null);
	const divRef = useRef<HTMLDivElement>(null);

	// listens to changes in gallery
	const imageList = useGalleryListen();

	const images = imageList ? imageList! : [];
	const [heightOffset, setHeightOffset] = useState<number | undefined>(
		undefined
	);

	useEffect(() => {
		if (divRef.current && !heightOffset) {
			setHeightOffset(divRef.current.clientHeight);
		}
	}, [update, heightOffset]);

	useEffect(() => {
		imageList ? setLoading(false) : setLoading(true);
	}, [imageList]);

	const gallery = (
		<Container fluid className="h-100" style={{ marginTop: '76px' }}>
			<Col className="p-5">
				<h1 style={{ textAlign: 'center' }}>Gallery</h1>
				{master ? (
					<UploadPhoto imageList={images} />
				) : (
					<div className="gallery-subsection"></div>
				)}
				<div ref={divRef} style={{ position: 'relative' }}>
					<ResizeObserver
						onResize={({ height }) => {
							if (gridRef.current && height !== heightOffset) {
								// ignore when height is 24 (happens during update)
								gridRef.current.style.height = `${height}px`;
								setUpdate(false);
							}
						}}
					>
						<ImageGrid
							imageList={images}
							master={master}
							update={update}
							setUpdate={setUpdate}
						/>
					</ResizeObserver>
					<div
						ref={gridRef}
						style={{
							zIndex: -1,
							background: 'transparent',
							height: '0px',
							width: '100%',
							position: 'absolute',
							top: 0,
							left: 0,
						}}
					></div>
				</div>
			</Col>
		</Container>
	);

	const loader = (
		<LinearProgress
			style={{
				marginTop: '76px',
			}}
		/>
	);

	return <MotionDiv>{loading ? loader : gallery}</MotionDiv>;
};
