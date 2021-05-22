import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  textfield: {
    backgroundColor: "#eaf4fc",
    width: 350,

    paddingTop: "10px",
    paddingBottom: "30px",
    marginBottom: "20px",
    paddingLeft: "20px",
    paddingRight: "10px",
    height: 45,
    borderRadius: 15,
  },

  input: {
    "&::placeholder": {
      fontSize: 14,
    },
  },
}));

const FormInput = (props) => {
  const { control } = useFormContext();
  const { name, placeholder, required, errorobj, register } = props;
  const classes = useStyle();
  let isError = false;
  let errorMessage = "";
  if (errorobj && errorobj.hasOwnProperty(name)) {
    isError = true;
    errorMessage = errorobj[name].message;
  }

  return (
    <Controller
      render={({ field }) => (
        <TextField
          control={control}
          className={classes.textfield}
          placeholder={placeholder}
          error={isError}
          helperText={errorMessage}
          {...field}
          InputProps={{
            disableUnderline: true,
            classes: { input: classes.input },
          }}
        />
      )}
      name={name}
      {...props}
    />
  );
};

export default FormInput;
