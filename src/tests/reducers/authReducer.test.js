import { authReducer } from "../../reducers/authReducer"
import { types } from "../../types/types"


describe('Pruebas en authReducer.js', () => {
    
    test('debe de realizar el login', () => {
        
        const initState = {}
        const action = {
            type: types.login,
            payload: {
                uid: 'abc',
                displayName: 'Algo'
            }
        }
        const state = authReducer(initState, action)

        expect(state).toEqual({
            uid: 'abc',
            name: 'Algo'
        })
    })

    test('debe de realizar el logout', () => {
        
        const initState = {
            uid: 'abc',
            name: 'Coso'
        }
        const action = {
            type: types.logout,
            
        }
        const state = authReducer(initState, action)

        expect(state).toEqual({})
    })

    test('debe de devolver el state initial si no recibe un action que exista', () => {
        
        const initState = {
            uid: 'abc',
            name: 'Otro Coso'
        }

        const action = {
            type: 'sdgshdsadh'
        }

        const state = authReducer(initState, action)

        expect(state).toEqual(initState)
    })
    
    


})
