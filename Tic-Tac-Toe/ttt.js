if (message.content.startsWith(prefix + "ttt")) {
  if (message.content.startsWith(prefix + "ttt setup")) {
    if (rls('tttsetup', message, 690)) return
    message.channel.send(`Setting up, this will take a little bit. The command \`${prefix}ttt\` will not work properly for a little bit`);
    var category = await message.guild.channels.cache.find(cat => cat.name === 'ttt');
    if (category?.children) category.children.forEach(channel => channel.delete().catch(err => stupiderror = err));
    await timer(1000);
    if (category) category.delete().catch(e);
    await timer(500);
    message.guild.channels.create('ttt', { type: 'category' }).then(c => {
      for (i = 1; i < 9 + 1; i++) {
        message.guild.channels.create(`ttt-${i}-`, { type: 'voice', parent: c}).then(vc => {
          vc.createInvite({unique: true, maxAge: 0, maxUses: 0}).then(inv => {
            vc.setName(vc.name + inv.code).then(latestvc => {
              checkeq(latestvc.name[4], 9, 'Done', message.channel);
            }).catch(e);
          }).catch(e);
        }).catch(e);
      }
    });
    return
  }


  var linkfor = {}
  for (i = 1; i < 9 + 1; i++) {
    var buttonchannel = message.member.guild.channels.cache.find(x => x.name.startsWith(`ttt-${i}`));
    if (buttonchannel) {
      linkfor[i] = `https://discord.gg/${buttonchannel.name.substring(`ttt-${i}-`.length)}`;
    } else {
      message.channel.send(`Some of the required voice channels were not found, try \`${prefix}ttt setup\``).catch(e);
      return
    }
  }
  var board = `
    [⬛⬛⬛](${linkfor[1]})⬜[⬛⬛⬛](${linkfor[2]})⬜[⬛⬛⬛](${linkfor[3]})
    [⬛⬛⬛](${linkfor[1]})⬜[⬛⬛⬛](${linkfor[2]})⬜[⬛⬛⬛](${linkfor[3]})
    [⬛⬛⬛](${linkfor[1]})⬜[⬛⬛⬛](${linkfor[2]})⬜[⬛⬛⬛](${linkfor[3]})
    ⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜
    [⬛⬛⬛](${linkfor[4]})⬜[⬛⬛⬛](${linkfor[5]})⬜[⬛⬛⬛](${linkfor[6]})
    [⬛⬛⬛](${linkfor[4]})⬜[⬛⬛⬛](${linkfor[5]})⬜[⬛⬛⬛](${linkfor[6]})
    [⬛⬛⬛](${linkfor[4]})⬜[⬛⬛⬛](${linkfor[5]})⬜[⬛⬛⬛](${linkfor[6]})
    ⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜
    [⬛⬛⬛](${linkfor[7]})⬜[⬛⬛⬛](${linkfor[8]})⬜[⬛⬛⬛](${linkfor[9]})
    [⬛⬛⬛](${linkfor[7]})⬜[⬛⬛⬛](${linkfor[8]})⬜[⬛⬛⬛](${linkfor[9]})
    [⬛⬛⬛](${linkfor[7]})⬜[⬛⬛⬛](${linkfor[8]})⬜[⬛⬛⬛](${linkfor[9]})`.replace(/  +/g, '');
  const ttt = new Discord.MessageEmbed()
    .setTitle('Tap to place a piece')
    .setDescription(board)
    .setImage(`http://google.com/blue`)
  tttgame[message.guild.id] = await message.channel.send(ttt).catch(e);
  return
}
