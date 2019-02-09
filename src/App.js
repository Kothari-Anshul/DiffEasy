import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Input from './Input';
import Header from './Header';
import Settings from './Settings';
import Footer from './Footer';
import TitleDialog from './TitleDialog';
import ReloadDialog from './ReloadDialog';

const styles = theme => ({
	button: {
		margin: theme.spacing.unit,
		marginTop: '15px',
	},
});

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			originalTextLeft: '',
			originalTextRight: '',
			isEditable: true,
			isCompareByLetter: false,
			isCaseSensitive: true,
			isSettingsOpen: false,
			highlightColor: 'greenyellow',
			title: '',
			isTitleDialogOpen: false,
			isReloadDialogOpen: false,
		};
	}
	/*
	The below function takes originalTextLeft and originalTextRight as input and returns
	and highlightedTextLeft as output.
	Algorithm:
	Step 1: Break both strings into lines array
	Step 2: Loop over all the lines
	Step 3: Break both lines into words array
	Step 4: Loop over words and compare them if unequal add them inside <span> else outside <span>
	Step 5: isSpanOpen is used to group contiguous unequal words
	Step 6: Also considered edge cases such as unequal no. of lines or unequal no. of words in the given line (using while loop for it)
	*/

	getWord = (bagOfWords, wordIndex) => {
		return wordIndex < bagOfWords.length ? bagOfWords[wordIndex] : '';
	};

	getLine = (bagOfLines, lineIndex) => {
		return lineIndex < bagOfLines.length ? bagOfLines[lineIndex] : '';
	};

	isEqual = (word1, word2) => {
		const { isCaseSensitive } = this.state;
		return isCaseSensitive ? word1 === word2 : word1.toLocaleLowerCase() === word2.toLocaleLowerCase();
	};

	getHighlightedText = () => {
		const { originalTextLeft, originalTextRight, isCompareByLetter, highlightColor } = this.state;
		const bagOfLinesLeft = originalTextLeft.split('\n');
		const bagOfLinesRight = originalTextRight.split('\n');
		let textLeft = '';
		let textRight = '';
		let lineIndex;
		for (lineIndex = 0; lineIndex < Math.max(bagOfLinesLeft.length, bagOfLinesRight.length); lineIndex++) {
			const splitByChar = isCompareByLetter ? '' : ' ';
			const bagOfWords1 = this.getLine(bagOfLinesLeft, lineIndex).split(splitByChar);
			const bagOfWords2 = this.getLine(bagOfLinesRight, lineIndex).split(splitByChar);
			let isSpanOpen = false;
			let wordIndex;
			for (wordIndex = 0; wordIndex < Math.max(bagOfWords1.length, bagOfWords2.length); wordIndex++) {
				const word1 = this.getWord(bagOfWords1, wordIndex);
				const word2 = this.getWord(bagOfWords2, wordIndex);
				if (!this.isEqual(word1, word2)) {
					if (!isSpanOpen) {
						textLeft = `${textLeft}<span style="background-color:${highlightColor}">${splitByChar}`;
						textRight = `${textRight}<span style="background-color:${highlightColor}">${splitByChar}`;
						isSpanOpen = true;
					}
					textLeft += `${word1}${splitByChar}`;
					textRight += `${word2}${splitByChar}`;
				} else {
					if (isSpanOpen) {
						textLeft += '</span>';
						textRight += '</span>';
						isSpanOpen = false;
					}
					textLeft += `${word1}${splitByChar}`;
					textRight += `${word2}${splitByChar}`;
				}
			}
			if (isSpanOpen) {
				textLeft += '</span>';
				textRight += '</span>';
				isSpanOpen = false;
			}
			textLeft += '<br/>';
			textRight += '<br/>';
		}

		return { highlightedTextLeft: textLeft, highlightedTextRight: textRight };
	};

	handleChange = (key, value) => {
		this.setState({ [key]: value });
	};

	handleGetDifference = () => {
		const { originalTextLeft, originalTextRight } = this.state;
		if (originalTextLeft !== '' && originalTextRight !== '') {
			this.setState({ isEditable: false });
		}
	};

	handleSave = () => {
		const { originalTextLeft, originalTextRight, title } = this.state;
		const data = {
			originalTextLeft,
			originalTextRight,
			title,
		};
		this.handleChange('isTitleDialogOpen', false);
		const date = Date();
		// Use localstorage to save the text temporarily!
		if ('savedDiff' in localStorage) {
			const existingDiff = JSON.parse(localStorage.getItem('savedDiff'));
			existingDiff[date] = data;
			localStorage.setItem('savedDiff', JSON.stringify(existingDiff));
		} else {
			localStorage.setItem('savedDiff', JSON.stringify({ date: data }));
		}
	};

	render() {
		const { classes } = this.props;
		const { isEditable, originalTextLeft, originalTextRight } = this.state;
		const { isSettingsOpen, isCaseSensitive, highlightColor, isCompareByLetter, isTitleDialogOpen, isReloadDialogOpen } = this.state;
		const { highlightedTextLeft, highlightedTextRight } = isEditable
			? {
					highlightedTextLeft: '',
					highlightedTextRight: '',
			  }
			: this.getHighlightedText();
		return (
			<div className="App" style={{ margin: '2px', marginTop: '0px' }}>
				<Header handleChange={this.handleChange} />
				<Settings
					open={isSettingsOpen}
					handleChange={this.handleChange}
					isCaseSensitive={isCaseSensitive}
					isCompareByLetter={isCompareByLetter}
					highlightColor={highlightColor}
				/>
				<Input highlightedText={highlightedTextLeft} originalText={originalTextLeft} handleChange={this.handleChange} floatRight={false} />
				<Input highlightedText={highlightedTextRight} originalText={originalTextRight} handleChange={this.handleChange} floatRight />
				{isEditable && (
					<React.Fragment>
						<Button
							variant="contained"
							color="primary"
							className={classes.button}
							onClick={() => {
								this.handleChange('originalTextLeft', '');
								this.handleChange('originalTextRight', '');
							}}
						>
							Clear Text
						</Button>
						<Button variant="contained" color="primary" className={classes.button} onClick={this.handleGetDifference}>
							Get Difference
						</Button>
					</React.Fragment>
				)}
				{isEditable === false && (
					<Button variant="contained" color="primary" className={classes.button} onClick={() => this.handleChange('isEditable', true)}>
						Edit
					</Button>
				)}
				<TitleDialog handleChange={this.handleChange} open={isTitleDialogOpen} handleSave={this.handleSave} />
				<ReloadDialog open={isReloadDialogOpen} handleChange={this.handleChange} />
				<Footer />
			</div>
		);
	}
}

App.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
