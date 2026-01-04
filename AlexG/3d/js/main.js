const DEG = Math.PI / 180;
var world = document.getElementById("world");
var container = document.getElementById("container");


var lock = false;
document.addEventListener("pointerlockchange", () => {
    lock = !lock;
})
container.onclick = function () {
    if (!lock) container.requestPointerLock();
}

let score = 0;
let deers = [];
const deerCount = 15;

function player(x, y, z, rx, ry, vx, vy, vz) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.rx = rx;
    this.ry = ry;
    this.vx = vx;
    this.vy = vy;
    this.vz = vz;
    this.onGround = false;
}


var pawn = new player(0, 0, 0, 0, 0, 7, 7, 7);
var myBullets = [];
var myBulletsData = [];
var myBulletNumber = 0;

let myWorld = [

                                // Labyrinth  //
    [-1000, 125, -2300, 0, 0, 0, 2000, 350, "yellow", 1, "url('texture/forest2.jpg')"],
    [1500, 125, -2300, 0, 0, 0, 2000, 350, "yellow", 1, "url('texture/forest2.jpg')"],
    [1000, 125, -2600, 0, 0, 0, 2000, 350, "yellow", 1, "url('texture/forest2.jpg')"],
    [-1500, 125, -3000, 0, 0, 0, 1000, 350, "yellow", 1, "url('texture/forest2.jpg')"],
    [1500, 125, -3300, 0, 0, 0, 1000, 350, "yellow", 1, "url('texture/forest2.jpg')"],
    [-1000, 125, -3800, 0, 0, 0, 2000, 350, "yellow", 1, "url('texture/forest2.jpg')"],
    [1000, 125, -4100, 0, 0, 0, 2000, 350, "yellow", 1, "url('texture/forest2.jpg')"],
    [-1500, 125, -4700, 0, 0, 0, 1000, 350, "yellow", 1, "url('texture/forest2.jpg')"],
    [1500, 125, -5000, 0, 0, 0, 1000, 350, "yellow", 1, "url('texture/forest2.jpg')"],
    [-1000, 125, -5600, 0, 0, 0, 2000, 350, "yellow", 1, "url('texture/forest2.jpg')"],
    [1000, 125, -5900, 0, 0, 0, 2000, 350, "yellow", 1, "url('texture/forest2.jpg')"],
    [-2000, 125, -2500, 0, 90, 0, 1000, 350, "yellow", 1, "url('texture/forest2.jpg')"],
    [-500, 125, -2800, 0, 90, 0, 1000, 350, "yellow", 1, "url('texture/forest2.jpg')"],
    [500, 125, -3100, 0, 90, 0, 1000, 350, "yellow", 1, "url('texture/forest2.jpg')"],
    [2000, 125, -3400, 0, 90, 0, 1000, 350, "yellow", 1, "url('texture/forest2.jpg')"],
    [-2000, 125, -4000, 0, 90, 0, 1000, 350, "yellow", 1, "url('texture/forest2.jpg')"],
    [-500, 125, -4300, 0, 90, 0, 1000, 350, "yellow", 1, "url('texture/forest2.jpg')"],
    [500, 125, -4600, 0, 90, 0, 1000, 350, "yellow", 1, "url('texture/forest2.jpg')"],
    [2000, 125, -4900, 0, 90, 0, 1000, 350, "yellow", 1, "url('texture/forest2.jpg')"],
    [-2000, 125, -5500, 0, 90, 0, 1000, 350, "yellow", 1, "url('texture/forest2.jpg')"],
    [-500, 125, -5800, 0, 90, 0, 1000, 350, "yellow", 1, "url('texture/forest2.jpg')"],
    [500, 125, -6100, 0, 90, 0, 1000, 350, "yellow", 1, "url('texture/forest2.jpg')"],
    [2000, 125, -6400, 0, 90, 0, 1000, 350, "yellow", 1, "url('texture/forest2.jpg')"],

                                // Labyrinth Box //
    [0, -50, -4250, 90, 0, 0, 5000, 5000, "yellow", 1, "url('texture/sky.jpg')"],
    [0, 275, -4250, -90, 0, 0, 5000, 5000, "yellow", 1, "url('texture/snow.jpg')"],
    [0, 125, -6750, 0, 0, 0, 5000, 350, "yellow", 1, "url('texture/forest2.jpg')"],
    [2500, 125, -4250, 0, 90, 0, 5000, 350, "yellow", 1, "url('texture/forest2.jpg')"],
    [-2500, 125, -4250, 0, 90, 0, 5000, 350, "yellow", 1, "url('texture/forest2.jpg')"],
    [1500, 125, -1750, 0, 0, 0, 2500, 350, "yellow", 1, "url('texture/forest2.jpg')"],
    [-1500, 125, -1750, 0, 0, 0, 2500, 350, "yellow", 1, "url('texture/forest2.jpg')"],

                                // Spawn //
    [0, -50, 0, 90, 0, 0, 500, 500, "green", 1, "url('texture/sky.jpg')"],
    [0, 275, 0, 90, 0, 0, 500, 500, "green", 1, "url('texture/grass.jpg')"],
    [0, 125, 250, 0, 0, 0, 500, 350, "green", 1, "url('texture/forest.jpg')"],
    [250, 125, 0, 0, 90, 0, 500, 350, "green", 1, "url('texture/forest.jpg')"],
    [-250, 125, 0, 0, 90, 0, 500, 350, "green", 1, "url('texture/forest.jpg')"],

                                // Parkour //
    [-50, 300, -400, 90, 0, 0, 100, 100, "red", 1, "url('texture/w_lily.jpg')"],
    [-100, 300, -600, 90, 0, 0, 100, 100, "red", 1, "url('texture/w_lily.jpg')"],
    [-100, 300, -850, 90, 0, 0, 100, 100, "red", 1, "url('texture/w_lily.jpg')"],
    [-100, 200, -950, 0, 0, 0, 280, 100, "brown", 1, "url('texture/log.jpg')"],
    [200, 300, -1000, 90, 0, 0, 100, 100, "red", 1, "url('texture/w_lily.jpg')"],
    [-200, 300, -1200, 90, 0, 0, 100, 100, "red", 1, "url('texture/w_lily.jpg')"],
    [0, 300, -1350, 90, 0, 0, 100, 100, "red", 1, "url('texture/w_lily.jpg')"],
    [-50, 200, -1450, 0, 0, 0, 350, 100, "brown", 1, "url('texture/log.jpg')"],
    [0, 300, -1650, 90, 0, 0, 100, 100, "red", 1, "url('texture/w_lily.jpg')"],

                            // Safe platform //
    [0, 500, -1000, 90, 0, 0, 500, 1500,"blue", 1, "url('texture/water.jpg')"],
    [0, -50, -1000, 90, 0, 0, 500, 1500,"blue", 1, "url('texture/sky.jpg')"],
    [0, 390, -250, 0, 0, 0, 500, 230, "blue", 1, "url('texture/water.jpg')"],
    [0, 390, -1750, 0, 0, 0, 500, 230, "blue", 1, "url('texture/water.jpg')"],
    [250, 400, -1000, 0, 90, 0, 1500, 250, "blue", 1, "url('texture/water.jpg')"],
    [250, 100, -1000, 0, 90, 0, 1500, 350, "red", 1, "url('texture/forest.jpg')"],
    [-250, 100, -1000, 0, 90, 0, 1500, 350, "red", 1, "url('texture/forest.jpg')"],
    [-250, 400, -1000, 0, 90, 0, 1500, 250, "blue", 1, "url('texture/water.jpg')"],

                                // Ladder //
    [200, 410, -625, 110, 0, 0, 100, 800, "black", 1, "url('texture/log.jpg')"]
];

