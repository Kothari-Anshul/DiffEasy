import React from 'react';
import TextField from '@material-ui/core/TextField';

const minNoOfLines = 20;
const getNoOfLines = str => {
	let newCount = 0;
	for (let i = 0; i < str.length; i++) {
		if (str[i] === '\n') {
			newCount++;
		}
	}
	return newCount + 1 > minNoOfLines ? newCount + 1 : minNoOfLines;
};

const Editor = props => {
	const { handleChange, floatLR, isEditable, highlightedText, originalText } = props;
	const listItems = [];
	const noOfLines = getNoOfLines(originalText);
	for (let i = 0; i < noOfLines; i++) {
		listItems.push(
			<div className="numbers" key={i}>
				{i + 1}
			</div>,
		);
	}
	const textareaStyle = {
		width: '88%',
		float: 'left',
		textAlign: 'left',
		padding: '0px',
		border: 'none',
		boxSizing: 'border-box',
		resize: 'none',
	};
	return (
		<div style={{ height: '62vh', overflow: 'auto', backgroundColor: '#ffffff' }}>
			<div
				className="minHeight"
				style={{
					width: '11%',
					float: 'left',
					overflowX: 'hidden',
					background: '#fafafa',
					borderRight: '1px solid #e8e8e8',
					boxSizing: 'border-box',
					paddingTop: '6px',
				}}
			>
				{listItems}
			</div>
			{isEditable ? (
				<TextField
					inputProps={{ className: 'minHeight noOutline noScroll' }}
					placeholder="Please enter some text to compare!"
					multiline
					onChange={event => handleChange(floatLR === 'left' ? 'originalTextLeft' : 'originalTextRight', event.target.value)}
					style={textareaStyle}
					value={originalText}
				/>
			) : (
				<div className="minHeight noOutline" style={textareaStyle} dangerouslySetInnerHTML={{ __html: highlightedText }} />
			)}

			<div style={{ clear: 'both' }} />
		</div>
	);
};
export default Editor;
