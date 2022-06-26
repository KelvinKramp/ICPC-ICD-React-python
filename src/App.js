/* eslint-disable no-use-before-define */

// NOTES
// Customize paper
// https://react.school/material-ui/paper
// Open dialog 
// https://mui.com/material-ui/react-select/
// Textfield
// https://mui.com/material-ui/react-text-field/

import { useState, useEffect } from "react";
import * as React from 'react';
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';


const useStyles = makeStyles((theme) => ({
	header: {
		margin: "auto",
		width: "50%",
		marginTop: 50,
	},
	container: {

	},
	content: {
		marginTop: 20,
	},
	customBorder: {
		margin: "auto",
		width: "50%",
		border: "3px solid orange",
		padding: "20px",
		height: 600,
		marginTop: "40px",
		"& > * + *": {
			marginTop: theme.spacing(3)
		}
	},
	root: {
		width: "90%",
		margin: 'auto',
		marginTop: 10,
		"& > * + *": {
			marginTop: theme.spacing(3)
		}
	},

}));

export default function App() {
	// Styling
	const classes = useStyles();

	// UseStates
	const [autocompleteValues, setAutocompleteValues] = useState([]);
	const [ICPCCodes, setICPCList] = useState([]);
	const [autoCompleteValuesLocations, setAutocompleteValuesLocations] = useState([])
	const [locations, setLocation] = useState([]);
	const [autoCompleteValuesDepartments, setAutocompleteValuesDepartments] = useState([])
	const [departments, setDepartment] = useState([]);
	const [name, setName] = useState('');

	// Click handlers

	const handleChange = (event, value) => {
		setName(event.target.value);
	};
	const handleChangeRFE = (event, value) => {
		setAutocompleteValues(value);
	}; // RFE = Reason For Encounter
	
	const handleChangeLocations = (event, value) => {
		setAutocompleteValuesLocations(value);
	}; 
	
	const handleChangeDepartments = (event, value) => {
		setAutocompleteValuesDepartments(value);
	}; 
	

	// Using useEffect for single rendering
	useEffect(() => {
		fetch("http://127.0.0.1:5000/data").then((res) =>
			res.json().then((response_data) => {
				// console.log(response_data)
				setICPCList(response_data)
			})
		);
	}, []);

	useEffect(() => {
		fetch("http://127.0.0.1:5000/locations").then((res) =>
			res.json().then((response_data) => {
				// console.log(response_data)
				setLocation(response_data)
			})
		);
	}, []);

	useEffect(() => {
		fetch("http://127.0.0.1:5000/departments").then((res) =>
			res.json().then((response_data) => {
				// console.log(response_data)
				setDepartment(response_data)
			})
		);
	}, []);

	console.log(autocompleteValues[0]?.["ICPC Titel"])
	console.log(autocompleteValues[0]?.["ICPC Titel"].includes("Urine"))

	return (
		<div className={classes.background}>
			<Paper elevation={10} className={classes.customBorder}>
				<div className={classes.container}>
					<div className={classes.root}>
						<Box sx={{ flexGrow: 1 }}>
							<Typography variant="h5" component="div" gutterBottom align='center'>
								Consult formulier
							</Typography>
							<Divider></Divider>
							<div className={classes.content}>
								<Grid container rowSpacing={4} columnSpacing={4}>
									<Grid item xs={6}>
									<Autocomplete
											value={autoCompleteValuesLocations}
											id="locations"
											options={locations}
											getOptionLabel={(option) => option.name} // Based on current value in input textfield check if a an option is selected.
											onChange={handleChangeLocations}
											renderInput={(params) => ( // Render the option, use `getOptionLabel` by default.

												<TextField
													{...params}
													variant="outlined"
													label="Location"
													placeholder="..."
												/>
											)}
										/>
									</Grid>
									<Grid item xs={6}>
									<Autocomplete
											value={autoCompleteValuesDepartments}
											id="departments"
											options={departments}
											getOptionLabel={(option) => option.name} // Based on current value in input textfield check if a an option is selected.
											onChange={handleChangeDepartments}
											renderInput={(params) => ( // Render the option, use `getOptionLabel` by default.

												<TextField
													{...params}
													variant="outlined"
													label="Department"
													placeholder="..."
												/>
											)}
										/>
									</Grid>
									<Grid item xs={4}>
										<RadioGroup
											row
											aria-labelledby="demo-row-radio-buttons-group-label"
											name="row-radio-buttons-group"
											defaultValue="female"
										>
											<FormControlLabel value="female" control={<Radio />} label="Mw." />
											<FormControlLabel value="male" control={<Radio />} label="Dhr." />
										</RadioGroup>
									</Grid>
									<Grid item xs={4}>
										<TextField
											id="outlined-name"
											variant="outlined"
											label="Last name"
											value={name}
											onChange={handleChange}
										/>
									</Grid>
									<Grid item xs={4}>
										<TextField
											id="date"
											variant="outlined"
											label="Birthdate"
											type="date"
											defaultValue=" "
											InputLabelProps={{
												shrink: true,
											}}
										/>
									</Grid>
									<Grid item xs={6}>
										<Autocomplete
											multiple
											value={autocompleteValues}
											id="tags-standard"
											options={ICPCCodes}
											getOptionLabel={(option) => option["ICPC Titel"]} // Based on current value in input textfield check if a an option is selected.
											onChange={handleChangeRFE}
											renderInput={(params) => ( // Render the option, use `getOptionLabel` by default.

												<TextField
													{...params}
													variant="outlined"
													label="Reason of consult"
													placeholder="..."
												/>
											)}
										/>

									</Grid>
									<Grid item xs={6}>
									{autocompleteValues.length > 0 && autocompleteValues[0]?.["ICPC Titel"].includes("Urine") &&
									<Box>
									<Link href="https://richtlijnen.nhg.org/standaarden/urineweginfecties" underline="hover" target="_blank">
									{'NHG Richtlijn urineweginfecties'}
									</Link>
									<div></div>
									<Link href="https://www.verenso.nl/richtlijnen-en-praktijkvoering/richtlijnendatabase/urineweginfecties" underline="hover" target="_blank">
									{'Urineweginfecties bij kwetsbare ouderen'}
									</Link>
									<div></div>
									<Link href="https://www.verenso.nl/richtlijnen-en-praktijkvoering/richtlijnendatabase/urineweginfecties" underline="hover" target="_blank">
									{'Gericall stappenplan'}
									</Link>
									</Box>
									}
									</Grid>


								</Grid>
							</div>
						</Box>


					</div>

				</div>
			</Paper>
		</div>
	);
}