function randomDeerPosition() {
    let platform = [0, 210, -4250, 5000, 5000];
    let x = platform[0] - platform[3]/2 + Math.random() * platform[3];
    let z = platform[2] - platform[4]/2 + Math.random() * platform[4];
    let y = platform[1];
    return [x, y, z];
}

function spawnDeer(index) {
    let pos = randomDeerPosition();
    let width = 160, height = 160;
    let deerDiv = document.createElement("div");
    deerDiv.id = `deer_${index}`;
    deerDiv.style.position = "absolute";
    deerDiv.style.width = `${width}px`;
    deerDiv.style.height = `${height}px`;
    deerDiv.style.backgroundImage = "url('texture/deer.png')";
    deerDiv.style.backgroundSize = "cover";
    deerDiv.style.transform = `translate3d(${600 + pos[0] - width/2}px, ${400 + pos[1] - height/2}px, ${pos[2]}px) rotateY(0deg)`;
    world.appendChild(deerDiv);

    deers[index] = {x: pos[0], y: pos[1], z: pos[2], div: deerDiv, width, height};
}

function updateDeerRotation() {
    for (let i = 0; i < deers.length; i++) {
        let deer = deers[i];
        if (!deer.div) continue;
        let dx = pawn.x - deer.x;
        let dz = pawn.z - deer.z;
        let angle = Math.atan2(dx, dz) * 180 / Math.PI;
        deer.div.style.transform = `translate3d(${600 + deer.x - deer.width/2}px, ${400 + deer.y - deer.height/2}px, ${deer.z}px) rotateY(${angle}deg)`;
    }
}

