//Overlap Point and pixel
//the collisions are not checked against bounding boxes but between
//points or image pixels

//left and right keys to move the sprite
//it's position is adjusted to another sprite's opaque pixels

var triangle;
var cloud;
var platform;
var GRAVITY = 1;

function setup() {
  createCanvas(800, 400);

  triangle = createSprite(300, 150);
  triangle.addAnimation('normal', 'images/person5.jpg');
  triangle.debug = true;

  cloud = createSprite(500, 150);
  cloud.addAnimation('normal', 'images/cloud_breathing0001.png', 'images/cloud_breathing0009.png');
  cloud.addAnimation('transformed', 'images/asterisk_normal0001.png', 'images/asterisk_normal0003.png');
  cloud.setCollider('circle', 0, 0, 50);
  cloud.debug = true;

  platform = createSprite(400, 300);
  platform.addImage(loadImage('images/platform.png'));

  triangle.depth = 10;
}

function draw() {
  background(255, 255, 255);

  //if no arrow input set velocity to 0
  triangle.velocity.x = 0;

  if (keyIsDown(LEFT_ARROW))
    triangle.velocity.x = -5;
  if (keyIsDown(RIGHT_ARROW))
    triangle.velocity.x = 5;
    if (keyIsDown(UP_ARROW))
      triangle.velocity.y = -5;
    if (keyIsDown(DOWN_ARROW))
      triangle.velocity.y = 10;
  //instead of checking the colliders or bounding box overlaps
  //I can just check a point against a collider
  if(cloud.overlapPoint(triangle.position.x, triangle.position.y))
    cloud.changeAnimation('transformed');

  //Or check a point against the pixels of a sprite animation or image
  //if the bottom of the triangle is not overlapping with the non transparent pixels
  //of the platform make it fall
  if(platform.overlapPixel(triangle.position.x, triangle.position.y+30)==false)
    triangle.velocity.y += GRAVITY;

  //if the bottom of the triangle is overlapping the non transparent pixels
  //of the platform move it up one pixel until it doesn't overlap anymore
  while(platform.overlapPixel(triangle.position.x, triangle.position.y+30))
  {
    triangle.position.y--;
    triangle.velocity.y = 0;
  }

  drawSprites();
}
