var PhaserMMORPG = PhaserMMORPG || {};

//loading the game assets
PhaserMMORPG.Preload = function(){};

PhaserMMORPG.Preload.prototype = {
  preload: function() {
   
	this.load.image('MenuGrahic', 'assets/background2.png');
   
    //show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

    //game loading text
    var text = "Loading...";
    var style = { font: "13px Open Sans", fill: "#aaa", align: "center" };
    this.loadingTextNode = this.game.add.text(this.game.width/2, this.game.height/2 + 30, text, style);
    this.loadingTextNode.anchor.set(0.5);
  },
  create: function() {
    PhaserMMORPG.eurecaClientSetup();
  },
  update: function () {
    if (PhaserMMORPG.MultiplayerServerReady) {
        this.state.start('MainMenu');    
    } 
  },
  onFileCompleteCallback: function (percentLoaded, assetName) {
    this.loadingTextNode.text = percentLoaded + "% loaded";
  }
};