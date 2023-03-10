import { Add } from "@mui/icons-material";
import { Button, CircularProgress, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { ProgressContext } from "..";
import { ContractContext } from "../../../../App";
import Centered from "../../../../components/common/Centered";
import ResponsiveModal from "../../../../components/common/ResponsiveModal";
import Accounts from "./Accounts";

const AddAccountForm = ({ addAccount }) => {
  const [account, setAccount] = useState();

  return (
    <>
      <Centered>
        <TextField
          label="Account"
          value={account}
          onChange={(event) => {
            setAccount(event.target.value);
          }}
        />
        <Button
          variant="contained"
          onClick={async () => {
            await addAccount(account);
          }}
        >
          Add
        </Button>
      </Centered>
    </>
  );
};

const AdminAccounts = () => {
  const [accounts, setAccounts] = useState();
  const [openModal, setOpenModal] = useState(false);
  const contract = useContext(ContractContext).contract;
  const setProgress = useContext(ProgressContext);

  const getAdmins = async () => {
    const adminAccounts = await contract.getAdminAccessAccounts();
    setAccounts(adminAccounts);
  };

  const addAccount = async (account) => {
    if (account) {
      try {
        setOpenModal(false);
        setProgress(true);
        const transaction = await contract.grantAdminAccess(account);
        await transaction.wait();
      } catch (error) {
        console.log("add account error--------->", error);
      } finally {
        await getAdmins();
        setProgress(false);
      }
    }
  };

  const deleteAccount = async (account) => {
    if (account) {
      try {
        setProgress(true);
        const transaction = await contract.revokeAdminAccess(account);
        await transaction.wait();
      } catch (error) {
        console.log("add account error--------->", error);
      } finally {
        await getAdmins();
        setProgress(false);
      }
    }
  };

  // const dele

  useEffect(() => {
    getAdmins();
  }, []);
  return (
    <>
      {accounts ? (
        <>
          <Accounts accounts={accounts} deleteAccount={deleteAccount} />
          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={() => {
              setOpenModal(true);
            }}
          >
            Add
          </Button>
        </>
      ) : (
        <Centered>
          <CircularProgress />
        </Centered>
      )}
      <ResponsiveModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        title="Add Account"
      >
        <AddAccountForm addAccount={addAccount} />
      </ResponsiveModal>
    </>
  );
};

export default AdminAccounts;
