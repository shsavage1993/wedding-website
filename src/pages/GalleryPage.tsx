import '../components/gallery.css';
import React from 'react';
import { FC, useState, useRef } from 'react';
import { MotionDiv } from '../components/MotionDiv';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import { UploadPhoto } from '../components/UploadPhoto';
import { ImageGrid } from '../components/ImageGrid';
import { useGalleryListen } from '../components/useGalleryListen';
import { ImgListValues } from '../model/types';
import ResizeObserver from 'rc-resize-observer';

const master = true;

export const GalleryPage: FC = () => {
	const [imageList, setImageList] = useState<ImgListValues[]>([]);
	const [update, setUpdate] = useState<boolean>(false);
	const gridRef = useRef<HTMLDivElement>(null);

	// listens to changes in gallery
	useGalleryListen(setImageList);

	return (
		<MotionDiv>
			<Container fluid className="h-100" style={{ marginTop: '76px' }}>
				<Col className="p-5">
					<h1 style={{ textAlign: 'center' }}>Gallery</h1>
					{master ? (
						<UploadPhoto imageList={imageList} />
					) : (
						<div className="gallery-subsection"></div>
					)}
					<div style={{ position: 'relative' }}>
						<ResizeObserver
							onResize={({ height }) => {
								if (gridRef.current && height !== 23) {
									// ignore when height is 23 (happens during update)
									gridRef.current.style.height = `${height}px`;
									setUpdate(false);
								}
							}}
						>
							<ImageGrid
								imageList={imageList}
								setImageList={setImageList}
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
		</MotionDiv>
	);
};
