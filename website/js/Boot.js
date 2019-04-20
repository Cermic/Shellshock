var PhaserMMORPG = PhaserMMORPG || {};

PhaserMMORPG.Boot = function(){};
//setting game configuration and loading the assets for the loading screen
PhaserMMORPG.Boot.prototype = {
  preload: function() {
    //assets we'll use in the loading screen
  },
  create: function() {
    this.state.start('Preload');
  }
};