Multiselect =

  template: """
  <div class="hjs-multiselect">
    <div class="hjs-multiselect-selected-items" @click="toggleList()">
      <div class="hjs-multiselect-placeholder" v-if="showPlaceholder()" >{{placeholder}}</div>
      <ul>
        <li v-for="item in items" v-if="isSelected(item)" >
        {{ item.text }}
        <span @click.stop="removeSelectedItem(item)">x</span>
        </li>
      </ul>
    </div>
    <div class="hjs-multiselect-items" v-if="showList">
      <ul>
        <li v-for="item in items" v-bind:class="{ disabled: isSelected(item) }" @click="addSelectedItem(item)">
        {{ item.text }}
        </li>
      </ul>
    </div>
  </div>
  """

  name: "hjs-multiselect"

  computed:
    selectedItems:
      get: ->
        @select
      set: (value)->
        @select = value

  methods:
    toggleList: ->
      if @showList is true
        @showList =  false
      else
        @showList =  true

    isSelected: (item)->
      values = @values()
      return values.indexOf(item.value) >= 0

    showPlaceholder: ()->
      return @selectedItems.length == 0

    addSelectedItem: (item)->
      items = @selectedItems.filter (i)=>
        return item.value == i.value
      if items.length == 0
        @selectedItems.push item
        @$emit("change", item, @select)

    removeSelectedItem: (item)->
      values = @values()
      index = values.indexOf(item.value)
      if index >= 0
        @select.splice(index, 1)
        @$emit("change", item, @select)
        @showList =  false if values.length == 1

    values: ()->
      values = []
      if @selectedItems instanceof Array
        for s in @selectedItems
          values.push(s.value)
      values

  props:
      items:
        type: Array,
        default: ()=> []
      select:
        type: Array,
        default: ()=> []
      placeholder:
        type: String
        default: "Please select items"

  data: ->
    opts =
      showList: false



export default Multiselect
