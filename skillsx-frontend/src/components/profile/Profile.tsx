import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { userId } from "../../cache";
import "./Profile.css";
import Navigation from "../navigation/Navigation";

import { useQuery, useMutation } from "@apollo/client";
import { findUserByID, updateUser } from "../../queries/mutations";

import Footer from "../footer/Footer";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
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
  cancel: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "red",
    color: "white",
  },
}));

export default function Profile() {
  const classes = useStyles();

   //alert style
   const alertStyle = { color: "red", marginTop: "2%" };

  //fetching records based on current logged in user id 
  const id = userId();

  //Query & Mutation Error Handling States
  const [onQueryError, setOnQueryError] = useState(false);
  const [onMutationError, setOnMutationError] = useState(false);

  //fetch the logged in user using id
  const { loading, error, data } = useQuery(findUserByID,{
    variables: { _id: id  },
    fetchPolicy: "cache-and-network", 
    onError: (e) => {
      setOnQueryError(true);
    }
  });

  // state Variables
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("1234");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [updatedSuccessfully, setUpdatedSuccessfully] = useState(123);

  
  useEffect(()=>{
    setFirstName(data && data.findUserByID.firstName)
    setLastName(data && data.findUserByID.lastName)
    setEmail(data && data.findUserByID.email)
    setPhoneNumber(data && data.findUserByID.phoneNo)
  },[data])

  
  
  //call mutation for updating the data
  const [updateProfile] = useMutation(updateUser,{
    onError: (e) => {
    setOnMutationError(true);
   },
   onCompleted: (e) => {
    setUpdatedSuccessfully(1);
   }
  });

  //  functions
  const updateUserDetailsHandler = (e: any) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    //updating the data
    updateProfile({
      variables: {
        _id: id, 
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        phoneNo: phoneNumber,
        isActive: true,
      },
      
      refetchQueries: [{ query: findUserByID, variables:{  _id: id } }]
    });

  };

  const reset = () =>{
    setFirstName(data && data.findUserByID.firstName)
    setLastName(data && data.findUserByID.lastName)
    setEmail(data && data.findUserByID.email)
    setPhoneNumber(data && data.findUserByID.phoneNo)
  }
    
  return (
    <div>
      <Navigation />
      <Grid container className={classes.root}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} className="gridItem">
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Profile
            </Typography>
            {
              updatedSuccessfully === 1 && isSubmitted ?<p style={{color:"green"}}>Details Updated Successfully</p> :""
            }
            <br/>
            {
              onQueryError?<p style={alertStyle}>Unable To Fetch Data</p> :""
            }
            {
              onMutationError?<p style={alertStyle}>Unable To Update The Data</p> :""
            }
            <br/>            
            <form
              onSubmit={updateUserDetailsHandler}
              className={classes.form}
              noValidate
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <label>First Name</label>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    defaultValue={firstName}
                    value={firstName && firstName}
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
                  <label>Last Name</label>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    defaultValue={lastName}
                    value={lastName && lastName}
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
                  <label>Email</label>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"                    
                    defaultValue={email}
                    value={email && email}
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
                </Grid>

                <Grid item xs={12}>
                  <label> Phone No</label>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="Phone_number"
                    type="text"
                    defaultValue={phoneNumber}
                    value={phoneNumber && phoneNumber}
                    id="Phone_number"
                    autoComplete="off"
                    onChange={(e: any) => {
                      setPhoneNumber(e.target.value);
                    }}
                  />
                  {!phoneNumber && isSubmitted ? (
                    <p style={alertStyle}>Phone Number is required </p>
                  ) : (
                    ""
                  )}
                </Grid>

                <Grid item xs={6}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={updateUserDetailsHandler}
                  >
                    {loading?"Updating...":"Update"}
                  </Button>
                </Grid>

                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.cancel}
                    onClick={()=>{reset()}}
                  >
                    Reset
                  </Button>
                </Grid>
              </Grid>

              <Footer />
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
