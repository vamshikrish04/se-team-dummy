import React from "react";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Container,
  IconButton,
  Button,
  Typography,
  Box,
  TextField,
  Rating,
} from "@mui/material";
import { getApihandler, putApihandler } from "../Apihandler";
import { useEffect } from "react";
import Layout from "../Layout/layout";
import { useState } from "react";
import ChatIcon from "@mui/icons-material/Chat";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import swal from "sweetalert";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 4,
};

const columns = [
  { id: "Sr no.", label: "Sr no." },
  {
    id: "carModel",
    label: "Car Model",
  },
  {
    id: "issue",
    label: "Issue",
  },

  {
    id: "user",
    label: "User Name",
  },
  {
    id: "mobile",
    label: "Mobile",
  },
  {
    id: "mobile",
    label: "Message",
  },
  {
    id: "Approved / reject",
    label: "Approved / reject",
  },
  {
    id: "Review",
    label: "Review",
  },
];
export default function BookingHistoryEmergency() {
  // useState
  const { register, handleSubmit, reset } = useForm();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = React.useState([]);
  const [BookingId, setBookingId] = React.useState("");
  const [flag, setFlage] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [Id, setId] = React.useState();
  const [Review, setReviw] = React.useState({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => {
    setOpen1(false);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const [userId, setUserId] = React.useState();
  // console.log("userId - ", userId);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // useEffect
  useEffect(() => {
    if (userId !== undefined && userId !== null) {
      getBookings();
    }
  }, [userId]);

  // useEffect
  useEffect(() => {
    setUserId(localStorage.getItem("Id"));
  }, []);
  useEffect(() => {
    if (flag !== 0) {
      VerifyBooking();
    }
  }, [flag]);
  useEffect(() => {
    if (Id !== undefined && Id !== null) {
      getReview();
    }
  }, [Id]);
  const getReview = async () => {
    console.log("Id", Id);
    console.log("userId", userId);
    const res = await getApihandler(`/getRatingData/rating_${Id}_${userId}`);
    console.log("res-->>>>>>>", res);
    if (res.status === 200) {
      setReviw(res.data[0]);
      setId();
      handleOpen1();
    } else {
      setReviw({});
      setId();
      handleOpen1();
    }
  };

  const VerifyBooking = async () => {
    const value = {
      booking_status: flag,
    };
    const res = await putApihandler(
      `/emergencyBookingAcceptOrRejectByMechanic/${BookingId}`,
      value
    );
    // console.log("c====>", res);
    if (res.status === 200) {
      Swal.fire({
        position: "middle-centre",
        icon: "success",
        title: `${res.message}`,
        showConfirmButton: false,
        timer: 2000,
      });
      setFlage(0);
      setBookingId("");
      getBookings();
    } else {
      swal("Sorry!", `${res.error.response.data.message}`, "error");
    }
  };
  const getBookings = async () => {
    const response = await getApihandler(
      `/getAllEmergencyBooking/mechanicId_${userId}`
    );

    console.log("c====>", response);
    if (response.status === 200) {
      setData(response.data);
    }
  };
  const onSubmit = async (value) => {
    const { amount } = value;

    const item = {
      amount: Number(amount),
    };
    console.log("item", item);
    console.log("BookingId", BookingId);
    const res = await putApihandler(
      `/addAmountForEmergencyService/${BookingId}`,
      item
    );
    if (res.status === 200) {
      Swal.fire({
        position: "middle-centre",
        icon: "success",
        title: "Amount Added Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      reset();
      handleClose();
      setTimeout(setFlage(2), 3000);
    }
  };
  return (
    <Container className="my-5">
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      backgroundColor: "#EE4848",
                      color: "White",
                      fontWeight: "bold",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length === 0 ? (
                <h3>No Data</h3>
              ) : (
                data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((val, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        <TableCell
                          style={{
                            fontWeight: "bold",
                          }}
                        >
                          {index + 1}.
                        </TableCell>
                        <TableCell>{val.car_model}</TableCell>
                        <TableCell>{val.service_needed}</TableCell>

                        <TableCell>{val.userName}</TableCell>
                        <TableCell>{val.userMobileNo}</TableCell>
                        <TableCell>
                          <Link to={`/chat-mechanic/${val.userId}`}>
                            <IconButton>
                              <ChatIcon />
                            </IconButton>
                          </Link>
                        </TableCell>
                        {val.booking_status === 0 ? (
                          <TableCell>
                            <Button
                              size="small"
                              variant="contained"
                              onClick={() => {
                                setBookingId(val._id);
                                setFlage(1);
                              }}
                              sx={{ textTransform: "capitalize" }}
                            >
                              Accept
                            </Button>{" "}
                            <Button
                              size="small"
                              variant="contained"
                              onClick={() => {
                                setBookingId(val._id);
                                setFlage(-1);
                              }}
                              sx={{ textTransform: "capitalize" }}
                            >
                              Reject
                            </Button>
                          </TableCell>
                        ) : val.booking_status === 1 ? (
                          <TableCell>
                            <Button
                              size="small"
                              variant="contained"
                              onClick={() => {
                                setBookingId(val._id);
                                handleOpen();
                              }}
                              sx={{ textTransform: "capitalize" }}
                            >
                              Completed
                            </Button>
                          </TableCell>
                        ) : val.booking_status === -1 ? (
                          <TableCell>
                            <Typography sx={{ paddingTop: "14px" }}>
                              Rejected
                            </Typography>
                          </TableCell>
                        ) : val.booking_status === 2 ? (
                          <TableCell>
                            <Typography sx={{ paddingTop: "14px" }}>
                              Service Completed
                            </Typography>
                          </TableCell>
                        ) : val.booking_status === 5 ? (
                          <TableCell>
                            <Typography sx={{ paddingTop: "14px" }}>
                              Payment Completed
                            </Typography>
                          </TableCell>
                        ) : (
                          ""
                        )}
                        <TableCell>
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => {
                              setId(val.userId);
                              // setFlage(2);
                            }}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/* ....model.... */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Towing Amount
            </Typography>
            <br />
            <TextField
              type="number"
              size="small"
              id="outlined-basic"
              label="Amount"
              variant="outlined"
              {...register("amount")}
            />
            <br />
            <br />
            <Button variant="contained" size="small" type="submit">
              Submit
            </Button>
          </Box>
        </form>
      </Modal>
      {/* ....model.... */}
      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography component="legend">Rating</Typography>
          <Rating name="read-only" value={Review.rating} readOnly />

          <Typography component="legend">Review</Typography>
          <Typography component="legend">{Review.review}</Typography>
        </Box>
      </Modal>
    </Container>
  );
}
