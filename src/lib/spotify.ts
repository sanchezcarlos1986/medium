import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
  "playlist-read-collaborative",
  "playlist-read-private",
  "streaming",
  "user-follow-read",
  "user-library-read",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-read-email",
  "user-read-playback-state",
  "user-read-private",
  "user-read-recently-played",
  "user-top-read",
].join(",");

const params = {
  scopes: scopes,
};

const queryParamString = new URLSearchParams(params);

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
  redirectUri: LOGIN_URL,
});

export { LOGIN_URL };

export default spotifyApi;
