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
import { courseId } from "../../cache";
import "./Courses.css";
import { useHistory } from "react-router-dom";

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
      "courseName": "react",
      "id":1,
      "courseTitle": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "courseDescription": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    },
    {
      "courseName": "react",
      "id":2,
      "courseTitle": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "courseDescription": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    },
    {
      "courseName": "react",
      "id":3,
      "courseTitle": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "courseDescription": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    },
    {
      "courseName": "react",
      "id":4,
      "courseTitle": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "courseDescription": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    },
    {
      "courseName": "react",
      "id":5,
      "courseTitle": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "courseDescription": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    },
    {
      "courseName": "react",
      "id":6,
      "courseTitle": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "courseDescription": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    },
    {
      "courseName": "react",
      "id": 7,
      "courseTitle": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "courseDescription": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    },
   
  ];

  const showCardDetail = (id:any) =>{
   courseId(id);
   history.push("/Course", courseId);
  }

  return (   
    
    <div className="main-div">
      <Navigation />
      <h2 className="courses">Courses</h2>

      <div className="cards-container">
      <Grid container spacing={2} >
      {courses.map((course) => (
        <Grid item md={3} onClick={()=>{
          showCardDetail(course.id)
        }}>
          
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image="https://courseshunter.com/media/images/hello-react-react-training-for-javascript-beginners.jpg"
                title="Contemplative Reptile"
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
              <Button size="small" color="primary">
                Share
              </Button>
              <Button size="small" color="primary">
                Learn More
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
