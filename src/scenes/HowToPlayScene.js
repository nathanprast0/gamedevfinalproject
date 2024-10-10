import Phaser from "phaser"

export default class HowToPlayScene extends Phaser.Scene {
	constructor() {
		super("howto-scene")
	}

	init() {
		this.menu = undefined
		this.textarrow = undefined
		this.textscore = undefined
		this.textgoal = undefined
		this.textgover = undefined
	}

	preload() {
		this.load.image("background", "images/BG.png")
		this.load.image("menubtn", "images/menubtn.png")
		this.load.image("howtotext", "images/howtotext.png")
		this.load.image("ArrowKey", "images/ArrowKey.png")
		this.load.image("cone", "images/cone.png")
		this.load.image("enemy", "images/enemy2.png")
		this.load.image("player", "images/player.png")
		this.load.image("redbox", "images/redbox.png")
		this.load.image("scoretext", "images/scoretext.png")
	}

	create() {
		const gameWidth = this.scale.width * 0.5
		const gameHeight = this.scale.height * 0.5
		this.add.image(gameWidth, gameHeight, "background")
		this.menu = this.add
			.image(gameWidth, gameHeight - 800, "menubtn")
			.setInteractive()
			.setScale(1)
		this.menu.once("pointerup", () => {
			this.scene.start("start-scene")
		})
		// this.add.image(gameWidth, gameHeight + 160, "redbox").setScale(1.75)
		this.add.image(gameWidth - 690, gameHeight - 510, "ArrowKey").setScale(0.32)
		this.add
			.image(gameWidth - 690, gameHeight - 340, "ArrowKey")
			.setScale(0.32)
			.setFlipY(true)
		this.textarrow = this.add
			.text(
				gameWidth - 540,
				gameHeight - 460,
				"Arrow keys and buttons moves the player",
				{
					color: "#ff3838",
					// @ts-ignore
					fontSize: 80,
					fontFamily: "Quicksand",
				}
			)
			.setScale(1)
		this.add.image(gameWidth - 550, gameHeight - 50, "scoretext").setScale(3)
		this.textscore = this.add
			.text(
				gameWidth - 250,
				gameHeight - 100,
				"Reach a new level every 500 score",
				{
					color: "#ff3838",
					// @ts-ignore
					fontSize: 80,
					fontFamily: "Quicksand",
				}
				// this.add.image()
			)
			.setScale(1)
		this.textgoal = this.add
			.text(
				gameWidth - 680,
				gameHeight + 240,
				"Pass level 10 to win the game!",
				{
					color: "#ff3838",
					// @ts-ignore
					fontSize: 80,
					fontFamily: "Quicksand",
				}
			)
			.setScale(1.4)
		this.textgover = this.add
			.text(
				gameWidth - 830,
				gameHeight + 500,
				"Avoid obstacles such as vehicles to survive.",
				{
					color: "#ff3838",
					// @ts-ignore
					fontSize: 80,
					fontFamily: "Quicksand",
				}
			)
			.setScale(1.2)
		this.add
			.image(gameWidth - 0, gameHeight + 800, "enemy")
			.setScale(1)
			.setRotation(1.57)
	}
}

//control > level up > goal > game over
