// paquete para crear un mock store para poder enviar dispatch y analizar sus cambios
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { startLoadingNotes, startNewNote } from "../../actions/notes";
import { db } from "../../firebase/firebase-config";
import { types } from "../../types/types";

const middlewares = [thunk];

// le paso a la función los middlewares que utilice (en mi caso, utilizo thunk para las funciones asíncronas)
const mockStore = configureStore(middlewares);

// creo un store con mi 'mockStore' y simulo la estructura que quiero que tenga

// en este caso, genero un obj auth, con un uid (que es la estructura mínima de logueo que tengo si estoy logueado (autenticado))
const store = mockStore({
  auth: {
    uid: "TESTING",
    name: 'Testing'
  },
});


describe("Pruebas en notes-actions", () => {
  test("debe de crear una nueva nota startNewNote", async () => {
    // cuando intento hacer un dispatch de una action, el mismo se ejecuta (bien!) pero firebase (DB) genera un error ya que estoy intentando hacer algo para lo cual no tengo permisos suficientes

    await store.dispatch(startNewNote());

    // el error aquí es que debería estar trabajando en un ambiente de testing, generar una DB de testing y allí probar todo.

    // una vez que ya configuré firebase (ver firebase-config), ahora estoy en mi ambiente de testing y no tengo problemas de permisos, ergo => mi dispatch se ejecutó

    // traigo las actiones que se ejecutaron en mi (mock)store
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.notesActive,
      payload: {
        id: expect.any(String),
        title: "",
        body: "",
        date: expect.any(Number),
      },
    });

    expect(actions[1]).toEqual({
      type: types.notesAddNew,
      payload: {
        id: expect.any(String),
        title: "",
        body: "",
        date: expect.any(Number),
      },
    });

    const docId = actions[0].payload.id;

    await db.doc(`/TESTING/journal/notes/${docId}`).delete();
  });

  test("startLoadingNotes debe cargar las notas", async () => {
    await store.dispatch(startLoadingNotes("TESTING"));

    const actions = store.getActions();

    console.log(actions);
  });
});
