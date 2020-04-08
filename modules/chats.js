//________________________________________TOOLS__________________________________________
let delay=async(duration)=>{await new Promise(resolve=>setTimeout(resolve,duration))}; 
     //* for delay inside async function, use it instead setTimeout
let random =(max)=>{ return Math.floor(Math.random()*max);};


//_________________PART MANAGER (OPCIONAL)
//exports.RH_IGNORE_TOTAL=true;//add this line to ignore this module 
//exports.RH_IGNORE_COMMANDS=true;//add this line to ignore all commands from this module
//module.exports.RH_BOOTS=true;//add this line to ignore all boots from this module
//module.exports.RH_IGNORE_EVENTS=true;//add this line to ignore all events from this module
//module.exports.RH_IGNORE_EVENTS_PRIMITIVE=true;//add this line to ignore all events_primitive from this module


//___________________________ETERNAL_VARIABLE_PART
module.exports.e={
/*
  main_voice_id:'659499045114347550'
 ,free_chat_category_id:'659860802072870932'
 ,voice_category_id:'476679721854173187' 
 ,afk_channel_id:'667436001949515797'
*/
//
main_voice_id:'677227933747642393'
 ,free_chat_category_id:'677188676572414011'
 ,voice_category_id:'677226281724805120' 
 ,afk_channel_id:'587191278039466004'
//
 ,sp_role_name:'visible'
 ,mod_role_name:'Супермодератор'
 ,roles_arr:['Супермодератор','☥']
  ,roles_arr_block:['Мертвые души','Muted','Временная роль']
 ,delay_time:2*1000
 ,info:"Вы только что создали войсовый канал, для того чтобы сделать этот текстовый канал доступным для общения людям, находящимся в вашем войсе, воспользуйтесь командой `!открыть чат`. Люди с ролью @visible могут общаться в этом текстовом канале даже не находясь в войсе. Для настроики выборочного доступа воспользуйтесь командой `!блокировать`, а затем дайте доступ нужным людям командой:`!доступ @ник1`. Для бана воспользуйтесь командой `!бан @ник`. Комада для снятия бана:`!разбан`. В команде можно упоминать сразу нескольких людей. Все команды:`!хелп`"
 ,under_limit:"превышен лимит"
 ,no_rights_for_creating:"недостаточно прав"
,you_owner_already:"у вас уже есть войс"
};
module.exports.p={
  opened:[' Текстовый канал открыт ',' Text channel is opened ']
 ,closed:[' Текстовый канал закрыт ',' Text channel is closed ']
 ,blocked:[ ' Текстовый и Войсовый канал заблокировны ',' Text & Voice channel are blocked ']
 ,unblocked:[' Текстовый и Войсовый канал разаблокировны ',' Тext & Voice channel unblocked ']
 ,muted:[' Замучен ',' is muted ']
 ,banned:[' Забанен ',' is banned']
 ,unbanned:[' Разбанен ',' is unbanned ']
 ,right:[' Права переданы ',' Right is redirected ']
 ,reset:[ 'Настройки сброшены ', ' Settings is reseted']
 ,undeleted:[ ' Войс неудаляем теперь ',' Voice is undeleted now ']
 ,deleted:[' Войс удаляем снова ',' Voice is deleted '] 
  ,accessed:[[' Допущен (размучен и разбанен) '],[' accessed(unmuted&unbaned)']]
  ,r:(msg,name,n,mmb)=>{let str=(mmb)?mmb:'';msg.reply(exports.p[name][n]+str);}
};
module.exports.err={
   d:[' Секретная ошибка возникла ',' An secret Error occurs ']
  ,d_:(msg,n)=>{msg.reply(this.d[n]);}
   ,no_rights:[' Недостаточно прав ',' No permissions ']
  ,no_mentioned:[' Не указан @ник ',' No mentioned users ']
  ,r:(msg,name,n)=>{msg.reply(exports.err[name][n]);}
};

module.exports.voice_channels={
  //id_voice_channel:{text_channel_id,owner_id,muted}
};
module.exports.text_channels={};
module.exports.owners={};
//_________________________________________BOOTS_PART___________________________________________________
module.exports.boots = {}; 

module.exports.boots.parseTextChannels={run:async(client)=>{try{
    //code to execut bot on loading

module.exports.voice_channels={};
module.exports.text_channels={};
module.exports.owners={};
   let text_channels_arr= await client.guilds.get(client.SERVER_ID).channels.filter(ch=>ch.type=="text"&&ch.parent&&ch.parent.id==exports.e.voice_category_id);
   let obj;
   text_channels_arr.map(ch=>{
   
       obj={};
     if(ch.topic){
      let channel_id=ch.topic.match(/ch:\d{1,}/)[0].slice(3); 
       obj.id=channel_id;
       obj.owner_id=ch.topic.match(/ow:\d{1,}/)[0].slice(3);   
       obj.ud=ch.topic.match(/ud:\d{1}/)[0].slice(3); 
       obj.role_id=ch.topic.match(/rl:\d{1,}/)[0].slice(3);  
       exports.text_channels[ch.id]={id:ch.id};
       obj.text_channel=exports.text_channels[ch.id]; exports.text_channels[ch.id].voice_channel=this;
       exports.voice_channels[channel_id]=obj;
       exports.text_channels[ch.id].voice_channel=exports.voice_channels[channel_id];
       exports.owners[obj.owner_id]={id:obj.owner_id,voice_channel:exports.voice_channels[channel_id],text_channel:exports.text_channels[ch.id]};
     };
     });

 // console.log(exports.voice_channels);
 // console.log(exports.text_channels);
 // console.log(exports.owners);

   return;

}catch(err){console.log(err);};}};//
//module.exports.boots.someBoot.RH_IGNORE=true;//add this line to ignore this command
//...
//_________________________________________COMMANDS_PART_________________________________________________
exports.getProps=async(client,message,args)=>{try{ 
          let obj={};
          if (!exports.text_channels[message.channel.id]) return;
          obj.owner_id=exports.text_channels[message.channel.id].voice_channel.owner_id;
          obj.owner=exports.text_channels[message.channel.id].voice_channel.owner_id==message.author.id;
          obj.sm=message.member.roles.find(r=>r.name==exports.e.mod_role_name)||message.member.user.id==message.guild.owner.id;
          obj.any=obj.owner||obj.sm;
          obj.any_no=()=>{exports.err.r(message,'no_rights',0)};
          obj.mnt=message.mentions&&message.mentions.members.first();
          obj.no_mnt=()=>{exports.err.r(message,'no_mentioned',0);};
          return obj;
}catch(err){console.log(err);};};
//------
module.exports.commands = {};

