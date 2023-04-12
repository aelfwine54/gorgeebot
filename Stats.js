const {replacer, reviver} = require('./util/mapUtils');
const fs = require('fs')

class StatsUser{
    constructor(){
        this.compteurs = {}
    }

    validerOuInitialiserCompteur(compteur){
        if(this.compteurs[compteur] === undefined){
            this.compteurs[compteur] = 0;
        }
    }
}


class Stats{
    constructor(channel){
        this.compteurs = {}
        this.users = {}
        this.channel = channel
        this.CHEMIN_PAR_DEFAUT = `./data/stats_${channel}.json`
    }

    charger(){
        try {
            const chemin = this.CHEMIN_PAR_DEFAUT;
      
            fs.readFile(chemin, { flag: 'r' }, (err, data) => {
              if (err && err.errno === -4058) {
                console.log('Le fichier n\'existe pas');
              } else if (data.length > 0) {
                const obj = JSON.parse(data, reviver);
                this.shooter = obj.shooter
                this.biere = obj.biere
                this.drink = obj.drink
                this.pisse = obj.pisse
                this.compteurs = obj.compteurs

                this.users = obj.users
                for (let o in obj.users){
                    let u = new StatsUser()
                    u.compteurs = obj.users[o].compteurs
                    this.users[o] = u
                }
              }
            });
          } catch (err) {
            console.log('Erreur dans le chargement');
          }
    }

    sauvegarder(){
        const chemin = this.CHEMIN_PAR_DEFAUT;
        const data = JSON.stringify(this, replacer, 4);
        try {
          fs.writeFile(chemin, data, { flag: 'w+' }, (err) => {
            if (err) {
              throw err;
            }
          });
        } catch (err) {
          console.log('Erreur dans l\'enregistrement du fichier');
          console.log(err.message);
        }
    }

    validerOuCreerUser(username){
        if(this.users[username] === undefined){
            this.users[username] = new StatsUser();
        }
    }

    validerOuInitialiserCompteur(compteur){
        if(this.compteurs[compteur] === undefined){
            this.compteurs[compteur] = 0;
        }
    }

    incrementerCompteurUser(compteur, username){
        this.validerOuCreerUser(username)
        let obj = this.users[username]
        for (var m in obj) {        
            if (typeof obj[m] == "function" && obj.hasOwnProperty(m)) {
                console.log(m)
            }
        }

        this.users[username].validerOuInitialiserCompteur(compteur)
        return this.users[username].compteurs[compteur] +=1
    }

    incrementerCompteurGlobal(compteur){
        this.validerOuInitialiserCompteur(compteur);
        this.compteurs[compteur] += 1;
        return this.compteurs[compteur];
    }

    incrementerCompteur(compteur, username){
        const global = this.incrementerCompteurGlobal(compteur);
        const user = this.incrementerCompteurUser(compteur, username);

        this.sauvegarder();
        
        return [global, user];
    }

}

module.exports = Stats;