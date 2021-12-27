import React from 'react';
import { FC } from 'react';
import { motion } from 'framer-motion';
import { LinearProgress } from '@material-ui/core';
import { usePreloadImages } from '../components/usePreloadImages';
// import { Loader } from './Loader';

interface LoadPageProps {
	page: JSX.Element;
	imageSources?: string[];
	loading?: boolean;
}

export const LoadPage: FC<LoadPageProps> = ({
	page,
	imageSources = [],
	loading = false,
}) => {
	const imgsLoaded = usePreloadImages(imageSources);

	return imgsLoaded && !loading ? (
		page
	) : (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ delay: 0.4 }}
		>
			<Loader />
		</motion.div>
	);
};

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
