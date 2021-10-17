import { useState, useEffect } from 'react';

export const usePreloadImages = (imageSources: string[]) => {
	const [imgsLoaded, setImgsLoaded] = useState(false);

	useEffect(() => {
		const loadImage = (src: string) => {
			return new Promise((resolve, reject) => {
				const loadImg = new window.Image();
				loadImg.src = src;
				loadImg.onload = () => resolve(src);
				loadImg.onerror = (err) => reject(err);
			});
		};

		Promise.all(imageSources.map((image) => loadImage(image)))
			.then(() => setImgsLoaded(true))
			.catch((err) => console.log('Failed to load images', err));
	}, []);

	return imgsLoaded;
};
