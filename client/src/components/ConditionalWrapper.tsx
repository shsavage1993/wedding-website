import { FC } from 'react';

interface ConditionalWrapperProps {
	condition: boolean;
	wrapper: (children: any) => JSX.Element;
	children: any;
}

export const ConditionalWrapper: FC<ConditionalWrapperProps> = ({
	condition,
	wrapper,
	children,
}) => (condition ? wrapper(children) : children);
