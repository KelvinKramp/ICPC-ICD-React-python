/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
	header: {
		margin: "auto",
		width: "50%",
		marginTop: 50,
	},
	container: {
		margin: "auto",
		width: "50%",
		border: "3px solid orange",
		padding: "20px",
		height:600,
		marginTop:"40px",
		borderRadius: "15px",
		"& > * + *": {
			marginTop: theme.spacing(3)
		}
	},
	root: {
		width: "90%",
		margin: 'auto',
		marginTop: 50,
		"& > * + *": {
			marginTop: theme.spacing(3)
		}
	},

}));

export default function Tags() {
	const classes = useStyles();
	const [autocompleteValues, setAutocompleteValues] = useState([
	]);
	const [ICPCCodes, setICPCList] = useState([
	]);

	const handleChange = (event, value) => {
		setAutocompleteValues(value);
	};

	// Using useEffect for single rendering
	useEffect(() => { 
		fetch("http://127.0.0.1:5000/data").then((res) =>
			res.json().then((response_data) => {
				// Setting a data from api
				console.log(response_data)
				setICPCList(response_data) 
			})
		);
	}, []);


	return (
		<div className={classes.background}>	
		<div className={classes.container}>	
		<h1 className={classes.header}>ICD ICPC classifcation</h1>
		<div className={classes.root}>

			<Autocomplete
				multiple
				value={autocompleteValues}
				id="tags-standard"
				options={ICPCCodes}
				getOptionLabel={(option) => option["ICPC Titel"]} // Based on current value in input textfield check if a an option is selected.
				onChange={handleChange}
				renderInput={(params) => ( // Render the option, use `getOptionLabel` by default.
					// https://mui.com/material-ui/react-text-field/
					<TextField
						{...params}
						variant="outlined"
						label="Reason of consult"
						placeholder="..."
					/>
				)}
			/>

		</div>
		</div>
		</div>
	);
}
