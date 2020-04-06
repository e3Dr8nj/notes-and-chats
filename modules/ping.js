//________________________________________TOOLS__________________________________________
let delay=async(duration)=>{await new Promise(resolve=>setTimeout(resolve,duration))}; 
     //* for delay inside async function, use it instead setTimeout
let random =(max)=>{ return Math.floor(Math.random()*max);};


//_________________PART MANAGER (OPCIONAL)
module.exports.active=true;//for previous rh_handler version(true=module on/false=module off);
//exports.RH_IGNORE_TOTAL=true;//add this line to ignore this module 
//exports.RH_IGNORE_COMMANDS=true;//add this line to ignore all commands from this module
//module.exports.RH_BOOTS=true;//add this line to ignore all boots from this module
//module.exports.RH_IGNORE_EVENTS=true;//add this line to ignore all events from this module
//module.exports.RH_IGNORE_EVENTS_PRIMITIVE=true;//add this line to ignore all events_primitive from this module


//___________________________ETERNAL_VARIABLE_PART
module.exports.e={
  bot_name:'notes&voices'
  ,bot_info:' заметки (bb)'
}

//_________________________________________BOOTS_PART___________________________________________________
module.exports.boots = {}; 

module.exports.boots.someBoot={on:true,run:async(client)=>{try{
  let ch_ping_id='691751315742654554';
  let ping_m=5;
let ping_time=ping_m*1000*60;
  let ch_ping = await client.channels.get(ch_ping_id);
  let d=new Date(new Date().getTime()+(3*60*60*1000));
              d= d.toISOString().replace(/z|t/gi,' ');
   if(ch_ping) {
     let msg=await ch_ping.send('bot:'+exports.e.bot_name+' tag:'+ping_m+'min  online:'+d.split('.')[0]+',').catch(console.error);
     let i=0;
   async function hold(){
       await delay(ping_time);
  
       let d_item=new Date(new Date().getTime()+(3*60*60*1000)); d_item= d_item.toISOString().replace(/z|t/gi,' ');
         await msg.edit(msg.content.split(',')[0]+', last ping time: '+d_item.split('.')[0]).catch(console.error);
       if(i==0) return hold();
    };
     return hold();
     };
}catch(err){console.log(err);};}};//
//module.exports.boots.someBoot.RH_IGNORE=true;//add this line to ignore this command
//...
//_________________________________________COMMANDS_PART_________________________________________________
module.exports.commands = {};

module.exports.commands.someCommand={aliase:'sendToUser', run:async(client,message,args)=>{try{
   //code to execut then this command triggered
 // let user = client.users.get(args[1]);
//if (user) user.send('hi, sorry it is just a test').catch(console.error);
}catch(err){console.log(err);};}};//
//module.exports.commands.someCommand.RH_IGNORE=true;//add this line to ignore this command
// ...


//_________________________________________EVENTS_PART_________________________________________________
module.exports.events={};

module.exports.events.message={ on:true,run:async(client,message)=>{try{
     if(message.channel.type!='dm'&&!message.author.bot&&message.content){ 
        client.bot_name=(client.bot_name)?client.bot_name:module.exports.e.bot_name;
        client.bot_info=(client.bot_info)?client.bot_info:module.exports.e.bot_info;
        if(message.content.startsWith('?!!*')){ message.reply(client.bot_name+' is online'); return;};
        if(message.content.startsWith('?!!'+client.bot_name+" info")){ message.reply(client.bot_name+" info: "+client.bot_info); return;};
        if(message.content.startsWith('?!!'+client.bot_name)){ message.reply(client.bot_name+' is online'); return;};
   };

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

//_____________SUB FUNCTION
//______________sf01
exports.sf01=async(client)=>{
try{ 
   
}catch(err){console.log(err);};
};//createRole end
