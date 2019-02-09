import Drawer from '@material-ui/core/Drawer';
import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ColorPicker from 'material-ui-color-picker';

const styles = theme => ({
	list: {
		width: 250,
	},
	fullList: {
		width: 'auto',
	},
	root: {
		backgroundColor: theme.palette.background.paper,
	},
});

const Settings = props => {
	const { isCompareByLetter, isCaseSensitive, highlightColor, handleChange, open, classes } = props;
	const colorPicker = (
		<React.Fragment>
			<ColorPicker name="color" defaultValue="#0000" onChange={color => handleChange('highlightColor', color)} value={highlightColor} />
		</React.Fragment>
	);
	const sideList = (
		<div className={classes.list}>
			<List className={classes.root}>
				<ListItem>
					<ListItemText primary="Compare by Letter" secondary="default is by word" />
					<ListItemSecondaryAction>
						<Switch checked={isCompareByLetter} onChange={() => handleChange('isCompareByLetter', !isCompareByLetter)} />
					</ListItemSecondaryAction>
				</ListItem>
				<ListItem>
					<ListItemText primary="Case Sensitive" />
					<ListItemSecondaryAction>
						<Switch checked={isCaseSensitive} onChange={() => handleChange('isCaseSensitive', !isCaseSensitive)} />
					</ListItemSecondaryAction>
				</ListItem>
				<ListItem>
					<ListItemText primary="Highlight Color" secondary={colorPicker} />
				</ListItem>
			</List>
		</div>
	);
	return (
		<Drawer anchor="right" open={open} onClose={() => handleChange('isSettingsOpen', false)}>
			<div tabIndex={0} role="button" onKeyDown={() => handleChange('isSettingsOpen', false)}>
				{sideList}
			</div>
		</Drawer>
	);
};

Settings.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Settings);
