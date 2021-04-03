import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Grid from "@material-ui/core/Grid";
import Navigation from "../navigation/Navigation";
import { courseId, courseName, courseDescription } from "../../cache";
import "./Courses.css";
import { useHistory } from "react-router-dom";
import { IMG_URL } from "../../utilities/Constants";

import { useQuery } from "@apollo/client";
import { fetchCourses } from "../../queries/mutations";

import Footer from "../footer/Footer";

const useStyles = makeStyles({
  root: {
    // maxWidth: 345,
  },
});

export default function Courses() {

  const classes = useStyles();
  const history = useHistory();

  //query error handling state
  const [onError, setOnError] = useState(false);

  //fetch All Courses
  const { loading, error, data } = useQuery(fetchCourses, {
    onError: (e) => {
      setOnError(true);
    },
  });

  //onClick Function for Card
  const courseDetails = (id: any, name: any, description: any) => {
    courseId(id);
    courseName(name);
    courseDescription(description);
    history.push("/Course", courseId());
  };

  return (
    <div className="main-div">
      <Navigation />
      <h2 className="courses">Courses</h2>

      <div className="cards-container">
        <Grid container spacing={2}>
          {data &&
            data.fetchCourses.map((course: any) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                onClick={() => {
                  courseDetails(course._id, course.title, course.description);
                }}
              >
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="Course Image"
                      height="140"
                      image={IMG_URL}
                      title="Course Image"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {course.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {course.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => {
                        alert("hello there !");
                      }}
                    >
                      Request this Course
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
      </div>
      <Footer/>
      <br/>
    </div>
  );
}
