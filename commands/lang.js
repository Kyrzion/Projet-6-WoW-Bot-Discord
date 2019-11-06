




exports.run = (client, message) => {

    let newLang = message.content.slice(6);
    
    lang.defineLang(newLang);
  console.log(lang.defineLang(newLang));

    
    if (newLang == "en") {
        newLangflag = ":flag_gb:";
        trad = "Bot's Language: ";
    }

    if (newLang == "fr") {
      newLangflag = " :flag_fr:";
      trad = "Langue du Bot: ";

    }
 
    

  message.channel.send(`${trad}` + `${newLang}` + ` ${newLangflag}`);
}