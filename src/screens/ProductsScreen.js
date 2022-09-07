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
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";

import {
  saveProduct,
  listProducts,
  deleteProdcut,
} from "../actions/productActions";
import { saveCategory, listCategories } from "../actions/categoryActions";

import clsx from "clsx";

function ProductsScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("Category A");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [categoryModal, openCategoryModal] = useState(false);
  const productList = useSelector((state) => state.productList);
  const categoryList = useSelector((state) => state.categoryList.categories);
  const { loading, products, error } = productList;
  const [categoryLabel, setCategoryLabel] = useState("");

  const productSave = useSelector((state) => state.productSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;
  const dispatch = useDispatch();

  const handleAddCategory = (e) => {
    e.preventDefault();
    dispatch(
      saveCategory({
        label: categoryLabel,
      })
    );

    openCategoryModal(false);
    setCategoryLabel("");
  };

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listProducts());
    dispatch(listCategories());
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

  const openModal = (product) => {
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setImage(product.image);
    setBrand(product.brand);
    setCategory(product.category);
    setCountInStock(product.countInStock);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveProduct({
        _id: id,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };
  const deleteHandler = (product) => {
    dispatch(deleteProdcut(product._id));
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
        <h3 style={{ fontWeight: 600 }}>Products</h3>
        <div>
          <Button
            variant="outlined"
            onClick={() => openCategoryModal(true)}
            color="secondary"
            style={{ fontSize: "14px", marginRight: "16px", outline: "none" }}
          >
            Add Category
          </Button>
          <Button
            variant="outlined"
            onClick={() => openModal({})}
            color="secondary"
            style={{ fontSize: "14px", outline: "none" }}
          >
            Create Product
          </Button>
        </div>
      </div>
      {modalVisible && (
        <Dialog
          aria-labelledby="customized-dialog-title"
          open={modalVisible}
          onClose={() => setModalVisible(false)}
        >
          <DialogTitle id="customized-dialog-title">Create Product</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  id="name"
                  label="Product Name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  variant="outlined"
                  color="secondary"
                  style={{ width: "100%" }}
                  className={clsx(classes.input, classes.root)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="price"
                  label="Price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  variant="outlined"
                  color="secondary"
                  className={clsx(classes.input, classes.root)}
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="brand"
                  label="Brand"
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  variant="outlined"
                  color="secondary"
                  style={{ width: "100%" }}
                  className={clsx(classes.input, classes.root)}
                />
              </Grid>
              <Grid item xs={4}>
                <FormControl
                  variant="outlined"
                  className={classes.root}
                  color="secondary"
                  style={{ width: "100%" }}
                >
                  <InputLabel
                    htmlFor="outlined-rating-native-simple"
                    style={{
                      fontSize: "20px",
                      background: "#fff",
                    }}
                  >
                    Category
                  </InputLabel>
                  <Select
                    native
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    inputProps={{
                      name: "Ratin",
                      id: "outlined-age-native-simple",
                    }}
                    className={classes.select}
                  >
                    {categoryList &&
                      categoryList.map(({ label }, index) => (
                        <option
                          key={index}
                          style={{ padding: "16px 8px" }}
                          value={label}
                        >
                          {label}
                        </option>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="country-in-stock"
                  label="Country In Stock"
                  type="number"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
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
                  rows={3}
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
      {categoryModal && (
        <Dialog
          open={categoryModal}
          aria-labelledby="customized-dialog-title"
          onClose={() => openCategoryModal(false)}
        >
          <DialogTitle id="customized-dialog-title">Add Category</DialogTitle>
          <DialogContent>
            <TextField
              id="category"
              label="Category Label"
              type="text"
              value={categoryLabel}
              onChange={(e) => setCategoryLabel(e.target.value)}
              variant="outlined"
              color="secondary"
              className={clsx(classes.input, classes.root)}
              style={{ width: "25em" }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              onClick={() => openCategoryModal(false)}
              color="secondary"
              style={{ fontSize: "14px", margin: "5px", outline: "none" }}
            >
              Discard
            </Button>
            <Button
              onClick={handleAddCategory}
              color="secondary"
              variant="contained"
              style={{
                fontSize: "14px",
                margin: "5px",
                width: "90px",
                outline: "none",
              }}
              disabled={!categoryLabel}
            >
              Add
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
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product, index) => (
                <tr key={product._id}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.price} DT</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <IconButton
                      style={{ color: "green", outline: "none" }}
                      aria-label="edit"
                      onClick={() => openModal(product)}
                    >
                      <EditIcon style={{ fontSize: "20px" }} />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      aria-label="delete"
                      style={{ outline: "none" }}
                      onClick={() => deleteHandler(product)}
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
export default ProductsScreen;
