import React from 'react';
import { FC, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CloseButton from 'react-bootstrap/CloseButton';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { ImgListValues } from '../model/galleryTypes';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './lazy-load-image-background-effect.css';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		backdrop: {
			backgroundColor: 'rgba(0, 0, 0, 0.9)',
			zIndex: theme.zIndex.drawer + 1,
		},
		carousel: {
			height: '100%',
			width: '100%',
		},
	})
);

interface GalleryCarouselProps {
	photos: ImgListValues[];
	selected: number;
	show: boolean;
	handleClose: () => void;
}

export const GalleryCarousel: FC<GalleryCarouselProps> = ({
	photos,
	selected,
	show,
	handleClose,
}) => {
	const classes = useStyles();

	const images = photos.map((photo) => <CarouselSlide photo={photo} />);

	document.addEventListener('keydown', function (event) {
		if (show && event.key === 'Escape') {
			handleClose();
		}
	});

	return (
		<Backdrop className={classes.backdrop + ' p-5'} open={show}>
			<CloseButton
				style={{
					position: 'absolute',
					zIndex: 99,
					top: 10,
					right: 15,
				}}
				variant="white"
				onClick={handleClose}
			/>
			<Carousel
				className={classes.carousel}
				selectedItem={selected} // default 0
				autoFocus={show}
				autoPlay={false}
				dynamicHeight={false} //
				emulateTouch={true} //default true
				infiniteLoop={false}
				showIndicators={false} // default true
				useKeyboardArrows={true} //
				showStatus={true} // default true
				showThumbs={false} // default true
				thumbWidth={80} // default 80
				preventMovementUntilSwipeScrollTolerance={true} // Don't let the carousel scroll until value specified on swipeScrollTolerance
				swipeScrollTolerance={5} // default 5
			>
				{images}
			</Carousel>
		</Backdrop>
	);
};

interface CarouselSlideProps {
	photo: ImgListValues;
}

const CarouselSlide: FC<CarouselSlideProps> = ({ photo }) => {
	const [loaded, setLoaded] = useState(false);

	return (
		<div
			style={{
				display: 'flex',
				position: 'relative',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100%',
			}}
			key={photo.id}
		>
			<CircularProgress
				style={{
					position: 'absolute',
					visibility: loaded ? 'hidden' : 'visible',
				}}
			/>
			<LazyLoadImage
				key={photo.id}
				style={{
					height: '100%',
					objectFit: 'scale-down',
				}}
				src={photo.src}
				alt="img"
				effect="opacity"
				afterLoad={() => setLoaded(true)}
			/>
		</div>
	);
};
