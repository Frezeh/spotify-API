// @ts-nocheck
/* eslint-disable */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Grid,
  CardActionArea,
  Card,
  CardMedia,
  IconButton,
  useMediaQuery,
} from "@material-ui/core";
import axios from "axios";
import { Lock } from "@material-ui/icons";
import { addMyLibrary, addNewReleaseLibrary } from "./redux/ActionCreators";
import { useDispatch } from "react-redux";
import MyLibrary from "./MyLibrary";
import Profile from "./profile.jpeg"
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    marginRight: 10,
  },
  appBar: {
    backgroundColor: "#1B1464",
    height: 60,
    display: "flex",
    flexDirection: "row",
  },
  appBarWide: {
    backgroundColor: "#1B1464",
    height: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  media: {
    height: 300,
    width: 300,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  card: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "milk",
  },
}));

function Homepage({ token, handleLogout }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const matches = useMediaQuery("(min-width:600px)");
  const [newRelease, setNewRelease] = React.useState([]);
  const [userProfile, setUserProfile] = React.useState([]);
  const [searchKey, setSearchKey] = React.useState("");
  const [tracks, setTracks] = React.useState([]);
  const [myLibrary, setMylibrary] = React.useState(false);

  // Get new release
  React.useEffect(() => {
    const getNewRelease = async () => {
      try {
        const data = await axios.get(
          "https://api.spotify.com/v1/browse/new-releases",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setNewRelease(data?.data?.albums?.items);
      } catch (error) {
        alert(error);
      }
    };
    getNewRelease();
  }, []);

  // Get User profile
  React.useEffect(() => {
    const getUserProfile = async () => {
      try {
        const data = await axios.get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserProfile(data?.data);
        console.log(data?.data);
      } catch (error) {
        alert(error);
      }
    };

    getUserProfile();
  }, []);

  // Search for Tracks
  const searchArtists = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: searchKey,
          type: "track",
        },
      });

      setTracks(data.tracks.items);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      {myLibrary ? (
        <MyLibrary
          token={token}
          handleLogout={handleLogout}
          userProfile={userProfile}
        />
      ) : (
        <div className={classes.root} style={{ fontFamily: "cursive" }}>
          <CssBaseline />
          {/* Navigation Bar */}
          {!matches ? (
            <AppBar className={classes.appBar}>
              <Toolbar className={classes.toolbar}>
                <img
                  width={"40"}
                  src={Profile}
                  alt={"Profile"}
                  style={{ borderRadius: "50%" }}
                />
              </Toolbar>
              <form onSubmit={searchArtists}>
                <input
                  type="text"
                  onChange={(e) => setSearchKey(e.target.value)}
                />
                <button type={"submit"}>Search</button>
              </form>
              <Typography onClick={() => setMylibrary(true)}>
                My Library
              </Typography>
              <IconButton color="inherit" onClick={handleLogout}>
                <Lock />
              </IconButton>
            </AppBar>
          ) : (
            <AppBar className={classes.appBarWide}>
              <Toolbar className={classes.toolbar}>
                <img
                  width={"40"}
                  src={Profile}
                  alt={"Profile"}
                  style={{ borderRadius: "50%" }}
                />
              </Toolbar>
              <h1 style={{ fontSize: 15, color: "white" }}>
                {userProfile.display_name}
              </h1>
              <form onSubmit={searchArtists} style={{ marginTop: 7 }}>
                <input
                  type="text"
                  onChange={(e) => setSearchKey(e.target.value)}
                />
                <button type={"submit"}>Search</button>
              </form>
              <Typography
                style={{ marginTop: 7 }}
                onClick={() => setMylibrary(true)}
              >
                My Library
              </Typography>
              <IconButton color="inherit" onClick={handleLogout}>
                <Lock />
              </IconButton>
            </AppBar>
          )}

          {/* New Releases */}
          <div
            style={{ display: "flex", flexDirection: "column", marginTop: 100 }}
          >
            <h1 style={{ fontSize: 15, color: "black", marginLeft: 20 }}>
              New Releases
            </h1>
            <Grid container direction="row" item xs={12} md={12}>
              {newRelease?.slice(0, 4).map((news) => (
                <div>
                  <Card
                    variant="outlined"
                    className={classes.card}
                    key={news.id}
                  >
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={`${news?.images[1]?.url}`}
                      />
                    </CardActionArea>
                  </Card>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    style={{ marginLeft: 35, fontSize: 16 }}
                  >
                    {news.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    onClick={() => {
                      dispatch(addNewReleaseLibrary(news));
                      alert("Playlist add to library");
                    }}
                    style={{ marginLeft: 35 }}
                  >
                    + Save to library
                  </Typography>
                </div>
              ))}
            </Grid>

            {/* Search Results */}
            <div style={{ marginTop: 100 }}>
              {tracks.map((track) => (
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                  key={track.id}
                >
                  <img
                    width={"10%"}
                    src={track.album.images[2].url}
                    alt=""
                    style={{ borderRadius: "50%" }}
                  />
                  <span>{track.name}</span>
                  <span>{track.album.name}</span>
                  <span>{track.album.release_date}</span>
                  <span
                    onClick={() => {
                      dispatch(addMyLibrary(track));
                      alert("Playlist add to library");
                    }}
                  >
                    +
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Homepage;
