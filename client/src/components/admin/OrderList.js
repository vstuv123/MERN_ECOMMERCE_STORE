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
import { clearErrors, deleteOrderReset } from '../../store/adminSlice/adminSlice';
import { getAllOrders, deleteOrder } from '../../store/adminSlice/adminReducers';

const OrderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { error, orders } = useSelector((state) => state.admin);

  const { error: deleteError, isDeletedOrder } = useSelector(
    (state) => state.admin
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteOrder(id));
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

    if (isDeletedOrder) {
      alert.success("Order Deleted Successfully");
      navigate("/admin/orders");
      dispatch(deleteOrderReset());
    }

    dispatch(getAllOrders());
  }, [dispatch, alert, error, deleteError, navigate, isDeletedOrder]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 200, flex: 0.5 },

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
          <Fragment>
            <Link to={`/admin/order/${params.row.id}`}>
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

  const rows = orders?.map((item) => ({
    id: item._id,
    itemsQty: item.orderItems.length,
    amount: item.totalPrice,
    status: item.orderStatus,
  }));

  return (
    <Fragment>
      <MetaData title={`ALL ORDERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS</h1>

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

export default OrderList
