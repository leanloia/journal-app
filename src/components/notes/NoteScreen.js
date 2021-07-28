import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeNote, startDeleting } from "../../actions/notes";
import { useForm } from "../../hooks/useForm";
import { NotesAppBar } from "./NotesAppBar";

export const NoteScreen = () => {
  const dispatch = useDispatch();
  const { active } = useSelector((state) => state.notes);

  const [formValues, handleInputChange, reset] = useForm(active);

  const { body, title } = formValues;

  // genero una ref con hook useRef (quick reminder: useRef genera una variable referencia que se utiliza dentro del componente, este caso para ver si cambió o no)
  const activeId = useRef(active.id);

  // defino un useEffect y chequeo, si el id de la nota activa (active.id) es distinta a la referencia (o sea, al que está en el state) entonces =>
  // => hago un reset con el nuevo state (el nuevo 'active' del state) y cambio mi ref (activeId.current = 'id del nuevo active')
  useEffect(() => {
    if (active.id !== activeId.current) {
      reset(active);
      activeId.current = active.id;
    }
  }, [active, reset]);

  useEffect(() => {
    dispatch(activeNote(formValues.id, { ...formValues }));
  }, [formValues, dispatch]);

  const handleDelete = () => {
    dispatch(startDeleting(active.id));
  };

  return (
    <div className="notes__main-content">
      <NotesAppBar />
      <div className="notes__content">
        <input
          type="text"
          name="title"
          placeholder="Insert title here"
          className="notes__title-input"
          autoComplete="off"
          value={title}
          onChange={handleInputChange}
        />

        <textarea
          name="body"
          id=""
          cols="30"
          rows="10"
          placeholder="Insert note here"
          className="notes__textarea"
          value={body}
          onChange={handleInputChange}
        ></textarea>

        {active.url && (
          <div className="notes__image">
            <img src={active.url} alt="imagen" />
          </div>
        )}
      </div>

      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};
