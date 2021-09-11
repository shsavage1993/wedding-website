import React, { useEffect, useRef } from 'react';
import { FC } from 'react';
import { motion } from 'framer-motion';
// import { ScrollToTop } from './ScrollToTop';

export const MotionDiv: FC = (props) => {
	const containerElement = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (containerElement && containerElement.current) {
			containerElement.current.style.display = 'block';
		}
	}, []);

	return (
		<motion.div
			ref={containerElement}
			className="pageContainer"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			// exit={{ opacity: 0 }}
			transition={{ duration: 0.7 }}
			style={{
				display: 'none',
			}}
		>
			{/* <ScrollToTop> */}
			{props.children}
			{/* </ScrollToTop> */}
		</motion.div>
	);
};
