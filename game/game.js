let socket_1 = io()

let my_x = 0;
let my_y = 0;
let userId = null;
let user_list;
let user_list_main = []
socket_1.on("user_data",(data)=>{
    if (userId == null){
        console.log(data.userId)
        my_x = data.postion_x;
        my_y = data.postion_y;
        userId = data.userId;
    }

})
socket_1.on("other_user_data",(data)=>{

    user_list = data;

    data.map((data_1)=>{
        let  co = 0
        for (let i = 0;user_list_main.length>i;i++){
            if (data_1.userId == user_list_main[i].userId){
                co +=1;
            }
        }
        if (co ==0 && data_1.userId != userId){
            user_list_main.push(data_1)
        }
    })
    console.log(user_list_main)
    write_other_player()
})
//socket_1.emit("user_po",[my_x,my_y])


socket_1.on("player_postion",(postion)=>{

    if (postion.userId != userId){
        delete_other_user()
        for (let i = 0;user_list_main.length>i;i++){
            if (user_list_main[i].userId == postion.userId){
                user_list_main[i] = postion

            }
        }
        //全ユーザーを描画
        write_other_player()

    }
    console.log(user_list_main)
})

socket_1.on("discon",(id) =>{
    for (let i = 0;user_list_main.length>i;i++){
        if (user_list_main[i].userId == id){
            ctx.fillStyle = "black"
            ctx.fillRect(user_list_main[i].postion_x,user_list_main[i].postion_y,30,30)
            user_list_main.splice(i,1);
        }
    }
    if (id == userId){
        
        user_list = null
        user_list = []
        my_x =0
        my_x = 0;
        userId = null
        
    }
})
