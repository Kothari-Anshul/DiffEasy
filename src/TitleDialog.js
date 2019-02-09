import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const TitleDialog = props => {
	const { open, handleChange, handleSave } = props;
	return (
		<Dialog open={open} onClose={() => handleChange('isTitleDialogOpen', false)}>
			<DialogTitle>Give suitable Title!</DialogTitle>
			<DialogContent>
				<TextField autoFocus margin="dense" fullWidth onChange={event => handleChange('title', event.target.value)} />
			</DialogContent>
			<DialogActions>
				<Button onClick={() => handleChange('isTitleDialogOpen', false)} color="primary">
					Cancel
				</Button>
				<Button onClick={() => handleSave()} color="primary">
					Save
				</Button>
			</DialogActions>
		</Dialog>
	);
};
export default TitleDialog;
