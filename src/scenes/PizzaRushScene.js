import Phaser from "phaser"
import Enemy from "../ui/Enemy"

export default class PizzaRushScene extends Phaser.Scene {
	constructor() {
		super("pizza-rush")
	}
	init() {
		this.speed = 500
		this.cursor = undefined
		this.player = undefined
		this.enemies = undefined
		this.enemySpeed = 50
		this.cursor = undefined
		this.btn = undefined
		this.nav_down = false
		this.nav_up = false
		this.nav_right = false
		this.nav_left = false
		this.score = 0
		this.lives = 3
	}

	preload() {
		this.load.image("background", "images/BG.png")
		this.load.image("player", "images/player.png")
		this.load.image("enemy", "images/enemy1.png")
		this.load.image("btn", "images/ArrowKey.png")
		this.load.image("btn2", "images/ArrowKey2.png")
		// this.load.audio("","")
	}

	create() {
		// this.add.image(x, y, "keyName")
		// this.physics.add.sprite(x, y, "keyName")
		// this.physics.add.staticGroup()
		// this.physics.add.group()
		const gameWidth = this.scale.width * 0.5
		const gameHeight = this.scale.height * 0.5
		this.add.image(gameWidth, gameHeight, "background")
		this.player = this.createPlayer()
		this.enemies = this.physics.add.group({
			classType: Enemy,
			// maxSize: 10, //-----> the number of enemies in one group
			runChildUpdate: true,
		})
		this.time.addEvent({
			delay: Phaser.Math.Between(5000, 10000),
			callback: this.spawnEnemy,
			callbackScope: this, //--------------------> Calling a method named spawnEnemy
			loop: true,
		})
		this.cursor = this.input.keyboard.createCursorKeys()
		this.createButton()
		this.scoreText = this.add.text(50, 40, "Score", {
			color: "#ff1414",
			// @ts-ignore
			fontSize: 110,
			fontFamily: "Arial",
		})
		this.time.addEvent({
			delay: Phaser.Math.Between(1, 150),
			callback: this.timer,
			callbackScope: this, //--------------------> Calling a method named spawnEnemy
			loop: true,
		})
	}
	update(time) {
		this.movePlayer(this.player)
		this.scoreText.setText("Score : " + this.score)
	}
	createPlayer() {
		const player = this.physics.add.sprite(1020, 1680, "player")
		player.setCollideWorldBounds(true)
		return player
	}
	spawnEnemy() {
		const config = {
			speed: Phaser.Math.Between(100, 300), //-----------> Set the speed and rotation size of the enemy
		}
		// @ts-ignore
		const enemy = this.enemies.get(0, 0, "enemy", config)
		const positionX = Phaser.Math.Between(550, 1500) //-----> Take random numbers from 50-350
		if (enemy) {
			enemy.spawn(positionX) //--------------> Calling the spawn method with the x-position value parameter
			// }
		}
	}
	createButton() {
		this.input.addPointer(4)

		let nav_up = this.add
			.image(1800, 1350, "btn")
			.setInteractive()
			.setScale(0.7)
			.setDepth(0.5)
			.setAlpha(0.8)

		let nav_down = this.add
			.image(1800, 1760, "btn")
			.setInteractive()
			.setScale(0.7)
			.setDepth(0.5)
			.setAlpha(0.8)
			.setFlipY(true)

		let nav_left = this.add
			.image(180, 1650, "btn2")
			.setInteractive()
			.setScale(0.7)
			.setDepth(0.5)
			.setAlpha(0.8)

		let nav_right = this.add
			.image(600, 1650, "btn2")
			.setInteractive()
			.setScale(0.7)
			.setDepth(0.5)
			.setAlpha(0.8)
			.setFlipX(true)

		nav_up.on(
			"pointerdown",
			() => {
				//---------> When the pointer is up (clicked) then the nav left property will be true
				this.nav_up = true
			},
			this
		)
		nav_up.on(
			"pointerout",
			() => {
				//----------> When the pointer is out (not clicked) then the nav left property will be false
				this.nav_up = false
			},
			this
		)
		nav_down.on(
			"pointerdown",
			() => {
				this.nav_down = true
			},
			this
		)
		nav_down.on(
			"pointerout",
			() => {
				this.nav_down = false
			},
			this
		)
		nav_left.on(
			"pointerdown",
			() => {
				this.nav_left = true
			},
			this
		)
		nav_left.on(
			"pointerout",
			() => {
				this.nav_left = false
			},
			this
		)
		nav_right.on(
			"pointerdown",
			() => {
				this.nav_right = true
			},
			this
		)
		nav_right.on(
			"pointerout",
			() => {
				this.nav_right = false
			},
			this
		)
	}
	movePlayer(player) {
		if (this.cursor.left.isDown || this.nav_left) {
			player.setVelocityX(this.speed * -1)
			player.setVelocityY(0)
		} else if (this.cursor.right.isDown || this.nav_right) {
			player.setVelocityX(this.speed)
			player.setVelocityY(0)
		} else if (this.cursor.up.isDown || this.nav_up) {
			player.setVelocityY(this.speed * -1)
			player.setVelocityX(0)
		} else if (this.cursor.down.isDown || this.nav_down) {
			player.setVelocityY(this.speed)
			player.setVelocityX(0)
		} else {
			player.setVelocityX(0)
			player.setVelocityY(0)
		}
	}
	timer() {
		this.score++
	}
}
