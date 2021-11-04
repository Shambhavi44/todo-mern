import React, { useState } from "react";
import {
  Button,
  Grid,
  // makeStyles,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import CardDisplay from "./CardDisplay";
import axios from 'axios';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//     textAlign: "center",
//     width: 300,
//     marginLeft: 100,
//     marginTop: 200,
//   },
//   hidden: {
//     display: "none",
//   },
//   button: {
//     background: "green",
//   },
//   label: {
//     backgroundColor: "white",
//   },
// }));

const Home = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white !important",
    boxShadow: 24,
    p: 4,
  };
  // const classes = useStyles();

  const [open, setOpen] = useState(false);
  const dummyData = [
    {
      title: "Todo 1",
      description: "This is todo 1 description",
      id: "1",
      date: "Sept 1 2021",
    },
    {
      title: "Todo 4",
      description: "This is todo 1 description",
      id: "2",
      date: "Sept 1 2021",
    },
    {
      title: "Todo 3",
      description: "This is todo 1 description",
      id: "4",
      date: "Sept 1 2021",
    },
    {
      title: "Todo 7",
      description: "This is todo 3 description",
      id: "6",
      date: "Sept 1 2021",
    },
    {
      title: "Todo 7",
      description: "This is todo 3 description",
      id: "7",
      date: "Sept 1 2021",
    },
  ];

  return (
    <div className="text-center my-5">
      <h2 className="my-5">Todo List Using MERN Stack</h2>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "30ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <Button
          variant="contained"
          className="mt-2"
          onClick={() => setOpen(true)}
        >
          Add a new Todo
        </Button>
      </Box>
      <Grid
        className="d-flex mx-2 body-bg rounded my-4"
        style={{ maxHeight: "65vh", overflowY: "scroll" }}
        container
      >
        {dummyData.map((item) => (
          <Grid item lg={3}>
            <CardDisplay className="col-lg-4" todoInfo={item} />
          </Grid>
        ))}
      </Grid>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box style={style} className="bg-white px-4 py-3 rounded">
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            className="mt-2"
          >
            Add a new Todo
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 3 }}>
            <TextField
              id="todoInput"
              required
              size="small"
              fullWidth
              label="Todo Name"
              variant="filled"
            />

            <TextField
              id="todoInput"
              required
              size="small"
              fullWidth
              label="Todo Description"
              multiline
              rows={4}
              className="my-4"
              margin="normal"
              variant="filled"
              style={{ marginBottom: 20, marginTop: 20 }}
            />
          </Typography>
          <Grid container justifyContent="flex-end" className="mt-2">
            <Button
              variant="contained"
              className="mt-2 mx-3"
              onClick={() => setOpen(true)}
            >
              Clear All
            </Button>
            <Button
              variant="contained"
              className="mt-2"
              onClick={() => setOpen(true)}
            >
              Add
            </Button>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default Home;
