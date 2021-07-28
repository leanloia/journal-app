import { types } from "../../types/types"


describe('Pruebas en types.js', () => {

    test('types debe devolver un objeto', () => {
        expect(types).toEqual({
            login: "[AUTH] Login",
            logout: "[AUTH] Logout",
          
            uiSetError: "[UI] Set error",
            uiRemoveError: "[UI] Remove error",
            
            uiStartLoading: "[UI] Start loading",
            uiFinishLoading: "[UI] Finish loading",
          
            notesAddNew: '[Notes] New note',
            notesActive: '[Notes] Set active note',
            notesLoad: '[Notes] Load note',
            notesUpdated: '[Notes] Updated note' ,
            notesFileUrl: '[Notes] Update image url',
            notesDelete: '[Notes] Delete note',
            notesLogoutCleaning: '[Notes] Logout cleaning',
          })
    })
    


})
