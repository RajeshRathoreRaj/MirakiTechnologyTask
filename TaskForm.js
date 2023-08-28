import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import axios from "axios";
import { postData, getData } from "./ServerServices";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 50,
  },

  subDiv: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    width: "350",
    backgroundColor: "#ecf0f1",
  },
});

export default function TaskForm() {
  var classes = useStyles();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [task, setTask] = useState("");

  const handleSubmit = async () => {
    var body = { title: title, description: description, task: task };
    var result = await postData("task/addtask", body);
    console.log("xxxxxxx", result);

    //alert(result);
    if (result) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Record has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Fail to Save the Record",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.subDiv}>
        <Grid container spacing={2}>
          <Grid item xs={12} style={{ marginTop: 5 }}>
            <TextField
              fullWidth
              label="Task Name"
              onChange={(event) => setTitle(event.target.value)}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              onChange={(event) => setDescription(event.target.value)}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Completed/Incomplete"
              onChange={(event) => setTask(event.target.value)}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              onClick={() => handleSubmit()}
              fullWidth
              variant="contained"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
