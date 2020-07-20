import { Matrix4x4 } from "../math/matrix4x4.js";
import { Object3D } from "./object3d.js";
export class Camera extends Object3D {
  aspect = 1;
  near = 0.1;
  far = 100;

  constructor() {
    super();
    this.projectionMatrix = new Matrix4x4();
  }

  setAspect(aspect) {
    this.aspect = aspect;
  }

  setNear(near) {
    this.near = near;
  }

  setFar(far) {
    this.far = far;
  }

  update() {
    this.projectionMatrix.mul(this.modelViewMatrix);
  }

}
export class OrthographicCamera extends Camera {
  constructor() {
    super();
  }

  update() {
    this.projectionMatrix.ortho(this.orthographicWidth / 2, this.orthographicWidth / 2, this.orthographicHeight / 2, this.orthographicHeight / 2, this.near, this.far);
    super.update();
  }

}
export class PerspectiveCamera extends Camera {
  fieldOfView = Math.PI / 4;

  constructor() {
    super();
    this.update();
  }

  setFieldOfView(fov) {
    this.fieldOfView = fov;
    return this;
  }

  update() {
    this.projectionMatrix.perspective(this.fieldOfView, this.aspect, this.near, this.far);
    super.update();
  }

}