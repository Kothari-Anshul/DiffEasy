import React from 'react';

const Input = props => {
	const { floatRight, highlightedText, handleChange } = props;
	const textareaStyle = {
		height: '350px',
		width: '49%',
		float: floatRight ? 'right' : 'left',
		padding: '5px',
		paddingTop: '10px',
		resize: 'none',
		overflow: 'auto',
		textAlign: 'left',
		border: '1px solid rgb(169, 169, 169)',
	};
	if (highlightedText === '') {
		return (
			<textarea
				value={props.originalText}
				style={textareaStyle}
				onChange={event => {
					if (floatRight) {
						handleChange('originalTextRight', event.target.value);
					} else {
						handleChange('originalTextLeft', event.target.value);
					}
				}}
				placeholder="Please enter some text!"
			/>
		);
	}
	return <div style={textareaStyle} dangerouslySetInnerHTML={{ __html: highlightedText }} />;
};
export default Input;
