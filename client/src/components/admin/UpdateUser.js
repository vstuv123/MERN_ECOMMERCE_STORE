import React, { Fragment, useEffect, useState } from "react";
import "./NewProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, updateUserReset } from "../../store/adminSlice/adminSlice";
import { getUserDetails, updateUser } from "../../store/adminSlice/adminReducers";
import { useAlert } from "react-alert";
import { Button } from '@mui/material';
import MetaData from "../layout/MetaData";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonIcon from "@mui/icons-material/Person";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SideBar from "./Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../layout/Loader/Loader";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const alert = useAlert();
  const navigate = useNavigate();
  const { loading, error: updateError, isUpdatedUser } = useSelector((state) => state.admin);
  const { loading: userDetailsLoading, error, user } = useSelector((state) => state.admin);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (user === null){
        dispatch(getUserDetails(id));
    }
    if (user && user._id !== id) {
        dispatch(getUserDetails(id));
    }else {
        setName(user?.name);
        setEmail(user?.email);
        setRole(user?.role);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
        alert.error(error);
        dispatch(clearErrors());
      }

    if (isUpdatedUser) {
      alert.success("User Updated Successfully");
      navigate("/admin/users");
      dispatch(updateUserReset());
    }
  }, [dispatch, alert, error, navigate, isUpdatedUser, updateError, id, user]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ id, name, email, role }));
  };

  return (
    <Fragment>
      <MetaData title="Update User - ADMIN" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
        {
            userDetailsLoading ? (<Loader />) : (
                <form
                className="createProductForm"
                onSubmit={updateUserSubmitHandler}
              >
                <h1>Update User</h1>
    
                <div>
                  <PersonIcon />
                  <input
                    type="text"
                    placeholder="User Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <MailOutlineIcon />
                  <input
                    type="email"
                    value={email}
                    placeholder="User Email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
    
                <div>
                  <VerifiedUserIcon />
                  <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="">Choose User Role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>
    
                <Button
                  id="createProductBtn"
                  type="submit"
                  disabled={loading ? true : false || role === "" ? true : false}
                >
                  Update
                </Button>
              </form>
            )
        }
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;
