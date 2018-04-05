const LINKS_URL = "http://publishing-api.dev.gov.uk/v2/expanded-links/"
const HOME_ID = "f3bbdec2-0e62-4520-a7fd-6ffd5d36e03a"

Taxode.Real = function(taxon, parent) {
  _.extend(this, new Taxode.Base(parent))
  this.title = taxon.title
  this.id = taxon.content_id
}

Taxode.Real.root = new Taxode.Real({ content_id: HOME_ID,
                                     title: "GOV.UK" })

Taxode.Real.prototype.expand = function() {
  var that = this

  return new Promise(function(resolve, reject)  {
    $.get(LINKS_URL + that.id, function(d) {
      var links = d.expanded_links.level_one_taxons ||
        d.expanded_links.child_taxons

      if (links) {
        that.children = links.map(function(d2) {
          return new Taxode.Real(d2, that)
        })
      }

      resolve()
    })
  })
}
