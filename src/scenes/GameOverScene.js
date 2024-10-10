import Phaser from "phaser"

export default class GameOverScene extends Phaser.Scene {
	constructor() {
		super("over-scene")
	}

	init() {
		this.backsound3 = undefined
		this.startsound3 = undefined
	}

	preload() {
		this.load.image("background", "images/BG.png")
		this.load.image("restartbtn", "images/restartbtn.png")
		this.load.image("restart", "images/restart.png")
		this.load.audio("overmusic", "music/Rain1.ogg")
		this.load.audio("startsfx", "sfx/Cherry.ogg")
	}

	create() {
		this.backsound3 = this.sound.add("overmusic")
		var soundConfig = {
			loop: true, // sound configuration
			volume: 1,
		}
		this.startsound3 = this.sound.add("startsfx")
		this.backsound3.play(soundConfig)
		const gameWidth = this.scale.width * 0.5
		const gameHeight = this.scale.height * 0.5
		this.add.image(gameWidth, gameHeight, "background")
		this.add.image(gameWidth, gameHeight - 250, "restart")
		this.restartButton = this.add
			.image(gameWidth, gameHeight + 100, "restartbtn")
			.setInteractive()
			.setScale(0.5)
		this.restartButton.once(
			"pointerup",
			() => {
				this.scene.start("pizza-rush") // This is the code to switch scenes. Filled with the key written in the super code in the constructor method
				this.startsound3.play()
			},
			this
		)
	}
}
