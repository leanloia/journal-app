import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import { removeError, setError } from "../../actions/ui";
import { startRegisterWithEmailPasswordName } from "../../actions/auth";
import Swal from "sweetalert2";

export const RegisterScreen = () => {
  const dispatch = useDispatch();

  const { msgError } = useSelector((state) => state.ui);

  const [formValues, handleInputChange /* reset */] = useForm({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const { name, email, password, repeatPassword } = formValues;

  const isFormValid = () => {
    if (name.trim().length === 0) {
      // console.error("nombre inválido");
      dispatch(setError("nombre inválido"));
      Swal.fire("Error", msgError ? msgError : "", "error");
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError("email inválido"));
      Swal.fire("Error", msgError ? msgError : "", "error");
      // console.error("email inválido");
      return false;
    } else if (password !== repeatPassword || password.length < 5) {
      dispatch(setError("el password debe tener al menos 6 caracteres"));
      Swal.fire("Error", msgError ? msgError : "", "error");
      // console.error("el password debe tener al menos 6 caracteres");
      return false;
    }

    dispatch(removeError());
    return true;
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      // console.log("Formulario válido");
      dispatch(startRegisterWithEmailPasswordName(email, password, name));
    }
  };

  return (
    <>
      <h3 className="auth__title">Register</h3>

      <form
        className="animate__animated animate__fadeIn animate__faster"
        onSubmit={handleRegister}
      >
        {/* {msgError && <div className="auth__alert-error">{msgError}</div>} */}
        <input
          className="auth__input"
          type="text"
          name="name"
          placeholder="name"
          autoComplete="off"
          value={name}
          onChange={handleInputChange}
        />
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
        <input
          className="auth__input"
          type="password"
          name="repeatPassword"
          placeholder="confirm password"
          value={repeatPassword}
          onChange={handleInputChange}
        />
        <button type="submit" className="btn btn-primary btn-block mb-5">
          Register
        </button>

        <Link to="/auth/login" className="link-auth">
          <button className="btn btn-auth">Already registered?</button>
        </Link>
      </form>
    </>
  );
};
