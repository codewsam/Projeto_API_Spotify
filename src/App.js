import React, { useState, useEffect } from "react";
import SpotifyAuth from "./SpotifyAuth";
import queryString from "query-string";
import axios from "axios";
import "./App.css";

const App = () => {
  const [token, setToken] = useState("");
  const [track, setTrack] = useState(null);
  const [quote, setQuote] = useState(""); // Estado para a frase aleatória

  const quotes = [
    "Gosto do seu humor ",
    "Gosto do seu gosto musical 💪",
    "Gosto do seu cabelo",
    "gosto dos seus olhos",
    "Gosto das suas fotos",
    "Gosto das suas opiniões",
    "Gosto dos seus reels",
    "Gosto dos sues conselhos",
    "Gosto da sua empolgação",
    "Gosto da sua voz",
    "Gosto da sua risada escandalosa",
    "Gosto dos seus stories",
    "Gosto de como você se veste",
    "Gosto de como você se maquia",
    "Gosto de você",
  ]; // Array de frases

  useEffect(() => {
    const hash = queryString.parse(window.location.hash);
    if (hash.access_token) {
      console.log("Token recebido:", hash.access_token);
      setToken(hash.access_token);
      window.location.hash = ""; // Limpa o hash da URL
    }
  }, []);

  const fetchRandomTrack = async () => {
    const playlistId = "56prwCzGrayE5g12yR43Wu"; // ID da sua playlist
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

    try {
      console.log("Buscando músicas...");
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const tracks = response.data.items;
      console.log("Músicas retornadas:", tracks);

      if (tracks.length > 0) {
        const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
        console.log("Música selecionada:", randomTrack.track);
        setTrack(randomTrack.track);
      } else {
        console.log("Nenhuma música encontrada na playlist.");
      }

      // Escolher uma frase aleatória
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setQuote(randomQuote);

    } catch (error) {
      console.error("Erro ao buscar músicas:", error);
    }
  };

  return (
    <div className="app">
      {!token ? (
        <SpotifyAuth />
      ) : (
        <div className="logged-in">
          <button className="random-button" onClick={fetchRandomTrack}>
            Aperta
          </button>
          {track && (
            <div className="track-info">
              <h2>{track.name}</h2>
              <img src={track.album.images[0].url} alt={track.name} className="track-image" />
              <p>{quote}</p> {/* Exibindo a frase aleatória */}
              <a
                href={track.external_urls.spotify}
                target="_blank"
                rel="noreferrer"
              >
                Ouvir no Spotify
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
