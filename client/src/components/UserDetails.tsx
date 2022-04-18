import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BASE_URL, IUserData } from "./User";

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

export const getUser = async (name: string) => {
  try{
    return await axios.get(`${BASE_URL}/${name.toLowerCase()}`)
  }
  catch(er){
    return ;
  }
 };

const UserDetails = () => 
{
  const [state,setState] = useState<IUserData>({id: undefined, login:"test", avatar_url:"" });
  const username = useParams().username;
   useEffect(() => {
    getUser(username).then((res) =>
       setState({
      id: res.data.user.id,
      avatar_url: res.data.user.avatar_url,
      login: res.data.user.login
    }));
   }, []);   // eslint-disable-line react-hooks/exhaustive-deps
  
  return (
    <React.Fragment>
      <div className="container">
        <div className="row mt-5">
          <Link to="/">Home</Link>
        </div>
        <div className="row mt-3">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h2>
                  Displaying Github profile details for{" "}
                  <span data-testid="resolved" className="text-primary">{state.login}</span>
                </h2>
                <dl>
                <dt>{"Id:"}</dt>
			          <dd><span className="text-primary">{state.id}</span></dd>
                <dt>{"Image:"}</dt>
			          <dd><a href={state.avatar_url}>url</a></dd>
                </dl>
                </div>
                <div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default UserDetails;
