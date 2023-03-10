import { Container, IconButton, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ContractContext } from "../../../../App";
import Centered from "../../../../components/common/Centered";
import { Delete } from "@mui/icons-material";

const Accounts = ({ accounts, deleteAccount }) => {
  //   function createData(account) {
  //     return { account };
  //   }

  //   const rows = [];

  //   accounts.forEach((account) => {
  //     rows.push(createData(account));
  //   });

  const DeleteButton = ({ account }) => {
    return (
      <IconButton
        aria-label="delete"
        onClick={async () => {
          await deleteAccount(account);
        }}
      >
        <Delete />
      </IconButton>
    );
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Account Address</TableCell>
              <TableCell align="left">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map((account) => (
              <TableRow
                key={account}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left" component="th" scope="row">
                  {account}
                </TableCell>
                <TableCell align="left">
                  <DeleteButton account={account} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Accounts;
