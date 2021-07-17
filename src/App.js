import React, { lazy, useEffect } from "react";
import "./styles/main.scss";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeOption, changeRouter } from "./features/router";
import { getGameData } from "./features/games";
import queryString from "query-string";
import { Suspense } from "react";
import Loading from "./components/Loading";
import SignIn from "./pages/SignIn";
import firebase from "firebase";
import { getUser } from "./features/user";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: "chat-master-f8dd8.firebaseapp.com",
};
firebase.initializeApp(config);

const NotFound = React.lazy(() => import("./pages/NotFound"));
const Home = React.lazy(() => import("./pages/Home"));
const GameDetail = React.lazy(() => import("./pages/GameDetail"));

const routers = [
  {
    path: "/",
    component: Home,
    exact: true,
  },

  { path: "/sign-in", component: SignIn, exact: true },

  {
    path: "/:gameId",
    component: GameDetail,
  },

  {
    path: "*",
    component: NotFound,
  },
];

const App = () => {
  const { pathname, search } = useLocation();
  const dispatch = useDispatch();
  const { router, games } = useSelector((state) => state);

  useEffect(() => {
    dispatch(
      changeRouter({
        path: pathname,
        query: search,
        option: search.substring(1).split("=")[1],
      })
    );
    const defaultQuery = queryString.parse(router.query);

    const searchObj = queryString.parse(search);
    const searchKey = Object.keys(searchObj);

    const loadedGenres = Object.keys(games);
    const loadedGenresKey = [];
    loadedGenres.map((el) => {
      loadedGenresKey.push(el.split("|")[1]);
    });
    if (loadedGenresKey.includes(search.substring(1).split("=")[1])) {
      return;
    }

    searchKey.map((el) => {
      defaultQuery[el] = searchObj[el];
    });
    dispatch(
      getGameData({
        slug: searchObj[searchKey[0]] || "action",
        params: defaultQuery,
      })
    );
  }, [pathname, search]);

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        if (!user) {
          return;
        }

        dispatch(
          getUser({
            isLogin: true,
            userName: user.displayName,
          })
        );
        const token = await user.getIdToken();
      });
    return () => unregisterAuthObserver();
  }, []);

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Switch>
          {routers.map((el) => (
            <Route path={el.path} exact={el.exact}>
              <el.component />
            </Route>
          ))}
        </Switch>
      </Suspense>
    </>
  );
};

export default App;
