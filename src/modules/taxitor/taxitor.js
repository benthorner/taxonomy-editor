import {MainStage} from './stages/main.js'
import {MainHandler} from './handlers/main.js'

const options = {
  ForceLayout: { simulationTicks: 1000, collisionRadius: 100 },
  ZoomHandler: { maxScaleFactor: 2, transformDelay: 500 },
  TreeLayout: { xSeparation: 110, ySeparation: 200 },
  RadialLayout: { xSeparation: 110, ySeparation: 110 },
  WrapLayout: { xSeparation: 110, ySeparation: 110 }
}

export class Taxitor {
  constructor() {
    _.extend(this, Backbone.Events)
    this.options = options

    new MainStage(this)
    new MainHandler(this)

    this.on("dataReceived", function(data) {
      this.data = data
      this.trigger("beforeExit")
      this.trigger("nodeSelected", data)
    })
  }

  attach(element) {
    this.container = d3.select(element)

    this.element = d3
      .select(element)
      .classed("taxitor", true)
      .append("g")

    this.trigger("onAttach")
  }
}

