import React from 'react';
import { FC } from 'react';

interface ProgressBarProps {
	progress: number;
}

export const ProgressBar: FC<ProgressBarProps> = ({ progress }) => {
	return (
		<div className="progress-bar" style={{ width: progress + '%' }}></div>
	);
};
