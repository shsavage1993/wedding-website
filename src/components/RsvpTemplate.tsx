import React from 'react';
import { FC, useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import teaImg from '../images/tea-illustration.png';
import { scrollToElementTop } from '../components/ScrollToTop';

interface RsvpTemplateProps {
	scrollToCol2: boolean;
}

export const RsvpTemplate: FC<RsvpTemplateProps> = (props) => {
	const divElement = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (props.scrollToCol2) {
			if (divElement && divElement.current)
				scrollToElementTop(divElement.current);
		} else {
			window.scrollTo(0, 0);
		}
	}, [props.scrollToCol2]);

	return (
		<Container fluid className="h-100" style={{ marginTop: '76px' }}>
			<Row>
				<Col
					className="px-0 col-md-illustration col-lg-illustration "
					xs={12}
					lg={6}
					style={{
						height: 'calc(100vmax - 76px)',
						backgroundImage: `url(${teaImg})`,
						backgroundSize: 'cover',
						backgroundPosition: '23% 86%',
					}}
				></Col>
				<Col ref={divElement} xs={12} lg={6} className="p-5">
					{props.children}
				</Col>
			</Row>
		</Container>
	);
};
