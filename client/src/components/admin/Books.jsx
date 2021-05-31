import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// Material UI components
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";
import Rating from "@material-ui/lab/Rating";
import { CustomAlert, CustomizedButton, CustomPagination } from "..";
import { adminDeleteBooks } from "../../helpers/axios.helpers";
import { updateDashboardData } from "../../redux/actions/adminActions";
import EditBook from "./EditBook";

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "author", headerName: "Author", width: 140 },
  { field: "price", headerName: "Price", width: 110 },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 110,
    cellClassName: (params) =>
      `book-quantity ${
        params.value <= 0 ? "empty" : params.value > 10 ? "still" : "lack"
      }`,
  },
  {
    field: "rating",
    headerName: "Rating",
    width: 120,
    renderCell: (params) => (
      <Rating
        style={{ fontSize: "1rem" }}
        name="half-rating-read"
        defaultValue={params.value}
        precision={0.1}
        readOnly
      />
    ),
  },
  {
    field: "rating_count",
    headerName: "Reviews",
    width: 110,
  },
  {
    field: "genres",
    headerName: "Genre",
    width: 130,
  },
  {
    field: "release",
    headerName: "Released",
    width: 150,
  },
  {
    field: "createdAt",
    headerName: "Added",
    width: 150,
  },
  {
    field: "updatedAt",
    headerName: "Last Update",
    width: 150,
  },
];

const Books = () => {
  const dispatch = useDispatch();
  const {
    dashboard: { books },
    user: { accessToken },
  } = useSelector((state) => state);
  const rows = books.map(
    ({
      _id,
      name,
      author,
      price,
      quantity,
      rating,
      createdAt,
      updatedAt,
      cover,
      release,
      rating_count,
      genres,
    }) => ({
      id: _id,
      name,
      author,
      price: (price < 10 ? "0" : "") + price.toFixed(2) + " $",
      quantity,
      rating,
      cover,
      rating_count,
      genres: genres ? genres.join(", ") : "-",
      createdAt: new Date(createdAt).toDateString(),
      updatedAt: new Date(updatedAt).toDateString(),
      release: new Date(release).toDateString(),
    })
  );
  const [selectionModel, setSelectionModel] = useState([]);
  const [editMode, setEditMode] = useState({
    book_id: "",
    open: false,
  });

  const [actionState, setActionState] = useState({
    loading: false,
    actionDone: false,
    openAlert: false,
    message: "",
  });

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        {selectionModel.length ? (
          <CustomizedButton
            disableElevation
            onClick={() => {
              setActionState((prev) => ({
                ...prev,
                actionDone: false,
                loading: true,
                openAlert: false,
              }));
              adminDeleteBooks(selectionModel, accessToken).then((res) => {
                if (res.ok) {
                  dispatch(
                    updateDashboardData({
                      prop: "books",
                      data: books.filter(
                        (book) => !selectionModel.includes(book._id)
                      ),
                    })
                  );
                  setActionState((prev) => ({
                    ...prev,
                    loading: false,
                    actionDone: true,
                    openAlert: true,
                    message: `${selectionModel.length} book${
                      selectionModel.length > 1 ? "s" : ""
                    } has been successfully deleted`,
                  }));
                  setSelectionModel([]);
                } else {
                  setActionState((prev) => ({
                    ...prev,
                    actionDone: false,
                    loading: false,
                    openAlert: true,
                    message: "Sorry, deleting process went wrong",
                  }));
                }
              });
            }}
          >
            Delete {selectionModel.length || ""}
          </CustomizedButton>
        ) : (
          <h1 className="g-title">Books </h1>
        )}
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  };
  return (
    <div className="books">
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          pagination
          rows={rows}
          columns={columns}
          pageSize={8}
          checkboxSelection
          loading={actionState.loading}
          onSelectionModelChange={(param) =>
            setSelectionModel(param.selectionModel)
          }
          onRowDoubleClick={(param) => {
            setEditMode({
              book: books.filter((book) => param.row.id === book._id)[0],
              open: true,
            });
          }}
          components={{
            Pagination: CustomPagination,
            Toolbar: CustomToolbar,
          }}
        />
      </div>
      {editMode.open && (
        <EditBook
          setEditMode={setEditMode}
          setActionState={setActionState}
          book={editMode.book}
        />
      )}
      {actionState.openAlert && (
        <CustomAlert
          message={actionState.message}
          severity={actionState.actionDone ? "success" : "error"}
        />
      )}
    </div>
  );
};
export default Books;
