import React from "react";
import Navigation from "../navigation/Navigation";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import {courseId, courseName, courseDescription} from "../../cache";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    heading: {
      // fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
      fontSize:"large",
    },
  })
);

function Course() {
  const classes = useStyles();

  return (
    <div>
      <Navigation />
      <div style={{ padding:"2%"}}>
      <Grid container>

        {/* Row 1 start */}
        <Grid item md={6} style={{ textAlign: "justify", textJustify: "inter-word", margin: "auto", padding:"3%"}}>
          <h1> {courseName()}</h1><br/>
          <h3>Course Description</h3><br/>
            {courseDescription()}
        </Grid>
        <Grid item md={6} >
          <CardMedia style={{width:"80%", height:"95%" ,float:"right"}}
                component="img"
                alt="Course Image"
                image="https://courseshunter.com/media/images/hello-react-react-training-for-javascript-beginners.jpg"
                title="Course Name"
            />
        </Grid>
        {/* Row 1 End */}

        {/* Row 2 Start */}

          <Grid item md={7}  style={{ textAlign: "center", margin: "auto"}}>
            <h1>Sections</h1>
            <br/>
          <div className={classes.root}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>Class Component</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={classes.heading}>Functional Component</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>Class Component</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={classes.heading}>Functional Component</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>

          </div>
          </Grid>
        {/* Row 2 End */}       

      </Grid>
    </div>
  </div>
  );
}

export default Course;
