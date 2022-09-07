import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Fab from "@material-ui/core/Fab";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";

import {
  saveArticle,
  listArticles,
  deleteArticle,
} from "../actions/articleActions";

import clsx from "clsx";

function ArticlesScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const articleList = useSelector((state) => state.articleList);
  const { loading, articles, error } = articleList;

  const articleSave = useSelector((state) => state.articleSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = articleSave;

  const articleDelete = useSelector((state) => state.articleDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = articleDelete;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listArticles());
    return () => {
      //
    };
  }, [successSave, successDelete, dispatch]);

  const uploadProfileImage = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setUploading(true);
    axios
      .post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setImage(response.data);
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };

  const useStyles = makeStyles((theme) => ({
    select: {
      "& .MuiSelect-select:not([multiple])": {
        fontSize: "14px",
        padding: "17px 14px",
      },
    },
    input: {
      "& .MuiInputBase-input ": {
        fontSize: "16px",
      },
      "& .MuiOutlinedInput-input": {
        padding: "16px 12px",
      },
    },
    root: {
      "& .MuiFormLabel-root": {
        fontSize: "14px",
        background: "#fff",
        padding: "0 8px 0 5px",
      },
    },
  }));

  const classes = useStyles();

  const openModal = (article) => {
    setModalVisible(true);
    setId(article._id);
    setTitle(article.title);
    setDescription(article.description);
    setImage(article.image);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveArticle({
        _id: id,
        title,
        image,
        description,
      })
    );
  };
  const deleteHandler = (article) => {
    dispatch(deleteArticle(article._id));
  };

  const styles = (theme) => ({
    root: {
      margin: "8px",
      padding: "16px 8px",
      borderBottom: "2px solid #eee",
    },
  });

  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle className={classes.root} {...other}>
        <Typography variant="h4">{children}</Typography>
      </MuiDialogTitle>
    );
  });
  return (
    <div className="content">
      <div
        className="product-header"
        style={{
          display: "flex",
          alignItems: "center",
          padding: "8px 48px",
          borderBottom: "1px solid #eee",
        }}
      >
        <h3 style={{ fontWeight: 600 }}>Articles</h3>
        <Button
          variant="outlined"
          onClick={() => openModal({})}
          color="secondary"
          style={{ fontSize: "14px", outline: "none" }}
        >
          Create Article
        </Button>
      </div>
      {modalVisible && (
        <Dialog
          aria-labelledby="customized-dialog-title"
          open={modalVisible}
          onClose={() => setModalVisible(false)}
        >
          <DialogTitle id="customized-dialog-title">Create Article</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="title"
                  label="Title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  variant="outlined"
                  color="secondary"
                  style={{ width: "100%" }}
                  className={clsx(classes.input, classes.root)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="description"
                  label="Description"
                  style={{ width: "100%" }}
                  multiline={true}
                  rows={5}
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  variant="outlined"
                  className={clsx(classes.input, classes.root)}
                  color="secondary"
                />
              </Grid>
              <Grid item xs={12}>
                <>
                  {image ? (
                    <img
                      src={image}
                      width="100%"
                      style={{ margin: "8px 0" }}
                      height="150px"
                      alt="product"
                    />
                  ) : (
                    <div style={{ margin: "8px 0" }}>
                      {!uploading ? "Upload Image For Product" : "Loading ..."}
                    </div>
                  )}
                  <Fab
                    variant="extended"
                    component="label"
                    aria-label="add"
                    style={{
                      padding: "8px 16px",
                      borderRadius: "5px",
                      fontSize: "14px",
                      width: "100%",
                    }}
                  >
                    Select File
                    <input
                      accept="image/*"
                      type="file"
                      style={{ display: "none" }}
                      onChange={uploadProfileImage}
                    />
                  </Fab>
                </>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              onClick={() => setModalVisible(false)}
              color="secondary"
              style={{ fontSize: "14px", margin: "5px", outline: "none" }}
            >
              Discard
            </Button>
            <Button
              onClick={submitHandler}
              color="secondary"
              variant="contained"
              style={{ fontSize: "14px", margin: "5px", outline: "none" }}
            >
              {id ? "Update" : "Submit"}
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <div
        className="product-list"
        style={{ margin: "16px 48px 0 48px", border: "1px solid #eee" }}
      >
        <table className="table">
          <thead>
            <tr>
              <th>N°</th>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles &&
              articles.map((article, index) => (
                <tr key={article._id}>
                  <td>{index + 1}</td>
                  <td>{article.title}</td>
                  <td>
                    <IconButton
                      style={{ color: "green", outline: "none" }}
                      aria-label="edit"
                      onClick={() => openModal(article)}
                    >
                      <EditIcon style={{ fontSize: "20px" }} />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      aria-label="delete"
                      style={{ outline: "none" }}
                      onClick={() => deleteHandler(article)}
                    >
                      <DeleteIcon style={{ fontSize: "20px" }} />
                    </IconButton>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {loading && <div style={{ margin: "8px" }}>Loading ...</div>}
        {error && <div style={{ margin: "8px" }}>{error}</div>}
      </div>
    </div>
  );
}
export default ArticlesScreen;
