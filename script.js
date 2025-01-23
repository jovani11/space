let canvas = document.getElementById("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

if (canvas) {
    console.log("Canvas supported!");
}
let ctx = canvas.getContext("2d");
let container = document.getElementById("container")
class Star {
    constructor(x, y, r, color, blinkTimer) {
        this.xPost = x;
        this.yPost = y;
        this.radius = r;
        this.color = color;
        this.recentColor = undefined

        //interaction variable
        this.isClick = false
        this.dx = undefined
        this.dy = undefined
        this.distance = undefined
        
        
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.xPost, this.yPost - this.radius); // Top point
        ctx.lineTo(this.xPost + this.radius, this.yPost); // Right point
        ctx.lineTo(this.xPost, this.yPost + this.radius); // Bottom point
        ctx.lineTo(this.xPost - this.radius, this.yPost); // Left point
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
        return console.log("Stars drawn!");
    }

    getDistance(x, y) {
        this.dx = this.xPost - x
        this.dy = this.yPost - y
        this.distance = Math.sqrt(Math.pow(this.dx,2) + Math.pow(this.dy, 2))
      
        if (this.distance < 0 + this.radius) {
            console.log("star clicked!")
            this.isClick = true
        }
        

    }

    async blink() {
        if (!this.recentColor) {
            this.recentColor = this.color; // Store the original color
        }
    
        const newColor = starColor[Math.floor(Math.random() * starColor.length)];
        this.color = newColor;
        await new Promise(resolve => setTimeout(resolve, 1100));
        this.color = this.recentColor;
    }
    

    update() {
        if(this.isClick) {
            this.isClick = false
            Mouse.x = undefined
            Mouse.y = undefined
                if(container) {
                    console.log("changed")
                    var setMessage = message[Math.floor(Math.random() * message.length)]
                    document.getElementById("text_01").innerHTML = setMessage
                    container.style.zIndex = "2"
                    container.style.display = "flex"
                }
                
        }

    
        this.draw()
    }

}   


class Objects {
    constructor(x, y, height, width, imageSource) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.image = new Image()
        this.image.src = imageSource

        this.leftEdge = this.x
        this.topEdge = this.y
        this.bottomEdge = this.y + this.height
        this.righEdge = this.x+ this.width
    }

    draw() {
        if(this.image.complete) {
            ctx.drawImage(this.image,this.x, this.y, this.height, this.width)
           // console.log("image drawn")
        } else {
            this.image.onload = () => {
                ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
              //  console.log("Image drawn after loading");
            }
        }
        
    }

    update() {
        this.draw()
    }

   
}

class ShootingStar {
    constructor(x, y, r, velocity) {

    }
}

//variables 
var amountOfStars = 300
var stars = [];
var starColor = ["blue", "orange", "white","yellow"]
var closeButton = document.getElementById("exit")
const message = [
    "“She is clothed with strength and dignity; she can laugh at the days to come.” - Proverbs 31:25",
    "“God is within her; she will not fall; God will help her at break of day.” - Psalm 46:5",
    "“Your beauty should not come from outward adornment, such as elaborate hairstyles and the wearing of gold jewelry or fine clothes. Rather, it should be that of your inner self, the unfading beauty of a gentle and quiet spirit, which is of great worth in God’s sight.” - 1 Peter 3:3-4 ",
    "“She is more precious than rubies; nothing you desire can compare with her. Long life is in her right hand; in her left hand are riches and honor. Her ways are pleasant ways, and all her paths are peace. She is a tree of life to those who take hold of her; those who hold her fast will be blessed.” - Proverbs 3:15-18",
    "message 5",
    "message 6",
    "message 7",
    "message 8",
    "message 9",
    "message 10"
]

var amountUnivers = 15
var universe = []
var universeList = ["universe_1.png", "universe_2.png", "universe_3.png"]
//planets
var moonPhase = ["moon_1.png", "moon_2.png"]
const saturn = new Objects(Math.random() * canvas.width, Math.random() * canvas.height/2,canvas.width/3,canvas.width/3,"../images/saturn.png")
const moon = new Objects(Math.random() * canvas.width, Math.random() * canvas.height, canvas.width/7,canvas.width/7,`../images/${moonPhase[Math.floor(Math.random() * moonPhase.length)]}`)
const earth = new Objects(Math.random() * canvas.width ,Math.random() * canvas.height,canvas.width/5,canvas.width/5,"../images/earth.png")
const mars = new Objects(Math.random() * canvas.width ,Math.random() * canvas.height,canvas.width/9,canvas.width/9,"../images/mars.png")

//append universe
for(let i=0; i<amountUnivers;i ++) {
    var height = Math.random() * 50 
    var width = Math.random() * 50 
    universe.push(new Objects(Math.random() * canvas.width ,Math.random() * canvas.height,height,width, `../canvasv2/${universeList[Math.floor(Math.random() * universeList.length)]}`))
}

for(let i=0; i<amountOfStars; i++) {
    var x = Math.random() * canvas.width
    var y = Math.random() * canvas.height;
    var radius = Math.random() * 7
    var color = starColor[Math.floor(Math.random() * starColor.length)]
    stars.push(new Star(x,y,radius, color))

}



//interactive event
var Mouse = {
    x:  undefined,
    y: undefined
}

var click = window.addEventListener("click", function (event) {
    Mouse.x = event.x
    Mouse.y = event.y
  
})


function closed() {
        container.style.display = "none"
        container.style.zIndex = "0"
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i=0; i<amountOfStars; i++) {
        stars[i].update()
        stars[i].getDistance(Mouse.x, Mouse.y)
        stars[i].blink()
    }
    for(let i=0; i<amountUnivers; i++) {
        universe[i].update()
    }
    saturn.update()
    earth.update()
    moon.update()
    mars.update()
    meteor.update()
    //saturn.getDistance(Mouse.x, Mouse.y)
}

animate();
