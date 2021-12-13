import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import { createStyles, makeStyles } from '@material-ui/styles';
import { GridRenderCellParams } from '@mui/x-data-grid';

interface GridCellExpandProps {
	value: string;
	width: number;
}

const useStyles = makeStyles(() =>
	createStyles({
		root: {
			alignItems: 'center',
			width: '100%',
			height: '100%',
			position: 'relative',
			display: 'flex',
			'& .cellValue': {
				whiteSpace: 'nowrap',
				overflow: 'hidden',
				textOverflow: 'ellipsis',
			},
		},
	})
);

function isOverflown(element: Element): boolean {
	return (
		element.scrollHeight > element.clientHeight ||
		element.scrollWidth > element.clientWidth
	);
}

const GridCellExpand = React.memo(function GridCellExpand(
	props: GridCellExpandProps
) {
	const { width, value } = props;
	const wrapper = React.useRef<HTMLDivElement | null>(null);
	const cellDiv = React.useRef<HTMLDivElement>(null);
	const cellValue = React.useRef<HTMLDivElement>(null);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const classes = useStyles();
	const [showFullCell, setShowFullCell] = React.useState(false);
	const [showPopper, setShowPopper] = React.useState(false);
	const [doubleClicked, setDoubleClicked] = React.useState(false);

	function editable() {
		return cellValue.current!.parentElement!.parentElement!.className.includes(
			'editable'
		);
	}

	function edited() {
		return cellValue.current!.parentElement!.parentElement!.className.includes(
			'edited'
		);
	}

	function deleted() {
		return cellValue.current!.parentElement!.parentElement!.parentElement!.className.includes(
			'deleted'
		);
	}

	React.useEffect(() => {
		if (doubleClicked) {
			const event = new MouseEvent('dblclick', {
				'view': window,
				'bubbles': true,
				'cancelable': true,
			});
			cellValue.current!.dispatchEvent(event);
			setDoubleClicked(false);
		}
	}, [doubleClicked]);

	const handleMouseEnter = () => {
		const isCurrentlyOverflown = isOverflown(cellValue.current!);
		setShowPopper(isCurrentlyOverflown);
		setAnchorEl(cellDiv.current);
		setShowFullCell(true);
	};

	const handleMouseLeave = () => {
		setShowFullCell(false);
	};

	const handleDoubleClick = () => {
		if (editable()) {
			setShowFullCell(false);
			setDoubleClicked(true);
		}
	};

	React.useEffect(() => {
		if (!showFullCell) {
			return undefined;
		}

		function handleKeyDown(nativeEvent: KeyboardEvent) {
			// IE11, Edge (prior to using Bink?) use 'Esc'
			if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
				setShowFullCell(false);
			}
		}

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [setShowFullCell, showFullCell]);

	return (
		<div
			ref={wrapper}
			className={classes.root}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onDoubleClick={handleDoubleClick}
		>
			<div
				ref={cellDiv}
				style={{
					height: 1,
					width,
					display: 'block',
					position: 'absolute',
					top: 0,
				}}
			/>
			<div ref={cellValue} className="cellValue">
				{value}
			</div>
			{showPopper && (
				<Popper
					open={showFullCell && anchorEl !== null}
					anchorEl={anchorEl}
					style={{
						width,
						marginTop: -2,
						marginLeft: -26,
						borderTop: `${
							edited() ? 'none' : '1px solid rgb(224, 224, 224)'
						}`,
					}}
				>
					<Paper
						elevation={1}
						style={{ minHeight: wrapper.current!.offsetHeight - 3 }}
					>
						<Typography
							variant="body2"
							style={{
								padding: '15px 12.5px',
								textDecoration: `${
									deleted() ? 'line-through' : 'none'
								}`,
								backgroundColor: `${
									edited() ? 'rgb(255, 244, 229)' : '#fff'
								}`,
								border: `${
									edited() ? '1px solid #ff9800' : 'none'
								}`,
							}}
						>
							{value}
						</Typography>
					</Paper>
				</Popper>
			)}
		</div>
	);
});

export const renderCellExpand = (params: GridRenderCellParams) => {
	return (
		<GridCellExpand
			value={params.value ? params.value.toString() : ''}
			width={params.colDef.computedWidth}
		/>
	);
};
