import React from 'react';
import { FC, useState } from 'react';
import { useUploadImage } from './useUploadImage';
// import { ProgressBar } from './ProgressBar';
import LinearProgress, {
	LinearProgressProps,
} from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Alert from 'react-bootstrap/Alert';

export const UploadPhoto: FC = () => {
	const [imgFiles, setImgFiles] = useState<File[]>([]);
	const [nonImgFiles, setNonImgFiles] = useState<File[]>([]);

	// only allow these image types
	const types = ['image/png', 'image/jpeg', 'image/gif'];

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

	const clickHandler = (
		event: React.MouseEvent<HTMLInputElement, MouseEvent>
	) => {
		const element = event.target as HTMLInputElement;
		element.value = '';
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
					onClick={clickHandler}
					disabled={imgFiles.length > 0}
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
						<span>
							<b>{file.name}</b>&ensp;is not an image file (png or
							jpeg)
						</span>
					</Alert>
				))}
				{nonImgFiles.length > 0 && (
					<div className="upload-error">
						{'1 or more invalid files'}
					</div>
				)}
				{file && <div>{file.name}</div>}
				{file && (
					<LinearProgressWithLabel
						style={{ height: '5px' }}
						// variant="determinate"
						value={progress}
					/>
				)}
			</div>
		</form>
	);
};

function LinearProgressWithLabel(
	props: LinearProgressProps & { value: number }
) {
	return (
		<Box display="flex" alignItems="center">
			<Box width="100%" mr={1}>
				<LinearProgress variant="determinate" {...props} />
			</Box>
			<Box minWidth={35}>
				<Typography variant="body2">{`${Math.round(
					props.value
				)}%`}</Typography>
			</Box>
		</Box>
	);
}
