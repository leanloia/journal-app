import { useState } from "react";

export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);

  // modifico la función reset para hacerla un poco más modificable: 

  // en lugar de pasar un estado inicial = {}, indico que pasaré un estado, que de no enviarse, será igual al initialState.
  // Lo hago con el objeto de poder enviarle al reset el estado al cual quiero que resetee (ver NoteScreen.js)

  const reset = (newFormState = initialState) => {
    setValues(newFormState);
  };

  const handleInputChange = ({ target }) => {
    setValues({
      ...values,
      [target.name]: target.value,
    });
  };

  return [values, handleInputChange, reset];
};
