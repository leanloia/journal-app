import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import validator from "validator";
import {
  // login,
  startGoogleLogin,
  startLoginEmailPassword,
} from "../../actions/auth";
import { removeError, setError } from "../../actions/ui";
import { useForm } from "../../hooks/useForm";
import Swal from "sweetalert2";

export const LoginScreen = () => {
  const dispatch = useDispatch();

  const { msgError, loading } = useSelector((state) => state.ui);

  const [formValues, handleInputChange /*reset*/] = useForm({
    email: "lean@lean.com",
    password: "abc123",
  });

  const { email, password } = formValues;

  const isFormValid = () => {
    if (email.trim().length === 0 || password.trim().length === 0) {
      // console.error("nombre inválido");
      dispatch(setError("debe completar email y password"));
      Swal.fire("Error", msgError, "error");
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError("debe ingresar un email válido"));
      Swal.fire("Error", msgError, "error");
      return false;
    }

    dispatch(removeError());
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(startLoginEmailPassword(email, password));
    }
  };

  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  };

  return (
    <>
      <h3 className="auth__title">Login</h3>

      <form
        className="animate__animated animate__fadeIn animate__faster"
        onSubmit={handleSubmit}
      >
        {/* {msgError && <div className="auth__alert-error">{msgError}</div>} */}
        <input
          className="auth__input"
          type="text"
          name="email"
          placeholder="email"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />
        <input
          className="auth__input"
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="btn btn-primary btn-block mb-1"
          disabled={loading}
        >
          Login
        </button>

            <Link to="/auth/register" className="link-auth">
          <button className="btn btn-auth">
              Create new account
          </button>
            </Link>
        <div className="auth__social-networks">
          {/* <p>Login with social networks</p> */}
          <div className="google-btn" onClick={handleGoogleLogin}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>

        </div>
      </form>
    </>
  );
};
