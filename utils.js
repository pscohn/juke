export function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

export function isGoingRight(movementX, movementY) {
  return movementX > 0 && movementX > movementY;
}

export function isGoingLeft(movementX, movementY) {
  return movementX < 0 && Math.abs(movementX) > movementY;
}

export function isGoingUp(movementX, movementY) {
  return movementY < 0 && Math.abs(movementY) > movementX;
}

export function isGoingDown(movementX, movementY) {
  return movementY > 0 && movementY > Math.abs(movementX);
}
