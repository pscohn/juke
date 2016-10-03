require('pixi.js');
require('p2');
require('phaser');

import { constants, KEYS } from './constants';
import {
  degreesToRadians,
  isCollidingX,
  isColliding,
} from './utils';

let cursors;
let player;
let killer;
let currentSpeed;
let land;
let rock;

var state = {
  isMovingRight: false,
  isMovingLeft: false,
  isMovingUp: false,
  isMovingDown: false,
};

var killerState = {
  isMovingRight: false,
  isMovingLeft: false,
  isMovingUp: false,
  isMovingDown: false,
};

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
// const wasd = {
//   up: game.input.keyboard.addKey(Phaser.Keyboard.W),
//   down: game.input.keyboard.addKey(Phaser.Keyboard.S),
//   left: game.input.keyboard.addKey(Phaser.Keyboard.A),
//   right: game.input.keyboard.addKey(Phaser.Keyboard.D),
// };

function preload() {
  game.load.image('player', 'bunny.png');
  game.load.image('dwight', 'dwight.png');
  game.load.image('killer', 'trapper.png');
  game.load.image('grass', 'grass.png');
  game.load.image('earth', 'scorched_earth.png');
  game.load.image('tank', 'tank.png');
}

function create() {
  game.world.setBounds(-1000, -1000, 2000, 2000);
  land = game.add.tileSprite(0, 0, 800, 600, 'earth');
  land.fixedToCamera = true;
//  game.physics.startSystem(Phaser.Physics.ARCADE);

  player = game.add.sprite(0, 0, 'player');
  player.scale.setTo(2, 2);
  player.anchor.setTo(0.5, 0.5);

  killer = game.add.sprite(600, 0, 'killer');
  rock = game.add.sprite(500, 500, 'tank');
  rock.scale.setTo(3, 3);

  // physics
  game.physics.enable( [ player, killer, rock ], Phaser.Physics.ARCADE);
  player.body.collideWorldBounds = true;
  player.bringToTop();
  rock.body.immovable = true;
  rock.body.moves = false;

  // camera
  game.camera.follow(player);
  game.camera.deadzone = new Phaser.Rectangle(150, 150, 500, 300);
  game.camera.focusOnXY(0, 0);

  cursors = game.input.keyboard.createCursorKeys();
}

function update() {
  game.physics.arcade.collide(player, killer, collisionHandler, null, this);
  game.physics.arcade.collide(player, rock, null, null, this);
  game.physics.arcade.collide(killer, rock, null, null, this);
  handleMovement()
  land.tilePosition.x = -game.camera.x;
  land.tilePosition.y = -game.camera.y;
}

function collisionHandler (obj1, obj2) {
  game.stage.backgroundColor = '#992d2d';
}


function handleMovement() {
  player.body.velocity.x = 0;
  player.body.velocity.y = 0;
  killer.body.velocity.x = 0;
  killer.body.velocity.y = 0;
  const { playerSpeed, killerSpeed } = constants;

  if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
    player.body.velocity.x = -playerSpeed;
  }
  if (game.input.keyboard.isDown(Phaser.Keyboard.D)) {
    player.body.velocity.x = playerSpeed;
  }
  if (game.input.keyboard.isDown(Phaser.Keyboard.W)) {
    player.body.velocity.y = -playerSpeed;
  }
  if (game.input.keyboard.isDown(Phaser.Keyboard.S)) {
    player.body.velocity.y = playerSpeed;
  }
  if (cursors.left.isDown) {
    killer.body.velocity.x = -killerSpeed;
  }
  if (cursors.right.isDown) {
    killer.body.velocity.x = killerSpeed;
  }
  if (cursors.up.isDown) {
    killer.body.velocity.y = -killerSpeed;
  }
  if (cursors.down.isDown) {
    killer.body.velocity.y = killerSpeed;
  }
}

function handleKillerMovement() {
}
