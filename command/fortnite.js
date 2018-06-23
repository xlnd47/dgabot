const Discord = require("discord.js");
const Client = require("fortnite");
const config = require("../config.json");
const fortnite = new Client(process.env.APIKEY);

module.exports.run = async (bot, message, args) => {
  //await message.delete();
  //?fortnite
  let username = args[0];
  let platform = args[1] || "pc";
  
  if(!username) return message.reply("Please provide a username.");
  
  let data = fortnite.user(username, platform).then(data => {
    
    //fortnite.user(username, platform).then(console.log);
    
    let stats = data.stats;
    let lifetime = stats.lifetime;
    
    let score = lifetime[6]['Score'];
    let mPlayed = lifetime[7]['Matches Played'];
    let wins = lifetime[8]['Wins'];
    let winsp = lifetime[9]['Win%'];
    let kills = lifetime[10]['Kills'];    
    let kd = lifetime[11]['K/d'];

    
    let embed = new Discord.RichEmbed()
    .setTitle("Fortnite Lifetime Stats")
    .setAuthor(data.username)
    .setColor(config.orange)
    .addField("Kills", kills, true)
    .addField("Matches Played", mPlayed, true)
    .addField("KD", kd, true)
    .addField("Wins", wins, true)
    .addField("Win Percentage", winsp, true)
    .addField("Score", score, true);
    
    message.channel.send(embed);
    
    //let solo = stats.current_solo;
    //let duo = stats.current_duo;
    //let squad = stats.current_squad;
    
    let totalwins = stats.current_solo['wins'] + stats.current_duo['wins'] + stats.current_squad['wins'];   
    let totalkills = stats.current_solo['kills'] + stats.current_duo['kills'] + stats.current_squad['kills'];
    let matchtotal = stats.current_solo['matches'] + stats.current_duo['matches'] + stats.current_squad['matches'];
    let kdtotal = (stats.current_solo['kd'] + stats.current_duo['kd'] + stats.current_squad['kd'])/3;
    //let kdtotal = Number((totalkills/matchtotal).toFixed(2));;
    let scoretot = stats.current_solo['score'] + stats.current_squad['score'] + stats.current_duo['score'];
    let winper = Math.round((totalwins/matchtotal)*100);
    let kdtotal2 = Number((kdtotal).toFixed(2));
    
    let embed2 = new Discord.RichEmbed()
    .setTitle("Fortnite season 4 stats")
    .setAuthor(data.username)
    .setColor(config.orange)
    .addField("Kills", totalkills, true)
    .addField("Matches Played", matchtotal, true)
    .addField("KD", kdtotal2, true)
    .addField("Wins", totalwins, true)
    .addField("Win Percentage", winper + "%", true)
    .addField("Score", scoretot, true);
    
    message.channel.send(embed2);
    
    
  }).catch(e => {
      console.log(e);
      message.channel.send("Couldn't find that username in the database");
  });
  
}