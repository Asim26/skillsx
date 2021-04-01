import React, { useState } from "react";
import Navigation from "../navigation/Navigation";

import { useQuery } from "@apollo/client";
import { fetchCategories } from "../../queries/mutations";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

import "./Categories.css";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

function Categories() {
  
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //query error handling state
  const [onError, setOnError] = useState(false);

  //fetch all categories
  const { loading, error, data } = useQuery(fetchCategories, {
    onError: (e) => {
      setOnError(true);
    },
  });

  return (
    <div>
      <Navigation />
      {
        onError?<p className="alertStyle">Could Not Fetch Categories</p> :
      
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>

                <TableCell>Title</TableCell>

                <TableCell>Description</TableCell>

                <TableCell>Active</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data && data.fetchCategories
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((category: any) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={category._id}
                    >
                      <TableCell key={category._id}>{category._id}</TableCell>
                      <TableCell key={category._id}>{category.title}</TableCell>
                      <TableCell key={category._id}>
                        {category.description}
                      </TableCell>
                      <TableCell key={category._id}>
                        {category.isActive ? "Yes" : "No"}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data && data.fetchCategories.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      }
    </div>
  );
}

export default Categories;
