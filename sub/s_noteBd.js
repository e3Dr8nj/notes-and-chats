let delay=async(duration)=>{await new Promise(resolve=>setTimeout(resolve,duration))}; 

exports.RH_IGNORE_TOTAL=true;
exports.name='s_bumpTopBD';
const fs = require('fs');
const sqlite = require(`../sub/aa-sqlite`);
exports.system={
     DATA_BASE_NAME:'notes_bd.bd',
     TABLE_NAME:'table201'
};
exports.e={
   table_title:'======TOP===='
   ,max_note_len:700//100...1500
};
exports.quiz_types=['!bump','s.up'];
let errors={
'01':'error:колличество символов больше '+exports.e.max_note_len
};

//________________________________INSERT INTO TABLE

exports.insert= async(client,message,obj)=>{

try{ console.log('insert ini');
   // if(m_c_.length>exports.e.max_note_len) {return message.channel.send(errors['01']);};
    let t=new Date().getTime();
    
    const DATA_BASE_NAME=module.exports.system.DATA_BASE_NAME;
    const TABLE_NAME = module.exports.system.TABLE_NAME;
    await sqlite.open(`./${DATA_BASE_NAME}`).catch(err=>console.log(err));
    //console.log('open db');
   
//for deletion  
    let resolve=false; 
if(obj.delete_from&&obj.first_mentioned){
    
 
     resolve = await sqlite.run(`DELETE FROM ${TABLE_NAME} WHERE a_i==${obj.first_mentioned} `)
     .then(table=>{return true;}).catch(err=>{console.log(err);return false;});
  
   return resolve;
};
if(obj.delete&&obj.delete_id){
  
  if(obj.moderator){
     resolve = await sqlite.run(`DELETE FROM ${TABLE_NAME} WHERE id==${obj.delete_id} `)
     .then(table=>{return true;}).catch(err=>{console.log(err);return false;});
   }else{
      resolve = await sqlite.run(`DELETE FROM ${TABLE_NAME} WHERE id==${obj.delete_id} AND a_i==${obj.author} `)
     .then(table=>{;return true;}).catch(err=>{console.log(err);return false;});
    };
   return resolve;
};
//for addition
    let m_id_=obj.first_mentioned;
    let a_id_=obj.author;
    let m_c_=obj.note_body;
    m_c_=m_c_.replace(/'/g,"`");
    let t_=obj.timestamp;

 resolve = await sqlite.run(`INSERT INTO ${TABLE_NAME} (m_i,a_i,m_c,t,arch) VALUES('${m_id_}','${a_id_}','${m_c_}','${t_}',0)`)
     .then(table=>{console.log('insert');return true;})
     .catch(err=>{console.log(err); return false;});
   if(!resolve){
        resolve = await sqlite.run(`CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (m_i TEXT,a_i TEXT,m_c TEXT,t TEXT,id INTEGER PRIMARY KEY,arch INTEGER)`)
       .then(()=>{console.log('table created');return true;}).catch((err)=>{console.log(err);return false;});
       if(resolve){    
            resolve= await sqlite.run(`INSERT INTO ${TABLE_NAME} (m_i,a_i,m_c,t,arch) VALUES('${m_id_}','${a_id_}','${m_c_}','${t_}',0)`)
            .then(()=>{console.log('insert data notes'); return true;})
            .catch(err=>{console.log(err);return false;});
        };
   };//resolve end
 // let table = await sqlite.all(`SELECT * FROM ${TABLE_NAME}`).then(table=>{return table;}).catch(err=>{console.log(err);});
  //console.log(table);
        return resolve;
}catch(err){console.log(err)};
};//exports.insert end

//________________________________
exports.getTable= async(client,m_id,message,selector,m_id2,ini_id,flags,limit)=>{
//system
try{
    let mmb = message.guild.members.get(m_id); 
    let t_crnt=new Date().getTime();
    const DATA_BASE_NAME=module.exports.system.DATA_BASE_NAME;
    const TABLE_NAME = module.exports.system.TABLE_NAME;
    await sqlite.open(`./${DATA_BASE_NAME}`).catch(err=>console.log(err));
    let table={};
    let n='*';

   if(m_id2) selector='both';
   if(selector=='to'){
      table = await sqlite.all(`SELECT * FROM ${TABLE_NAME} WHERE m_i=='${m_id}' `)
        .then(table=>{return table;})
        .catch(err=>{console.log(err); return false;});
   }else if(selector=='from'){
      table = await sqlite.all(`SELECT * FROM ${TABLE_NAME} WHERE a_i=='${m_id}' `)
        .then(table=>{return table;})
        .catch(err=>{console.log(err); return false;});
   }else if(selector=='both'){
     table = await sqlite.all(`SELECT * FROM ${TABLE_NAME} WHERE a_i=='${m_id}' AND m_i=='${m_id2}' `)
        .then(table=>{return table;})
        .catch(err=>{console.log(err); return false;});
   }else if(selector=='all'){
     table = await sqlite.all(`SELECT * FROM ${TABLE_NAME} `)
        .then(table=>{return table;})
        .catch(err=>{console.log(err); return false;});
   };
   if(!table) return false;
 
   table=table.sort(function(a,b){return a.t-b.t;});
   table=table.reverse();
   let count=flags.count||3;
   if(selector=='to' && !flags.all){
      let n_arr2=[];
      table.map(e=>{
      let a_f=n_arr2.filter(e2=>e2.a_i==e.a_i);
      if(a_f.length<count) n_arr2.push(e);
      });
     table=n_arr2;
   }else if(selector=='from' && !flags.all){
      let n_arr2=[];
      table.map(e=>{
      let a_f=n_arr2.filter(e2=>e2.m_i==e.m_i);
      if(a_f.length<count) n_arr2.push(e);
      });
      table=n_arr2;
   }else if((selector=='both'||selector=='all') && !flags.all){
      let n_arr2=[];
      table.map(e=>{
      let a_f=n_arr2.filter(e2=>((e2.m_i==e.m_i)&&(e2.a_i==e.a_i)));
      if(a_f.length<count) n_arr2.push(e);
      });
      table=n_arr2;
   };//if end
 
   let pos=0;
   let pages_arr=[];
   let arr2=[];
   //let max=exports.e.max_note_len;
 /// let limit=600;
   let max=(limit)?limit:600;
   let nick_len=25;//24
   let res=max+nick_len+50;
   
   let add=100;
   for(let i=0;i<table.length;i++){
        res-=table[i].m_c.length+nick_len;
        if(res>=0){ 
         arr2.push(table[i]);
        };//
        if(res<0){
           pages_arr.push(arr2);
           arr2=[];
           arr2.push(table[i]);
           res=max;
           res-=table[i].m_c.length-nick_len;
        };
        if(i==table.length-1){pages_arr.push(arr2);};
   };
   
    
   async function gep(page){
        let emb={};
        let arr = pages_arr[page];
        let str='';
        let count=0;//---
        let fields=[];//---
     
        for(let i=0;i<arr.length;i++){
              let d=new Date(+arr[i].t+(3*60*60*1000));
              d= d.toISOString().replace(/z|t/gi,' ');
              let link ="https://discordapp.com/channels/"+message.guild.id+"/"+message.channel.id;
              let author_mention='<@'+arr[i].a_i+'>';
              let author_u= client.users.get(arr[i].a_i);  author_u=(author_u)?author_u:'<@'+arr[i].a_i+'>';
              author_u.tag=(author_u.tag!='underfined')?author_u.tag:'user left this server';
              let author_m= message.guild.members.get(arr[i].a_i); 
             
              
              if(author_m) {author_m=(author_m.nickname)?author_m.nickname:author_m.username};
              let author=(author_m)?author_m:author_u;
              let author_nick=(author_m)?' aka '+author_m:'';
              let author_info=author_u.tag+" "+author_nick;
              
let au_m2 = message.guild.members.get(arr[i].a_i); let d_au_m2; let au_u2 = client.users.get(arr[i].a_i);
if(!au_m2){d_au_m2='<@'+arr[i].a_i+'>';}else{d_au_m2=((au_m2).nickname)?au_m2.nickname:au_m2.user.username;};    
//if(!au_m2){d_ab_m2=au_u2.user.tag;}else{d_ab_m2=((ab_m2).nickname)?ab_m2.nickname:ab_m2.user.username;};
//if(!au_m2){d_au_m2='<@'+arr[i].a_i+'>';}else{d_au_m2=((au_m2).nickname)?au_m2.nickname:au_m2.user.username;};
let au_m2_info=(au_m2)?au_m2.user.tag:'нет на сервере';           
let ab_m2 = message.guild.members.get(arr[i].m_i); let d_ab_m2; let ab_u2 = client.users.get(arr[i].m_i);
if(!ab_m2){d_ab_m2='<@'+arr[i].m_i+'>';}else{d_ab_m2=((ab_m2).nickname)?ab_m2.nickname:ab_m2.user.username;};
let ab_m2_info=(ab_m2)?ab_m2.user.tag:'нет на сервере';
              let about_m= message.guild.members.get(arr[i].a_i); 
              if(about_m) {about_m=(about_m.nickname)?about_m.nickname:about_m.username};
              let about = client.users.get(arr[i].m_i);   about=(about)?about:'<@'+arr[i].m_i+'>';
           
            let about_info=author_u.tag+" "+author_nick;
              str+=author_u+"про "+about+' '+d+' id: '+arr[i].id+'\n';
              str+=arr[i].m_c+'\n'+'\n';
          //let head="";
              let head="["+ d_au_m2+"]("+link+ " '"+au_m2_info+"')"+" про "+"["+ d_ab_m2+"]("+link+ " '"+ab_m2_info+"')"+" : ";//---
              fields.push({name:d+" id:"+arr[i].id,value:head+arr[i].m_c});//---
              count+=100+arr[i].m_c.length;//---
             
        };//for
      
       // let mmb_name=(mmb.nickname)?'('+mmb.nickname+')':'';
      //  mmb_name+=mmb.user.username+'#'+mmb.user.discriminator;
       
       // emb.author={icon_url:mmb.user.avatarURL};
      
         let str0='';
//---
        emb.fields=[
           {name:' страница '+(Number(page)+1)+' из '+pages_arr.length+' ,всего записей '+table.length,value:str0+str},
           {name:' страница '+(Number(page)+1)+' из '+pages_arr.length+' ,всего записей '+table.length,value:str0+str}
        ];
         
//---
        emb.title='стр. '+(Number(page)+1)+' из '+pages_arr.length+' всего заметок: '+table.length;
        emb.fields=fields;
        return emb;
   };
 



  
  delay(1000);
  
   let target_msg = await message.channel.send({embed:await gep(pos)});
   let next_emoji_name='▶';
   let prew_emoji_name='◀';
   let del_emoji_name='✖';
   await target_msg.react(prew_emoji_name).then(()=>target_msg.react(next_emoji_name)).then( ()=> target_msg.react(del_emoji_name) ).catch(err=>console.log(err));
 

   async function recursion(){ 
  //___
     let filter=(reaction,user)=>{return [next_emoji_name,prew_emoji_name,del_emoji_name].includes(reaction.emoji.name)&&!user.bot&&user.id==ini_id;};
     let result = await target_msg.awaitReactions(filter,{max:1,time:60000,errors:['time']})
        .then((r,u)=>{
             
             return r.first();
     }).catch(err=>{console.log(err);return false;});
     if(!result) return;
     let reaction=result;
     result=result.emoji.name;
     if(result!=del_emoji_name) await reaction.remove(reaction.message.guild.members.get(ini_id)).catch(err=>console.error(err));
    //____
     
     if(result==next_emoji_name&&pos<pages_arr.length-1){
       pos++;
       await target_msg.edit({embed:await gep(pos)});
       return recursion();
      }else if(result==prew_emoji_name&&pos>0){
       pos--;
       await target_msg.edit({embed:await gep(pos)});
       return recursion();
      }else if(result==del_emoji_name){
       result=false; 
       await target_msg.delete();
      };
     if (result)  return recursion();
   };//recurcion
   recursion();
    
 
  return true;
}catch(err){console.log(err)};
};//exports.insert end

//cmd.add=message.content.indexOf('+++')!=-1;
