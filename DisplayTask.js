import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import axios from "axios";
import { postData, getData } from "./ServerServices";
import MaterialTable from "@material-table/core";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
    backgroundColor: "#bdc3c7",
  },
});

export default function DisplayTask(props) {
  var classes = useStyles();

  const [open, setOpen] = useState(false);
  const [dopen, dsetOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [userDetail, setUserDetail] = useState([]);
  const [getRowData, setRowData] = useState([]);

  const handleSubmit = async () => {
    var body = {
      titleid: getRowData.titleid,
      title: title,
      description: description,
      task: task,
    };

    var result = await postData("task/edittask", body);

    console.log("xxxxxxx", result);
    if (result.result) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Record has been Edited",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Fail to Edit the Record",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleDelete = async () => {
    var body = { titleid: getRowData.titleid };
    var res = await postData("task/deletetask", body);
    // alert(res.result)

    if (res.result) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Record has been Deleted",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Fail to Delete the Record",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleRefresh = () => {
    dsetOpen(false);
    fetchUserDetail();
  };

  const fetchUserDetail = async () => {
    var list = await getData("task/displaytask");

    setUserDetail(list);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(function () {
    fetchUserDetail();
  }, []);

  function DisplayTask(props) {
    return (
      <MaterialTable
        data={userDetail}
        columns={[
          {
            title: "Task Name",
            field: "title",
          },
          {
            title: "Description",
            field: "description",
          },

          {
            title: "Completed/Incomplete",
            field: "task",
          },
        ]}
        actions={[
          {
            icon: () => <EditIcon />,
            tooltip: "Edit Task",
            onClick: (event, rowData) => {
              handleOpenDialog(rowData);
              handleClickOpen(false);
              handleDOpen(rowData);
              dsetOpen(true);
            },
          },
        ]}
      />
    );
  }

  const handleDClose = () => {
    dsetOpen(false);
  };

  const handleDOpen = (data) => {
    setRowData(data);
    dsetOpen(true);
    setTitle(data.title);
    setDescription(data.description);
    setTask(data.task);
  };

  const handleOpenDialog = (data) => {
    return (
      <div>
        <Dialog
          fullScreen
          open={dopen}
          onClose={handleDClose}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="close"
                onClick={handleRefresh}
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Task Edit Form
              </Typography>
              <Button autoFocus color="inherit" onClick={handleSubmit}>
                Edit
              </Button>
              <Button autoFocus color="inherit" onClick={handleDelete}>
                Delete
              </Button>
            </Toolbar>
          </AppBar>

          <div className={classes.root}>
            <div className={classes.subDiv}>
              <Grid container spacing={2}>
                <Grid item xs={12} style={{ marginTop: 5 }}>
                  <TextField
                    fullWidth
                    label="Task Name"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Complete/Incomplete"
                    value={task}
                    onChange={(event) => setTask(event.target.value)}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </div>
          </div>
        </Dialog>
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.subdiv}>
        <DisplayTask />
      </div>

      {handleOpenDialog()}
    </div>
  );
}
