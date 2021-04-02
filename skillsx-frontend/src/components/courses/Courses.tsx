import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Navigation from "../navigation/Navigation";
import { courseId, courseName,courseDescription } from "../../cache";
import "./Courses.css";
import { useHistory } from "react-router-dom";
import { IMG_URL } from "../../utilities/Constants";

const useStyles = makeStyles({
  root: {
    // maxWidth: 345,
  },
});


export default function Courses() {
  const classes = useStyles();
  const history = useHistory();

 const courses= [
    {
      "courseName": "React",
      "id":1,
      "courseTitle": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "courseDescription": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    },
    {
      "courseName": "React",
      "id":2,
      "courseTitle": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "courseDescription": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    },
    {
      "courseName": "React",
      "id":3,
      "courseTitle": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "courseDescription": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    },
    {
      "courseName": "React",
      "id":4,
      "courseTitle": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "courseDescription": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    },
    {
      "courseName": "React",
      "id":5,
      "courseTitle": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "courseDescription": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    },
    {
      "courseName": "React",
      "id":6,
      "courseTitle": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "courseDescription": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    },
    {
      "courseName": "React",
      "id": 7,
      "courseTitle": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "courseDescription": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    },
   
  ];

  const courseDetails =(id:any, name:any, description:any) =>{
    courseId(id);
    courseName(name)
    courseDescription(description)
    history.push("/Course", courseId());
  }

  return (   
    
    <div className="main-div">
      <Navigation />
      <h2 className="courses">Courses</h2>

      <div className="cards-container">
      <Grid container spacing={2} >
      {courses.map((course) => (
        <Grid item md={3} onClick={()=>{
          courseDetails(course.id, course.courseName, course.courseDescription)
        }}>
          
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
                 {course.courseName}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {course.courseDescription}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary" onClick={()=>{alert('hello there !')}}>
                Request this Course
              </Button>
            </CardActions>
          </Card>

        </Grid>

      ))}
      </Grid>
      </div>

    </div>
  );
}
