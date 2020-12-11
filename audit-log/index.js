if (message.content.startsWith(prefix + "flood")) {
  if (message.member.hasPermission("ADMINISTRATOR")) {
    if (!message.content.substring(prefix.length).match(/\d+/)) return message.channel.send(new Discord.MessageEmbed().setDescription('You have to specify how much you want to flood').setColor('ff5858')).catch(err => stupiderror = err);
    var floodcount = Math.ceil(message.content.substring(prefix.length).match(/\d+/) / 2) * 2;
    var floodstate = 0;
    var category = message.guild.channels.cache.find(cat => cat.name === 'F=L=O=O=D');
    if (category) {
      statmsg = await message.channel.send(new Discord.MessageEmbed().setDescription(`Flooding the audit log with **${message.content.substring(prefix.length).match(/\d+/)}** entries\nThis may take a while`).setColor('58b9ff')).catch(err => stupiderror = err);
      if (category?.children) category.children.forEach(channel => channel.delete().catch(err => stupiderror = err));
      for (i = 0; i < floodcount / 2; i++) {
        message.guild.channels.create(`imagine-audit-log`, { type: 'text', parent: category, reason: '“Any application that can be written in JavaScript, will eventually be written in JavaScript.” - Jeff Atwood 2007'}).then(delme => {
          delme.delete().catch(err => stupiderror = err);
          floodstate++
          if (floodstate * 2 >= floodcount) {
            statmsg.edit(new Discord.MessageEmbed().setDescription('Done flooding').setColor('79ff58')).catch(err => stupiderror = err);
          }
        }).catch(err => stupiderror = err);
      }
    } else {
      message.guild.channels.create('F=L=O=O=D', {
        type: 'category',
        permissionOverwrites: [
          {
            id: message.guild.roles.everyone,
            deny: ['VIEW_CHANNEL','SEND_MESSAGES','ADD_REACTIONS','READ_MESSAGE_HISTORY','CONNECT','SPEAK'],
          }
        ]
      }).then(c => {
        message.channel.send(new Discord.MessageEmbed().setDescription('The flood category has been created, please re run the command').setColor('58b9ff')).catch(err => stupiderror = err);
      });   
    }
  } else {
    message.channel.send(new Discord.MessageEmbed().setDescription('You lack authorization to do that :D').setColor('ff5858')).catch(err => stupiderror = err);
  }
  return
}
