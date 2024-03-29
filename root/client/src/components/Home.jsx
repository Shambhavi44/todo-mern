import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import CardDisplay from "./CardDisplay";
import Switch from "@mui/material/Switch";
import {
  deleteTodos,
  getTods,
  saveTodos,
  updateTodos,
} from "../services/todos/index";
import { styled } from "@mui/material/styles";
import { useToasts } from "react-toast-notifications";

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

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

  const [open, setOpen] = useState(false);
  const [todosData, setTodosData] = useState([]);
  const [todoInfo, setTodoInfo] = useState({ status: "Pending" });
  const [modalType, setModalType] = useState("add");

  const { addToast } = useToasts();

  const fetchTodos = async () => {
    const { data, err } = await getTods();
    if (data) {
      setTodosData(data.data);
    } else if (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [open]);

  const handleAdd = async () => {
    if (modalType === "add") {
      const { data, err } = await saveTodos(todoInfo);
      if (data) {
        addToast("Saved Successfully", { appearance: "success" });
        setOpen(false);
        setTodoInfo({});
      } else if (err) {
        addToast("Error", { appearance: "error" });
      }
    } else if (modalType === "modify") {
      const { data, err } = await updateTodos(todoInfo._id, todoInfo);
      if (data) {
        addToast("Saved Successfully", { appearance: "success" });
        setOpen(false);
        setTodoInfo({});
      } else if (err) {
        addToast("Error", { appearance: "error" });
      }
    }
  };

  const handleEdit = (id) => {
    setModalType("modify");
    setOpen(true);
    const selectedTodo = todosData.find((item) => item._id === id);
    setTodoInfo(selectedTodo);
  };

  const handleDelete = async (id) => {
    const { data, err } = await deleteTodos(id);
    if (data) {
      addToast("Deleted successfully", { appearance: "success" });
      fetchTodos();
    } else if (err) {
      addToast("Error", { appearance: "error" });
    }
  };

  const handleClear = () => {
    setTodoInfo({
      title: "",
      description: "",
      status: "Pending",
      _id: modalType === "modify" && todoInfo._id,
    });
  };

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
          onClick={() => {
            setOpen(true);
            setModalType("add");
          }}
        >
          Add a new Todo
        </Button>
      </Box>
      <Grid
        className="d-flex mx-2 body-bg rounded my-4"
        style={{ maxHeight: "65vh", overflowY: "scroll" }}
        container
      >
        {todosData.map((item) => (
          <Grid item lg={3} sm={12} md={12} justifyContent="center">
            <CardDisplay
              className="col-lg-4 col-md-6 col-sm-12"
              todoInfo={item}
              onEditIconClick={handleEdit}
              onDeleteIconClick={handleDelete}
              headerColor={
                item.status === "Complete" ? "bg-success" : "bg-secondary"
              }
            />
          </Grid>
        ))}
      </Grid>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setTodoInfo({ status: "Pending" });
        }}
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
            {modalType === "add" ? " Add a new Todo" : "Modify Todo"}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 3 }}>
            <TextField
              id="todoInput"
              required
              size="small"
              fullWidth
              label="Todo Name"
              variant="filled"
              value={todoInfo.title}
              autoComplete={"Off"}
              onChange={(e) => {
                setTodoInfo({
                  ...todoInfo,
                  title: e.target.value,
                });
              }}
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
              autoComplete={"Off"}
              value={todoInfo.description}
              onChange={(e) => {
                setTodoInfo({
                  ...todoInfo,
                  description: e.target.value,
                });
              }}
            />
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography>Pending</Typography>
            <AntSwitch
              checked={todoInfo.status === "Complete"}
              inputProps={{ "aria-label": "ant design" }}
              size="medium"
              color="success"
              onChange={(event) =>
                setTodoInfo({
                  ...todoInfo,
                  status: event.target.checked ? "Complete" : "Pending",
                })
              }
            />
            <Typography>Completed</Typography>
          </Stack>
          <Grid container justifyContent="flex-end" className="mt-2">
            <Button
              variant="contained"
              className="mt-2 mx-3"
              onClick={handleClear}
            >
              Clear All
            </Button>
            <Button
              variant="contained"
              className="mt-2"
              onClick={handleAdd}
              disabled={
                !(todoInfo.title && todoInfo.description && todoInfo.status)
              }
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
