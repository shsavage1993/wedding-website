import React from 'react';
import { FC, useState, useEffect } from 'react';

interface CountdownProps {
	date: string;
}

const calculateDaysLeft = (date: string) => {
	let difference = +new Date(date) - +new Date();
	const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));
	return daysLeft;
};

export const Countdown: FC<CountdownProps> = ({ date }) => {
	const [daysLeft, setDaysLeft] = useState<null | number>(
		calculateDaysLeft(date)
	);
	let countdown: string = '';

	useEffect(() => {
		const timer = setTimeout(() => {
			setDaysLeft(calculateDaysLeft(date));
		}, 1000);
		return () => clearTimeout(timer);
	});

	if (daysLeft && daysLeft > 0) {
		countdown = `${daysLeft} days left`;
	} else if (daysLeft && daysLeft < 0) {
		countdown = 'Over';
	}

	return <h6 className="m-0">{countdown}</h6>;
};
