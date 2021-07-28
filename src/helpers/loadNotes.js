import { db } from "../firebase/firebase-config";

export const loadNotes = async (uid) => {
  const notesSpan = await db.collection(`${uid}/journal/notes`).get();

  const notes = []

  notesSpan.forEach(snapHijo => {
      notes.push({
          id: snapHijo.id,
          ...snapHijo.data()
      })
  });


  return notes
};
