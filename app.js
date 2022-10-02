const express = require("express");
const app = express()
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
let user_list = [];
class user_data{
    constructor(userId,postion_x,postion_y,life){
        this.userId = userId;
        this.postion_x = postion_x;
        this.postion_y = postion_y
        this.life = life;
    }
    get_id(){
        return this.userId
    }
    get_postion_x(){
        return this.postion_x
    }
    get_postion_y(){
        return this.postion_y
    }
    get_life(){
        return this.life
    }
    set_postion_x(x){
        this.postion_x = x
    }
    set_postion_y(y){
        this.postion_y = y;
    }
    set_life(bol){
        this.life = bol
    }
}
app.use("/game",express.static("game"))
app.get("/",(req,res)=>{
    console.log("conn")
    res.sendFile(__dirname+"/index.html")
})
io.on("connection",(socket)=>{
    //ユーザーデータの設定
    console.log(user_list)
    let my_user_data = null
    console.log("socket_connection")
    user_list[user_list.length] = new user_data(user_list.length,0,0,true)
    my_user_data = user_list[user_list.length-1]
    console.log(user_list)
    io.emit("user_data",my_user_data)
    //ほかのユーザーの情報を送信
    io.emit("other_user_data",user_list)
    //切断時の処理 
    socket.on("disconnect",()=>{
        console.log(my_user_data.userId)
        io.emit("discon",my_user_data.userId)
        for (let i = 0;user_list.length>i;i++){
            if (user_list[i].userId == my_user_data.userId){
                user_list.splice(i,1)
            }
        }

        my_user_data = null
        console.log(user_list)
    })
    //ユーザーの座標を送信
     const send_player_postion =()=>{ io.emit("player_postion",[my_user_data.postion_x,my_user_data.postion_y])}
    //ユーザーからの座標情報を受信してそれをプレイヤー全員に送信
    socket.on("user_po",(data)=>{
        console.log("test")
        my_user_data.postion_x = data[0];
        my_user_data.postion_y = data[1]
        console.log(my_user_data)
        io.emit("player_postion",my_user_data)
    })
})
server.listen(process.env.PORT || 3000,()=>{
    console.log("server_run")
})