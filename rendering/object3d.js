import { Matrix4x4 } from "../math/matrix4x4.js";
export class Object3D {
  constructor() {
    this.children = new Set();
    this.modelViewMatrix = new Matrix4x4();
  }

  traverse(traverseCallback) {
    for (let child of this.children) {
      traverseCallback(child);
      child.traverse(traverseCallback);
    }
  }

  removeSelf(notityParent = false) {
    if (!this.parent || !this.parent.has(this)) return false;
    if (notityParent) this.parent.remove(this);
    this.parent = undefined;
    return true;
  }

  remove(obj) {
    this.children.delete(obj);
  }

  has(obj) {
    return this.children.has(obj);
  }

  add(child) {
    child.removeSelf(true);
    this.children.add(child);
  }

  translate(by) {
    this.modelViewMatrix.translate(by);
    return this;
  }

  translateByValues(x, y, z) {
    this.modelViewMatrix.translateByValues(x, y, z);
    return this;
  }

}