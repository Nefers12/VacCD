const SteamCommunity = require('steamcommunity');
const cfg = require('./config');
const schedule = require('node-schedule');
var SteamTotp = require('steam-totp');




let community = new SteamCommunity();

	var code = SteamTotp.generateAuthCode(cfg.sharedSecret);

	community.login({
		accountName: cfg.accountName,
		password: cfg.password,
		twoFactorCode: code,
		captcha: cfg.captcha
	}, () => {

		schedule.scheduleJob('*/26 */2 * * *', () => { 
			var vacdate = new Date("03/12/2018");
			var vacend = new Date("03/10/2025");
			var today = new Date(); 
			var left = Math.ceil((today.getTime() - vacdate.getTime()) / (1000 * 3600 * 24)*10);
			left = left/10;
	
			community.editProfile({
				summary: `Vac is forever but people will forget about it in ` + (2555 - left) + ` days \n\nwe are the ` + today.toUTCString().slice(0,-13) + ' and my vac will disapear the ' + vacend.toUTCString().slice(0,-13) 
			}, (err) => {
			if(err){
				return callback("Unable to update profile information.");
			}
		});
		 }) 
	});

