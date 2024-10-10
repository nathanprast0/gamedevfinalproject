import Phaser from "phaser"

export default class StartScene extends Phaser.Scene {
	constructor() {
		super("start-scene")
	}

	init() {
		this.backsound = undefined
		this.startsound = undefined
	}

	preload() {
		this.load.image("background", "images/BG.png")
		this.load.image("startbtn", "images/startbtn.png")
		this.load.image("start", "images/start.png")
		this.load.audio("startmsc", "music/Four_Bits_to_the_Left.ogg")
		this.load.audio("startsfx", "sfx/Cherry.ogg")
		this.load.image("howtobtn", "images/howtobtn.png")
	}

	create() {
		this.backsound = this.sound.add("startmsc")
		var soundConfig = {
			loop: true, // sound configuration
			volume: 1,
		}
		this.startsound = this.sound.add("startsfx")
		this.backsound.play(soundConfig) // play the backsound
		const gameWidth = this.scale.width * 0.5
		const gameHeight = this.scale.height * 0.5
		this.add.image(gameWidth, gameHeight, "background")
		var title = this.add.image(gameWidth, gameHeight - 350, "start")
		title.setScale(2.5)
		this.startButton = this.add
			.image(gameWidth, gameHeight + 100, "startbtn")
			.setInteractive()
			.setScale(0.6)
		this.startButton.once("pointerup", () => {
			this.scene.start("pizza-rush") // This is the code to switch scenes. Filled with the key written in the super code in the constructor method
			this.startsound.play()
		})
		this.howtoButton = this.add
			.image(gameWidth, gameHeight + 340, "howtobtn")
			.setInteractive()
			.setScale(1.28)
		this.howtoButton.once("pointerup", () => {
			this.scene.start("howto-scene") // This is the code to switch scenes. Filled with the key written in the super code in the constructor method
		})
	}
}
