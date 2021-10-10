import '../components/gallery.css';
import React from 'react';
import { FC, useState } from 'react';
import { MotionDiv } from '../components/MotionDiv';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import { UploadPhoto } from '../components/UploadPhoto';
import { ImageGrid } from '../components/ImageGrid';
import { useGalleryListen } from '../components/useGalleryListen';
import { ImgListValues } from '../model/types';

const master = false;

export const GalleryPage: FC = () => {
	const [imageList, setImageList] = useState<ImgListValues[]>([]);

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
					<ImageGrid
						imageList={imageList}
						setImageList={setImageList}
						master={master}
					/>
				</Col>
			</Container>
		</MotionDiv>
	);
};
