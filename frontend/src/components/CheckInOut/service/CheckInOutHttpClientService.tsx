import { CheckInOutInterface } from "../../../models/ICheckInOut";

const apiUrl = "http://localhost:8080";
	// //========================= checkInOut routes
	// //status
	// r.GET("/checkinoutstatus/:id", check.GetCheckInOutStatus)
	// r.GET("/checkinoutstatuses", check.ListCheckInOutStatuses)
	// r.POST("/checkinoutstatus", check.CreateCheckInOutStatus)
	// r.PATCH("/checkinoutstatus", check.UpdateCheckInOutStatus)
	// r.DELETE("/checkinoutstatus/:id", check.DeleteCheckInOutStatus)
	// //main
	// r.GET("/checkinout/:id", check.GetCheckInOut)
	// r.GET("/checkinouts", check.ListCheckInOuts)
	// r.POST("/checkinout", check.CreateCheckInOut)
	// r.PATCH("/checkinout", check.UpdateCheckInOut)
	// r.DELETE("/checkinout/:id", check.DeleteCheckInOut)

// List CheckInOut
async function GetListCheckInOut() {
    const requestOptions = {
        method: "GET",
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem("token")}`,
        //     "Content-Type": "application/json",
        //   },
    };

    let res = await fetch(`${apiUrl}/checkinouts`, requestOptions)
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

// List Status
async function GetListCheckInOutStatus() {
    const requestOptions = {
        method: "GET",
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem("token")}`,
        //     "Content-Type": "application/json",
        //   },
    };

    let res = await fetch(`${apiUrl}/checkinoutstatuses`, requestOptions)
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

//Craete CheckInout
async function CreateCheckInOut(data: CheckInOutInterface) {
    const requestOptions = {
        method: "POST",
        // headers: {
        //     Authorization: `Bearer ${localStorage.getItem("token")}`,
        //     "Content-Type": "application/json",
        // },
        body: JSON.stringify(data),
    };

    let res = await fetch(`${apiUrl}/checkinout`, requestOptions)
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

// Delete CheckInOut
async function DeleteCheckInOut(data: CheckInOutInterface) {
    let booking_id = data.ID;
    const requestOptions = {
        method: "DELETE",
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem("token")}`,
        //     "Content-Type": "application/json",
        //   },
        body: JSON.stringify(data),
    }
    
    let res = await fetch(`${apiUrl}/checkinoutstatus/${booking_id}`, requestOptions)
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

// Update CheckInOut
async function UppdateCheckInOut(data: CheckInOutInterface) {
    const requestOptions = {
        method: "PATCH",
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem("token")}`,
        //     "Content-Type": "application/json",
        //   },
        body: JSON.stringify(data),
    }

    let res = await fetch(`${apiUrl}/checkinoutstatus`, requestOptions)
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
    GetListCheckInOut,
    GetListCheckInOutStatus,
    CreateCheckInOut,
    DeleteCheckInOut,
    UppdateCheckInOut,
};
