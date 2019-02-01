import React from 'react';

const Input = (props) => {
	const { floatRight, highlightedText, handleChange } = props;
	const textareaStyle = {
		height: '350px',
		width: '49%',
		float: floatRight ? 'right' : 'left',
		padding: '5px',
		resize: 'none',
		overflowY: 'scroll',
		textAlign: 'left',
	};
	if (highlightedText === '') {
		return (
			<textarea
				defaultValue={props.originalText}
				style={textareaStyle}
				onChange={event => handleChange(event, floatRight ? 'originalTextRight' : 'originalTextLeft')}
				placeholder="Please enter some text!"
			/>
		);
	}
	return (
		<div style={textareaStyle} dangerouslySetInnerHTML={{ __html: highlightedText }} />
	);
};
export default Input;
