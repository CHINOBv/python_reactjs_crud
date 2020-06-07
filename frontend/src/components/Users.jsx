import React, { useState, useEffect } from "react";

const Users = () => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Password_Rep, setPassword_Rep] = useState("");
  const [Error, setError] = useState({
    state: false,
    msg: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Password.trim() !== Password_Rep.trim()) {
      setError({ state: true, msg: "Both Passwords Must Match" });
      return;
    }else{
      setError({})
    }
  };

  return (
    <div className="row">
      <div className="col-md-4">
        {Error.state ? (
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
              value={Name}
              placeholder="Enter your Name"
              autoFocus
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              value={Email}
              placeholder="Enter your Email"
              autoFocus
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
              value={Password}
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
            type="submit"
            value="Create"
            className="btn btn-primary btn-block"
          />
        </form>
      </div>
      <div className="col-md-8"></div>
    </div>
  );
};

export default Users;
