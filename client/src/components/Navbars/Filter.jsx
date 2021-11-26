import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import { getMatchedLessons } from 'content/ContentList';

const useStyles = makeStyles({
    root: {
        width: 200,
        marginLeft: 35,
    },
    filterType: {
        color: 'black',
    },
});

const Filter = ({ setTopics }) => {
    const [course, setCourse] = React.useState('');

    const handleChange = (event) => {
        setCourse(event.target.value);
    };

    const handleFilter = async () => {
        const reg = new RegExp(`${course}`);
        setTopics(await getMatchedLessons(reg));
    };
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {/* <Typography id="discrete-slider-restrict" gutterBottom className={classes.filterType}>
                Filter by course code
            </Typography>
            <Slider
                value={code}
                getAriaValueText={valuetext}
                valueLabelFormat={valueLabelFormat}
                aria-labelledby="discrete-slider-restrict"
                step={null}
                valueLabelDisplay="auto"
                marks={codes}
                onChange={(e, val) => setCode(val)}
            /> */}
            <FormControl component="fieldset">
                <FormLabel component="legend">Filter by course code</FormLabel>
                <RadioGroup
                    aria-label="course-code"
                    name="course code"
                    value={course}
                    onChange={handleChange}
                    row
                >
                    <FormControlLabel value="comp1511" control={<Radio />} label="COMP1511" />
                    <FormControlLabel value="comp2521" control={<Radio />} label="COMP2521" />
                </RadioGroup>
                <Button variant="contained" color="primary" onClick={(e) => handleFilter(e)}>
                    Filter
                </Button>
            </FormControl>
        </div>
    );
};

Filter.propTypes = {
    setTopics: PropTypes.func,
};

export default Filter;