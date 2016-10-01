import Pixi from 'pixi.js';
import { constants, KEYS } from './constants';
import {
  degreesToRadians,
} from './utils';

// You can use either `new PIXI.WebGLRenderer`, `new PIXI.CanvasRenderer`, or `PIXI.autoDetectRenderer`
// which will try to choose the best renderer for the environment you are in.
var renderer = new Pixi.WebGLRenderer(constants.canvasSize.x, constants.canvasSize.y);

// The renderer will create a canvas element for you that you can then insert into the DOM.
document.body.appendChild(renderer.view);

// You need to create a root container that will hold the scene you want to draw.
var stage = new Pixi.Container();

// Declare a global variable for our sprite so that the animate function can access it.
var player = null;
var killer = null;

var state = {
  isMovingRight: false,
  isMovingLeft: false,
  isMovingUp: false,
  isMovingDown: false,
};

function handleMovement() {
  var movementX = 0, movementY = 0;
  if (state.isMovingRight) {
    movementX += constants.playerMoveAmount;
    player.rotation = degreesToRadians(-90);
  }
  if (state.isMovingLeft) {
    movementX -= constants.playerMoveAmount;
    player.rotation = degreesToRadians(90);
  }
  if (state.isMovingUp) {
    movementY -= constants.playerMoveAmount;
    player.rotation = degreesToRadians(180);
  }
  if (state.isMovingDown) {
    movementY += constants.playerMoveAmount;
    player.rotation = 0;
  }
  player.position.x += movementX;
  player.position.y += movementY;
}

function handleKillerMovement() {
  if (
    state.isMovingRight == false &&
    state.isMovingLeft == false &&
    state.isMovingUp == false &&
    state.isMovingDown == false
  ) {
    return;
  }
  if (player.position.x > killer.position.x) {
    killer.position.x += constants.killerMoveAmount;
  } else if (player.position.x < killer.position.x) {
    killer.position.x -= constants.killerMoveAmount;
  }
  if (player.position.y > killer.position.y) {
    killer.position.y += constants.killerMoveAmount;
  } else if (player.position.y < killer.position.x) {
    killer.position.y -= constants.killerMoveAmount;
  }
}

function gameLoop() {
  requestAnimationFrame(gameLoop);
  handleMovement()
  //handleKillerMovement()
  renderer.render(stage);
}

function addCharacter(resources, coords, scale) {
  var character = new PIXI.Sprite(resources.player.texture);
  character.position.x = coords.x;
  character.position.y = coords.y;
  character.scale.x = scale;
  character.scale.y = scale;
  character.anchor.x = 0.5;
  character.anchor.y = 0.5;
  stage.addChild(character);
  return character;
}


function init() {
  // load the texture we need
  Pixi.loader.add('player', 'bunny.png').load(function (loader, resources) {
    player = addCharacter(resources, constants.playerStartPosition, constants.playerScale);
    killer = addCharacter(resources, {x: 200, y:200}, constants.playerScale);
    gameLoop();
  });
}
init();

window.onload = function() {
  window.addEventListener('keydown', function(e) {
    switch (e.keyCode) {
    case KEYS.W:
      state.isMovingUp = true;
      break;
    case KEYS.A:
      state.isMovingLeft = true;
      break;
    case KEYS.S:
      state.isMovingDown = true;
      break;
    case KEYS.D:
      state.isMovingRight = true;
      break;
    default:
      return;
    }
  })
  window.addEventListener('keyup', function(e) {
    switch (e.keyCode) {
    case KEYS.W:
      state.isMovingUp = false;
      break;
    case KEYS.A:
      state.isMovingLeft = false;
      break;
    case KEYS.S:
      state.isMovingDown = false;
      break;
    case KEYS.D:
      state.isMovingRight = false;
      break;
    default:
      return;
    }
  })

}
