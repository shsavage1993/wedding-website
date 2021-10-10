import React from 'react';
import { FC, useState } from 'react';
import { useUploadImage } from './useUploadImage';
import { ProgressBar } from './ProgressBar';
import { ImgListValues } from '../model/types';
import Alert from 'react-bootstrap/Alert';

interface UploadPhotoProps {
	imageList: ImgListValues[];
}

export const UploadPhoto: FC<UploadPhotoProps> = ({ imageList }) => {
	const [imgFiles, setImgFiles] = useState<File[]>([]);
	const [nonImgFiles, setNonImgFiles] = useState<File[]>([]);

	// only allow these image types
	const types = ['image/png', 'image/jpeg'];

	const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		let selected;
		if (e.target.files) {
			selected = Array.from(e.target.files);
			if (selected.length > 0) {
				setImgFiles(
					selected.filter((file) => types.includes(file.type))
				);
				setNonImgFiles(
					selected.filter((file) => !types.includes(file.type))
				);
			}
		}
	};

	const { file, progress } = useUploadImage(imgFiles, setImgFiles);

	return (
		<form className="upload-button">
			<label className="file-input-label">
				<input
					className="file-input"
					type="file"
					multiple
					onChange={changeHandler}
				/>
				<span>+</span>
			</label>
			<div className="gallery-subsection">
				{nonImgFiles.map((file, idx) => (
					<Alert
						key={idx}
						variant="danger"
						style={{
							width: 'calc( 100% - 9rem )',
							position: 'fixed',
							top: '90px',
							left: '50%',
							transform: 'translate(-50%, 0)',
							zIndex: 99,
						}}
						dismissible
						onClose={() => setNonImgFiles(nonImgFiles.slice(0, -1))}
					>
						{file.name + 'is not an image file (png or jpeg)'}
					</Alert>
				))}
				{nonImgFiles.length > 0 && (
					<div className="upload-error">
						{'1 or more invalid files'}
					</div>
				)}
				{file && <div>{file.name}</div>}
				{file && <ProgressBar progress={progress} />}
			</div>
		</form>
	);
};
