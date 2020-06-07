import React, { useState, useEffect } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API;

const Users = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Password_Rep, setPassword_Rep] = useState("");

  const [users, setUsers] = useState([]);
  const [Alert, setAlert] = useState({
    status: false,
    msg: "",
    color: "",
  });

  const [Error, setError] = useState({
    status: false,
    type: "",
    msg: "",
  });

  useEffect(() => {
    if (password.trim() !== Password_Rep.trim()) {
      setError({
        status: true,
        type: "fields",
        msg: "Both Passwords Must Match",
      });
      return;
    } else {
      setError({});
    }
    if (
      password.trim() === "" ||
      Password_Rep.trim() === "" ||
      name.trim() === "" ||
      email.trim() === " "
    ) {
      setError({
        status: true,
        type: "fields",
        msg: "All Fields Are Required",
      });
      return;
    }
    setError({});
  }, [name, email, password, Password_Rep]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Error.status) return;

    let res = await axios(`${API}/users`, {
      method: "POST",
      data: {
        name,
        email,
        password,
      },
    });
    // console.log(res);
    await getUsers();
    if (!res) {
      setAlert({
        status: true,
        color: "danger",
        msg: "An error occurred while creating the user",
      });
      return;
    }
    setAlert({
      status: true,
      color: "success",
      msg: "User Created",
    });
    setTimeout(() => {
      setAlert({});
    }, 5000);
  };

  const getUsers = async () => {
    let res = await axios(`${API}/users`);
    let data = await JSON.stringify(res.data);
    let datas = await JSON.parse(data);
    await setUsers(datas);
    //console.log(datas)
  };

  useEffect(() => {
    setError({});

    getUsers();
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("Do You Want to Delete this User?")) return;
    await axios(`${API}/users/${id}`, {
      method: "DELETE",
    });
    await setAlert({
      status: true,
      msg: "User Deleted",
      color: "danger",
    });
    await getUsers();
    setTimeout(() => {
      setAlert({});
    }, 5000);
  };

  return (
    <div className="row">
      <div className="col-md-4">
        {Error.status && Error.type === "fields" ? (
          <div
            className="alert alert-warning alert-dismissible fade show"
            role="alert"
          >
            {Error.msg}
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
        ) : null}
        <form onSubmit={(e) => handleSubmit(e)} className="card card-body">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Enter your Name"
              autoFocus
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Enter your Email"
              autoFocus
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Enter your Password"
              autoFocus
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              onChange={(e) => setPassword_Rep(e.target.value)}
              value={Password_Rep}
              placeholder="Repeat your Password"
              autoFocus
            />
          </div>
          <input
            disabled={Error.type === "fields" ? true : false}
            type="submit"
            value="Create"
            className="btn btn-primary btn-block"
          />
        </form>
      </div>
      <div className="col-md-6">
        {Alert.status ? (
          <div
            className={`alert alert-${Alert.color} alert-dismissible fade show alert`}
            role="alert"
          >
            {Alert.msg}
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
        ) : null}
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>
                  <button className="btn btn-ligth btn-sm btn-block border border-primary">
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm btn-block"
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
