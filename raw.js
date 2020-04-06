//raw v1.1.2
exports.external_module=[];
exports.log=true;
exports.dm_commands=false;
exports.prefix='!';
exports.fetch_members=true;
exports.fetch_messages=true;
exports.server_id='';
exports.boots=true;
exports.commands=true;
exports.events=true;
exports.primitive_events=true;

exports.delay=async(duration)=>{ return new Promise((resolve)=>{return setTimeout(resolve,duration)}); };

exports.commands={};

exports.run = async(client,event)=>{try{
  client.events_primitive=(client.events_primitive)?client.events_primitive:{};
  if(event.t){
     //console.log(event.t);
  };
  if(client.events_primitive[event.t]){
     client.events_primitive[event.t].map(f=>f.run(client,event));
   };// 

  if(event.t=='READY'){ 
      await module.exports.delay(1000);
      await module.exports.onGuildCreate(client);return;
  };

  if(event.t =='MESSAGE_CREATE'){
      return module.exports.onMessage(client,event.d);
   };

  return;
}catch(err){console.log(err);};};//exports.run end

//____________________________________ON_GUILD_CREATE__________EVENT

 module.exports.onGuildCreate=async(client)=>{try{
   client.rh=(client.rh)?client.rh:{commands:[]};
  
   client.rh.delay=async(duration)=>{await new Promise(resolve=>setTimeout(resolve,duration))}; 
   
   if(!module.exports.folder_name) return console.log('RH_folder_name needed be set');
   //const folder_name=(module.exports.folder_name)?module.exports.folder_name:'rh_modules';
   const folder_name = module.exports.folder_name;
   if (module.exports.log) console.log('RH loading modules from '+folder_name);
   await exports.delay(1000);
   
   module.exports.server_id=(!module.exports.server_id)?client.SERVER_ID:module.exports.server_id;

   if(!!module.exports.server_id&&exports.fetch_members) await module.exports.fetchMembers.run(client,module.exports.server_id);
    if(!!module.exports.server_id&&module.exports.fetch_messages) await module.exports.fetchMessages.run(client,module.exports.server_id);
/*
    await module.exports.setBoot(client,folder_name,'folder');
    await module.exports.setBoot(client,folder_name,'external');
    await module.exports.setCommand(client,folder_name,'folder');
    await module.exports.setCommand(client,folder_name,'external');
    await  module.exports.setEvent(client,folder_name,'folder'); 
    await  module.exports.setEvent(client,folder_name,'external');
    await  module.exports.setEvent_primitive(client,folder_name,'folder'); 
    await  module.exports.setEvent_primitive(client,folder_name,'external');
*/
   await module.exports.load_all(client,folder_name);
//___---
                 // await module.exports.test2(client,folder_name,'folder');//nn
//____--
}catch(err){console.log(err)};};//
//____________________________________________________________

//______________________________________________ON_MESSAGE___EVENT

exports.onMessage=async(client,event_d)=>{try{

   if(event_d.author.id==client.user.id){return;}; 
   let channel=client.channels.get(event_d.channel_id);
   if(channel.type=='dm'){if (module.exports.dm_commands==false) return;};//
   let message = await channel.fetchMessage(event_d.id).then(collected=>{return collected;});
   let args = message.content.slice(module.exports.prefix.length).trim().split(/ +/g);
   let cmd_name = args[0];

  
  if(client.rh.commands[cmd_name]){
   
      if(message.author==client.user) return;
      client.rh.commands[cmd_name].map(f=>f.exe(client,message,args));
      return;
  };

}catch(err){console.log(err);};};//onMessage end
//_________________________________________________________________________
//___________________---
module.exports.test2=async(client,path,from)=>{try{
   await exports.delay(1000);
/*
   if(from=='external'){
        module.exports.external_module.map(m=>module.exports.sb0(client,m,'..external..',m.name));
        return;
   };//if external end
*/
   let fs = require('fs');
   fs.readdir(path+"/", (err, files) => {try{
  //    if (err) return console.error(err);

    files.forEach(file => {try{
            let target_module = require(`${path}/${file}`);
            let stats=fs.statSync(file);
            console.log("file is dir "+stats.isDirectory());
           // let moduleName = file.split(".")[0];
           // module.exports.sb0(client,target_module,path,moduleName);
     }catch(err){console.log(err);};});//forEachfile end
    
}catch(err){  console.log(err);};
});//boot end
//--------------------
  return;
}catch(err){console.log(err)};};//setModuleBoot end
//_________--------------------------

