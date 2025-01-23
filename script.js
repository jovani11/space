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
        if (this.image.complete && this.image.naturalWidth !== 0) {
            // Image is fully loaded and not broken
             ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else {
                this.image.onload = () => {
                // Draw the image once it’s loaded
                ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        };
                this.image.onerror = () => {
            console.error("Failed to load image:", this.image.src);
        };
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
    "“Like a leaf falling in autumn's breeze  I fell for you, oh so easily In your arms, I found my home And with you, my heart will always roam. ” ―Unknown", 
    "“Your beauty should not come from outward adornment, such as elaborate hairstyles and the wearing of gold jewelry or fine clothes. Rather, it should be that of your inner self, the unfading beauty of a gentle and quiet spirit, which is of great worth in God’s sight.” - 1 Peter 3:3-4 ",
    "“Stars - Even if you combine all the stars in the universse it will not be enough to show how much I like you”",
    "“God is within her; she will not fall; God will help her at break of day.” - Psalm 46:5", 
    "“Keep me as the apple of Your ey”e - Psalm 17:8", 
    "“What I like about you the most Is the way you walk The way you smile When you begin to talk What I admire about you a lot Is the way you dress Seeing the way you tuck your hair Is a sight of pure happiness There seems to be nothing That I don’t like about you Asking you out on a date Had become long overdue - ― Unknown",
    "“When I see you, Your eyes sparkle while you say hi with the sweetest voice in the world. When I see you, My heart skips a beat, and I don’t know what to say. When I see you, Love and happiness fulfill my thoughts, and all of my troubles go away. When I see you, I wonder if you think about me as much as I think about you. When I see you, I daydream about the day we could say “I Do.” When I see you, All I want to say is, “I love you.” ― Roslyn Stevenson",
    "“She is more precious than rubies; nothing you desire can compare with her. Long life is in her right hand; in her left hand are riches and honor. Her ways are pleasant ways, and all her paths are peace. She is a tree of life to those who take hold of her; those who hold her fast will be blessed.” - Proverbs 3:15-18",
    "“My head is spinning, My heart is racing Should I tell you, do I say? Whenever I see you, my thoughts begin to stray You’re more to me than you knowI just hope that my love for you will show. ―Unknown”"
]

var amountUnivers = 15
var universe = []
var universeList = ["universe_1.png", "universe_2.png", "universe_3.png"]
//planets
var moonPhase = ["moon_2.png"]
const saturn = new Objects(Math.random() * canvas.width, Math.random() * canvas.height/2,canvas.width/3,canvas.width/3,"./canvasv2/saturn.png")
const earth = new Objects(Math.random() * canvas.width ,Math.random() * canvas.height,canvas.width/5,canvas.width/5,"./canvasv2/earth.png")
const mars = new Objects(Math.random() * canvas.width ,Math.random() * canvas.height,canvas.width/9,canvas.width/9,"./canvasv2/mars.png")
const moon = new Objects(Math.random() * canvas.width, Math.random() * canvas.height, canvas.width/3,canvas.width/3,`./canvasv2/${moonPhase[Math.floor(Math.random() * moonPhase.length)]}`)
//append universe
for(let i=0; i<amountUnivers;i ++) {
    var height = Math.random() * 50 
    var width = Math.random() * 50 
    universe.push(new Objects(Math.random() * canvas.width ,Math.random() * canvas.height,height,width, `./canvasv2/${universeList[Math.floor(Math.random() * universeList.length)]}`))
}

for(let i=0; i<amountOfStars; i++) {
    var x = Math.random() * canvas.width
    var y = Math.random() * canvas.height;
    var radius = Math.random() * 3.8
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
}

animate();
