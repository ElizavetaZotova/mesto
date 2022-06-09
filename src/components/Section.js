export class Section {
  constructor({ items, renderer }, targetSelector) {
    this._items = items;
    this._renderer = renderer;
    this._targetContainer = document.querySelector(targetSelector);
  }

  render() {
    this._items.forEach(item => this._renderer(item));
  }

  addItem(element) {
    this._targetContainer.prepend(element);
  }
}