//__________________open text chat
module.exports.commands.textOpen={aliase:'открыть'
,description:[[" чат"," Делает текстовый видимым людям в вашем войсе (по умолчанию скрыт)",'0']]
,help_type:'base'
,run:async(client,message,args)=>{try{
      let obj = await exports.getProps(client,message,args); if (!obj.any) return obj.any_no();
     // exports.textSetPermissions2(client,message.member,message.channel,'open');
//_
       let role_id=exports.text_channels[message.channel.id].voice_channel.role_id; if(!role_id){exports.err.r(message,'d',0); return;};
   let role=await message.guild.roles.get(role_id); if(!role){exports.err.r(message,'d',0); return;};
   await message.channel.overwritePermissions(role, { VIEW_CHANNEL: true}).then(exports.p.r(message,'opened',0)).catch(err=>{console.log(err);exports.err.r(message,'d',0);});
       
        let a=message.channel.topic.match(/opened:\d{1}/)[0];  let new_topic=message.channel.topic;
        new_topic=new_topic.replace(a,'opened:'+1);  await message.channel.edit({topic:new_topic}).then().catch(console.error);
//_
       return;
}catch(err){console.log(err);};}};//
//_________________close text chat
module.exports.commands.textClose={aliase:'закрыть'
,description:[[" чат"," Опять делает текстовый невидимым для всех.",'0']]
,help_type:'base'
,run:async(client,message,args)=>{try{
      let obj = await exports.getProps(client,message,args); if (!obj.any) return obj.any_no();
     // exports.textSetPermissions2(client,message.member,message.channel,'close'); message.reply('ok');
//_
   let role_id=exports.text_channels[message.channel.id].voice_channel.role_id; if(!role_id){exports.err.r(message,'d',0); return;};
   let role=await message.guild.roles.get(role_id); if(!role){message.channel.reply(exports.err.d[0]); return;};
   await message.channel.overwritePermissions(role, { VIEW_CHANNEL: null}).then(exports.p.r(message,'closed',0)).catch(err=>{console.log(err);exports.err.r(message,'d',0);});
   
        let a=message.channel.topic.match(/opened:\d{1}/)[0];   let new_topic=message.channel.topic;
        new_topic=new_topic.replace(a,'opened:'+0);  await message.channel.edit({topic:new_topic}).then().catch(console.error);
//_
      return;
}catch(err){console.log(err);};}};//


//__________________access chat
module.exports.commands.giveAccess={aliase:'доступ'
,description:[[" @ник @ник @ник"," Пригласить в прежде заблокированный войс кучку избранных.(Команда так же **размучивает** и **разбанивает**)",'0']
              ,[" @ник"," Или по одному.",'0']
              ,[" название роли"," дать доступ роли",'1']
              ,[" название роли,название роли"," или сразу нескольким",'1']
              ,[" @ник @ник название роли,название роли"," или так",'1']
             ]
,help_type:'base'
,run:async(client,message,args)=>{try{ console.log('give');
        let obj=await exports.getProps(client,message,args);  if(!obj.any) return obj.any_no();
        let voice_chat = message.guild.channels.get(exports.text_channels[message.channel.id].voice_channel.id); if(!voice_chat) return exports.err.r(message,'d',0);
        //if (!(message.mentions&&message.mentions.users)) return;
        //exports.onGiveAccess(client,message,message.channel,voice_chat);
        await exports.setPerms(client,message,['','+++']);
          
        return;
}catch(err){console.log(err);};}};//



//_________________ban mmbs and roles
module.exports.commands.ban={aliase:'бан'
,description:[
       [" @ник"," Выкинуть из вашего войса тех кто не нравится.",'0']
      ,[" @ник @ник @ник"," Выкинуть толпу неугодных одним махом.\n(так же можно и мутить и разбанивать по несколько человек)",'0']
     // ,[" название роли"," Забанить роль, что б ее обладатели не могли зайти.",'1']
]
,help_type:'both'
,run:async(client,message,args)=>{try{
      let obj = await exports.getProps(client,message,args); if (!obj.any) return obj.any_no(); if(!obj.mnt) return obj.no_mnt();
      await exports.setPerms(client,message,['','--']);
      return;
}catch(err){console.log(err);};}};//

