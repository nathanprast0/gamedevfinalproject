import Phaser from "phaser"

import PizzaRushScene from "./scenes/PizzaRushScene"
import StartScene from "./scenes/StartScene"

const config = {
	type: Phaser.AUTO,
	parent: "app",
	width: 2048,
	height: 2048,
	physics: {
		default: "arcade",
		arcade: {
			gravity: { y: 200 },
		},
	},
	scene: [PizzaRushScene],
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
	},
}

export default new Phaser.Game(config)
