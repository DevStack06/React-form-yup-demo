import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import FormInput from "./input";
import { useForm, FormProvider } from "react-hook-form";
import Address from "./Address";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AutoComplete from "./Title";
import axios from "axios";
import React, { useEffect, useState } from "react";
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = yup.object().shape({
  nameV: yup.string().required("Name Validation Field is Required"),
  emailV: yup.string().email().required("Email is not valid"),
  phoneV: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone number is not valid"),
  countryV: yup.string().required("country Validation Field is Required"),
});

const useStyle = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },

  Maimgrid1: {
    backgroundColor: "#fff",
    height: "100vh",
    width: "100vw",
    marginLeft: "25%",
    display: "block",
    // width: "100%",
  },

  title: {
    color: "#2a808a",
    fontWeight: "bold",
    paddingTop: 66,
  },

  button: {
    backgroundColor: "#2a808a",
    borderRadius: 30,
    color: "#fff",
    width: "32%",
    paddingTop: "13px",
    paddingBottom: "13px",
  },
  divider: {
    width: "23%",
    margin: "auto",
    opacity: "0.5 ",
    color: "grey",
    height: "2px",
  },
}));

const Login = () => {
  const classes = useStyle();
  const [data, setData] = useState([]);
  const [fetching, setfetching] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get("https://jsonplaceholder.typicode.com/todos").then((data) => {
      setData(data.data);
      setfetching(false);
    });
  };

  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data) => {
    console.log(data);
    console.log("ere");
  };

  return fetching ? (
    <div>Loading the data</div>
  ) : (
    <div className={classes.root}>
      <CssBaseline />

      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.Maimgrid1}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom className={classes.title}>
              Sign in to Web App
            </Typography>
          </Grid>

          <Box component="span" m={1}></Box>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormInput
                    name="nameV"
                    placeholder="Name"
                    required={true}
                    errorobj={errors}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInput
                    name="phoneV"
                    placeholder="Phone Number"
                    required={true}
                    errorobj={errors}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInput
                    name="emailV"
                    placeholder="Email"
                    required={true}
                    errorobj={errors}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Address
                  placeholder="Choose a country"
                  name="countryV"
                  required={true}
                  errorobj={errors}
                />
              </Grid>
            </form>
          </FormProvider>

          <Box component="span" m={1}></Box>

          <Grid item xs={12}>
            <Typography variant="subtitle2" gutterBottom>
              Forgot Your Password? SignUp
            </Typography>
          </Grid>
          <Box m={4}></Box>
          <Grid item xs={12}>
            <Button
              variant="contained"
              className={classes.button}
              onClick={handleSubmit(onSubmit)}
            >
              Sign In
            </Button>
            <Box m={4}></Box>
            <Grid item xs={12}>
              <AutoComplete suggestions={data} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