let scoreDisplay = document.createElement("div");
scoreDisplay.style.position = "absolute";
scoreDisplay.style.top = "10px";
scoreDisplay.style.left = "10px";
scoreDisplay.style.fontSize = "24px";
scoreDisplay.style.color = "white";
scoreDisplay.style.fontFamily = "Arial, sans-serif";
scoreDisplay.innerText = "Score: 0";
document.body.appendChild(scoreDisplay);

drawMyWorld(myWorld, "world")

for (let i = 0; i < deerCount; i++) {
    spawnDeer(i);
}

var pressForward = pressBack = pressRight = pressLeft = pressUp = 0;
var mouseX = mouseY = 0;
var mouseSensitivity = 0.4;
var dx = dy = dz = 0;
var gravity = 0.2;
var onGround = false;

document.addEventListener("keydown", (event) => {
    if (event.key == "w") pressForward = pawn.vz;
    if (event.key == "s") pressBack = pawn.vz;
    if (event.key == "d") pressRight = pawn.vx;
    if (event.key == "a") pressLeft = pawn.vx;
    if (event.key == " ") pressUp = pawn.vy;
})
document.addEventListener("keyup", (event) => {
    if (event.key == "w") pressForward = 0;
    if (event.key == "s") pressBack = 0;
    if (event.key == "d") pressRight = 0;
    if (event.key == "a") pressLeft = 0;
    if (event.key == " ") pressUp = 0;
})
document.addEventListener("mousemove", (event) => {
    mouseX = event.movementX;
    mouseY = event.movementY;
})

function checkBulletDeerCollision() {
    for (let b = myBulletsData.length - 1; b >= 0; b--) {
        let bullet = myBulletsData[b];
        for (let i = 0; i < deers.length; i++) {
            let deer = deers[i];
            if (!deer || !deer.div) continue;

            let dx = bullet.x - deer.x;
            let dy = bullet.y - deer.y;
            let dz = bullet.z - deer.z;
            let distance = Math.sqrt(dx*dx + dy*dy + dz*dz);

            if (distance < 80) {
                if (myBullets[b]) myBullets[b].remove();
                myBullets.splice(b, 1);
                myBulletsData.splice(b, 1);

                if (deer.div) deer.div.remove();
                deers[i] = null;

                score++;
                scoreDisplay.innerText = `Score: ${score}`;

                spawnDeer(i);
                break;
            }
        }
    }
}


function checkBulletWallCollision() {
    for (let b = myBulletsData.length - 1; b >= 0; b--) {
        let bullet = myBulletsData[b];

        for (let i = 0; i < myWorld.length; i++) {
            let wall = myWorld[i];

            let halfWidth = wall[6] / 2;
            let halfHeight = wall[7] / 2;
            let halfDepth = 50;

            if (Math.abs(bullet.x - wall[0]) < halfWidth &&
                Math.abs(bullet.y - wall[1]) < halfHeight &&
                Math.abs(bullet.z - wall[2]) < halfDepth) {

                if (myBullets[b]) myBullets[b].remove();
                myBullets.splice(b, 1);
                myBulletsData.splice(b, 1);
                break;
            }
        }
    }
}

