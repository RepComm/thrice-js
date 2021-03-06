import Component from "./ui/component.js";
import { get, on } from "./ui/aliases.js";
import { Renderer } from "./ui/renderer.js";
import { PerspectiveCamera } from "./rendering/camera.js";
import { Scene } from "./rendering/scene.js";
import { BufferMesh } from "./rendering/buffermesh.js";
import { MeshBuilder } from "./utils/meshbuilder.js";
import { DemoMaterial } from "./rendering/materials/demomaterial.js";
import { GameInput } from "./utils/gameinput.js"; //Container of our app on the page

const cont = new Component().useNative(get("container"));
const renderer = new Renderer().mount(cont).id("canvas");
const camera = new PerspectiveCamera();
camera.update();
const scene = new Scene(); //Get our demo material, make sure its compiled

let material = DemoMaterial.get().compileShaders(renderer.ctx); //Use a mesh builder

let builder = new MeshBuilder(); //Make an output

let mesh = new BufferMesh().setMaterial(material); //Add a triangle

builder.addTri(builder.addVert(0, 0, 0), builder.addVert(1, 0, 0), builder.addVert(1, 1, 0)).build(mesh); //Make sure mesh buffers are updated

mesh.update(renderer.ctx);
mesh.translateByValues(0, 0, -5); //Add mesh to scene

scene.add(mesh);
let mesh2 = new BufferMesh().setMaterial(material);
builder.addTri(builder.addVert(0, 0, 0), builder.addVert(1, 0, 0), builder.addVert(1, 1, 0)).build(mesh2); //Make sure mesh buffers are updated

mesh2.update(renderer.ctx);
mesh2.translateByValues(1, 0, -5); //Add mesh to scene

scene.add(mesh2); //Camera and scene

renderer.setCamera(camera);
renderer.setScene(scene);
renderer.setSize(renderer.rect.width, renderer.rect.height, true);
let timeNow = 0;
let timeLast = 0;
let timeDelta = 0;
on(window, "resize", () => {
  renderer.setSize(renderer.rect.width, renderer.rect.height, true);
});
let sensitivity = 250;
let input = GameInput.get();

let onAnim = () => {
  timeLast = timeNow;
  timeNow = Date.now();
  timeDelta = timeNow - timeLast;
  mesh.translateByValues(0, // input.raw.consumeMovementX() / sensitivity, 
  0, //-input.raw.consumeMovementY() / sensitivity,
  input.raw.consumeMovementY() / sensitivity); //camera.translateByCoords(-mx/250, my/250, 0);
  //camera.update();

  renderer.render();
  window.requestAnimationFrame(onAnim);
};

window.requestAnimationFrame(onAnim);