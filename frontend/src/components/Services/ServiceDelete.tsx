import { Button, FormControl, Grid, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { forwardRef, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { ServicesInterface } from "../../models/modelService/IService";
import { grey } from '@mui/material/colors';
import Container from "@mui/material/Container";
import moment from "moment";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { DeleteService, GetRoom, GetService } from "./service/ServiceHttpClientService";

const theme = createTheme({
    palette: {
        primary: {
            main: grey[800],
        },
        secondary: {
            main: grey[50],
        },
    },
});

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ServiceDelete() {

    const [service, setService] = useState<ServicesInterface[]>([]);
    const [services, setServices] = useState<Partial<ServicesInterface>>({});
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [message, setAlertMessage] = useState("");
    const [room, setRoom] = useState('');
    const n_cus = localStorage.getItem("name");
    const id_cus = localStorage.getItem("id");

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof ServiceDelete;
        const { value } = event.target;
        setServices({ ...services, [id]: value });
    };

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setSuccess(false);
        setError(false);
    };

    const convertType = (data: string | number | undefined | null) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    async function submit() {
        let res = await DeleteService(services.ID);
        if (res.status) {
            setAlertMessage("Cancle Order Successfully");
            setSuccess(true);
        } else {
            setAlertMessage(res.message);
            setError(true);
        }
    }

    const getservice = async () => {
        let res = await GetService(id_cus + "");
        if (res) {
            setService(res);
        }
    };
    const getroom = async () => {
        let res = await GetRoom(id_cus);
        if (res) {
            setRoom(res);
        }
    };

    useEffect(() => {
        getservice();
        getroom();
    }, [success]);

    return (
        <div>
            <ThemeProvider theme={theme}>
                <Container maxWidth="md">
                    <Snackbar
                        id="success"
                        open={success}
                        autoHideDuration={2000}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    >
                        <Alert onClose={handleClose} severity="success">
                            {message}
                        </Alert>
                    </Snackbar>

                    <Snackbar
                        id="error"
                        open={error}
                        autoHideDuration={2000}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    >
                        <Alert onClose={handleClose} severity="error">
                            {message}
                        </Alert>
                    </Snackbar>

                    <Grid container spacing={1} sx={{ padding: 3 }}>
                        <Grid item xs={6}>
                            <FormControl>
                                <TextField
                                    label="Customer Name"
                                    value={n_cus}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="standard"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                style={{ float: "right" }}
                                label="Room Number"
                                value={room}
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="standard"
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={1} sx={{ padding: 3 }}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label=" "
                                defaultValue="Choose bill number if you want to cancle."
                                variant="standard"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                style={{ float: "right" }}
                                label="Type Bill Number"
                                variant="standard"
                                id="ID"
                                value={services.ID || ""}
                                onChange={handleInputChange}
                            />
                        </Grid>
                    </Grid>

                    <div>
                        <Container maxWidth="md">
                            <div style={{ height: 500, width: "100%", marginTop: "20px" }}>
                                <TableContainer >
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center" width="20%"> Bill Number </TableCell>
                                                <TableCell align="center" width="20%"> Customer name </TableCell>
                                                <TableCell align="center" width="20%"> Bill Time </TableCell>
                                                <TableCell align="center" width="20%"> Food </TableCell>
                                                <TableCell align="center" width="20%"> Drink </TableCell>
                                                <TableCell align="center" width="20%"> Accessorie </TableCell>
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {service.map((item: ServicesInterface) => (
                                                <TableRow key={item.ID}>
                                                    <TableCell align="center">{item.ID}</TableCell>
                                                    <TableCell align="center">{item.Customer?.FirstName}</TableCell>
                                                    <TableCell align="center">{moment(item.Time).format("DD/MM/YYYY")}</TableCell>
                                                    <TableCell align="center">{item.Food?.Name}</TableCell>
                                                    <TableCell align="center">{item.Drink?.Name}</TableCell>
                                                    <TableCell align="center">{item.Accessories?.Name}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </Container>
                    </div>
                    <Grid container spacing={1} sx={{ padding: 3 }}>
                        <Grid item xs={12}>
                            <Button
                                component={RouterLink}
                                to="/ss"
                                variant="contained"
                                color="error"
                            >
                                BACK
                            </Button>

                            <Button
                                style={{ float: "right" }}
                                onClick={submit}
                                variant="contained"
                                color="success"
                            >
                                CONFIRM
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </ThemeProvider>
        </div>
    );
}

export default ServiceDelete