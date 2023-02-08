import { AccessoriesInterface, DrinksInterface, FoodsInterface, ServicesInterface } from "../../models/modelService/IService";
import { Button, Container, FormControl, Grid, Select, SelectChangeEvent, Snackbar, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { forwardRef, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { grey } from "@mui/material/colors";
import { useParams } from "react-router-dom";
import { GetAccessories, GetDrinks, GetFoods, GetRoom, GetServiceByID, UpdateService, UpdateFood } from "./service/ServiceHttpClientService";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

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

function ServiceUpdate() {

    const [service, setService] = useState<Partial<ServicesInterface>>({});
    const [food, setFood] = useState<FoodsInterface[]>([]);
    const [drink, setDrink] = useState<DrinksInterface[]>([]);
    const [Accessorie, setAccessorie] = useState<AccessoriesInterface[]>([]);
    const [time] = useState<Date | null>(new Date());
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [message, setAlertMessage] = useState("");
    const [room, setRoom] = useState('');
    const { id } = useParams();
    const id_cus = localStorage.getItem("id");

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

    // for combobox information
    const handleChange = (event: SelectChangeEvent) => {
        const name = event.target.name as keyof typeof service;
        setService({
            ...service,
            [name]: event.target.value,
        });
    };

    const convertType = (data: string | number | undefined | null) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    const convertTypeNotNull = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    async function submit() {
        let data = {
            ID: convertTypeNotNull(id),
            CustomerID: convertType(id_cus),
            Time: time,
            FoodID: convertTypeNotNull(service.FoodID),
            DrinkID: convertTypeNotNull(service.DrinkID),
            AccessoriesID: convertTypeNotNull(service.AccessoriesID),
        };

        let res = await UpdateService(data);
        if (res.status) {
            setAlertMessage("Update Order Successfully");
            setSuccess(true);
        } else {
            setAlertMessage(res.message);
            setError(true);
        }
    }

    async function updatefood() {
        let data = {
            ID: convertTypeNotNull(service.FoodID),
        };

        let res = await UpdateFood(data);
        if (res.status) {
            setAlertMessage("Update Order Successfully");
            setSuccess(true);
        } else {
            setAlertMessage(res.message);
            setError(true);
        }
    }

    const getfoods = async () => {
        let res = await GetFoods();
        if (res) {
            setFood(res);
        }
    };
    const getdrinks = async () => {
        let res = await GetDrinks();
        if (res) {
            setDrink(res);
        }
    };
    const getaccessories = async () => {
        let res = await GetAccessories();
        if (res) {
            setAccessorie(res);
        }
    };
    const getservicebyid = async () => {
        let res = await GetServiceByID(id);
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
        getfoods();
        getdrinks();
        getaccessories();
        getservicebyid();
        getroom();
    }, []);

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
                        <Grid item xs={10}>
                            <TextField
                                fullWidth
                                label="Room Number"
                                value={room}
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                label="Bill Number to change"
                                variant="standard"
                                id="ID"
                                value={id || ""}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                    </Grid>

                    <Grid container margin={2} columnGap={4}>
                        <Grid>
                            <img src="https://images.unsplash.com/photo-1627308595186-e6bb36712645?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80" alt="" width="250" height="350" />
                        </Grid>
                        <Grid>
                            <img src="https://images.unsplash.com/photo-1502389743708-d00f658638bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="" width="250" height="350" />
                        </Grid>
                        <Grid>
                            <img src="https://images.unsplash.com/photo-1558682766-1ff2c50e7056?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=753&q=80" alt="" width="250" height="350" />
                        </Grid>
                    </Grid>

                    <Grid container spacing={1} sx={{ padding: 3 }}>
                        <Grid item xs={4}>
                            <TextField
                                label=" "
                                defaultValue="Change food."
                                variant="standard"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label=" "
                                defaultValue="Change drink."
                                variant="standard"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label=" "
                                defaultValue="change accessories."
                                variant="standard"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={1} sx={{ padding: 3 }}>
                        <Grid item xs={4}>
                            <FormControl fullWidth variant="outlined">
                                <Select
                                    native
                                    value={service.FoodID + ""}
                                    onChange={handleChange}
                                    inputProps={{
                                        name: "FoodID",
                                    }}
                                >
                                    {food.map((item: FoodsInterface) => (
                                        <option value={item.ID}>{item.Name}</option>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth variant="outlined">
                                <Select
                                    native
                                    value={service.DrinkID + ""}
                                    onChange={handleChange}
                                    inputProps={{
                                        name: "DrinkID",
                                    }}
                                >
                                    {drink.map((item: DrinksInterface) => (
                                        <option value={item.ID}>{item.Name}</option>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth variant="outlined">
                                <Select
                                    native
                                    value={service.AccessoriesID + ""}
                                    onChange={handleChange}
                                    inputProps={{
                                        name: "AccessoriesID",
                                    }}
                                >
                                    {Accessorie.map((item: AccessoriesInterface) => (
                                        <option value={item.ID}>{item.Name}</option>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

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

export default ServiceUpdate