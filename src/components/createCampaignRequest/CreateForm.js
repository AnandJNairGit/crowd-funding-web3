import React, { useContext, useState } from "react";
import * as yup from "yup";
import { Form, Formik } from "formik";
import TextInput from "../common/TextInput";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { uploadImageToIPFS, uploadJSONToIPFS } from "../../services/pinata";
import { Button, Input, TextField } from "@mui/material";
import getContract from "../../services/ethers";
import { ContractContext } from "../../App";
import BackdropProgress from "../common/BackdropProgress";

const CreateForm = ({ closeModal, setProgressOpen }) => {
  const [dateTime, setDateTime] = useState();
  const [image, setImage] = useState();
  const contractContext = useContext(ContractContext);
  // console.log(contract);

  const onDateTimeChanged = (newDateTime) => {
    try {
      setDateTime(newDateTime);
    } catch (error) {
      console.log(error);
    }
  };

  const onImageSelect = async (e) => {
    console.log("inside onchange file");
    const file = e.target.files[0];
    setImage(file);
  };

  const onFormSubmit = async (values) => {
    try {
      if (image && dateTime) {
        closeModal();
        setProgressOpen(true);
        const { campaignTitle, campaignDescription, requiredAmount } = values;
        const unixDate = parseInt(
          (new Date(dateTime.$d).getTime() / 1000).toFixed(0)
        );
        const imgUrl = await uploadImageToIPFS(image);
        const jsonData = { campaignTitle, campaignDescription, imgUrl };
        const metaDataUrl = await uploadJSONToIPFS(jsonData);
        console.log("the metadata url is ------------>", metaDataUrl);
        // const contract = await getContract();
        // console.log(contract);
        const transaction =
          await contractContext.contract.createCampaignRequest(
            metaDataUrl,
            requiredAmount,
            unixDate
          );
        await transaction.wait();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setProgressOpen(false);
    }
  };

  const initialValues = {
    campaignTitle: "",
    campaignDescription: "",
    requiredAmount: "",
  };
  const formikProps = {
    initialValues: initialValues,
    onSubmit: onFormSubmit,
    validationSchema: yup.object({
      campaignTitle: yup.string().required("Please add campaign title"),
      campaignDescription: yup
        .string()
        .required("Please add campaign description"),
      requiredAmount: yup.number().required("Price is required"),
    }),
  };

  return (
    <>
      <Formik {...formikProps}>
        {({ errors, touched }) => {
          return (
            <Form>
              <TextInput
                name="campaignTitle"
                label="Campaign Tite"
                type="name"
                error={errors.campaignTitle}
                touched={touched.campaignTitle}
              />

              <TextInput
                name="campaignDescription"
                label="Campaign Description"
                type="name"
                error={errors.campaignDescription}
                touched={touched.campaignDescription}
                multiline
              />

              <TextInput
                name="requiredAmount"
                label="Required Amount"
                type="name"
                error={errors.requiredAmount}
                touched={touched.requiredAmount}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="deadline"
                  value={dateTime}
                  onChange={onDateTimeChanged}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <Input type={"file"} onChange={onImageSelect}></Input>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                Request
              </Button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default CreateForm;
