import React from "react";
import Skeleton from "@mui/material/Skeleton";
import { Button, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";

const Home = () => {
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
        <TextField
          id="todoInput"
          required
          size="small"
          fullWidth
          placeholder="Enter a todo..."
        />
        <Button variant="contained" className="mt-2">
          Add
        </Button>
      </Box>
      <div>
        {/* <Stack spacing={1}>
          <Skeleton variant="text" />
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={210} height={118} />
        </Stack> */}
      </div>
    </div>
  );
};

export default Home;