//_________________ban mmbs and roles
module.exports.commands.mute={aliase:'мут' 
//,description:[[" @мут"," забанить участника в вашем войсе и текстовом, что б не мог зайти."]]
,description:[
       [' @ник',' Запретить говорить в войсе. (сможет только слушать) ','0']
     // ,[' название роли',' Люди с этой ролью смогут слушать но не говорить.','1']
]
,help_type:'extended'
,run:async(client,message,args)=>{try{
      let obj = await exports.getProps(client,message,args); if (!obj.any) return obj.any_no(); if(!obj.mnt) return obj.no_mnt();
      await exports.setPerms(client,message,['','-']); 
      return;
}catch(err){console.log(err);};}};//
//_________________unban mmbs and roles
/*
module.exports.commands.unban={aliase:'разбан',description:[
[" @ник"," Разбан и размут в текстовом и войсе.",0]
,[' название роли',' Разбан и размут роли в текстовом и войсе.',1]
],help_type:'both'
,run:async(client,message,args)=>{try{
      let obj = await exports.getProps(client,message,args); if (!obj.any) return obj.any_no();
      await exports.setPerms(client,message,['','+']);
      message.reply('ok');  return;
}catch(err){console.log(err);};}};//
*/
//__________________block chat
module.exports.commands.chatBlock2={aliase:'заблокировать'
,description:[[" войс"," Сделать закрытый всем маня мирок в войсе. (по умолчанию открыт)(Уже находящимся в войсе выдадутся права доступа)",'0']]
,help_type:'base'
,run:async(client,message,args)=>{try{
        let obj=await exports.getProps(client,message,args);  if(!obj.any) return obj.any_no();
        let voice_chat = message.guild.channels.get(exports.text_channels[message.channel.id].voice_channel.id); if(!voice_chat) return; console.log('2');
        exports.onChatBlockPerms2(client,message.channel,voice_chat);
        await module.exports.p.r(message,'blocked',0);
//_
       
        let a=message.channel.topic.match(/blocked:\d{1}/)[0];  let new_topic=message.channel.topic;
        new_topic=new_topic.replace(a,'blocked:'+1);  await message.channel.edit({topic:new_topic}).then().catch(console.error);
//_
        return;
}catch(err){console.log(err);};}};//
//__________________block chat
module.exports.commands.chatBlock={aliase:'заблокировать2'
,description:[[" войс"," Та же команда что и выше, но выкинет из войса всех кому прежде не был выдан персональный доступ.",'0']]
,help_type:'base'
,run:async(client,message,args)=>{try{
        let obj=await exports.getProps(client,message,args); if(!obj.any) return obj.any_no();
        let voice_chat = message.guild.channels.get(exports.text_channels[message.channel.id].voice_channel.id); if(!voice_chat) return; console.log('2');
        exports.onChatBlockPerms(client,message.channel,voice_chat);
        await module.exports.p.r(message,'blocked',0);
//_
       
        let a=message.channel.topic.match(/blocked:\d{1}/)[0];  let new_topic=message.channel.topic;
        new_topic=new_topic.replace(a,'blocked:'+1);  await message.channel.edit({topic:new_topic}).then().catch(console.error);
//_
        return;
}catch(err){console.log(err);};}};//
//__________________unblock chat
module.exports.commands.chatUnBlock={aliase:'разблокировать'
,description:[[" войс"," Позволить заходить в войс всем желающим.",'0']]
,help_type:'base'
,run:async(client,message,args)=>{try{console.log('unblock');
        let obj=await exports.getProps(client,message,args);  if(!obj.any) return obj.any_no();
        let voice_chat = message.guild.channels.get(exports.text_channels[message.channel.id].voice_channel.id); if(!voice_chat) return;
        exports.onChatUnBlockPerms(client,message.channel,voice_chat);
        await module.exports.p.r(message,'unblocked',0);
//_
       
        let a=message.channel.topic.match(/blocked:\d{1}/)[0];  let new_topic=message.channel.topic;
        new_topic=new_topic.replace(a,'blocked:'+0);  await message.channel.edit({topic:new_topic}).then().catch(console.error);
//_
        return;
}catch(err){console.log(err);};}};//

