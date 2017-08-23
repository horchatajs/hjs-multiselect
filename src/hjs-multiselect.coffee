import Vue from "vue"
import Multiselect from "./components/multiselect.coffee"
import css from "./hjs-multiselect.sass"


Multiselect.install = (Vue)->
  Vue.component(Multiselect.name, Multiselect)

export default Multiselect;
