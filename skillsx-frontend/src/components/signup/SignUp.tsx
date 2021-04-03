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

import { registerUser } from "../../queries/mutations";
import { useMutation } from "@apollo/client";

import "./SignUp.css";
import Footer from "../footer/Footer";

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

export default function SignUp() {
  const classes = useStyles();

  // state Variables
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [onError, setOnError] = useState(false);

  // state Variables for validation
  const [phoneValidation, setPhoneValidation] = useState(123);
  const [emailValidation, setEmailValidation] = useState(123);
  const [passwordValidation, setPasswordValidation] = useState(123);

  //Executing SignUp Mutation
  const [signUpUser, { data, loading, error }] = useMutation(registerUser,{
    onError: (e) => {
      setOnError(true);
    } 
  });

  //alert style
  const alertStyle = { color: "red", marginTop: "2%" };

  //  functions
  const signUpHandler = (e: any) => {
    e.preventDefault();

    //email validation using RegX
    var emailRGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var emailResult = emailRGEX.test(email);

    if(email){      
      if(emailResult === false){
        setEmailValidation(0)
      }
      else{
        setEmailValidation(1)
      }
    }
    
    //phone Number validation using RegX
    var phoneRGEX = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/g;
    var phoneResult = phoneRGEX.test(phoneNumber);
   
    if(phoneNumber){
      if(phoneResult === false)
      {
        setPhoneValidation(0)     
      }
      else{
        setPhoneValidation(1)
      }
    }
    
    //password Validation
    if(password){
      if(isSubmitted && password.length<=6){
        setPasswordValidation(0)
      }
      else{
        setPasswordValidation(1)
      }
    }
   

    setIsSubmitted(true);

    signUpUser({
      variables: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        isActive: true,
        phoneNo: phoneNumber,
      },
    });

  };

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
              Sign Up
            </Typography>
            <br />
            {
              onError?<p className="error">Oops! Something Went Wrong...</p> :""
            }
            <br/>
            <form onSubmit={signUpHandler} className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    onChange={(e: any) => {
                      setFirstName(e.target.value);
                    }}
                  />
                  {!firstName && isSubmitted ? (
                    <p style={alertStyle}>First Name is required </p>
                  ) : (
                    ""
                  )}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    onChange={(e: any) => {
                      setLastName(e.target.value);
                    }}
                  />
                  {!lastName && isSubmitted ? (
                    <p style={alertStyle}>Last Name is required </p>
                  ) : (
                    ""
                  )}
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(e: any) => {
                      setEmail(e.target.value);
                    }}
                  />
                  {!email && isSubmitted ? (
                    <p style={alertStyle}>Email is required </p>
                  ) : (
                    ""
                  )}

                  {
                    emailValidation === 0 && isSubmitted ?<p style={{color:"red"}}> Invalid Email</p>:""
                  }
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="Phone_number"
                    label="Phone Number"
                    type="text"
                    id="Phone_number"
                    autoComplete="off"
                    onChange={(e: any) => {
                      setPhoneNumber(e.target.value)
                    }}
                  />
                  {!phoneNumber && isSubmitted ? (
                    <p style={alertStyle}>Phone Number is required </p>
                  ) : (
                    ""
                  )}

                  {
                    phoneValidation === 0 && isSubmitted ?<p style={{color:"red"}}>Invalid Number</p>:""
                  }

                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
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
                  
                  {
                    passwordValidation === 0 && isSubmitted ?<p style={{color:"red"}}> Weak Password</p> :""
                  }

                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                { loading? "Signing Up":"Sign Up"}
              </Button>

              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>

              <Footer/>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
