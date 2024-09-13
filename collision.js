

function collision(object) {
    let returnX = object.x
    let returnY = object.y
    let returnColor = undefined
    let objectXLimits = [object.x, object.x + object.width]
    let objectYLimits = [object.y, object.y + object.height]
    let xOnGround = false
    let yOnGround = false
    let yOnSide = false
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
            console.log(canvas.height)
            object.yVel = 0
            return [engine.spawnpoint[engine.level][0], engine.spawnpoint[engine.level][1]]
        }
        for (let i = 0; i < Object.keys(levels[engine.level]).length; i++) {
            yOnGround = xOnGround = false
            if (
                // returns false if there are no platforms anywhere in the same x-axis as the player
                object.x >= levels[engine.level][i][0] * 40 && object.x <= (levels[engine.level][i][0] + levels[engine.level][i][2]) * 40 ||
                object.x + object.width >= levels[engine.level][i][0] * 40 && object.x + object.width <= (levels[engine.level][i][0] + levels[engine.level][i][2]) * 40
            ) {
                xOnGround = true
            }
            if (
                object.y + object.height >= levels[engine.level][i][1] * 40 && object.y <= levels[engine.level][i][1] * 40
            ) {
                yOnGround = true
            }
            // if (
            //     1
            // ) {
            //     1
            // }
            // if (xOnGround) {
                
            // }
            if (yOnGround && xOnGround) {
                while (object.y + object.height >= (levels[engine.level][i][1] + levels[engine.level][i][3]) * 40 || object.y + object.height > levels[engine.level][i][1] * 40) {
                    object.y -= 1
                    console.log(object.y)
                }
                console.log(object.y)
                return [object.x, object.y, returnColor]
            }
            console.log(object.y, i)
        }
    return [returnX, returnY, returnColor]
}

// function moveToFloor(object, i) {
//     let returnY = object.y
//     while (object.y + object.height >= (levels[engine.level][i][1] + levels[engine.level][i][3]) * 40) {
//         console.log(object.y + object.height >= (levels[engine.level][i][1] + levels[engine.level][i][3]) * 40)
//         returnY -= 1
//     }
//     return returnY
// }

function moveToRoof(object, surface) {
    while (object.y + object.height < levels[engine.level][surface][1]) {
        object.y += 1
    }
}

function onGround(object) {

}