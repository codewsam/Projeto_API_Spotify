import React from "react";
import "./App.css";

const SpotifyAuth = () => {
  const CLIENT_ID = "9c6200fbac0f495eba7ef1680621b741"; 
  const REDIRECT_URI = "https://codewsam.github.io/Projeto_API_Spotify/";  
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const handleLogin = () => {
    const authURL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=${RESPONSE_TYPE}&scope=user-read-private`;
    window.location.href = authURL;
  };
  
  

  return (
    <div className="login-container">
      <h3 className="login-text">
        Eu disse que ia criar uma nova surpresa mas vou nada, essa eu achei muito legal. <br />
        Aperte esse botão quando se sentir que não é boa o suficiente ou pensar qualquer uma daquelas coisas sem sentido, <br />
        sempre que apertar vai ter uma música que ou me lembra você ou que você gosta etc + algo que gosto em você, <br />
        não deixe erro do passado te machucar tanto no presente, acho você incrível do seu jeito 🌼
      </h3>
      <button className="login-button" onClick={handleLogin}>Login com Spotify</button>
    </div>
  );
};

export default SpotifyAuth;
