import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const BASE_URL = "http://localhost:5000/github/users";

export interface IUserData{
  id: number,
  login: string,
  avatar_url: string
}

export const RetriveData = async () => {
  try {
    let res = await axios.get(`${BASE_URL}`);
    let responseUsers: IUserData[] = res.data.users.map((responseUser: any) =>{
      return {
        id: responseUser.id,
        login: responseUser.login,
        avatar_url: responseUser.avatar_url
      }
    })
    return responseUsers;
  } catch (error) {
    return []
  }
};

const User = () => {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    RetriveData().then((res) => setUsers(res));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (e: any) => {
    setSearch(e.target.value);
  };

  const handleSearch = async (e: any) => {
    e.preventDefault();

    try {
      let resdata = await axios.get(
        `${BASE_URL}/${search.toLowerCase()}`
      );

      let filterdUsers = resdata.data.user;

      setUsers([filterdUsers]);
    } catch (error) {
      setUsers([]);
    }
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="row my-3">
          <div className="col-md-7 offset-2">
            <div className="card">
              <div className="card-body bg-secondary text-white">
                <form className="form-inline" onSubmit={handleSearch}>
                  <div className="form-group">
                    <label htmlFor="search">Enter Username</label>
                    <input
                      type="text"
                      className="form-control ml-3 mr-5"
                      id="search"
                      name="search"
                      value={search}
                      placeholder="enter username"
                      autoComplete="off"
                      onChange={handleChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-info">
                    Search
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div>
            <h4 className="text-primary font-weight-bold">
              List of few Users:
            </h4>
          </div>
        </div>
        <div className="row ">
          <div className="col ">
            <ul className="list-group">
              {users?.map((user) => {
                return (
                  <div key={user.id}>
                    <Link to={`users/${user.login}`}>
                      <li className="list-group-item custom_li">
                        {user.login}
                      </li>
                    </Link>
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default User;
