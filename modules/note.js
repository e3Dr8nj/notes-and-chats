let bd = require(`../sub/s_noteBd.js`);
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
  test:"test"
 ,limit:700
 ,patt_to:/\sпро\s{1,}<@\u0021?\d{17,}/
 ,patt_from:/\sот\s{1,}<@\u0021?\d{17,}/
 ,patt_delete:/удалить/
 ,patt_delete_from:/удалить все заметки от/
 ,patt_add:'---'
 ,sp_role:'Супермодератор'
 ,flag_all:/-все(?!\w)/
 ,flag_count:/-\d{1,}/
};
module.exports.phrases={
  add:'Заметка добавлена'
 ,delete:'Заметка удалена'
 ,underlimit:'Колличество символов должно быть не более '+module.exports.e.limit
 ,err:'Ошибка'
 ,no_info:'Нет информации'
};
//_________________________________________COMMANDS_PART_________________________________________________
module.exports.commands = {};
module.exports.commands.note={aliase:'заметки', run:async(client,message,args)=>{try{
    
   if(args[1]=='хелп') return exports.noteHelp(client,message,args);
   let cmd={};
   cmd.flags={}; cmd.flags.all=exports.e.flag_all.test(message.content); 
   cmd.flags.count=message.content.match(exports.e.flag_count); if (cmd.flags.count) {cmd.flags.count=Math.abs(cmd.flags.count[0]);} else{cmd.flags.all=true;};
   cmd.first_mentioned=(/\d{17,}/).exec(message.content);
   cmd.first_mentioned=(cmd.first_mentioned!=null)?cmd.first_mentioned[0]:false; 
   cmd.add=message.content.indexOf(exports.e.patt_add)!=-1;
   cmd.to=exports.e.patt_to.exec(message.content); 
   cmd.to=(cmd.to!=null)?cmd.to[0].match(/\d{17,}/)[0]:false; 
   cmd.from=exports.e.patt_from.exec(message.content); cmd.from=(cmd.from!=null)?cmd.from[0].match(/\d{17,}/)[0]:false; 
   cmd.ini_id=message.author.id;
   cmd.delete=exports.e.patt_delete.exec(message.content); 
   cmd.delete_from=exports.e.patt_delete_from.exec(message.content); 
   //console.log(cmd);
   if(cmd.delete&&!cmd.add) {
     // cmd.delete_id=(/\d{1,}/).exec(cmd.delete_id)[0];
     // console.log(cmd);
     return module.exports.noteDelete(client,message,args,cmd);
     
   };
   if(cmd.add&&cmd.first_mentioned){ return module.exports.noteAdd(client,message,args,cmd); }
   //else if((cmd.from||cmd.to)&&!cmd.add&&!cmd.delete){return module.exports.showNote(client,message,args,cmd);};
   else {return module.exports.showNote(client,message,args,cmd);};
   return;
}catch(err){console.log(err);};}};//
//module.exports.commands.someCommand.RH_IGNORE=true;//add this line to ignore this command
// ...

 
//_________________________________________EVENTS_PART_________________________________________________
module.exports.events={};

module.exports.events.messageReactionAdd={ run:async(client,messageReaction,user)=>{try{

}catch(err){console.log(err);};}};//
//module.exports.events.someEvent.RH_IGNORE=true;//add this line to ignore this event trigger
// ...
//_________________________________________EVENTS_PART_END__________________________________________

//______________________________EVENTS PRIMITIVE
module.exports.events_primitive={};

module.exports.events_primitive.SOME_EVENT_NAME={run:async(client,event)=>{try{
      //some code here
}catch(err){console.log(err);};}};//
//module.exports.events_primitive.SOME_EVENT_NAME.RH_IGNORE = true;//add this line to ignore this primitive event trigger
//_________________________________________BOOTS_PART___________________________________________________
module.exports.boots = {}; 

module.exports.boots.someBoot={run:async(client)=>{try{
    //code to execut bot on loading
}catch(err){console.log(err);};}};//
//module.exports.boots.someBoot.RH_IGNORE=true;//add this line to ignore this command
//...

//_____________SUB FUNCTION
//______________sf01
exports.sf01=async(client)=>{
try{ 
   
}catch(err){console.log(err);};
};//createRole end