//_____________________________BOOT___
//_________________SET_BOOT
module.exports.setBoot=async(client,path,from)=>{try{
   await exports.delay(1000);
   if(from=='external'){
        module.exports.external_module.map(m=>module.exports.sb0(client,m,'..external..',m.name));
        return;
   };//if external end
   let fs = require('fs');
   fs.readdir(path+"/", (err, files) => {try{
  //    if (err) return console.error(err);

    files.forEach(file => {try{
            let target_module = require(`${path}/${file}`);
            let moduleName = file.split(".")[0];
            module.exports.sb0(client,target_module,path,moduleName);
     }catch(err){console.log(err);};});//forEachfile end
    
}catch(err){  console.log(err);};
});//boot end
//--------------------
  return;
}catch(err){console.log(err)};};//setModuleBoot end
//____________________sb0

module.exports.sb0=async(client,target_module,path,moduleName)=>{try{
     
                        
             if(!target_module.RH_IGNORE_TOTAL&&!!target_module.boots&&!target_module.RH_IGNORE_BOOTS){
                  for(let key in target_module.boots){ 
                      if(!target_module.boots[key].RH_IGNORE){
                            path=(path)?path:'...'; moduleName=(moduleName)?moduleName:'...';
                            if(module.exports.log) console.log('BOOT EXE .../'+path+'/'+moduleName+'/'+key);
                            target_module.boots[key].run(client);
                     };//if boot is on end
                  };//for end
            
             };//if target_module is active

}catch(err){console.log(err)};};
//________________________________________________
//________________________________COMMAND_________
//_________________SET_COMMANDS
module.exports.setCommand=async(client,path,from)=>{try{
   if (!module.exports.commands) return;
   await exports.delay(1000);
  // if(from=='one'){};
   if(from=='external') {
     module.exports.external_module.map(m=>module.exports.sc0(client,m,'..external..',m.name));
     return;
   };//if external end
   let fs = require('fs');

  fs.readdir(path+"/", (err, files) => {try{
   //if (err) return console.error(err);
    files.forEach(file => {try{ 
            let target_module = require(`${path}/${file}`);
            let moduleName = file.split(".")[0];
           module.exports.sc0(client,target_module,path,moduleName);
     }catch(err){console.log(err);};});//forEach end

}catch(err){console.log(err);};
});//event trigger
//--------------------
}catch(err){console.log(err)};};//setCommand end
//____________________sc0

module.exports.sc0=async(client,target_module,path,moduleName)=>{try{
        if(!target_module.RH_IGNORE_TOTAL&&!!target_module.commands&&!target_module.RH_IGNORE_COMMANDS){    
                        let aliase='';
                       for(let key in target_module.commands){
                             let commandName = key; 
                             if(!target_module.commands[key].RH_IGNORE){
                                 if(!!target_module.commands[key].aliase){
                                   commandName=target_module.commands[key].aliase.slice();
                                 //
                     
                                 
//
                                 };//if!!
                          
                                 (client.rh)?{}:client.rh={};
                                 (client.rh.commands)?{}:client.rh.commands={};
                                 client.rh.commands[commandName]=(client.rh.commands[commandName])?client.rh.commands[commandName]:[];
                                 let cmd = {exe:target_module.commands[key].run};
                                 client.rh.commands[commandName].push(cmd);

                                 path=(path)?path:'...'; moduleName=(moduleName)?moduleName:'...';
                                 if(module.exports.log) console.log('COMMAND SET.../'+path+'/'+moduleName+'/'+commandName);
                             };//if on is true;
                      };//for end
                  };//module is not ignored

}catch(err){console.log(err)};};

//_____________________________________EVENT
//_____________________SET_EVENTS
module.exports.setEvent=async(client,path,from)=>{try{
   if(!module.exports.events) return;
   await exports.delay(1000);
   let fs = require('fs');
   if(from=='external'){
        module.exports.external_module.map(m=>module.exports.se0(client,m,'..external..',m.name));
        return;
   };//if external end
   fs.readdir(path+"/", (err, files) => {try{
      if (err) return console.error(err);
      files.forEach(file => {try{
            let target_module = require(`${path}/${file}`);
            let moduleName = file.split(".")[0];
            module.exports.se0(client,target_module,path,moduleName);
        }catch(err){console.log(err);};});//if end
   }catch(err){console.log(err);};});//event trigger
  
}catch(err){console.log(err)};};//setModuleEvents end
//____________________se0

