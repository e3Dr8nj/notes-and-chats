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
  channel_log_name:'logbot'
  ,bot_name:'2_bot'
  ,bot_info:'info'
  ,request:'?x00'
  ,feedback:'!z00'

  //,ch_ping_id:'691751315742654554'
}

//_________________________________________BOOTS_PART___________________________________________________
module.exports.boots = {}; 
module.exports.boots.someBoot1={on:true,run:async(client)=>{try{
  client.feedback=exports.e.feedback;
  let ch = await client.channels.find(ch=>ch.name==exports.e.channel_log_name);
  if(!ch) return;
  await ch.send(exports.e.request+exports.e.bot_name).catch((err)=>{console.error});
  const filter = m => m.content.startsWith(exports.e.feedback+exports.e.bot_name) ;
  let res = await ch.awaitMessages(filter, { max: 1, time: 10000, errors: ['time'] })
  .then(collected => {return collected;})
  .catch(err=>console.log(err));
  
 if(res&&res.size!=0) {await ch.send('rebooted');
            return process.exit(1);
           };
}catch(err){console.log(err);};}};//


//module.exports.boots.someBoot.RH_IGNORE=true;//add this line to ignore this command
//...
//_________________________________________COMMANDS_PART_________________________________________________
module.exports.commands = {};

module.exports.commands.reboot={aliase:'rbt', run:async(client,message,args)=>{try{
   //code to execut then this command triggered
  console.log(args);
  if(args[1]!=exports.e.bot_name) return;
  await message.channel.send('reboot'); return process.exit(1);
}catch(err){console.log(err);};}};//
//module.exports.commands.someCommand.RH_IGNORE=true;//add this line to ignore this command
// ...


//_________________________________________EVENTS_PART_________________________________________________
module.exports.events={};

module.exports.events.message={ on:true,run:async(client,message)=>{try{
 
     if(message.channel.type=='dm') return;
     if(message.content.startsWith(exports.e.request+exports.e.bot_name)){
       message.channel.send(exports.e.feedback+exports.e.bot_name);
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

