let balls = [];
let gravity = 80;
let FPS = 60;
let sizeX = 1000;
let sizeY = 500;
let bounceEfficiency = 0.93;
function createBall(diameter, color = "000000", posX = 0, posY = 0, volX = 0, volY = 0 ) {
    let setID;
    if (balls[(balls.length - 1)] !== undefined){
        setID =  balls[(balls.length - 1)].id + 1;
    } else {setID = 0}
    balls.push(
        {
            id: setID,
            color: color,
            diameter: diameter,
            position: {
                x: posX,
                y: posY
            },
            volocity: {
                x: volX,
                y: volY
            }
        }
    )
};

function calculateBall(){
    balls.forEach(ball => {
        ball.volocity.y += gravity/FPS*10;
        ball.position.x += ball.volocity.x/FPS;
        ball.position.y += ball.volocity.y/FPS; 
        
        
        if (ball.position.x < 0 || ball.position.x + ball.diameter >= sizeX){
            ball.volocity.x = ball.volocity.x * -1 * bounceEfficiency;
        };
        if (ball.position.y < 0 || ball.position.y + ball.diameter >= sizeY){
            ball.volocity.y = ball.volocity.y * -1 * bounceEfficiency;
        };
        if ((ball.position.x + ball.diameter) > sizeX) {
            ball.position.x = sizeX - ball.diameter
        };
        if ((ball.position.y + ball.diameter) > sizeY) {
            ball.position.y = sizeY - ball.diameter
        };
        if (ball.position.x < 0) {
            ball.position.x = 0
        };
        if (ball.position.y < 0) {
            ball.position.y = 0
        }
    })
};

function drawBall(){
    let HTML = "";
    HTML += `<span style="border-color: #000000; display: block; position: absolute; top: 0px; left: 0px; width: ${sizeX}px; height: ${sizeY}px; border-style: dashed;"></span>
    `
    if (balls[0] !== undefined){
        balls.forEach(ball =>{
        HTML += `<span class="ball" id="${ball.id}" style="display: block; position: absolute; border-radius: 50%; background-color: #${ball.color}; width: ${ball.diameter}px; height: ${ball.diameter}px; left: ${ball.position.x}px; top: ${ball.position.y}px"></span>
       `});
    };
    document.querySelector('body').innerHTML = HTML;
};

function createRandomBall(maxVolocity, diameter, color = "000000"){
    function randomVolocity(){
        let volocity;
        volocity = maxVolocity * Math.random();
        if (Math.round(Math.random())){ volocity *= -1};
        return volocity;
    };
    function randomPosition(max){return max * Math.random()};
    createBall(diameter, color, randomPosition(sizeX), randomPosition(sizeY), randomVolocity(),randomVolocity());
};

// createBall(100, "FF00FF", 100, 100, 100, -100);
createRandomBall(Math.random() * 100, Math.random()* 100);
createRandomBall(Math.random() * 100, Math.random()* 100);
createRandomBall(Math.random() * 100, Math.random()* 100);
createRandomBall(Math.random() * 100, Math.random()* 100);
createRandomBall(Math.random() * 100, Math.random()* 100);



setInterval(()=>{
    calculateBall();
    drawBall();
    console.log(balls[0].position.x, balls[0].position.y,balls[0].volocity.x, balls[0].volocity.y)
}, (1000/FPS))