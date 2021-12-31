import React from 'react';
import { FC, useState, useEffect } from 'react';
import { MotionDiv } from '../components/MotionDiv';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import { UploadPhoto } from '../components/UploadPhoto';
import { MemoizedImageGrid } from '../components/ImageGrid';
import { useGalleryListen } from '../components/useGalleryListen';
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
	const [loading, setLoading] = useState(true);
	const [update, setUpdate] = useState<boolean>(false);

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
					<MemoizedImageGrid
						imageList={gridImageList}
						setImageList={setGridImageList}
						master={master && !update}
						update={update}
						setUpdate={setUpdate}
					/>
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
