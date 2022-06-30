const INITIAL_VELOCITY = 0.0025
const VELOCITY_INCREASE = 0.00001


let leftScore = 0;
let rightScore = 0;
export default class Ball {
    constructor(ballElem) {
        this.ballElem = ballElem
        this.reset()
    }
get x(){

    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"))
}
 set x(value){

    this.ballElem.style.setProperty("--x", value)
 }

 get y(){

    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"))
}
 set y(value){

    this.ballElem.style.setProperty("--y", value)
 }

 rect() {
     return this.ballElem.getBoundingClientRect()
 }

 reset( ) {
// console.log(this.x)
//     if (this.x < 2) {
//         rightScore += 1;
//         // update right player score
//     } else if (this.x > 2) {
//         leftScore += 1;
//         // update left player score
//     }
     this.x = 50
     this.y = 50
     this.direction = {x: 0}

     while (
         Math.abs (this.direction.x) <= 0.2 || 
         Math.abs(this.direction.x) >= 0.9
         ) {
         
            const heading = randomNumberBetween(0, 2 * Math.PI)
     this.direction = { x: Math.cos(heading), y: Math.sin(heading) }
        }
      this.velocity = INITIAL_VELOCITY
 }

update(delta, paddleRects) {
  this.x += this.direction.x * this.velocity * delta
  this.y += this.direction.y * this.velocity * delta
  this.velocity += VELOCITY_INCREASE * delta
  const rect = this.rect() 

 if (rect.bottom >= window.innerHeight || rect.top <= 0) {
    this.direction.y *= -1
    leftScore++;
    console.log(leftScore, 'left')
    document.getElementById('player-score').innerHTML = leftScore;
 }



  if (paddleRects.some (r => {
    // console.log(isCollision(r, rect), 'line 59')
        return isCollision(r, rect)
    })) {
     this.direction.x *= -1
     rightScore++;
console.log(rightScore, 'right')
    document.getElementById('computer-score').innerHTML = rightScore;
  }
 }
 } 

function randomNumberBetween (min, max) {
    return Math.random() * (max - min) + min
}
 
 function isCollision(rect1, rect2) {

   return (
        rect1.left <= rect2.right && 
    rect1.right >= rect2.left && 
    rect1.top <= rect2.bottom && 
 rect1.bottom >= rect2.top
    )

   

  
}

