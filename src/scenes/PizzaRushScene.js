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
		this.enemySpeed = 650
		this.cursor = undefined
		this.btn = undefined
		this.nav_down = false
		this.nav_up = false
		this.nav_right = false
		this.nav_left = false
		this.score = 0
		this.lives = 3
		this.border = undefined
		this.objects = undefined
		this.counter = 0
		this.level = 1
		this.nextlevel = undefined
		this.backgroundm = undefined
		this.i = 0
		this.spawnrate = 2200
		this.i2 = 0
		this.delaytimer = undefined
		this.objectdeadly = undefined
	}

	preload() {
		this.load.image("background", "images/BG.png")
		this.load.image("player", "images/player.png")
		this.load.image("enemy1", "images/enemy1.png")
		this.load.image("enemy2", "images/enemy2.png")
		this.load.image("enemy3", "images/enemy3.png")
		this.load.image("truckE1", "images/truckE1.png")
		this.load.image("truckE2", "images/truckE2.png")
		this.load.image("btn", "images/ArrowKey.png")
		this.load.image("btn2", "images/ArrowKey2.png")
		this.load.image("Border", "images/Border.png")
		this.load.image("tree2", "images/tree2.png")
		this.load.image("tree", "images/tree.png")
		this.load.image("roadmarker", "images/roadmarker.png")
		this.load.image("endhouse", "images/endhouse.png")
		this.load.image("nextlevel", "images/nextlevel.png")
		this.load.image("cone", "images/cone.png")
		this.load.image("pothole", "images/pothole.png")
		this.load.audio("crash", "sfx/MidnightMotorist-Crash.ogg")
		this.load.audio("oversfx", "sfx/CarHorn.ogg")
		this.load.audio("levelfinish", "sfx/MidnightMotorist-Lap.ogg")
		this.load.audio("bgmsc", "music/Smashing_Windshields_v2.ogg")
		this.load.image("menubtn", "images/menubtn.png")
		// this.load.audio("")
	}

	create() {
		// this.add.image(x, y, "keyName")
		// this.physics.add.sprite(x, y, "keyName")
		// this.physics.add.staticGroup()
		// this.physics.add.group()
		const gameWidth = this.scale.width * 0.5
		const gameHeight = this.scale.height * 0.5
		this.border = this.physics.add.staticGroup()
		this.add.image(gameWidth, gameHeight, "background")
		this.border.create(255, 1000, "Border")
		this.border.create(1795, 1000, "Border")
		this.player = this.createPlayer()
		this.enemies = this.physics.add.group({
			classType: Enemy,
			maxSize: 10, //-----> the number of enemies in one group
			runChildUpdate: true,
		})
		this.objects = this.physics.add.group({
			classType: Enemy,
			runChildUpdate: true,
		})
		this.objectdeadly = this.physics.add.group({
			classType: Enemy,
			runChildUpdate: true,
		})
		this.delaytimer = this.time.addEvent({
			delay: 2200,
			callback: this.spawnEnemy,
			callbackScope: this, //--------------------> Calling a method named spawnEnemy
			loop: true,
		})
		this.time.addEvent({
			delay: 2500,
			callback: this.spawnObject,
			callbackScope: this, //--------------------> Calling a method named spawnEnemy
			loop: true,
		})
		this.time.addEvent({
			delay: 2800,
			callback: this.spawnObject2,
			callbackScope: this, //--------------------> Calling a method named spawnEnemy
			loop: true,
		})
		this.time.addEvent({
			delay: 2800,
			callback: this.spawnObject3,
			callbackScope: this, //--------------------> Calling a method named spawnEnemy
			loop: true,
		})
		this.time.addEvent({
			delay: 2800,
			callback: this.spawnObject6,
			callbackScope: this, //--------------------> Calling a method named spawnEnemy
			loop: true,
		})
		this.time.addEvent({
			delay: 2200,
			callback: this.spawnObject7,
			callbackScope: this, //--------------------> Calling a method named spawnEnemy
			loop: true,
		})

		this.cursor = this.input.keyboard.createCursorKeys()
		this.createButton()
		this.scoreText = this.add
			.text(50, 40, "Score", {
				color: "#ff1414",
				// @ts-ignore
				fontSize: 110,
				fontFamily: "Quicksand",
			})
			.setDepth(5)
		this.livesText = this.add
			.text(1620, 40, "Lives", {
				color: "#ff1414",
				//@ts-ignore
				fontSize: 110,
				fontFamily: "Quicksand",
				depth: 5,
			})
			.setDepth(5)
		this.levelText = this.add
			.text(800, 20, "Level", {
				color: "#ff1414",
				//@ts-ignore
				fontSize: 110,
				fontFamily: "Quicksand",
				depth: 5,
			})
			.setDepth(5)
		this.time.addEvent({
			delay: 50,
			callback: this.timer,
			callbackScope: this, //--------------------> Calling a method named spawnEnemy
			loop: true,
		})
		this.physics.add.overlap(this.player, this.enemies, this.hit, null, this)
		this.physics.add.overlap(
			this.player,
			this.objectdeadly,
			this.hit,
			null,
			this
		)
		this.physics.add.collider(this.player, this.border)
		this.backgroundm = this.sound.add("bgmsc")
		this.levelsfx = this.sound.add("levelfinish")
		this.crashsfx = this.sound.add("crash")
		this.menuButton = this.add
			.image(gameWidth - 40, gameHeight - 760, "menubtn")
			.setInteractive()
			.setScale(1)
			.setDepth(4)
		this.menuButton.once("pointerup", () => {
			this.scene.start("start-scene") // This is the code to switch scenes. Filled with the key written in the super code in the constructor method
			this.sound.stopAll()
		})
	}
	update(time) {
		this.movePlayer(this.player)
		this.scoreText.setText("Score : " + this.score)
		this.livesText.setText("Lives : " + this.lives)
		this.levelText.setText("Level : " + this.level)
		if ((this.score + 40) % 500 == 0) {
			this.spawnObject4()
		}
		if (this.score == 0) {
			this.sound.stopAll()
		}
		if (this.score == 1) {
			var soundConfig2 = {
				loop: true, // sound configuration
				volume: 1,
			}
			this.backgroundm.play(soundConfig2)
		}
		if (this.score == 500) {
			// @ts-ignore
			this.delaytimer.delay -= 50
		}
		if (this.score == 1000) {
			// @ts-ignore
			this.delaytimer.delay -= 50
		}
		if (this.score == 1500) {
			// @ts-ignore
			this.delaytimer.delay -= 50
		}
		if (this.score == 2000) {
			// @ts-ignore
			this.delaytimer.delay -= 50
		}
		if (this.score == 2500) {
			// @ts-ignore
			this.delaytimer.delay -= 50
		}
		if (this.level == 11) {
			this.sound.stopAll()
			this.sound.play("levelfinish")
			this.scene.start("win-screen")
		}
	}
	createPlayer() {
		const player = this.physics.add.sprite(1020, 1680, "player")
		player.setDepth(3)
		player.setCollideWorldBounds(true)
		player.setOffset(0, 10)
		return player
	}
	spawnEnemy() {
		var config = {
			speed: this.enemySpeed, //-----------> Set the speed and rotation size of the enemy
		}
		console.log(this.enemySpeed)
		console.log(this.delaytimer.delay)
		const cars = ["enemy1", "enemy2", "enemy3"]
		// if (this.level > 4) {
		// 	cars[3] = "truckE1"
		// 	cars[4] = "truckE2"
		//}
		// @ts-ignore
		const enemy = this.enemies.get(
			0,
			0,
			cars[Math.floor(Math.random() * cars.length)],
			// @ts-ignore
			config
		)
		enemy.setOffset(0, -10)
		if (this.counter == 1) {
			var positionX = Phaser.Math.Between(525, 815)
			if (this.level > 2) {
				enemy.setVelocityX(Phaser.Math.Between(1, 13))
			}
		} else if (this.counter == 0) {
			var positionX = Phaser.Math.Between(1200, 1520)
			if (this.level > 2) {
				enemy.setVelocityX(Phaser.Math.Between(-1, -13))
			}
		}
		if (enemy) {
			enemy.spawn(positionX) //--------------> Calling the spawn method with the x-position value parameter
			// }
			enemy.setDepth(3)
			enemy.setFlipY(false)
		}
	}
	spawnObject() {
		const config = {
			speed: 512,
		}
		const treeArr = ["tree", "tree2"]
		const object = this.objects.get(
			0,
			0,
			// @ts-ignore
			treeArr[this.counter],
			// @ts-ignore
			config
		)

		if (this.counter == 1) {
			var positionX = 130
			this.counter--
		} else if (this.counter == 0) {
			var positionX = 1920
			this.counter++
		}
		if (object) {
			object.spawn(positionX)
		}
	}
	spawnObject2() {
		const config = {
			speed: 512,
		}
		const object = this.objects
			.get(
				0,
				0,
				// @ts-ignore
				"roadmarker",
				// @ts-ignore
				config
			)
			.setDepth(0.1)
		let positionX = 650
		if (object) {
			object.spawn(positionX)
		}
	}
	spawnObject3() {
		const config = {
			speed: 512,
		}
		const object = this.objects.get(
			0,
			0,
			// @ts-ignore
			"roadmarker",
			// @ts-ignore
			config
		)
		let positionX = 1390
		if (object) {
			object.spawn(positionX)
		}
	}
	spawnObject4() {
		const config = {
			speed: 512,
		}
		const object = this.objects.get(
			0,
			0,
			// @ts-ignore
			"endhouse",
			// @ts-ignore
			config
		)
		let positionX = 1950
		if (object) {
			object.spawn(positionX)
			object.setDepth(4.5)
		}
	}
	spawnObject5 = async () => {
		const delay = (ms) => new Promise((res) => setTimeout(res, ms))
		const nextlvl = this.add.image(1000, 500, "nextlevel").setDepth(5.1)
		this.levelsfx.play()
		nextlvl.setScale(2.5)
		await delay(2000)
		nextlvl.destroy()
	}
	spawnObject6() {
		const config = {
			speed: 500,
		}
		const objectArr = ["cone"]
		if (this.level > 5) {
			var objects = this.objectdeadly
				.get(
					0,
					0,
					// @ts-ignore
					objectArr[0],
					// @ts-ignore
					config
				)
				.setScale(0.18)
		}
		var positionX = 1010
		if (objects) {
			objects.spawn(positionX)
		}
	}
	spawnObject7() {
		const config = {
			speed: 500,
		}
		const objectArr = ["pothole"]
		if (this.level > 7) {
			var objects = this.objectdeadly
				.get(
					0,
					0,
					// @ts-ignore
					objectArr[0],
					// @ts-ignore
					config
				)
				.setScale(0.24)
		}
		if (this.counter == 1) {
			var positionX = 1550
		} else if (this.counter == 0) {
			var positionX = 500
		}
		if (objects) {
			objects.spawn(positionX)
		}
	}
	createButton() {
		this.input.addPointer(4)

		let nav_up = this.add
			.image(1800, 1350, "btn")
			.setInteractive()
			.setScale(0.7)
			.setDepth(5)
			.setAlpha(0.8)

		let nav_down = this.add
			.image(1800, 1760, "btn")
			.setInteractive()
			.setScale(0.7)
			.setDepth(5)
			.setAlpha(0.8)
			.setFlipY(true)

		let nav_left = this.add
			.image(180, 1650, "btn2")
			.setInteractive()
			.setScale(0.7)
			.setDepth(5)
			.setAlpha(0.8)

		let nav_right = this.add
			.image(600, 1650, "btn2")
			.setInteractive()
			.setScale(0.7)
			.setDepth(5)
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
		if (this.score % 500 == 0) {
			this.level++
			this.spawnObject5()
			if (this.level > 1 && this.level < 9) {
				for (this.i = 0; this.i < 40; this.i++) {
					this.enemySpeed++
				}
			}
			if (this.lives < 3) {
				this.lives = 3
			}
		}
	}
	hit(player, enemy) {
		enemy.die()
		this.lives--
		this.crashsfx.play()
		if (this.lives == 0) {
			this.sound.stopAll()
			this.sound.play("oversfx")
			this.scene.start("over-scene")
			// this.sound.play("gameover")
		}
	}
}