//__________________rights chat
module.exports.commands.redirectOw={aliase:'права'
,description:[[" @ник"," Передать права на войс другому.",'1']]
,help_type:'base'
,run:async(client,message,args)=>{try{ console.log('redirect run');
        let obj = await exports.getProps(client,message,args); if (!obj.any) return obj.any_no(); if(!obj.mnt) return obj.no_mnt();
        let ow=message.channel.topic.match(/ow:\d{1,}/)[0];
        let new_topic=message.channel.topic;
        new_topic=new_topic.replace(ow,'ow:'+message.mentions.members.first().user.id);
        let voice_channel=message.guild.channels.get(exports.text_channels[message.channel.id].voice_channel.id);
        await exports.SetOwnerPermissions(client,message.mentions.members.first(),voice_channel,message.channel);//b
        await exports.ReSetOwnerPermissions(client,message.member,voice_channel,message.channel);//b
        await message.channel.edit({topic:new_topic}).then().catch(console.error);
        await exports.boots.parseTextChannels.run(client);
         await module.exports.p.r(message,'right',0,message.mentions.members.first());
       return;
}catch(err){console.log(err);};}};//
//__________________mk undeleteble text chat
module.exports.commands.makeUndeletable={aliase:'неудалять'
,description:[[" чат"," Не удалять войс после выхода всех. (для супермодеров). ",'1']]
,help_type:'base'
,run:async(client,message,args)=>{try{
        let obj=await exports.getProps(client,message,args);  if(!obj.sm) return;

        let ud=message.channel.topic.match(/ud:\d{1}/)[0]; let new_topic=message.channel.topic;
        new_topic=new_topic.replace(ud,'ud:'+1);  await message.channel.edit({topic:new_topic}).then().catch(console.error);
        await exports.boots.parseTextChannels.run(client);

       await module.exports.p.r(message,'undeleted',0);
       return;
}catch(err){console.log(err);};}};//
//__________________mk deleteble text chat
module.exports.commands.makeDeletable={aliase:'удалять'
,description:[[" чат"," Удалить войс после выхода всех из него. (для супермодеров)",'1']]
,help_type:'base'
,run:async(client,message,args)=>{try{
        let obj=await exports.getProps(client,message,args);  if(!obj.sm) return;
        let ud=message.channel.topic.match(/ud:\d{1}/)[0];
        let new_topic=message.channel.topic;
        new_topic=new_topic.replace(ud,'ud:'+0);
        await message.channel.edit({topic:new_topic}).then().catch(console.error);
        await exports.boots.parseTextChannels.run(client);
        await module.exports.p.r(message,'deleted',0);
       return;
}catch(err){console.log(err);};}};//
//__________________reset chat
module.exports.commands.chatReset={aliase:'сбросить'
,description:[[" настройки"," Возвращает настройки в исходное положение. ",'1']]
,help_type:'base'
,run:async(client,message,args)=>{try{
        let obj=await exports.getProps(client,message,args);  if(!obj.any) return; console.log('1');
        let voice_chat = message.guild.channels.get(exports.text_channels[message.channel.id].voice_channel.id); if(!voice_chat) return;            
        let text_channel=message.channel;
        let role=message.guild.roles.get(exports.voice_channels[voice_chat.id].role_id); if(!role) return;
        let member = await message.guild.members.get(obj.owner_id);
        await exports.reset(client,member,voice_chat,text_channel,role);
        await module.exports.commands.chatUnBlock.run(client,message,[]);
        await module.exports.commands.textClose.run(client,message,[]);
       await module.exports.p.r(message,'reset',0);

}catch(err){console.log(err);};}};//
       

//_________________________help2
module.exports.commands.chatHelp2={aliase:'хелп?', run:async(client,message,args)=>{try{
      let extended=(args[1]=='+'); let all=(args[1]=='*'); let extended_type=0; let base=true; 
      let desc=(extended)?'РАСШИРЕННЫЕ КОМАНДЫ':(all)?'все комнады':'ОСНОВНЫЕ КОМАНДЫ ';
      let obj=exports.commands; let str=' \n'; let obj2={};  
      for(let key in obj){
         obj2=obj[key];
         if(!obj2.description||!obj2.help_type) continue;
         for(let i=0;i<obj2.description.length;i++){
             if(all){
                     str+='``'+client.prefix+obj2.aliase+obj2.description[i][0]+'``'+obj2.description[i][1]+'\n';
              }else if(extended&&(obj2.description[i][2]=='1')){ 
                     str+='``'+client.prefix+obj2.aliase+obj2.description[i][0]+'``'+obj2.description[i][1]+'\n';
              }else if(!extended&&(obj2.description[i][2]!='1')){str+='``'+client.prefix+obj2.aliase+obj2.description[i][0]+'``'+obj2.description[i][1]+'\n';};
         };//for end
         
       }
      // str+='``'+client.prefix+'хелп +`` - расширенные команды'+' ``'+client.prefix+'хелп *`` - все команды'; 
       console.log(str.length);
       let toSend=(str.length>1000)?str:{ embed:{fields:[{name:desc+" !хелп",value:str}]} };
      message.channel.send(toSend);
        
 }catch(err){console.log(err);};}};//
//module.exports.commands.someCommand.RH_IGNORE=true;//add this line to ignore this command

//______________________help
module.exports.commands.chatHelp={aliase:'хелп', run:async(client,message,args)=>{try{
      await exports.commands.chatHelp2.run(client,message,['']);
      await exports.commands.chatHelp2.run(client,message,['','+']);
      //await message.channel.send('`!хелп` - все команды `!хелп?` - основные `!хелп? +`  второстепенные');
        
 }catch(err){console.log(err);};}};//
//module.exports.commands.someCommand.RH_IGNORE=true;//add this line to ignore this command
//_________________________________________EVENTS_PART_________________________________________________
module.exports.events={};

