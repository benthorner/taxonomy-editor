export class Node {
  constructor(taxode, attributes) {
    this.taxode = taxode
    this.attributes = attributes
  }

  get(key) {
    return this.attributes[key]
  }
}
