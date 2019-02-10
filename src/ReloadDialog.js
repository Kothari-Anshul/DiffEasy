import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import RestorePage from '@material-ui/icons/RestorePage';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

const ReloadDialog = props => {
	const { open, handleChange } = props;
	if (!('savedDiff' in localStorage)) {
		localStorage.setItem('savedDiff', JSON.stringify({}));
	}
	const existingDiff = JSON.parse(localStorage.getItem('savedDiff'));
	const listItems = Object.keys(existingDiff).map(key => {
		return (
			<ListItem divider key={key}>
				<ListItemText primary={existingDiff[key].title} secondary={new Date(key).toDateString()} />
				<ListItemSecondaryAction>
					<IconButton
						onClick={() => {
							delete existingDiff[key];
							localStorage.setItem('savedDiff', JSON.stringify(existingDiff));
							handleChange('isReloadDialogOpen', false);
						}}
					>
						<DeleteIcon />
					</IconButton>
					<IconButton
						onClick={() => {
							handleChange('originalTextLeft', existingDiff[key].originalTextLeft);
							handleChange('originalTextRight', existingDiff[key].originalTextRight);
							handleChange('isReloadDialogOpen', false);
						}}
					>
						<RestorePage />
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>
		);
	});
	return (
		<Dialog open={open} maxWidth="sm" fullWidth onClose={() => handleChange('isReloadDialogOpen', false)} scroll="paper">
			<DialogTitle>Your Saved Differences!</DialogTitle>
			<DialogContent>
				<List>
					{listItems.length > 0 ? (
						listItems
					) : (
						<ListItem>
							<ListItemText primary="No Data Found" />
						</ListItem>
					)}
				</List>
			</DialogContent>
		</Dialog>
	);
};

export default ReloadDialog;
