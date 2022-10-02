const cs = document.createElement('canvas');
const ctx = cs.getContext('2d');
cs.width = '600';
cs.height = '400';
document.body.appendChild(cs);
back_glound_color = "black"
my_color = "red"
speed = 10;
my_width = 30;
my_height = 30;

console.log("aaa")
ctx.fillStyle = back_glound_color;
ctx.fillRect(0, 0, cs.width, cs.height);
write_me()

function write_me(){
    ctx.fillStyle = my_color
    ctx.fillRect(my_x,my_y, my_width,my_height)
}
function delete_me(){
    ctx.fillStyle = back_glound_color
    ctx.fillRect(my_x,my_y, my_width,my_height)
}
function write_other_player(){
    console.log("tes")
    for (let i = 0;user_list_main.length>i;i++){
        ctx.fillStyle = "blue"
        ctx.fillRect(user_list_main[i].postion_x,user_list_main[i].postion_y, my_width,my_height)
    }
}
function delete_other_user(){
    console.log("akakaka");
    for (let i = 0;user_list_main.length>i;i++){
        ctx.fillStyle = back_glound_color;
        ctx.fillRect(user_list_main[i].postion_x,user_list_main[i].postion_y, my_width,my_height)
    }
    
}
function dedlete_stage(){
    ctx.fillStyle = back_glound_color;
    ctx.fillRect(0,0,1000,1000)
}
function main_loop(){
    dedlete_stage()
    write_me()
    write_other_player()
}
setInterval(main_loop,10)
let moves = {
    up:function(){
        my_y -= speed;
        socket_1.emit("user_po",[my_x,my_y])
    },
    down:function(){
        my_y+=speed;
        socket_1.emit("user_po",[my_x,my_y])
    },
    left:function(){
        my_x-=speed
        socket_1.emit("user_po",[my_x,my_y])
    },
    right:function(){
        my_x+=speed
        socket_1.emit("user_po",[my_x,my_y])
    }
}
document.addEventListener("keydown",function(e){
    if (e.code == 'KeyW' || e.code == 'ArrowUp') {
        //delete_me()
		moves.up();
       // write_me()
	} else if (e.code == 'KeyS' || e.code == 'ArrowDown') {
        //delete_me()
		moves.down();
        //write_me()
	} else if (e.code == 'KeyA' || e.code == 'ArrowLeft') {
        //delete_me()
		moves.left();
        //write_me()
	} else if (e.code == 'KeyD' || e.code == 'ArrowRight') {
        //delete_me()
		moves.right();
        //write_me()
	} else if (e.code == 'Space'){
  }
})

