import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  DataGrid,
  useGridSlotComponentProps,
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";
import { Avatar } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { useHistory } from "react-router-dom";
import CustomizedButton from "../ui/CustomizedButton";
import { CustomAlert } from "..";
import {
  setActiveUsers,
  updateDashboardData,
} from "../../redux/actions/adminActions";
import { adminSetUsersActive } from "../../helpers/axios.helpers";
const styles = {
  activate: {
    backgroundColor: "#65b56d",
    padding: "8.5px 16px",
    width: "100%",
    "&:hover": {
      backgroundColor: "#4f8e56",
    },
  },
  deactivate: {
    backgroundColor: "#e64d59",
    padding: "8.5px 16px",
    width: "100%",
    "&:hover": {
      backgroundColor: "#c53f4a",
    },
  },
};
const columns = [
  {
    field: "picture",
    headerName: "Avatar",
    width: 130,
    renderCell: (params) => (
      <Avatar src={params.row.picture} style={{ fontSize: "1rem" }}>
        {params.row.name[0].toUpperCase()}
      </Avatar>
    ),
  },
  { field: "id", headerName: "ID", width: 200 },
  { field: "name", headerName: "Full name", width: 180 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "highlights", headerName: "Highlights", width: 150 },
  { field: "orders", headerName: "Orders", width: 150 },
  { field: "payed", headerName: "Payed", width: 150 },

  {
    field: "createdAt",
    headerName: "Joined",
    width: 150,
  },
  {
    field: "active",
    headerName: "Active",
    width: 130,
    renderCell: (params) => (
      <FiberManualRecordIcon
        style={{
          color: params.value ? "#4CB963" : "#e63946",
          fontSize: "1rem",
        }}
      />
    ),
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

const Users = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    dashboard: { users },
    user: { accessToken },
  } = useSelector((state) => state);
  const rows = users.map(
    ({
      _id,
      name,
      email,
      picture,
      createdAt,
      active,
      highlights,
      payed,
      orders,
    }) => ({
      id: _id,
      name,
      email,
      picture,
      createdAt: new Date(createdAt).toDateString(),
      active,
      highlights: highlights.length,
      payed: (payed < 10 ? "0" : "") + payed.toFixed(2) + " $",
      orders: orders.length,
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
          <div style={{ display: "flex", gap: 5 }}>
            <CustomizedButton
              disableElevation
              style={styles.activate}
              onClick={() => {
                adminSetUsersActive(
                  { selectionModel, active: true },
                  accessToken
                ).then((res) => {
                  if (res.ok) {
                    dispatch(
                      setActiveUsers({ data: selectionModel, active: true })
                    );
                    setSelectionModel([]);
                  }
                });
              }}
            >
              Activate
            </CustomizedButton>
            <CustomizedButton
              disableElevation
              style={styles.deactivate}
              onClick={() => {
                adminSetUsersActive(
                  { selectionModel, active: false },
                  accessToken
                ).then((res) => {
                  if (res.ok) {
                    dispatch(
                      setActiveUsers({ data: selectionModel, active: false })
                    );
                    setSelectionModel([]);
                  }
                });
              }}
            >
              Deactivate
            </CustomizedButton>
          </div>
        ) : (
          <h1 className="g-title">Users</h1>
        )}
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  };

  return (
    <div className="users">
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          pagination
          rows={rows}
          columns={columns}
          pageSize={8}
          checkboxSelection
          loading={deleteState.loading}
          onRowClick={(params) => history.push("/readers/" + params.row.id)}
          onSelectionModelChange={(param) =>
            setSelectionModel(param.selectionModel)
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
export default Users;
