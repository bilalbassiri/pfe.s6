import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
// Material UI components
import {
  DataGrid,
  useGridSlotComponentProps,
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";
import Pagination from "@material-ui/lab/Pagination";
import Rating from "@material-ui/lab/Rating";
import { CustomAlert, CustomizedButton } from "..";
import { adminDeleteBooks } from "../../helpers/axios.helpers";
import { updateDashboardData } from "../../redux/actions/adminActions";
const columns = [
  { field: "id", headerName: "ID", width: 150 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "author", headerName: "Author", width: 150 },
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
    width: 140,
    renderCell: (params) => (
      <Rating
        style={{ fontSize: "1.2rem" }}
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
    field: "createdAt",
    headerName: "Added",
    width: 160,
  },
  {
    field: "updatedAt",
    headerName: "Last Update",
    width: 160,
  },
];
const CustomPagination = () => {
  const { state, apiRef } = useGridSlotComponentProps();

  return (
    <Pagination
      color="primary"
      count={state.pagination.pageCount}
      page={state.pagination.page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
};

const Books = () => {
  const history = useHistory();
  const {
    dashboard: { books },
    user: { accessToken },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const rows = books?.map(
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
      release,
      rating_count,
      genres: genres ? genres.join(", ") : "-",
      createdAt: new Date(createdAt).toDateString(),
      updatedAt: new Date(updatedAt).toDateString(),
    })
  );
  const [selectionModel, setSelectionModel] = useState([]);
  const [deleteState, setDeleteState] = useState({
    loading: false,
    deleted: false,
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
              setDeleteState((prev) => ({
                ...prev,
                deleted: false,
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
                  setDeleteState((prev) => ({
                    ...prev,
                    loading: false,
                    deleted: true,
                    openAlert: true,
                    message: `${selectionModel.length} book${
                      selectionModel.length > 1 ? "s" : ""
                    } has been successfully deleted`,
                  }));
                  setSelectionModel([]);
                } else {
                  setDeleteState((prev) => ({
                    ...prev,
                    deleted: false,
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
          <h1 className="g-title">Books</h1>
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
          loading={deleteState.loading}
          onSelectionModelChange={(param) =>
            setSelectionModel(param.selectionModel)
          }
          onRowClick={(param) =>
            history.push("/admin/dashboard/books/" + param.row.id)
          }
          components={{
            Pagination: CustomPagination,
            Toolbar: CustomToolbar,
          }}
        />
      </div>
      {deleteState.openAlert && (
        <CustomAlert
          message={deleteState.message}
          severity={deleteState.deleted ? "success" : "error"}
        />
      )}
    </div>
  );
};
export default Books;
