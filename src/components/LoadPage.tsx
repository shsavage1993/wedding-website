import React from 'react';
import { FC } from 'react';
import { usePreloadImages } from '../components/usePreloadImages';
import { motion } from 'framer-motion';
import { Loader } from './Loader';

interface LoadPageProps {
	imageSources: string[];
	page: JSX.Element;
}

export const LoadPage: FC<LoadPageProps> = ({ imageSources, page }) => {
	const imgsLoaded = usePreloadImages(imageSources);

	return imgsLoaded ? (
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
