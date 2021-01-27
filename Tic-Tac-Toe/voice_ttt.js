  var gbid = client.channels.cache.get(voicenew.channelID);
  if (gbid?.name.startsWith('ttt-')) {
    if (tttgame[voicenew.guild.id]) {
      console.log(gbid?.name[4])
      var board = '';
      var oldplay = tttgame[voicenew.guild.id]?.embeds[0]?.image?.url;
      var newplay = '';
      var newtitle = '';
      if ((tttgame[voicenew.guild.id]?.embeds[0]?.description.replace(`[⬛⬛⬛](https://discord.gg/${gbid?.name.substring(6)})`,'test')) == (tttgame[voicenew.guild.id]?.embeds[0]?.description)) return voicenew.member.voice.kick().catch(e);
      if (oldplay == 'http://google.com/blue') {
        board = tttgame[voicenew.guild.id]?.embeds[0]?.description
          .replace(`[⬛⬛⬛](https://discord.gg/${gbid?.name.substring(6)})`,'🟦🟦🟦')
          .replace(`[⬛⬛⬛](https://discord.gg/${gbid?.name.substring(6)})`,'🟦🟦🟦')
          .replace(`[⬛⬛⬛](https://discord.gg/${gbid?.name.substring(6)})`,'🟦🟦🟦');
        newplay = 'http://google.com/orange';
        newtitle = 'Orange, your turn';
      }
      if (oldplay == 'http://google.com/orange') {
        board = tttgame[voicenew.guild.id]?.embeds[0]?.description
        .replace(`[⬛⬛⬛](https://discord.gg/${gbid?.name.substring(6)})`,'🟧🟧🟧')
        .replace(`[⬛⬛⬛](https://discord.gg/${gbid?.name.substring(6)})`,'🟧🟧🟧')
        .replace(`[⬛⬛⬛](https://discord.gg/${gbid?.name.substring(6)})`,'🟧🟧🟧');
        newplay = 'http://google.com/blue';
        newtitle = 'Blue, your turn';
      }
      const ttt = new Discord.MessageEmbed()
        .setTitle(newtitle)
        .setDescription(board)
        .setImage(newplay)
      tttgame[voicenew.guild.id].edit(ttt).catch(e);
    }
    voicenew.member.voice.kick().catch(e);
    return
  }
