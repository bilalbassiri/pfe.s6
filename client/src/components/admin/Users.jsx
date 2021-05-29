import React from "react";
import { useSelector } from "react-redux";
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
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <h1 className="title">Users</h1>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}
const Users = () => {
  const history = useHistory();
  const users = useSelector((state) => state.dashboard.users);
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
  return (
    <div className="users">
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          pagination
          rows={rows}
          columns={columns}
          pageSize={8}
          checkboxSelection
          onRowClick={(params) => history.push("/readers/" + params.row.id)}
          components={{
            Pagination: CustomPagination,
            Toolbar: CustomToolbar,
          }}
        />
      </div>
    </div>
  );
};
export default Users;
