//import React, { useEffect } from "react";

//import { Link as RouterLink } from "react-router-dom";

import Typography from "@mui/material/Typography";

//import Button from "@mui/material/Button";

//import Container from "@mui/material/Container";

import Box from "@mui/material/Box";

import { Alert, Snackbar } from "@mui/material";

// //import { UsersInterface } from "../models/IUser";

 import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { StorageInterface, ProductInterface, ProductTypeInterface } from "../../models/IStorage";

// import { createTheme, ThemeProvider } from "@mui/material/styles";

// import { grey } from '@mui/material/colors';

// import { EmployeeInterface } from "../../models/IEmployee";
// import { createEmitAndSemanticDiagnosticsBuilderProgram } from "typescript";

import { ButtonGroup, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import { useEffect, useState } from "react";

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { grey } from '@mui/material/colors';
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import moment from "moment";
import { GetStorages, Storage, DeleteStorage } from "./service/StorageHttpClientService";


const theme = createTheme({
  palette: {
      primary: {
          main: grey[800],
      },
      // secondary: {
      //     main: grey[50],
      // },
  },
});


function StorageShow() {

  const [storage, setStorage] = useState<StorageInterface[]>([]);

  const id_cus = localStorage.getItem("id");

  const [success, setSuccess] = useState(false);
  const [successDel, setSuccessDel] = useState(false);
  const [error, setError] = useState(false);
  const [errorDel, setErrorDel] = useState(false);
  const [id, setId] = useState(0);

  

  // const getRooms = async () => {
  //     const apiUrl = `http://localhost:8080/service/rooms`;
  //     const requestOptions = {
  //         method: "GET",
  //         headers: {
  //             Authorization: `Bearer ${localStorage.getItem("token")}`,
  //             "Content-Type": "application/json",
  //         },
  //     };

  //     fetch(apiUrl, requestOptions)
  //         .then((response) => response.json())
  //         .then((res) => {
  //             if (res.data) {
  //                 setRoom(res.data);
  //             }
  //         });
  // };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setSuccessDel(false);
    setError(false);
    setErrorDel(false);
  };

  const getList = async () => {
    let res = await GetStorages();
    if (res) {
      setStorage(res);
    }
  };

  const onDelete = async (id: number) => {
    let res = await DeleteStorage(id);
    if (res) {
      setSuccessDel(true);
    } else {
      setErrorDel(true);
    }
    getList()
  }



 const columns: GridColDef[] = [

   { field: "ID", headerName: "รหัสสินค้า", width: 100 },

   { field: "Employee", headerName: "ชื่อ-นามสกุล", width: 150 , valueFormatter: (params) => params?.value?.Employeename,},

   { field: "Product", headerName: "ชื่อสินค้า", width: 150 , valueFormatter: (params) => params?.value?.Name,},

   { field: "ProductType", headerName: "ประเภทของสินค้า", width: 150 , valueFormatter: (params) => params?.value?.Name,},
   
   { field: "Quantity", headerName: "จำนวน", width: 150 , valueFormatter: (params) => params?.value?.Quantity,},

   { field: "Time", headerName: "วันที่และเวลา", width: 170, valueFormatter: (params) => moment(params.value).format('DD-MM-yyyy เวลา hh:mm') },

   {
    field: "delete",
    headerName: "DELETE",
    sortable: false,
    align:"center",
    renderCell: (params) => {
        const onClick = (e: { stopPropagation: () => void; }) => {
            e.stopPropagation();
            const id = params.getValue(params.id, "ID");
            onDelete(id);
        };

        return <Button onClick={onClick} color="error" endIcon={<DeleteOutlineIcon />} >Delete</Button>;
    }
  },
 ];

 useEffect(() => {
  getList();
}, []);


//  useEffect(() => {

//    getRooms();

//  }, []);


 return (
  <div>
      <Container maxWidth="lg">
        <Snackbar
          open={successDel}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="success">
            ลบข้อมูลสำเร็จ
          </Alert>
        </Snackbar>
        <Snackbar
          open={errorDel}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="error">
            ไม่สามารถลบข้อมูลได้
          </Alert>
        </Snackbar>
        <Snackbar
          open={success}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="success">
            Add สำเร็จ
          </Alert>
        </Snackbar>
        <Snackbar
          open={error}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="error">
            ไม่สามารถ Add ได้
          </Alert>
        </Snackbar>
        <Box
          display="flex"
          sx={{
            marginTop: 2,
          }}
        >
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="grey"
              gutterBottom
            >
              ข้อมูลคลังสินค้าห้องพัก
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/RoomW/Create"
              variant="contained"
              color="primary"
            >
              Add
            </Button>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/RoomW/Edit"
              variant="contained"
              color="primary"
            >
              Edit
            </Button>
          </Box>
          </Box>
        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={storage}
            getRowId={(row) => row.ID}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      </Container>
    </div>


   
 );

}


export default StorageShow