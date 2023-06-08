import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect } from "react";
import StorageCard from "./component/StorageCard/StorageCard";

export default function Storage() {
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [fileName, setFileName] = useState("");
  const [docs, setDocs] = useState([]);
  const [tail, setTail] = useState("")
  const token = localStorage.getItem("accessToken");

  const reversed = [...docs].reverse();
  const currentUser = useSelector((state) => state.currentUser.data);

  const handleCreatePost = () => {
    // newPost = {
    //   ...newPost,
    //   title: title,
    //   content: content,
    //   author: currentUser.username,
    //   uploadDate: formattedDate(),
    //   authorID: currentUser._id,
    // };
    console.log("lmao");

    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpload = (e) => {
    let filePath = e.target.value.split("\\");
    let fileName = filePath.pop();
    let tail = fileName.split(".").pop();
    if (tail === "pdf" || tail === "doc" || tail === "docx") {
      setTail(tail)
      setFileName(fileName);
    } else {
      toast.error("Please provide file with PDF, DOC or DOCX type only", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleUploadFile = () => {
    console.log(fileName);
    setFileName("");
    handleClose();
  };

  // const handleCreatePost_CallAPI = async (req, token) => {
  //   try {
  //     const res = await addPost(req, token);
  //     if (res.status === 200) {
  //       toast.success("Post created", {
  //         position: "top-right",
  //         autoClose: 1000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "colored",
  //       });
  //     }
  //   } catch (e) {
  //     toast.error(e, {
  //       position: "top-right",
  //       autoClose: 1000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "colored",
  //     });
  //   }
  // };

  // const handleGetAllPosts_CallAPI = async () => {
  //   try {
  //     const { data: res } = await getAllPosts(token);
  //     setPosts(res);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // useEffect(() => {
  //   handleGetAllPosts_CallAPI();
  // }, []);

  return (
    <>
      <Box
        component="div"
        sx={{ margin: 3, display: "flex", justifyContent: "flex-end" }}
      >
        {currentUser.isAdmin === true ? (
          <Button variant="contained" onClick={handleClickOpen}>
            Add new docs
          </Button>
        ) : (
          <></>
        )}

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add new file</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To create a document on this website, please enter the description
              for the file and upload the file here.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="description"
              label="Description for the file"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Box sx={{ display: "flex" }}>
              <label htmlFor="upload-photo">
                <input
                  style={{ display: "none" }}
                  id="upload-photo"
                  name="upload-photo"
                  type="file"
                  onChange={handleUpload}
                />
                <Button variant="contained" component="span">
                  Upload button
                </Button>
              </label>
              <Typography>{fileName}</Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleUploadFile}>Add file</Button>
          </DialogActions>
        </Dialog>
      </Box>
      {reversed.map((post) => {
        return <StorageCard key={post._id} data={post} />;
      })}
    </>
  );
}
