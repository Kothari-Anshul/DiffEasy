import React from 'react';

const currentCount = 20;
const getNoOfLines = str => {
	const modifiedStr = str.replace(/\n\n/g, '\n');
	let newCount = 0;
	for (let i = 0; i < modifiedStr.length; i++) {
		if (modifiedStr[i] === '\n') {
			newCount++;
		}
	}
	return newCount + 1 > currentCount ? newCount + 1 : currentCount;
};

const Editor = props => {
	const { handleChange, floatLR } = props;
	const listItems = [];
	for (let i = 0; i < getNoOfLines(props.originalText); i++) {
		listItems.push(
			<div className="numbers" key={i}>
				{i + 1}
			</div>,
		);
	}
	return (
		<div style={{ height: '62vh', width: '49.1%', margin: '0.35%', overflow: 'auto', float: floatLR, backgroundColor: '#ffffff' }}>
			<div className="minHeight" style={{ width: '5%', float: 'left', overflowX: 'hidden' }}>
				{listItems}
			</div>
			<div
				placeholder="Please enter some text to compare!"
				className="minHeight noOutline"
				style={{ width: '95%', float: 'left', textAlign: 'left', overflowX: 'auto' }}
				onInput={event => handleChange(floatLR === 'left' ? 'originalTextLeft' : 'originalTextRight', event.target.innerText)}
				contentEditable="true"
			/>
			<div style={{ clear: 'both' }} />
		</div>
	);
};
export default Editor;
