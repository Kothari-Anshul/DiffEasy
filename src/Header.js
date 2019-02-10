import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FolderOpen from '@material-ui/icons/FolderOpen';
import Settings from '@material-ui/icons/Settings';
import Save from '@material-ui/icons/Save';

const styles = {
	root: {
		flexGrow: 1,
	},
	grow: {
		flexGrow: 1,
		textAlign: 'left',
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20,
	},
};

const Header = props => {
	const { classes } = props;
	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" color="inherit" className={classes.grow}>
						DIFFERENCE MADE EASY
					</Typography>
					<IconButton color="inherit" onClick={() => props.handleChange('isReloadDialogOpen', true)}>
						<FolderOpen />
					</IconButton>
					<IconButton color="inherit" onClick={() => props.handleChange('isTitleDialogOpen', true)}>
						<Save />
					</IconButton>
					<IconButton color="inherit" onClick={() => props.handleChange('isSettingsOpen', true)}>
						<Settings />
					</IconButton>
				</Toolbar>
			</AppBar>
		</div>
	);
};

Header.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