module.exports.se0=async(client,target_module,path,moduleName)=>{try{
         
          
               if(!target_module.RH_IGNORE_TOTAL&&!!target_module.events&&!target_module.RH_IGNORE_EVENTS){
                  for(let key in target_module.events){  
                      if(!target_module.events[key].RH_IGNORE){
                            client.on(key, (...args) => target_module.events[key].run(client, ...args));
                             path=(path)?path:'...'; moduleName=(moduleName)?moduleName:'...';
                            if(module.exports.log) console.log('EVENT SET .../'+path+'s/'+moduleName+'/'+key);
                        };//if on end
                  };//for key
               };//if module is active

}catch(err){console.log(err)};};

//_____________________________________EVENT_PRIMITIVE
//_____________________SET_EVENTS
module.exports.setEvent_primitive=async(client,path,from)=>{try{
   if(!module.exports.primitive_events) return;
   await exports.delay(1000);
   let fs = require('fs');
    if(from=='external'){
        module.exports.external_module.map(m=>module.exports.sep0(client,m,'..external..',m.name));
        return;
   };//if external end
   fs.readdir(path+"/", (err, files) => {try{
      if (err) return console.error(err);
      files.forEach(file => {try{
            let target_module = require(`${path}/${file}`);
            let moduleName = file.split(".")[0];
            module.exports.sep0(client,target_module,path,moduleName);
       }catch(err){console.log(err);};});//if end
   }catch(err){console.log(err);};});//event trigger
  
}catch(err){console.log(err)};};//setModuleEvents end

//____________________sep0

module.exports.sep0=async(client,target_module,path,moduleName)=>{try{
         
          
               if(!target_module.RH_IGNORE_TOTAL&&!!target_module.events_primitive&&!target_module.RH_IGNORE_EVENTS_RIMITIVE){
                  for(let key in target_module.events_primitive){  
                      if(!target_module.events_primitive[key].RH_IGNORE){
                            if(!client.events_primitive[key]) client.events_primitive[key]=[];
                            client.events_primitive[key].push(target_module.events_primitive[key]);
                            
                            path=(path)?path:'...'; moduleName=(moduleName)?moduleName:'...';
                            if(module.exports.log) console.log('EVENT  PRIMITIVE SET .../'+path+'/'+moduleName+'/'+key);
                        };//if on end
                  };//for key
             
            };//if module is active

}catch(err){console.log(err)};};

//____________fetchMessages
module.exports.fetchMessages={ on:true,  run:async(client,id)=>{try{
     if(!module.exports.fetch_messages) return;
     if(module.exports.log) console.log('fetching messages');
           let ch_ids=[];
           let server = client.guilds.get(id);
           if(!server) return;
           server.channels.map(ch=>{
             // console.log('from channel '+ch.name);
              ch_ids.push(ch.id);
            });//
            // console.log(ch_ids);
            for(let i=0;i<ch_ids.length;i++){
                   let channel =  await server.channels.get(ch_ids[i]); 
                  
                   if (channel.type=='category'||channel.type==='voice') {continue;};  
                   if(module.exports.log) console.log('fetch messages from  '+server.name+'/'+channel.name);
                   let msg_arr =  await channel.fetchMessages({limit:100}).then(messages=>{
                               return messages;
                   }).catch(err=>console.log(err.message));
         };//
        await module.exports.delay(1000);
        return;

}catch(err){console.log(err);};}};//

//____________fetchMembers
module.exports.fetchMembers={ on:true,  run:async(client,id)=>{try{
     if (!module.exports.fetch_members) return;
     let server=await client.guilds.get(module.exports.server_id);
      if(!server) return;
      if(module.exports.log) console.log('Fetching members from server '+server.name);
            await server.fetchMembers()
              .then()
              .catch(console.error);
      return;

}catch(err){console.log(err);};}};//

//____________test
module.exports.test={ on:true,  run:async()=>{try{
        
      let str='RH test';
      return str;

}catch(err){console.log(err);};}};//
//-------------------
module.exports.load_all=async(client,folder_name)=>{try{
         
    await module.exports.setBoot(client,folder_name,'folder');
    //await module.exports.setBoot(client,folder_name,'external');
    await module.exports.setCommand(client,folder_name,'folder');
   // await module.exports.setCommand(client,folder_name,'external');
    await  module.exports.setEvent(client,folder_name,'folder'); 
   // await  module.exports.setEvent(client,folder_name,'external');
    await  module.exports.setEvent_primitive(client,folder_name,'folder'); 
   // await  module.exports.setEvent_primitive(client,folder_name,'external');
               
}catch(err){console.log(err)};};

