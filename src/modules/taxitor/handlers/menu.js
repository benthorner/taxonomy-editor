Taxitor.Handlers.Menu = function(editor) {
  this.editor = editor
  this.editor.on("afterEnter", this.afterEnter, this)
}

Taxitor.Handlers.Menu.prototype.OPTIONS = [
  "Create child", "Delete"
]

Taxitor.Handlers.Menu.prototype.afterEnter = function() {
  var that = this

  this.editor.g
    .selectAll(".node")
    .on("contextmenu", function(d) {
      d3.event.preventDefault()
      var menu = new Taxmenu(d3.event, that.OPTIONS)
      menu.on("click", that.onClick(d).bind(that))
    })
}

Taxitor.Handlers.Menu.prototype.onClick = function(d) {
  return function(option) {
    var that = this

    switch(option) {
      case that.OPTIONS[0]:
        d.createChild().then(function(child) {
          that.editor.trigger("nodeSelected", child)
          that.editor.trigger("beforeEnter")
        })
        break
      case that.OPTIONS[1]:
        if (d.depth == 0) break
        d.delete().then(function() {
          that.editor.trigger("nodeSelected", d.parent)
          that.editor.trigger("beforeEnter")
        })
        break
    }
  }
}