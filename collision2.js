// if touching platform, and previous position was above platform: go to top of platform
// if touching platform, and previous position was beside platform, xVel = 0 (unless current Y would be high enough)
// if touching platform, and previous position was below platform, go to bottom of platform and yVel = 5
// if no platform below, apply gravity
// if platform below, allow jump

// possible methods:
// define hitboxes for all items and somehow use them to calculate collision
// do something similar to collision.js
// use color (not preferrable)

// object right collision => right side of object is further right than left side of collider && left side of object is further left than left side of collider
// object left collision => left side of object is further left than right side of collider && right side of object is further right than right side of collider
// object top collision => bottom side of object is further down than top side of collider && top side of object is further up than top side of collider
// object bottom collision => top side of object is further up than bottom side of collider && bottom side of object is further down than bottom side of collider
let prevX, prevY, onGround, onWall, collisionDirection

function collision(object, x, y) {
    onGround = false
    onWall = false
    returnX = object.x
    returnY = object.y
    collisionDirection = undefined
    // let rightCollision = false
    // let leftCollision = false
    // let topCollision = false
    // let bottomCollision = false
    if (object.x <= 0) {
        returnX = 0
    }
    if (object.x + object.width >= canvas.width) {
        returnX = canvas.width - object.width
    }
    if (object.y <= 0) {
        object.yVel = 2
        returnY = 0
    }
    if (object.y + object.height >= canvas.height) {
        object.yVel = 0
        return [engine.spawnpoint[engine.level][0], engine.spawnpoint[engine.level][1], "#f00"]
    }
    // collider collision
    for (let i = 0; i < Object.keys(levels[engine.level]).length; i++) {
        // checks collision with every element
        if (
            object.x + object.width >= levels[engine.level][i][0] * 40 &&
            object.x <= (levels[engine.level][i][0] + levels[engine.level][i][2]) * 40 &&
            object.y + object.height >= levels[engine.level][i][1] * 40 &&
            object.y <= (levels[engine.level][i][1] + levels[engine.level][i][3]) * 40
        ) {
            // check top, bottom, left, right, then returns new x, y, color of element and whether jump is possible
            if (prevY + object.height <= levels[engine.level][i][1] * 40) {
                if (levels[engine.level][i][4] === "#06f") {
                    if (levels[engine.level][i][5] === true) {
                        returnY = levels[engine.level][i][1] * 40 - object.height
                        onGround = true
                    }
                } else {
                    returnY = levels[engine.level][i][1] * 40 - object.height
                    onGround = true
                }
                collisionDirection = "top"
            }
            else if (prevY >= (levels[engine.level][i][1] + levels[engine.level][i][3]) * 40) {
                returnY = levels[engine.level][i][1] * 40 + levels[engine.level][i][3] * 40
                object.yVel = 3
                collisionDirection = "bottom"
            }
            else if (prevX + object.width <= levels[engine.level][i][0] * 40) {
                returnX = levels[engine.level][i][0] * 40 - object.width
                object.xVel = 0
                if (!onGround) {
                    object.yVel += gravity
                }
                collisionDirection = "right"
            }
            else if (object.x <= (levels[engine.level][i][0] + levels[engine.level][i][2]) * 40) {
                returnX = levels[engine.level][i][0] * 40 + levels[engine.level][i][2] * 40
                object.xVel = 0
                if (!onGround) {
                    object.yVel += gravity
                }
                collisionDirection = "left"
            }
            return [returnX, returnY, levels[engine.level][i][4], onGround, i, collisionDirection]
        }        
    }
    object.yVel += gravity
    prevX = x
    prevY = y   
    return [returnX, returnY, false, onGround]
}