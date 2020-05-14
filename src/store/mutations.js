import * as type from './mutation-type'

export default {
  [type.SET_SINGER] (state, singer) {
    state.singer = singer
  }
}