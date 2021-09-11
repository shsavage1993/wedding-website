// import React from 'react';
// import { FC } from 'react';
// import { useEffect } from 'react';
// import { useLocation } from 'react-router';

// export const ScrollToTop: FC = (props) => {
// 	const location = useLocation();
// 	useEffect(() => {
// 		window.scrollTo(0, 0);
// 	}, [location]);

// 	return <>{props.children}</>;
// };

export const scrollToElementTop = (element: HTMLElement): void => {
	window.scrollBy(0, element.getBoundingClientRect().top - 76);
};
