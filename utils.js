export function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

export function isCollidingX(r1, r2, movement) {
  const r1Right = r1.position.x + (r1.width / 2)
  const r2Right = r2.position.x + (r2.width / 2)
  const r1Left = r1.position.x - (r1.width / 2)
  const r2Left = r2.position.x - (r2.width / 2)
  if (r1.position.x < r2.position.x && r1Right >= r2Left && movement > 0) {
    return true;
  } else if (r1.position.x > r2.position.x && r1Left <= r2Right && movement < 0) {
    return true;
  }
  return false;
//  return r2Right > r1Left || r2Left < r1Right;
}

export function isColliding(rect1, rect2) {
  if (rect1.x < rect2.x + rect2.width &&
   rect1.x + rect1.width > rect2.x &&
   rect1.y < rect2.y + rect2.height &&
   rect1.height + rect1.y > rect2.y) {
    return true;
  }
  return false;
  // return !(r2.x > (r1.x + r1.width) ||
  //         (r2.x + r2.width) < r1.x ||
  //         r2.y > (r1.y + r1.height) ||
  //         (r2.y + r2.height) < r1.y);
}