for (let b = myBulletsData.length - 1; b >= 0; b--) {
    let bullet = myBulletsData[b];
    for (let i = 0; i < deers.length; i++) {
        let deer = deers[i];
        if (!deer) continue;
        let dx = bullet.x - deer.x;
        let dy = bullet.y - deer.y;
        let dz = bullet.z - deer.z;
        let distance = Math.sqrt(dx*dx + dy*dy + dz*dz);
        if (distance < 40) {
            if (myBullets[b]) myBullets[b].remove();
            myBullets.splice(b, 1);
            myBulletsData.splice(b, 1);
            if (deer.div) deer.div.remove();
            score++;
            console.log("Score:", score);
            spawnDeer(i);
            break;
        }
    }
}

function update() {
    dz = +(pressRight - pressLeft) * Math.sin(pawn.ry * DEG) - (pressForward - pressBack) * Math.cos(pawn.ry * DEG);
    dx = +(pressRight - pressLeft) * Math.cos(pawn.ry * DEG) + (pressForward - pressBack) * Math.sin(pawn.ry * DEG);
    dy += gravity;

    updateDeerRotation();

    if (onGround) {
        dy = 0;
        if (pressUp) {
            dy = -pressUp;
            onGround = false;
        }
    }

    collision(myWorld, pawn);

    for (let i = 0; i < myBullets.length; i++) {
        let bullet = myBulletsData[i];
        let dzb = bullet.vx * Math.sin((bullet.ry - 45) * DEG) - bullet.vz * Math.cos((bullet.ry - 45) * DEG);
        let dxb = bullet.vx * Math.cos((bullet.ry - 45) * DEG) + bullet.vz * Math.sin((bullet.ry - 45) * DEG);

        bullet.x += dxb;
        bullet.z += dzb;

        myBullets[i].style.transform = `translate3d(${600 + bullet.x - 25}px, ${400 + bullet.y - 25}px, ${bullet.z}px) rotateX(${bullet.rx}deg) rotateY(${-bullet.ry}deg)`;
    }

    checkBulletDeerCollision();
    checkBulletWallCollision();

    if (lock) {
        pawn.rx += mouseY * mouseSensitivity;
        pawn.ry += mouseX * mouseSensitivity;
        if (pawn.rx > 57) pawn.rx = 57;
        if (pawn.rx < -57) pawn.rx = -57;
    }

    mouseX = mouseY = 0;

    pawn.x += dx;
    pawn.y += dy;
    pawn.z += dz;

    document.onclick = function () {
        if (lock) {
            myBullets.push(drawMyBullet(myBulletNumber));
            myBulletsData.push(new player(pawn.x, pawn.y, pawn.z, pawn.rx, pawn.ry, 5, 5, 5));
            myBulletNumber++;
        }
    }

    world.style.transform = `translateZ(600px) rotateX(${-pawn.rx}deg) rotateY(${pawn.ry}deg) translate3d(${-pawn.x}px, ${-pawn.y}px, ${-pawn.z}px)`;
}

let game = setInterval(update, 10);

function drawMyWorld(squares, name) {
    for (let i = 0; i < squares.length; i++) {
        let mySquare1 = document.createElement("div");
        mySquare1.id = `${name}${i}`;
        mySquare1.style.position = "absolute";
        mySquare1.style.width = `${squares[i][6]}px`;
        mySquare1.style.height = `${squares[i][7]}px`;
        if (squares[i][10]) {
            mySquare1.style.backgroundImage = squares[i][10];
        } else {
            mySquare1.style.backgroundColor = squares[i][8];
        }
        mySquare1.style.transform = `translate3d(${600 + squares[i][0] - squares[i][6] / 2}px, ${400 + squares[i][1] - squares[i][7] / 2}px, ${squares[i][2]}px) rotateX(${squares[i][3]}deg) rotateY(${squares[i][4]}deg) rotateZ(${squares[i][5]}deg)`;
        mySquare1.style.opacity = squares[i][9];
        world.appendChild(mySquare1);
    }
}

