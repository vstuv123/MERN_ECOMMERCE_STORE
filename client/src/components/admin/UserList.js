
import React, { Fragment, useEffect } from 'react'
import { DataGrid } from "@mui/x-data-grid";
import './ProductList.css';
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from '@mui/material';
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import { clearErrors, deleteUserReset } from '../../store/adminSlice/adminSlice';
import { getAllUsers, deleteUser } from '../../store/adminSlice/adminReducers';

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { error, users } = useSelector((state) => state.admin);

  const { error: deleteError, isDeletedUser } = useSelector(
    (state) => state.admin
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeletedUser) {
      alert.success("User Deleted Successfully");
      navigate("/admin/users");
      dispatch(deleteUserReset());
    }

    dispatch(getAllUsers());
  }, [dispatch, alert, error, deleteError, navigate, isDeletedUser]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 200, flex: 0.5 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      type: "string",
      minWidth: 150,
      flex: 0.5,
    },

    {
        field: "role",
        headerName: "Role",
        minWidth: 150,
        flex: 0.5,
        cellClassName: (params) => {
            const role = params.row.role.trim();
            return role === 'admin' ? 'greenColor' : 'redColor';
        },
      },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/user/${params.row.id}`}>
              <Edit />
            </Link>

            <Button
              onClick={() =>
                deleteProductHandler(params.row.id)
              }
            >
              <Delete />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = users?.map((item) => ({
    id: item._id,
    email: item.email,
    name: item.name,
    role: item.role,
  }));

  return (
    <Fragment>
      <MetaData title={`ALL USERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            autoPageSize
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default UserList;

