import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";

// Material UI components
import { makeStyles } from "@material-ui/core/styles";
import { Grid, FormControl } from "@material-ui/core";
// Components
import { CustomizedButton, CustomizedInput } from "..";
// Helper functions
import { adminUpdateBook } from "../../helpers/axios.helpers";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { setUpdatedBook } from "../../redux/actions/adminActions";

const useStyles = makeStyles(() => ({
  margin: {
    margin: `10px 0px`,
  },
  width: {
    width: "40ch",
  },
  semiWidth: {
    width: "19ch",
  },
}));

const styles = {
  save: {
    margin: `10px 0px`,
    backgroundColor: "#2a9d8f",
    padding: "8px",
    borderRadius: 20,
    width: "130px",
    "&:hover": {
      backgroundColor: "#1f776d",
    },
  },
  delete: {
    margin: `10px 0px`,
    backgroundColor: "white",
    padding: "8px",
    fontSize: ".8rem",
    color: "#666",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "white",
      color: "#333",
    },
  },
};
const EditBook = ({ setEditMode, setActionState, book }) => {
  const classes = useStyles();
  const { accessToken } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    name: "",
    cover: "",
    author: "",
    description: "",
    release: "",
    quantity: "",
    price: "",
    genres: [],
    change: true,
    disabled: true,
  });
  const handleChange = (prop) => (event) => {
    setValues((prev) => ({
      ...prev,
      [prop]:
        prop === "genres"
          ? event.target.value.split(",").map((genre) => genre.trim())
          : event.target.value,
      disabled: false,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setActionState((prev) => ({
      ...prev,
      actionDone: false,
      loading: true,
      openAlert: false,
    }));
    adminUpdateBook({ _id: book._id, update: values }, accessToken).then(
      (book) => {
        dispatch(setUpdatedBook(book));
        setActionState((prev) => ({
          ...prev,
          loading: false,
          actionDone: true,
          openAlert: true,
          message: `Updated successfully`,
        }));
        setEditMode({ book: "", open: false });
      }
    );
  };
  const getReleaseDate = (r) => {
    const d = new Date(r);
    return (
      d.getFullYear() +
      "-" +
      (d.getMonth() < 10 ? "0" : "") +
      (d.getMonth() + 1) +
      "-" +
      (d.getDate() < 10 ? "0" : "") +
      d.getDate()
    );
  };
  useEffect(() => {
    if (values.change) {
      setValues((prev) => ({
        ...prev,
        name: book.name,
        author: book.author,
        description: book.description,
        release: getReleaseDate(book.release),
        quantity: book.quantity,
        price: book.price,
        genres: book.genres,
        cover: book.cover,
        change: false,
        disabled: true,
      }));
    }
  }, [book, accessToken, values]);
  return (
    <div className="edit-book">
      <button
        className="cls-scp"
        type="Button"
        onClick={() => setEditMode({ id: "", open: false })}
      >
        <KeyboardBackspaceIcon className="arr" />
      </button>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container justify="center" alignItems="center" direction="column">
          <Grid>
            <FormControl
              className={clsx(classes.margin, classes.width)}
              variant="outlined"
            >
              <CustomizedInput
                label="Name"
                variant="outlined"
                value={values.name}
                type="text"
                required
                onChange={handleChange("name")}
              />
            </FormControl>
          </Grid>
          <Grid>
            <FormControl
              className={clsx(classes.margin, classes.width)}
              variant="outlined"
            >
              <CustomizedInput
                label="Cover"
                variant="outlined"
                value={values.cover}
                type="url"
                required
                onChange={handleChange("cover")}
              />
            </FormControl>
          </Grid>
          <Grid>
            <FormControl
              className={clsx(classes.margin, classes.width)}
              variant="outlined"
            >
              <CustomizedInput
                label="Author"
                required
                variant="outlined"
                value={values.author}
                type="text"
                onChange={handleChange("author")}
              />
            </FormControl>
          </Grid>
          <Grid>
            <FormControl
              className={clsx(classes.margin, classes.width)}
              variant="outlined"
            >
              <CustomizedInput
                label="Description"
                required
                variant="outlined"
                value={values.description}
                type="text"
                onChange={handleChange("description")}
              />
            </FormControl>
          </Grid>
          <Grid>
            <FormControl
              className={clsx(classes.margin, classes.width)}
              variant="outlined"
            >
              <CustomizedInput
                label="Genres"
                variant="outlined"
                required
                value={values.genres.join(",")}
                placeholder="Ex: Romance, Fantasy, History"
                type="text"
                onChange={handleChange("genres")}
              />
            </FormControl>
          </Grid>
          <Grid>
            <FormControl
              className={clsx(classes.margin, classes.width)}
              variant="outlined"
            >
              <CustomizedInput
                label="Release date"
                variant="outlined"
                required
                value={values.release}
                type="date"
                onChange={handleChange("release")}
              />
            </FormControl>
          </Grid>
          <Grid>
            <FormControl
              className={clsx(classes.margin, classes.width)}
              variant="outlined"
            >
              <CustomizedInput
                variant="outlined"
                type="number"
                label="Price"
                value={values.price}
                required
                onChange={handleChange("price")}
              />
            </FormControl>
          </Grid>
          <Grid>
            <FormControl
              className={clsx(classes.margin, classes.width)}
              variant="outlined"
            >
              <CustomizedInput
                type="number"
                required
                value={values.quantity}
                label="Quantity"
                variant="outlined"
                onChange={handleChange("quantity")}
              />
            </FormControl>
          </Grid>
          <Grid
            container
            alignItems="center"
            justify="space-between"
            style={{ marginTop: "20px" }}
          >
            <CustomizedButton
              className={clsx(classes.margin)}
              type="button"
              style={styles.save}
              onClick={() =>
                setValues((prev) => ({
                  ...prev,
                  change: true,
                  disabled: true,
                }))
              }
            >
              Reset
            </CustomizedButton>
            <CustomizedButton
              disabled={values.disabled}
              className={clsx(classes.margin)}
              type="submit"
              style={styles.save}
            >
              Update
            </CustomizedButton>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
export default EditBook;