function collision(mapObj, leadObj) {
    onGround = false;
    for (let i = 0; i < mapObj.length; i++) {
        let x0 = (leadObj.x - mapObj[i][0]);
        let y0 = (leadObj.y - mapObj[i][1]);
        let z0 = (leadObj.z - mapObj[i][2]);

        if ((x0 ** 2 + y0 ** 2 + z0 ** 2 + dx ** 2 + dy ** 2 + dz ** 2) < (mapObj[i][6] ** 2 + mapObj[i][7] ** 2)) {
            let x1 = x0 + dx;
            let y1 = y0 + dy;
            let z1 = z0 + dz;

            let point0 = coorTransform(x0, y0, z0, mapObj[i][3], mapObj[i][4], mapObj[i][5]);
            let point1 = coorTransform(x1, y1, z1, mapObj[i][3], mapObj[i][4], mapObj[i][5]);
            let normal = coorReTransform(0, 0, 1, mapObj[i][3], mapObj[i][4], mapObj[i][5]);

            if (Math.abs(point1[0]) < (mapObj[i][6] + 70) / 2 && Math.abs(point1[1]) < (mapObj[i][7] + 70) / 2 && Math.abs(point1[2]) < 50) {
                point1[2] = Math.sign(point0[2]) * 50;
                let point2 = coorReTransform(point1[0], point1[1], point1[2], mapObj[i][3], mapObj[i][4], mapObj[i][5]);
                let point3 = coorReTransform(point1[0], point1[1], 0, mapObj[i][3], mapObj[i][4], mapObj[i][5]);
                dx = point2[0] - x0;
                dy = point2[1] - y0;
                dz = point2[2] - z0;

                if (Math.abs(normal[1]) > 0.8) {
                    if (point3[1] > point2[1]) {
                        onGround = true;
                    }
                } else {
                    dy = y1 - y0;
                }
            }
        }
    };
}

function coorTransform(x0, y0, z0, rxc, ryc, rzc) {
    let x1 = x0;
    let y1 = y0 * Math.cos(rxc * DEG) + z0 * Math.sin(rxc * DEG);
    let z1 = -y0 * Math.sin(rxc * DEG) + z0 * Math.cos(rxc * DEG);

    let x2 = x1 * Math.cos(ryc * DEG) - z1 * Math.sin(ryc * DEG);
    let y2 = y1;
    let z2 = x1 * Math.sin(ryc * DEG) + z1 * Math.cos(ryc * DEG);

    let x3 = x2 * Math.cos(rzc * DEG) + y2 * Math.sin(rzc * DEG);
    let y3 = -x2 * Math.sin(rzc * DEG) + y2 * Math.cos(rzc * DEG);
    let z3 = z2;
    return [x3, y3, z3];
}

function coorReTransform(x3, y3, z3, rxc, ryc, rzc) {
    let x2 = x3 * Math.cos(rzc * DEG) - y3 * Math.sin(rzc * DEG);
    let y2 = x3 * Math.sin(rzc * DEG) + y3 * Math.cos(rzc * DEG);
    let z2 = z3;

    let x1 = x2 * Math.cos(ryc * DEG) + z2 * Math.sin(ryc * DEG);
    let y1 = y2;
    let z1 = -x2 * Math.sin(ryc * DEG) + z2 * Math.cos(ryc * DEG);

    let x0 = x1;
    let y0 = y1 * Math.cos(rxc * DEG) - z1 * Math.sin(rxc * DEG);
    let z0 = y1 * Math.sin(rxc * DEG) + z1 * Math.cos(rxc * DEG);

    return [x0, y0, z0];
}

function drawMyBullet(num) {
    let myBullet = document.createElement("div");
    myBullet.id = `bullet_${num}`;
    myBullet.style.display = "block";
    myBullet.style.position = "absolute";
    myBullet.style.width = `20px`;
    myBullet.style.height = `20px`;
    myBullet.style.borderRadius = `50%`;
    myBullet.style.backgroundColor = `yellow`;
    world.appendChild(myBullet);
    return myBullet;
}
