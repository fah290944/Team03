import { CHK_PaymentsInterface, StatusesInterface } from "../../../models/ICHK_Payment";


const apiUrl = "http://localhost:8080";

async function GetEmployeeByUID() {
    let uid = localStorage.getItem('user');
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    }

    let res = await fetch(`${apiUrl}/Employee/${uid}`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}

// //=================================================== Check Payment Routes
// r.GET("/chk_payments", chk_payment.ListCHK_Payments)
// r.GET("/chk_payment/:id", chk_payment.GetCHK_Payment)
// r.POST("/chk_payments", chk_payment.CreateCHK_Payment)
// r.PATCH("/chk_payments", chk_payment.UpdateCHK_Payment)
// r.DELETE("/chk_payments/:id", chk_payment.DeleteCHK_Payment)

// List CHK_Payment
async function GetCHK_Payments() {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/chk_payments`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}

//Get CHK_Payment
async function GetCHK_Payment(data: CHK_PaymentsInterface) {
    let b_id = data.ID;
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/chk_payment/${b_id}`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}

//Craete CHK_Payments
async function CHK_Payments(data: CHK_PaymentsInterface) {
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };

    let res = await fetch(`${apiUrl}/chk_payments`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}

// Delete CHK_Payment
async function DeleteCHK_Payment(data: CHK_PaymentsInterface) {
    let booking_id = data.ID;
    const requestOptions = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }

    let res = await fetch(`${apiUrl}/chk_payments/${booking_id}`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}

// Update CHK_Payment
async function UppdateCHK_Payment(data: CHK_PaymentsInterface) {
    const requestOptions = {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }

    let res = await fetch(`${apiUrl}/bookings`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}

// // ---Status---
// protected.GET("/chk_payment/statuses", chk_payment.ListStatuses)
// protected.GET("/chk_payment/status/:id", chk_payment.GetStatus)
// protected.POST("/chk_payment/statuses", chk_payment.CreateStatus)
// protected.PATCH("/chk_payment/statuses", chk_payment.UpdateStatus)
// protected.DELETE("/chk_payment/statuses/:id", chk_payment.DeleteStatus)

async function GetStatuses() {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/statuses`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}

//Get Status
async function GetStatus(data: StatusesInterface) {
    let s_id = data.ID;
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/chk_payment/status/${s_id}`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}

//Craete Statuses
async function Statuses(data: StatusesInterface) {
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };

    let res = await fetch(`${apiUrl}/chk_payment/statuses`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}

// Delete Status
async function DeleteStatus(data: StatusesInterface) {
    let booking_id = data.ID;
    const requestOptions = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }

    let res = await fetch(`${apiUrl}/chk_payment/statuses/${booking_id}`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}

// Update Status
async function UpdateStatus(data: StatusesInterface) {
    const requestOptions = {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }

    let res = await fetch(`${apiUrl}/chk_payment/statuses`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return false;
            }
        });

    return res;
}




export {
    GetEmployeeByUID,

    GetCHK_Payments,
    GetCHK_Payment,
    CHK_Payments,
    UppdateCHK_Payment,
    DeleteCHK_Payment,

    GetStatuses,
    GetStatus,
    Statuses,
    UpdateStatus,
    DeleteStatus,
};
