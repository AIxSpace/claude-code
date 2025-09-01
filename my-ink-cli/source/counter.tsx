import React, { useState, useEffect } from 'react'
import { Text } from 'ink';
import { say } from './utils.js';

export default function Counter() {
	say();
	const [counter, setCounter] = useState(0);
	useEffect(() => {
		const timer = setInterval(() => {
			setCounter(prevCounter => prevCounter + 1);
		}, 100);

		return () => {
			clearInterval(timer);
		};
	}, []);

	return <Text color="green">{counter} tests passed</Text>;
}
