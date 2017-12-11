import * as types from './mutation-types'

const mutations = {
    [types.SET_OWNER_NAME](state, ownerName) {
        state.ownerName = ownerName
    }
}

export default mutations