module.exports.events.voiceStateUpdate={ on:true,  run:async(client,oldMember,newMember)=>{try{


  let income = (exports.voice_channels[newMember.voiceChannelID])?newMember.voiceChannelID:false; 
  let outcome = (exports.voice_channels[oldMember.voiceChannelID])?oldMember.voiceChannelID:false;
  let create_voice_income = !!(newMember.voiceChannelID==module.exports.e.main_voice_id);
  if(!(income||outcome||create_voice_income)) {return;};
  let member = newMember.guild.members.get(newMember.user.id);
  //DISCONNECT CASE
  if(outcome) { 
        // await exports.onDisconnect(client,oldMember,newMember);
               
           let voiceChannel=await member.guild.channels.get(outcome);
           await member.removeRole(member.guild.roles.get(exports.voice_channels[outcome].role_id)).catch(console.error);

         if(voiceChannel.members.array().length==0) {module.exports.onVoiceClose(client,oldMember,newMember);};
         
    };
//CONNECT CASE
  if(newMember.voiceChannel!=undefined) {
     if(create_voice_income){return exports.createNewVoice(client,oldMember,newMember);};//if new chat creation inicialized
     if(income){ 
                //return exports.onConnect(client,oldMember,newMember);
                let voiceChannel=await member.guild.channels.get(income);
           await member.addRole(member.guild.roles.get(exports.voice_channels[income].role_id)).catch(console.error);

               };//if mmb join to voice chat
  };


}catch(err){console.log(err);};}};//
//module.exports.events.someEvent.RH_IGNORE=true;//add this line to ignore this event trigger
// ...
//e2
module.exports.events.channelUpdate={ on:true,  run:async(client,oldChannel,newChannel)=>{try{//synch voice channel name and role name
     if(oldChannel.type!='voice') return;
     if(oldChannel.name==newChannel.name) return;
     let ch_cast=exports.voice_channels[oldChannel.id]; if(!ch_cast) return;
     let text_chnl= await oldChannel.guild.channels.get(ch_cast.text_channel.id);
     text_chnl.edit({name:newChannel.name}).then().catch(console.error);
     let role=await oldChannel.guild.roles.get(ch_cast.role_id); if(!role) return;
   // role.edit({name:'☥'+newChannel.name});
    return;
}catch(err){console.log(err);};}};//
//module.exports.events.someEvent.RH_IGNORE=true;//add this line to ignore this event trigger
// ...
//e2


//_________________________________________EVENTS_PART_END__________________________________________

//______________________________EVENTS PRIMITIVE
module.exports.events_primitive={};

module.exports.events_primitive.SOME_EVENT_NAME={run:async(client,event)=>{try{
      //some code here
}catch(err){console.log(err);};}};//
//module.exports.events_primitive.SOME_EVENT_NAME.RH_IGNORE = true;//add this line to ignore this primitive event trigger

//_____________SUB FUNCTION
//______________sf01
exports.sf01=async(client)=>{
try{ 
   
}catch(err){console.log(err);};
};//createRole end
//______________sf03
exports.onConnect=async(client,oldMember,newMember)=>{try{ 
         let channel=newMember.voiceChannel;
         let role_id=exports.voice_channels[channel.id].role_id;
         let role = channel.guild.roles.get(role_id);
         if(role) try{newMember.addRole(role).then().catch(err=>console.log(err)); }catch(err){console.log(err);};
        return;
}catch(err){console.log(err);};};//onConnect end
//______________sf04
exports.onDisconnect=async(client,oldMember,newMember)=>{try{ //triggered then mmb left the voice channel
         let channel=oldMember.voiceChannel;
         let role_id=exports.voice_channels[channel.id].role_id;
         let role = channel.guild.roles.get(role_id);
         if(role) try{oldMember.removeRole(role).then().catch(err=>console.log(err)); }catch(err){console.log(err);};
         return;
}catch(err){console.log(err);};};//onDisconnect end
//______________sf05
exports.onVoiceClose=async(client,oldMember,newMember)=>{try{ //triggered them last mmb left the voice channel
           let member=oldMember.guild.members.get(oldMember.user.id);
           let channel=member.guild.channels.get(oldMember.voiceChannel.id);
           if(exports.voice_channels[channel.id].ud==1) return;
           let role_id=exports.voice_channels[channel.id].role_id;
           let role = member.guild.roles.get(role_id);
          
           //if(role) await role.delete();
           let text_channel=await member.guild.channels.find(ch=>ch.topic&&ch.topic.indexOf('ch:'+channel.id)!=-1);
            if(text_channel){ 
                 await text_channel.edit({name:'fch'+role_id,topic:''});
                 let parent = await member.guild.channels.get(exports.e.free_chat_category_id);
                 if(parent) {await text_channel.setParent(parent.id).then(channel => { channel.lockPermissions().catch(console.error); }).catch(console.error);};
                 text_channel.send(channel.name+' end');
           };
         
          await  delete exports.voice_channels[channel.id];
          await delete exports.text_channels[text_channel.id];
          await channel.delete();
          await module.exports.boots.parseTextChannels.run(client);//update chat`s structure
         // let afk=await newMember.guild.channels.get(exports.e.afk_channel_id); 
         //if(!afk) return;
         // await afk.overwritePermissions(newMember.user,{MOVE_MEMBERS:null}).catch(console.error);
         await delay(1000);
          await role.members.map(m=> m.removeRole(role).then(()=>console.log(m.user.username)).catch(err=>console.log(err)) );
          return;
}catch(err){console.log(err);};};
//______________sf02 chatcreating
exports.createNewVoice=async(client,oldMember,newMember)=>{try{ //triggered then new chat creating
         let channel=newMember.guild.channels.get(newMember.voiceChannel.id);
         let member=newMember.guild.members.get(newMember.id);
         let is_able= await newMember.roles.find(r=>exports.e.roles_arr.includes(r.name))||member.user.id==channel.guild.owner.id;
         if(!is_able) {
 let sv_name=await channel.name;await channel.edit({name:exports.e.no_rights_for_creating}).catch(console.error);await delay(exports.e.delay_time);await channel.edit({name:sv_name}).catch(console.error);
         return;};
         let more=member.roles.find(r=>r.name==exports.e.mod_role_name)||member.user.id==channel.guild.owner.id;
         if(exports.owners[member.user.id]&&!more){
 let sv_name=await channel.name;await channel.edit({name:exports.e.you_owner_already}).catch(console.error);await delay(exports.e.delay_time);await channel.edit({name:sv_name}).catch(console.error);
         return;};
     let name=(member.nickname)?member.nickname:member.user.username;  
//____________LINK FREE TEXT CHAT
       let free_chat=await channel.guild.channels.find(ch=>ch.name.startsWith('fch')); console.log('find free');
            if(!free_chat){
 let sv_name=await channel.name;await channel.edit({name:exports.e.under_limit}).catch(console.error);await delay(exports.e.delay_time);await channel.edit({name:sv_name}).catch(console.error);
             return;};
//__________________CREATE VOICE CHANNEL
        let new_channel=await channel.clone(name).catch(console.error);
        await new_channel.setBitrate(128).catch(console.error);
        let parent2 = await channel.guild.channels.get(exports.e.free_chat_category_id);
        if(parent2) {await new_channel.setParent(parent2.id).then(ch => { ch.lockPermissions(); }).catch(console.error);};
        await new_channel.setParent(channel.parentID).catch(console.error);
        await exports.voiceSetOwnerPermissions(client,member,new_channel).catch(console.error);
        await new_channel.overwritePermissions(new_channel.guild.defaultRole,{ VIEW_CHANNEL:null}).catch(console.error);

      let role_id = free_chat.name.match(/\d{1,}/)[0]; if(!role_id) return; console.log(role_id);
      let role = await free_chat.guild.roles.get(role_id); 
      if(!role) return; console.log('ch');
     //_____________________
        await free_chat.edit({topic:"ch:"+new_channel.id+" ow:"+member.user.id+" rl:"+role.id+" ud:0 opened:0 blocked:0",name:name}).catch(console.error);
        await free_chat.setParent(channel.parentID).catch(console.error);
        await exports.textSetPermissions1(client,member,free_chat);
        let msg = await free_chat.send(member+'`!хелп`-список команд \n');
        await module.exports.boots.parseTextChannels.run(client);//update chat`s structure
        await member.setVoiceChannel(new_channel).catch(console.error);
       return;
}catch(err){console.log(err);};};//exports.createNewVoice end
//______________sf03 reset
exports.reset=async(client,member,new_channel,free_chat,role)=>{try{ //triggered then new chat creating
        let parent1= new_channel.parentID;
        let parent2 = await new_channel.guild.channels.get(exports.e.free_chat_category_id);
        if(parent2) {await new_channel.setParent(parent2.id).then(ch => { ch.lockPermissions(); }).catch(console.error);};
        await new_channel.setParent(parent1).catch(console.error);
        await exports.voiceSetOwnerPermissions(client,member,new_channel).catch(console.error);
        await new_channel.overwritePermissions(new_channel.guild.defaultRole,{ VIEW_CHANNEL:null}).catch(console.error);
        await free_chat.setParent(parent2).then(ch => { ch.lockPermissions(); }).catch(console.error);
        await free_chat.setParent(parent1).catch(console.error);
        await exports.textSetPermissions1(client,member,free_chat);
        return;
}catch(err){console.log(err);};};//exports.createNewVoice end

