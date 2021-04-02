import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { loginUser } from "../../queries/mutations";
import { useMutation } from "@apollo/client";

import { useHistory } from "react-router-dom";

import { loginAccess, userAccessToken } from "../../cache";
import { userId } from "../../cache";

import "./Login.css";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://www.trainingzone.co.uk/sites/default/files/styles/inline_banner/public/istock-889968488.jpg?itok=Otuy0qok)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(0),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const history = useHistory();

  //alert style
  const alertStyle = { color: "red" };

  // state Variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [onError, setOnError] = useState(false);

  const [loginSubmitted, { data, loading, error }] = useMutation(loginUser,{
    onError: (e) => {
      setOnError(true);
    } 
  });

  //functions
  const loginHandler = (e: any) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (email && password) {
      loginSubmitted({
        variables: { email: email, password: password },
      });
    }
  };

  if (data) {
    loginAccess(true);
    history.push("/Courses", loginAccess());
    
    //storing userId & accessToken in reactive variables 
    userId(data.loginUser._id);
    userAccessToken("Bearer ".concat(data.loginUser.accessToken));
  }


  return (
    <div>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <br/>

            {
              onError?<p style={alertStyle}>Invalid Credentials</p> :""
            }
            
            <form onSubmit={loginHandler} className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e: any) => {
                  setEmail(e.target.value);
                }}
              />
              {!email && isSubmitted ? (
                <p style={alertStyle}>Email is required </p>
              ) : (
                ""
              )}
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e: any) => {
                  setPassword(e.target.value);
                }}
              />
              {!password && isSubmitted ? (
                <p style={alertStyle}>Password is required </p>
              ) : (
                ""
              )}

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />              

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={loginHandler}
              >
              { loading? "loading":"Sign in"}
              </Button>

              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  align="center"
                >
                  {"Copyright © "}
                  <Link color="inherit" href="#">
                    SkillsX
                  </Link>{" "}
                  {new Date().getFullYear()}
                  {"."}
                </Typography>
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
