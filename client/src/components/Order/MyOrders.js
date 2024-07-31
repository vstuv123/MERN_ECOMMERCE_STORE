import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./myOrders.css";
import { getUserOrders } from "../../store/orderSlice/orderReducers";
import { clearErrors } from "../../store/orderSlice/orderSlice";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Typography from "@mui/material/Typography";
import MetaData from "../layout/MetaData";
import LaunchIcon from "@mui/icons-material/Launch";

const MyOrders = () => {
  const dispatch = useDispatch();

  const alert = useAlert();
  const { loading, error, orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        const status = params.row.status.trim();
        return status === 'Delivered' ? 'greenColor' : 'redColor';
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
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
          <Link to={`/order/${params.row.id}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.map((item, index) =>
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      })
    );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getUserOrders());
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      <MetaData title={`${user.name} - Orders`} />

      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />

          <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
