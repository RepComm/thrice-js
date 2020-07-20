import { lerp, EPSILON } from "./math.js";
export class Vector3 {
  static ZERO = new Vector3(0, 0, 0);
  static UP = new Vector3(0, 1, 0);

  constructor(x = 0, y = 0, z = 0) {
    this.set(x, y, z);
  }

  set(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  copy(from) {
    this.set(from.x, from.y, from.z);
    return this;
  }

  clone() {
    return new Vector3().copy(this);
  }

  toArray(destination = undefined) {
    if (destination === undefined) destination = new Array();
    destination.push(this.x, this.y, this.z);
    return destination;
  }

  magnitude(abs = true) {
    let result = Math.hypot(this.x, this.y, this.z);
    if (abs) result = Math.abs(result);
    return result;
  }

  magnitudeSquared() {
    return Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2);
  }

  add(other) {
    this.x += other.x;
    this.y += other.y;
    this.z += other.z;
    return this;
  }

  sub(other) {
    this.x -= other.x;
    this.y -= other.y;
    this.z -= other.z;
    return this;
  }

  mul(other) {
    this.x *= other.x;
    this.y *= other.y;
    this.z *= other.z;
    return this;
  }

  mulScalar(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;
    return this;
  }

  div(other) {
    this.x /= other.x;
    this.y /= other.y;
    this.z /= other.z;
    return this;
  }

  divScalar(scalar) {
    this.x /= scalar;
    this.y /= scalar;
    this.z /= scalar;
    return this;
  }

  ceil(ceilTo) {
    this.x = Math.ceil(ceilTo.x);
    this.y = Math.ceil(ceilTo.y);
    this.z = Math.ceil(ceilTo.z);
    return this;
  }

  floor(floorTo) {
    this.x = Math.floor(floorTo.x);
    this.y = Math.floor(floorTo.y);
    this.z = Math.floor(floorTo.z);
    return this;
  }

  min(minTo) {
    this.x = Math.min(this.x, minTo.x);
    this.y = Math.min(this.y, minTo.y);
    this.z = Math.min(this.z, minTo.z);
    return this;
  }

  max(maxTo) {
    this.x = Math.max(this.x, maxTo.x);
    this.y = Math.max(this.y, maxTo.y);
    this.z = Math.max(this.z, maxTo.z);
    return this;
  }

  round(roundTo) {
    this.y = Math.round(roundTo.y);
    this.x = Math.round(roundTo.x);
    this.z = Math.round(roundTo.z);
    return this;
  }

  dist(other) {
    return Math.hypot(other.x - this.x, other.y - this.y, other.z - this.z);
  }

  distSquared(other) {
    return Math.pow(other.x - this.x, 2) + Math.pow(other.y - this.y, 2) + Math.pow(other.z - this.z, 2);
  }

  negate() {
    this.set(-this.x, -this.y, -this.z);
    return this;
  }

  inverse() {
    this.x = 1 / this.x;
    this.y = 1 / this.y;
    this.z = 1 / this.z;
    return this;
  }

  normalize() {
    this.divScalar(this.magnitude());
    return this;
  }

  dot(other) {
    return this.x * other.x + this.y * other.y + this.z * other.z;
  }

  cross(a, b) {
    this.set(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
    return this;
  }

  lerp(to, by) {
    this.x = lerp(this.x, to.x, by);
    this.y = lerp(this.y, to.y, by);
    this.z = lerp(this.z, to.z, by);
    return this;
  }

  angle(other) {
    let mag = this.magnitude() * other.magnitude();
    let cosine = mag && this.dot(other) / mag;
    return Math.acos(Math.min(Math.max(cosine, -1), 1));
  }

  rotate(around = Vector3.ZERO, byRadianAngles) {
    let offsetX = this.x - around.x;
    let offsetY = this.y - around.y;
    let offsetZ = this.z - around.z;
    throw "Not implemented yet";
    return this;
  }

  copyFromMatrix4x4Pos(from) {
    this.x = from.data[12];
    this.y = from.data[13];
    this.z = from.data[14];
    return this;
  }

  copyFromMatrix4x4Scale(from) {
    this.set(Math.hypot(from.data[0], from.data[1], from.data[2]), Math.hypot(from.data[4], from.data[5], from.data[6]), Math.hypot(from.data[8], from.data[9], from.data[10]));
    return this;
  }

  copyFromQuaternionAxisAngle(from) {
    let rad = Math.acos(from.w) * 2;
    let s = Math.sin(rad / 2);

    if (s > EPSILON) {
      this.x = from.x / s;
      this.y = from.y / s;
      this.z = from.z / s;
    } else {
      // If s is zero, return any axis (no rotation - axis does not matter)
      this.x = 1;
      this.y = 0;
      this.z = 0;
    }

    return this;
  }

}