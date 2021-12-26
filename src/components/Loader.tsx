import React from 'react';
import { FC } from 'react';
import { LinearProgress } from '@material-ui/core';

export const Loader: FC = () => {
	return (
		<LinearProgress
			style={{
				position: 'fixed',
				top: 76,
				zIndex: 2,
				display: 'block',
				width: '100%',
			}}
		/>
	);
};
