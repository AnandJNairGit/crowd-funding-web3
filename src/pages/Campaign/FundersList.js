import { Box, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const FundersList = ({ funders }) => {
  function createData(account, amount) {
    return { account, amount };
  }

  const rows = [];

  funders.forEach((funder) => {
    rows.push(createData(funder.account, funder.amount));
  });

  return (
    <Container sx={{ marginY: "40px" }}>
      <Typography variant="h4" margin="10px">
        Funders :
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Account</TableCell>
              <TableCell align="left">Amount (wei)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.reverse().map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left" component="th" scope="row">
                  {row.account}
                </TableCell>
                <TableCell align="left">{row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default FundersList;