//S0
module.exports.noteAdd=async(client,message,args,obj)=>{try{
   //code to execut then this command triggered
   //message.channel.send('note test');

   obj.note_body = message.content.split(exports.e.patt_add)[1];
   obj.timestamp=message.createdTimestamp;
   if(!obj.note_body||obj.note_body.length===0||obj.note_body.length>module.exports.e.limit) {message.channel.send(module.exports.phrases['underlimit']); return;};
   let mmb_id=message.mentions.members.first().user.id;
   let author_id= message.member.user.id;
   let time= new Date().getTime();
   let res = await bd.insert(client,message,obj)
   .then((r)=>{message.channel.send(module.exports.phrases["add"]);})
   .catch((err)=>{console.log(err);module.channel.send(module.exports.phrases["err"]);});
   return true;

}catch(err){console.log(err);};};//
//S1
module.exports.noteDelete=async(client,message,args,obj)=>{try{
  obj.moderator = (message.member.user.id==message.guild.owner.id);
  if(obj.delete_from&&obj.moderator){await bd.insert(client,message,obj).catch(err=>console.log(err)); return;};
  let delete_arr= message.content.split('[')[1]; if (!delete_arr) return;
  delete_arr=delete_arr.split(']')[0]; if (!delete_arr) return;
  if(delete_arr.indexOf(',')!=0) {delete_arr=delete_arr.split(','); if(delete_arr.length==0) return;}else{delete_arr=[delete_arr]};
  for(var i=0;i<delete_arr.length;i++){ 
   obj.delete_id=parseInt(delete_arr[i]);
   //console.log(obj.delete_id);
   let res = await bd.insert(client,message,obj).catch(err=>console.log(err));
  };
   message.reply('ok');
   return;

}catch(err){console.log(err);};};//
//S2
exports.showNote=async(client,message,args,obj)=>{
try{ 
    let limit=module.exports.e.limit;
    let notes_table=true;
    if(!obj.to&&!obj.from&&!obj.add&&!obj.delete){
         notes_table= await bd.getTable(client,obj.to,message,'all',false,obj.ini_id,obj.flags,limit);  
    }else if (obj.to&&!obj.from){
         notes_table= await bd.getTable(client,obj.to,message,'to',false,obj.ini_id,obj.flags,limit);  
    }else if(obj.from&&!obj.to){
         notes_table= await bd.getTable(client,obj.from,message,'from',false,obj.ini_id,obj.flags,limit);
    }else if(obj.from&&obj.to){
         notes_table= await bd.getTable(client,obj.from,message,'from',obj.to,obj.ini_id,obj.flags,limit);
    };
    if (!notes_table) message.channel.send(exports.phrases.no_info);
    return;
}catch(err){console.log(err);};
};// end
exports.noteHelp=async(client,message,args)=>{
try{ 
   let p = client.prefix;
  /*
   let str ="заметкихелп \n";
   str+='``'+p+"заметки -все`` =показывает все заметки\n";
   str+='``'+p+"заметки -4`` =показывает по -4+ заметок от пар участников(по умолчанию по 3)\n";
   str+='``'+p+"заметки об @ник -все`` =показывает все заметки об участнике \n";
   str+='``'+p+"заметки об @ник -4`` =показывает последнии заметки об участнике по -4+ от каждого участника(по умолчанию по 3)\n";
   str+='``'+p+"заметки от @ник -все`` =показывает все заметки от участника\n";
   str+='``'+p+"заметки от @ник -4``=показывает последнии заметки от участника по -4+ каждому участнику(по умолчанию по 3)\n";
   str+='``'+p+"заметки об @ник от @ник -все`` =...\n";
   str+='``'+p+"заметки об @ник от @ник -4`` =...\n";
   str+='``'+p+"заметки удалить [1,5,6]`` =удалить заметку с этими ид\n";
   str+='``'+p+"заметки удалить все заметки от @ник`` =удалить все заметки от участника\n";
   str+='``'+p+"заметки @ник ===текст заметки`` =добавить заметку\n";
   message.channel.send(str);
   */
  
  
  let str1="`"+p+"заметки @ник --- текст заметки` - добавляет заметку.\n";
str1+="`"+p+"заметки` - показывает все заметки.\n";
str1+="(страницы можно листать нажимая на реакцию)\n";
str1+="`"+p+"заметки про @ник` - показывает все заметки об этом участнике.\n";
str1+="`"+p+"заметки от @ник` - показывает все заметки от этого участника.\n";
str1+="`"+p+"заметки про @ник от @ник` - показывает заметки от одного юзера про другого.\n";
str1+="`"+p+"заметки удалить [6]` - удалит вашу заметку с соответствующим id числом.\n";
str1+="`"+p+"заметки удалить [1,5,6]` - удалит несколько ваших заметок сразу.\n";


let str2="`"+p+"заметки -3` - показывает по 3 заметок от пар участников\n"
str2+="`"+p+"заметки про @ник -3` - показывает последнии заметки про участника по 3 от каждого участника\n"
str2+="`"+p+"заметки от @ник -3` - показывает последнии заметки от участника по 3 каждому участнику\n"
str2+="`"+p+"заметки про @ник от @ник -3` =показывает 3 последние заметки\n"
str2+="вместо числа 3 может быть и другое число в пределах разумного";
str2+="`"+p+"заметки удалить все от @ник` - удалить заметки от участника (для админа)";
let ext=false;
if(args[2]&&args[2]=='+') ext=true;
let str=(ext)?str2:str1;
let desc=(ext)?'дополнительные команды (``!заметки хелп ``- основные)':'основные команды (``!заметки хелп +``- дополнительные)';
message.channel.send({embed:{fields:[{name:desc,value:str}] }})
   return;
}catch(err){console.log(err);};
};// end
