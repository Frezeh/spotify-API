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
import { Lock } from "@material-ui/icons";
import { fetchMyLibrary, removeLibrary } from "./redux/ActionCreators";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Profile from "./profile.jpeg"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    margin: 10,
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

function MyLibrary({ token, handleLogout }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const library = useSelector((state) => state.library);
  const [userProfile, setUserProfile] = React.useState([]);
  const matches = useMediaQuery("(min-width:600px)");

  //   Get the Library from store
  React.useEffect(() => {
    dispatch(fetchMyLibrary(token));
  }, []);

  // Get User profile
  React.useLayoutEffect(() => {
    const getUserProfile = async () => {
      try {
        const data = await axios.get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserProfile(data?.data);
      } catch (error) {
        alert(error);
      }
    };

    getUserProfile();
  }, []);

  return (
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
          <Typography>My Library</Typography>
          <form>
            <input type="text" />
            <button type={"submit"}>Search</button>
          </form>
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
          <h1 style={{ fontSize: 15, color: "white" }}>Export to My Spotify</h1>
          <Typography style={{ marginTop: 7 }}>My Library</Typography>
          <form style={{ marginTop: 7 }}>
            <input type="text" />
            <button type={"submit"}>Search</button>
          </form>
          <IconButton color="inherit" onClick={handleLogout}>
            <Lock />
          </IconButton>
        </AppBar>
      )}

      {/* My Library */}
      <Grid container direction="row" item xs={12} md={12}>
        {library.library.map((library) => (
          <div>
            <Card variant="outlined" className={classes.card} key={library.id}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={`${library.albumArt}`}
                />
              </CardActionArea>
            </Card>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              style={{ marginLeft: 35 }}
            >
              {library.name}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              onClick={() => {
                dispatch(removeLibrary(library));
                alert("Playlist removed from library");
              }}
              style={{ marginLeft: 35 }}
            >
              - Remove
            </Typography>
          </div>
        ))}
      </Grid>
    </div>
  );
}

export default MyLibrary;
