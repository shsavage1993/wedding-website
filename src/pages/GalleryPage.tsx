import React from 'react';
import { FC, useState, useEffect, useRef } from 'react';
import { MotionDiv } from '../components/MotionDiv';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import { UploadPhoto } from '../components/UploadPhoto';
import { ImageGrid } from '../components/ImageGrid';
import { useGalleryListen } from '../components/useGalleryListen';
import ResizeObserver from 'rc-resize-observer';
import { ImgListValues } from '../model/galleryTypes';
import { LoadPage, Loader } from '../components/LoadPage';
import '../components/gallery.css';

interface GalleryPageProps {
	master?: boolean;
}

function getStringifiedImgIdList(imageList: ImgListValues[]) {
	const imgIdList = imageList.map((img) => img.id);
	return JSON.stringify(imgIdList);
}

export const GalleryPage: FC<GalleryPageProps> = ({ master = false }) => {
	const gridRef = useRef<HTMLDivElement>(null);
	const divRef = useRef<HTMLDivElement>(null);
	const [loading, setLoading] = useState(true);
	const [update, setUpdate] = useState<boolean>(false);
	const [heightOffset, setHeightOffset] = useState<number | undefined>( // for ResizeObserver
		undefined
	);

	// listens to changes in gallery
	const imageList = useGalleryListen(master);
	const [gridImageList, setGridImageList] = useState<ImgListValues[]>([]);

	useEffect(() => {
		if (imageList) {
			if (
				getStringifiedImgIdList(imageList) !==
				getStringifiedImgIdList(gridImageList)
			) {
				setGridImageList(imageList);
			}
			setLoading(false);
		} else {
			setLoading(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [imageList]);

	const gallery = (
		<MotionDiv>
			<Container fluid className="h-100" style={{ marginTop: '76px' }}>
				<Col className="px-3 py-5 col-sm-gallery">
					<h1 style={{ textAlign: 'center' }}>Gallery</h1>
					{master ? (
						<UploadPhoto />
					) : (
						<div className="gallery-subsection"></div>
					)}
					<div ref={divRef} style={{ position: 'relative' }}>
						<ResizeObserver
							onResize={({ height }) => {
								if (
									gridRef.current &&
									height !== heightOffset
								) {
									// ignore when height is heightOffset (height during update)
									gridRef.current.style.height = `${height}px`;
									if (divRef.current && !heightOffset) {
										setHeightOffset(
											divRef.current.clientHeight
										);
									}
								}
							}}
						>
							<ImageGrid
								imageList={gridImageList}
								setImageList={setGridImageList}
								master={master && !update}
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

	return (
		<>
			<LoadPage page={gallery} loading={loading} />
			{update ? <Loader /> : null}
		</>
	);
};
