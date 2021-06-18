import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";
import { Avatar } from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CustomizedButton from "../ui/CustomizedButton";
import { CustomAlert, CustomLoadingOverlay, CustomPagination } from "..";
import { deleteUsers, setActiveUsers } from "../../redux/actions/adminActions";
import {
  adminDeleteUsers,
  adminSetUsersActive,
} from "../../helpers/axios.helpers";

const styles = {
  activate: {
    backgroundColor: "#65b56d",
    fontSize: ".7rem",
    "&:hover": {
      backgroundColor: "#4f8e56",
    },
  },
  deactivate: {
    backgroundColor: "#e64d59",
    fontSize: ".7rem",
    "&:hover": {
      backgroundColor: "#c53f4a",
    },
  },
  delete: {
    fontSize: ".7rem",
  },
};
const columns = [
  {
    field: "name",
    headerName: "Full name",
    width: 200,
    renderCell: (params) => (
      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
        <Avatar src={params.row.picture} style={{ fontSize: "1rem" }}>
          {params.row.name[0].toUpperCase()}
        </Avatar>
        <h4>{params.row.name}</h4>
      </div>
    ),
  },
  { field: "id", headerName: "ID", width: 150 },
  { field: "username", headerName: "Username", width: 150 },
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

const Users = () => {
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
      username,
    }) => ({
      id: _id,
      name,
      username,
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
  const [actionState, setActionState] = useState({
    loading: false,
    actionDone: false,
    openAlert: false,
    message: "",
  });
  const handleUserActivation = (active) => {
    setActionState({
      ...actionState,
      loading: true,
      actionDone: false,
      openAlert: false,
    });
    adminSetUsersActive({ selectionModel, active }, accessToken).then((res) => {
      if (res.ok) {
        dispatch(setActiveUsers({ data: selectionModel, active }));
        setActionState({
          loading: false,
          actionDone: true,
          openAlert: true,
          message: `${selectionModel.length} user${
            selectionModel.length > 1 ? "s" : ""
          } has been ${!active ? "de" : ""}activited successfully`,
        });
        setSelectionModel([]);
      }
    });
  };
  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        {selectionModel.length ? (
          <div style={{ display: "flex", gap: 5 }}>
            <CustomizedButton
              disableElevation
              style={styles.activate}
              onClick={() => handleUserActivation(true)}
            >
              Activate
            </CustomizedButton>
            <CustomizedButton
              disableElevation
              style={styles.deactivate}
              onClick={() => handleUserActivation(false)}
            >
              Deactivate
            </CustomizedButton>
            <CustomizedButton
              disableElevation
              style={styles.delete}
              onClick={() => {
                if (
                  !window.confirm(
                    `Hi there 👋, are you sure you want to delete ${
                      selectionModel.length
                    } user${selectionModel.length > 1 ? "s" : ""}?`
                  )
                )
                  return;
                else {
                  setActionState({
                    ...actionState,
                    loading: true,
                    actionDone: false,
                    openAlert: false,
                  });
                  adminDeleteUsers(selectionModel, accessToken).then((res) => {
                    if (res.ok && res.deletedCount === selectionModel.length) {
                      console.log(res);
                      dispatch(deleteUsers(selectionModel));
                      setActionState({
                        ...actionState,
                        loading: false,
                        actionDone: true,
                        openAlert: true,
                        message: `${res.deletedCount} user${
                          res.deletedCount > 1 ? "s" : ""
                        } has been deleted successfully`,
                      });
                    } else {
                      setActionState({
                        ...actionState,
                        loading: false,
                        actionDone: false,
                        openAlert: true,
                        message: `Sorry, something went wrong, try later.`,
                      });
                    }
                  });
                }
              }}
            >
              Delete
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
          loading={actionState.loading}
          // onRowClick={(params) => history.push("/readers/" + params.row.id)}
          onSelectionModelChange={(param) =>
            setSelectionModel(param.selectionModel)
          }
          components={{
            Pagination: CustomPagination,
            Toolbar: CustomToolbar,
            LoadingOverlay: CustomLoadingOverlay,
          }}
        />
      </div>
      {actionState.openAlert && (
        <CustomAlert
          message={actionState.message}
          severity={actionState.actionDone ? "success" : "error"}
        />
      )}
    </div>
  );
};
export default Users;
