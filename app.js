require('dotenv').config();

const tmi = require('tmi.js');


const Stats = require('./Stats');




const statistiquesUtilisateurs = new Stats();
statistiquesUtilisateurs.charger();

const communaute = `${process.env.TWITCH_COMMUNITY}`


const client = new tmi.Client({
    options: { debug: true, messagesLogLevel: "info"},
    connection: {
        reconnect: true,
        secure: true
    },
    identity: {
        username: `${process.env.TWITCH_USERNAME}`,
        password: `oauth:${process.env.TWITCH_OAUTH}`
    },
    channels: [`${process.env.TWITCH_CHANNEL}`]
});

client.connect().catch(console.error);

client.on('message', (channel, tags, message, self)=>{
    if (self) return;
    switch(message.toLocaleLowerCase()){
        case '!commandes':
            client.say(channel, `@${tags.username}, fait:
            !commandes
            !shooter
            !biere (alias tite-frette)
            !drink 
            !energie (alias energy)
            !pisse 
            !mary-jane (alias marijuana, piffy, munchies, hehe-he)
            !gin !rhum !vodka !whisky (alias whiskey, scotch, bourbon)
            !cafe 
            !hard (alias tt, twisted-tea, vizzy, claw, white-claw)
            `);
            break;
        case '!shooter':
            [global, user] = statistiquesUtilisateurs.incrementerCompteur('shooter', tags.username);
            client.say(channel, `Les ${communaute} ont bu ${global} shooters. Toi, ${tags.username}, tu en as englouti ${user}! Gorgée!`);
            break;
        case '!biere':
        case '!tite-frette':
            [global, user] = statistiquesUtilisateurs.incrementerCompteur('biere', tags.username);
            client.say(channel, `Les ${communaute} ont bu ${global} bières. Toi, ${tags.username}, tu a vu le fond de ${user} bouteilles! Gorgée!`);
            break;
        case '!drink':
            [global, user] = statistiquesUtilisateurs.incrementerCompteur('drink', tags.username);
            client.say(channel, `Les ${communaute} ont bu ${global} drinks. Toi, ${tags.username}, t'as fait le fancy ${user} fois! Gorgée!`);
            break;
        case '!pisse':
            [global, user] = statistiquesUtilisateurs.incrementerCompteur('pisse', tags.username);
            client.say(channel, `Pisse pas là! ${tags.username}, ça fait  ${user} fois que je te le répète! Pas de gorgée pour toi!`);
            break;
        case '!marijuana':
        case '!piffy':
        case '!munchies':
        case '!hehe-he':
        case '!mary-jane':
            [global, user] = statistiquesUtilisateurs.incrementerCompteur('pot', tags.username);
            client.say(channel, `Hum, une ${global}e belle odeur de printemps ça! ${tags.username}, c'est la ${user}e fois que tu nous parfumes.`);
            break;
        case '!cafe':
            [global, user] = statistiquesUtilisateurs.incrementerCompteur('cafe', tags.username);
            client.say(channel, `Les ${communaute} ont bu ${global} cafés. Toi, ${tags.username}, t'as pris ${user} doses! Gorgée!`);
            break;
        case '!energy':
        case '!energie':
            [global, user] = statistiquesUtilisateurs.incrementerCompteur('cafe', tags.username);
            client.say(channel, `Les ${communaute} ont bu ${global} energy drinks. Toi, ${tags.username}, tu t'es boosté ${user} fois! Gorgée!`);
            break;
        case '!gin':
            statistiquesUtilisateurs.incrementerCompteur('drink', tags.username);
            [global, user] = statistiquesUtilisateurs.incrementerCompteur('gin', tags.username);
            client.say(channel, `Les ${communaute} ont bu ${global} gins. Toi, ${tags.username}, t'as touché la baie de genièvre ${user} fois! Gorgée!`);
            break;
        case '!rhum':
            statistiquesUtilisateurs.incrementerCompteur('drink', tags.username);
            [global, user] = statistiquesUtilisateurs.incrementerCompteur('rhum', tags.username);
            client.say(channel, `Les ${communaute} ont bu ${global} rhums. Toi, ${tags.username}, t'as cassé la canne ${user} fois! Gorgée!`);
            break;
        case '!vodka':
            statistiquesUtilisateurs.incrementerCompteur('drink', tags.username);
            [global, user] = statistiquesUtilisateurs.incrementerCompteur('vodka', tags.username);
            client.say(channel, `Les ${communaute} ont bu ${global} vodkas. Toi, ${tags.username}, t'as shaké la patate ${user} fois! Gorgée!`);
            break;
        case '!whisky':
        case '!whiskey':
        case '!scotch':
        case '!bourbon':
            statistiquesUtilisateurs.incrementerCompteur('drink', tags.username);
            [global, user] = statistiquesUtilisateurs.incrementerCompteur('whiskey', tags.username);
            client.say(channel, `Les ${communaute} ont bu ${global} ${message.toLocaleLowerCase().substring(1)}s. Toi, ${tags.username}, t'as mangé tes céréales ${user} fois! Gorgée!`);
            break;
        case '!hard':
        case '!tt':
        case 'twisted-tea':
        case '!claw':
        case '!white-claw':
        case '!vizzy':
            [global, user] = statistiquesUtilisateurs.incrementerCompteur('hard', tags.username);
            client.say(channel, `Les ${communaute} ont bu ${global} hards. Toi, ${tags.username}, t'as confondu la foule ${user} fois! Gorgée!`);
            break;

    }
});