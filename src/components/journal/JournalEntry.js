import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { activeNote } from "../../actions/notes";

export const JournalEntry = ({ id, date, title, body, url }) => {
  // variable generada por función momento del paquete homónimo, que devuelve la info según el objeto Date().getTime()
  const noteDate = moment(date);

  const dispatch = useDispatch();

  const handleEntryClick = () => {
    dispatch(
      activeNote(id, {
        date,
        title,
        body,
        url,
      })
    );
  };

  return (
    <div className="journal__entry pointer animate__animated animate__fadeIn faster" onClick={handleEntryClick}>
      {url && (
        <div
          className="journal__entry-picture"
          style={{
            backgroundSize: "cover",
            backgroundImage: `url(${url})`,
          }}
        ></div>
      )}

      <div className="journal__entry-body">
        <p className="journal__entry-title">{title}</p>
        <p className="journal__entry-content">{body}</p>
      </div>

      <div className="journal__entry-date-box">
        <span>{noteDate.format("dddd")}</span>
        <h4>{noteDate.format("Do")}</h4>
      </div>
    </div>
  );
};