exports.voiceSetOwnerPermissions=async(client,mmb,new_channel)=>{try{ //on voice chat create
await new_channel.overwritePermissions(mmb.user,{ MANAGE_CHANNELS: true,PRIORITY_SPEAKER:true,CONNECT:true,MOVE_MEMBERS:true
,USE_VAD:true,SPEAK:true,MOVE_MEMBERS:true}).catch(console.error);
let afk=await mmb.guild.channels.get(exports.e.afk_channel_id); 
if(!afk) return;await afk.overwritePermissions(mmb.user,{MOVE_MEMBERS:true}).catch(console.error);
}catch(err){console.log(err);};};

exports.voiceReSetOwnerPermissions=async(client,mmb,new_channel)=>{try{ //on voice chat create
await new_channel.overwritePermissions(mmb.user,{ MANAGE_CHANNELS: null,PRIORITY_SPEAKER:null,CONNECT:null,MOVE_MEMBERS:null
,USE_VAD:null,SPEAK:null,MOVE_MEMBERS:null}).catch(console.error);
}catch(err){console.log(err);};};


//_______________
exports.SetOwnerPermissions=async(client,mmb,voice_channel,text_channel)=>{try{ //on voice chat create
     await voice_channel.overwritePermissions(mmb.user,{VIEW_CHANNEL:true, MANAGE_CHANNELS: true,PRIORITY_SPEAKER:true,CONNECT:true,MOVE_MEMBERS:true
     ,USE_VAD:true,SPEAK:true,MOVE_MEMBERS:true}).catch(console.error);
     await text_channel.overwritePermissions(mmb.user,{VIEW_CHANNEL:true,SEND_MESSAGES:true}).catch(console.error);
     let afk=await mmb.guild.channels.get(exports.e.afk_channel_id); 
     if(!afk) return;await afk.overwritePermissions(mmb.user,{MOVE_MEMBERS:true}).catch(console.error);
}catch(err){console.log(err);};};

exports.ReSetOwnerPermissions=async(client,mmb,voice_channel,text_channel)=>{try{ //on voice chat create
     await voice_channel.overwritePermissions(mmb.user,{ MANAGE_CHANNELS: null,PRIORITY_SPEAKER:null,CONNECT:null,MOVE_MEMBERS:null
,USE_VAD:null,SPEAK:null,MOVE_MEMBERS:null}).catch(console.error);
     await text_channel.overwritePermissions(mmb.user,{VIEW_CHANNEL:null,SEND_MESSAGES:null}).catch(console.error);
}catch(err){console.log(err);};};
//_______________

