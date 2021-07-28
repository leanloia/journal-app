import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { JournalScreen } from "../components/journal/JournalScreen";
import { AuthRouter } from "./AuthRouter";

import { firebase } from "../firebase/firebase-config";
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { startLoadingNotes } from "../actions/notes";

export const AppRouter = () => {
  const dispatch = useDispatch();

  // genero una variable para saber si está chequeando, o no, si el usuario está logueado (es decir, si está en loading o no la página)
  const [checking, setChecking] = useState(true);

  // genero una variable para saber si tengo, o no, un usuario logueado para saber qué rutas estarán disponibles para ese usuario
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // onAuthStateChanged es un observable que se ejecuta cuando cambia el estado de logueo del usuario (en firebase)
    firebase.auth().onAuthStateChanged(async (user) => {
      // console.log(user);
      // user?.uid corrobora si hay user... si hay, entonces se fija en el uid de ese user, si no, sale.
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);

        // const notes = await loadNotes(user.uid);

        dispatch(startLoadingNotes(user.uid));
      } else {
        setIsLoggedIn(false);
      }

      setChecking(false);
    });
  }, [dispatch, setChecking, setIsLoggedIn]);

  if (checking) {
    return <h2>Espere... </h2>;
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            path="/auth"
            component={AuthRouter}
            isLoggedIn={isLoggedIn}
          />
          <PrivateRoute
            exact
            path="/"
            component={JournalScreen}
            isLoggedIn={isLoggedIn}
          />

          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </Router>
  );
};
