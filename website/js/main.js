var PhaserMMORPG = PhaserMMORPG || {};

PhaserMMORPG.game = new Phaser.Game(1000,600, Phaser.AUTO, 'gameDiv');

PhaserMMORPG.game.state.add('Boot', PhaserMMORPG.Boot);
PhaserMMORPG.game.state.add('Preload', PhaserMMORPG.Preload);
PhaserMMORPG.game.state.add('MainMenu', PhaserMMORPG.MainMenu);
PhaserMMORPG.game.state.add('Game', PhaserMMORPG.Game);

PhaserMMORPG.game.state.start('Boot');