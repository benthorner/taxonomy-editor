$(document).ready(function() {
  var taxitor = new Taxitor(d3.select("#tree-container").node())
  console.log(new Taxode.Fake())
  taxitor.trigger("onData", new Taxode.Fake())
})
