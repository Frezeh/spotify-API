import React from "react";
import "./App.css";
import Homepage from "./homepage";
import Login from "./Login";

export default function App() {
  const CLIENT_ID = "8637d967a053417ca8bcc7326326416a";
  const REDIRECT_URI = "https://spotifyassessment.netlify.app/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const [token, setToken] = React.useState("");
  
  React.useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    // getToken()
    if (!token && hash) {
      // @ts-ignore
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
    // @ts-ignore
    setToken(token);
    console.log(token);
  }, []);

  const handleLogout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };
  
  return (
    <div>
      {!token ? <Login AUTH_ENDPOINT={AUTH_ENDPOINT} CLIENT_ID={CLIENT_ID} REDIRECT_URI={REDIRECT_URI} RESPONSE_TYPE={RESPONSE_TYPE}/> : <Homepage token={token} handleLogout={handleLogout}/>}
    </div>
  );
}