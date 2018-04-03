Taxitor.Resize = function(editor) {
  this.editor = editor
  this.editor.on("beforeMove", this.beforeMove, this)

  d3.select(editor.element)
    .call(d3.zoom().on("zoom", function() {
      editor.g.attr("transform", d3.event.transform)
    }))

  $(window)
    .resize(function() { editor.trigger("beforeMove") })
}

Taxitor.Resize.prototype.beforeMove = function() {
  d3.select(this.editor.element)
    .select("svg")
    .attr("width", this._bounds()[0])
    .attr("height", this._bounds()[1])

  var root = this.editor.g.select(".node").datum()
  d3.tree().size(this._bounds())(root)
}

Taxitor.Resize.prototype._bounds = function() {
  var element = this.editor.element
  return [element.clientWidth, element.clientHeight]
}
//
//Taxitor.Size.prototype.afterMove = function() {
  //var element = this.editor.element
  //var area = this.editor.g.node().getBBox().width * this.editor.g.node().getBBox().height
  //var minArea = element.clientWidth * element.clientHeight

  //var transform = d3.zoomIdentity
    //.scale(2)
    //.translate(0, (element.clientHeight - this.editor.g.node().getBBox().height) / 2)

  //d3.zoom().transform(d3.select(this.editor.element), transform)
  //this.editor.g.attr("transform", transform)
//}
