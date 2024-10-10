import Phaser from "phaser"

export default class WinScreen extends Phaser.Scene {
	constructor() {
		super("win-screen")
	}

	init() {
		this.backsound = undefined
		this.startsound = undefined
	}

	preload() {
		this.load.image("background", "images/BG.png")
		this.load.image("restartbtn", "images/restartbtn.png")
		this.load.image("wintext", "images/wintext.png")
		this.load.audio("winmusic", "music/Alchemists_Fantasy.ogg")
		this.load.audio("startsfx", "sfx/Cherry.ogg")
	}

	create() {
		this.backsound = this.sound.add("winmusic")
		var soundConfig = {
			loop: true, // sound configuration
			volume: 1,
		}
		this.startsound = this.sound.add("startsfx")
		this.backsound.play(soundConfig)
		const gameWidth = this.scale.width * 0.5
		const gameHeight = this.scale.height * 0.5
		this.add.image(gameWidth, gameHeight, "background")
		this.add.image(gameWidth, gameHeight - 250, "wintext").setScale(2)
		this.restartButton = this.add
			.image(gameWidth, gameHeight + 100, "restartbtn")
			.setInteractive()
			.setScale(0.5)
		this.restartButton.once(
			"pointerup",
			() => {
				this.scene.start("pizza-rush") // This is the code to switch scenes. Filled with the key written in the super code in the constructor method
				this.startsound.play()
			},
			this
		)
	}
}
