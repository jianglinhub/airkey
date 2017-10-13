import * as types from './mutation-types'

const mutations = {
  [types.SET_PLATE_NUMBER](state, plateNumber){
    state.plateNumber = plateNumber
  },
  [types.SET_VIN](state, vin) {
    state.vin = vin
  },
  [types.SET_PASSWORD](state, password) {
    state.password = password
  },
  [types.SET_OWNER_NAME](state, ownerName) {
    state.ownerName = ownerName
  }
}

export default mutations