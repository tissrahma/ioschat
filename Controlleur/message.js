const { findOne } = require('../module/message.js');
const Message=require('../module/message.js')

module.exports = {
    
    addmessage: async (req, res, next) => {
        const map1 = new Map();
        const map2 = new Map();
        const { User1_param1,RommeName} = req.params;
      const Exit =await Message.findOne({
        $or: [
            {
                UserM1: User1_param1,
                RommeName:RommeName
            },
            {
                UserM2: User1_param1,
                RommeName:RommeName
            },
          ],
        });
        let createdMsg

        if(Exit){
            console.log(req.body.messageUser1);
            if (User1_param1 == Exit.UserM1)
            {
                await Message.findOneAndUpdate({ RommeName: Exit.RommeName},{$push : {  messageUser1:map2.set("user1",req.body.messageUser1) }}  , {new: true}) 
               }else if (User1_param1 == Exit.UserM2 )
               {
                await Message.findOneAndUpdate({ RommeName: Exit.RommeName},{$push : { messageUser1:map2.set("user2", req.body.messageUser1) }}  , {new: true})
              }
}else{
   const createdMsg = Message.create({
        UserM1: req.body.UserM1,
        UserM2: req.body.UserM2,
       RommeName:req.body.RommeName,
        messageUser1:{ "user1":req.body.messageUser1 }
      
      });    
        
     }
     res.send(createdMsg);
    },
  /*showmessage: async (req, res) => {
        var list = []
        var room = await Message.findOne({RommeName : req.body.RommeName})
       room.messageUser1.forEach((element )=>{
          for (const [key, value] of Object.entries(element)) {
            console.log(Object.entries(element));
              list.push({key : key, value :value})
            }
          })
        res.send(list) tra warini fin el mochkol bethbt
    }*/
    showmessage: async (req, res) => {
      var list = []
      var room = await Message.findOne({RommeName : req.body.RommeName})
  
      if(room?.messageUser1 != null){
         room.messageUser1.forEach((element )=>{
        for (const [key, value] of element) {
                  list.push({key : key, value :value})
                }
              });
            
               res.send(list)
      } 
  }
}
    