exports.textSetPermissions1=async(client,mmb,free_chat)=>{try{ //on text chat create
          await free_chat.overwritePermissions(mmb.user,{VIEW_CHANNEL:true,SEND_MESSAGES:true}).catch(console.error);
          await free_chat.overwritePermissions(mmb.guild.defaultRole, { VIEW_CHANNEL: false }).catch(console.error);
}catch(err){console.log(err);};};


//______block
exports.onChatBlockPerms=async(client,text_chat,voice_chat)=>{try{ //on block
        //  await free_chat.overwritePermissions(mmb.user,{VIEW_CHANNEL:true,SEND_MESSAGES:true}).catch(console.error);
          await voice_chat.overwritePermissions(voice_chat.guild.defaultRole, { CONNECT: false }).catch(console.error);
          let role_visible=await voice_chat.guild.roles.find(r=>r.name==exports.e.sp_role_name); if(!role_visible) return; console.log('v b');
          await text_chat.overwritePermissions(role_visible, { VIEW_CHANNEL:null }).catch(console.error); console.log('blocked');
       //___move mmb to afk
	let afk=await voice_chat.guild.channels.get(exports.e.afk_channel_id);
	voice_chat.members.map(m=>{
		if(m&&m.id!=exports.voice_channels[voice_chat.id].owner_id&&m.voiceChannelID==voice_chat.id&&!m.roles.find(r=>r.name==exports.e.mod_role_name)) {
     			m.setVoiceChannel(afk.id)
            .then(() => console.log(`Moved ${m.displayName}`))
            .catch(console.error);;
		};
        });

//___
          return;
}catch(err){console.log(err);};};
//____
//______block
exports.onChatBlockPerms2=async(client,text_chat,voice_chat)=>{try{ //on block
        //  await free_chat.overwritePermissions(mmb.user,{VIEW_CHANNEL:true,SEND_MESSAGES:true}).catch(console.error);
          await voice_chat.overwritePermissions(voice_chat.guild.defaultRole, { CONNECT: false }).catch(console.error);
          let role_visible=await voice_chat.guild.roles.find(r=>r.name==exports.e.sp_role_name); if(!role_visible) return; console.log('v b');
          await text_chat.overwritePermissions(role_visible, { VIEW_CHANNEL:null }).catch(console.error); console.log('blocked');
     
	
	voice_chat.members.map(m=>{
		if(m&&m.id!=exports.voice_channels[voice_chat.id].owner_id&&m.voiceChannelID==voice_chat.id) {
     			voice_chat.overwritePermissions(m.user, { CONNECT:true })
            .then(() => console.log(`${m.displayName}`))
            .catch(console.error);;
		};
        });

//___
          return;
}catch(err){console.log(err);};};
//____
//______unblock
exports.onChatUnBlockPerms=async(client,text_chat,voice_chat)=>{try{ //on text chat block
        //  await free_chat.overwritePermissions(mmb.user,{VIEW_CHANNEL:true,SEND_MESSAGES:true}).catch(console.error);
          await voice_chat.overwritePermissions(voice_chat.guild.defaultRole, { CONNECT: true});
          let role_visible=await voice_chat.guild.roles.find(r=>r.name==exports.e.sp_role_name);
          await text_chat.overwritePermissions(role_visible, { VIEW_CHANNEL:true});
          return;
}catch(err){console.log(err);};};
//____
//______give access
exports.onGiveAccess=async(client,message,text_chat,voice_chat)=>{try{ //on text chat unblock
          let users_arr=message.mentions.users;
          users_arr.map(u=>{
              voice_chat.overwritePermissions(u, { CONNECT:true }).catch(console.error);
            //  text_chat.overwritePermissions(u, { VIEW_CHANNEL:true });
          });
          return;
}catch(err){console.log(err);};};
//______ungive access
exports.onUnGiveAccess=async(client,message,text_chat,voice_chat)=>{try{ //
          let users_arr=message.mentions.users;
          users_arr.map(u=>{
              voice_chat.overwritePermissions(u, { CONNECT:null}).catch(console.error);
            //  text_chat.overwritePermissions(u, { VIEW_CHANNEL:null});
          });
          return;
}catch(err){console.log(err);};};
//________
/*
exports.textSetPermissions2=async(client,mmb,free_chat,variable)=>{try{ //on text chan open
  
   let role_id=exports.text_channels[free_chat.id].voice_channel.role_id; if(!role_id){console.log('no role id'); return;};
   let role=await mmb.guild.roles.get(role_id); if(!role){console.log('no role'); return;};
   let role_visible=await mmb.guild.roles.find(r=>r.name==exports.e.sp_role_name); 
   if(variable=='close'){
      await free_chat.overwritePermissions(role,{VIEW_CHANNEL:null}).catch(console.error);
      if(role_visible) await free_chat.overwritePermissions(role_visible,{VIEW_CHANNEL:null});
      return;
   };
   await free_chat.overwritePermissions(role, { 
     VIEW_CHANNEL: true
     
    }).catch(console.error);
    if(!role_visible) return;
    await free_chat.overwritePermissions(role_visible, { 
     VIEW_CHANNEL: true
    
    }).catch(console.error);
    return;
}catch(err){console.log(err);}; };
*/

//_______________
//_________________
exports.getId=async(str1,str2)=>{try{ 
           return str1.exec(str2)[0].slice(3); 
}catch(err){console.log(err);};};

