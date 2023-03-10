import { Box, TextField } from "@mui/material";
import { Field } from "formik";
import React from "react";

const TextInput = (props) => {
  const { name, label, type, error, touched, multiline } = props;
  const hasError = error && touched;
  return (
    <>
      <Field
        as={TextField}
        fullWidth
        name={name}
        label={label}
        type={type}
        variant="outlined"
        multiline={multiline}
        rows={multiline?4:0}
        color="primary"
        error={hasError}
        helperText={hasError ? error : null}
      />
      <Box height={14} />
    </>
  );
};

export default TextInput;