exports.record=async(client,channel_id,name,value)=>{try{ 
           if(!module.exports.channels[channel_id]) module.exports.channels[channel_id]={};
           module.exports.channels[channel_id][name]=value;
}catch(err){console.log(err);};};


exports.setPerms=async(client,message,args)=>{try{ 
        
    //let mmbs_arr=message.mentions.members.keyArray();
    if(!message.mentions) return;
    let m_c=message.content;
    let users_arr=message.mentions.users;
  let roles_arr=[];
    m_c=m_c.split(' '); m_c.shift(); m_c=m_c.join(" ");
    m_c=m_c.replace(/<@\u0021?\d{1,}>/g,"").trim();
let roles_name_arr=false;
console.log(m_c);
if(m_c.indexOf(',')!=-1&&m_c.length>0){
   let str = m_c.split(','); roles_name_arr=str;
}else{roles_name_arr=[m_c.trim()];}
  console.log(m_c);
  //
   //let roles_name_arr=(m_c.length>0)?m_c.split('[')[1].split(']')[0]:false;
 if(roles_name_arr){
 //roles_name_arr=(roles_name_arr.indexOf(',')!=-1)?roles_name_arr.split(","):[roles_name_arr];//};
 //  console.log(roles_name_arr);
  
await roles_name_arr.map(rname=>{
        let role=message.guild.roles.find(r=>r.name.toLowerCase()==rname.toLowerCase().trim());
        if(role&&role.name!="Супермодератор") roles_arr.push(role);
   });
                   };
   //__
    let afk=message.guild.channels.get(exports.e.afk_channel_id);
    let obj={размут:'+',разбан:'++','мут':'-','бан':'--'};
    for(let key in obj){
     let a = new RegExp(key);
     args[1]=args[1].replace(a,obj[key]); 
    };
// };
   
     async function setPerms(item_mmb,args){
//___________text
      if(args[1]=='-текст'){//mute on text channel
        await message.channel.overwritePermissions(item_mmb, { SEND_MESSAGES:false}).catch(err=>console.log(err));
        return;
     }else if(args[1]=='--текст'){//ban on text channel
        await message.channel.overwritePermissions(item_mmb, { VIEW_CHANNEL:false}).catch(err=>console.log(err));
        return;
     }else if(args[1]=='+текст'){//unban on text channel
        await message.channel.overwritePermissions(item_mmb, { SEND_MESSAGES:true,VIEW_CHANNEL:null}).catch(err=>console.log(err));
        return;
     }else if(args[1]=='++текст'){//unmute on text channel
        await message.channel.overwritePermissions(item_mmb, { VIEW_CHANNEL:null}).catch(err=>console.log(err));
        return;
     }else if(args[1]=='+++текст'){//unmute on text channel
        await message.channel.overwritePermissions(item_mmb, {VIEW_CHANNEL:null,SEND_MESSAGES:true}).catch(err=>console.log(err));
        return;
     };;
//_____________voice    
     let voice_channel=await message.guild.channels.get(exports.text_channels[message.channel.id].voice_channel.id); if(!voice_channel) return;
     if(args[1]=='-войс'){//mute on voice channel
        await voice_channel.overwritePermissions(item_mmb, { SPEAK:false}).then(exports.p.r(message,'muted',0,item_mmb)).catch(err=>console.log(err));
        return;
     }else if(args[1]=='--войс'){//ban on voice channel
        await voice_channel.overwritePermissions(item_mmb, { CONNECT:false}).then(exports.p.r(message,'banned',0,item_mmb)).catch(err=>console.log(err));
        if(item_mmb.username&&voice_channel.members.get(item_mmb.id)) {await message.guild.members.get(item_mmb.id).setVoiceChannel(afk).catch(console.error);};
        return;
     }else if(args[1]=='+войс'){//unmute on voice channel
        await voice_channel.overwritePermissions(item_mmb, { SPEAK:null,CONNECT:null}).then(exports.p.r(message,'unmuted',0,item_mmb)).catch(err=>console.log(err));
        return;
     }else if(args[1]=='++войс'){//unban on voice channel
       await voice_channel.overwritePermissions(item_mmb, { CONNECT:null}).then(exports.p.r(message,'unbanned',0,item_mmb)).catch(err=>console.log(err));
       return;
     }else if(args[1]=='+++войс'){//unban on voice channel
       await voice_channel.overwritePermissions(item_mmb, { CONNECT:true,SPEAK:true}).then(exports.p.r(message,'accessed',0,item_mmb)).catch(err=>console.log(err));
       return;
     };
//______________
     if(args[1]=='--'){//ban on text and voice channels
        await setPerms(item_mmb,['','--войс']);  return;
     }else if(args[1]=='-'){//mute on text and voice channels
        await setPerms(item_mmb,['','-войс']);  return;
    }else if(args[1]=='+++'){//unban on text and voice channels
       await setPerms(item_mmb,['','+++войс']);  return
     }else if(args[1]=='++'){//unban on text and voice channels
       await setPerms(item_mmb,['','++войс']);  return;
     }else if(args[1]=='+'){//unmute on text and voice channels
       await setPerms(item_mmb,['','+войс']);  return;
     };

//_______
};

   if (roles_arr) roles_arr.map(u=>setPerms(u,args));
   if (users_arr) users_arr.map(u=>{ if(u.id!=message.member.user.id&&u.id!=client.user.id&&!message.guild.members.get(u.id).roles.find(r=>r.name==exports.e.mod_role_name)&&u.id!=message.guild.owner.id){setPerms(u,args);} });
 return;
}catch(err){console.log(err);};};
