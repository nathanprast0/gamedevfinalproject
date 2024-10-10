import Phaser from "phaser"
import GameOverScene from "./scenes/GameOverScene"
import HowToPlayScene from "./scenes/HowToPlayScene"
import PizzaRushScene from "./scenes/PizzaRushScene"
import StartScene from "./scenes/StartScene"
import WinScreen from "./scenes/WinScreen"

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
	scene: [StartScene, HowToPlayScene, PizzaRushScene, GameOverScene, WinScreen],
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
	},
}

export default new Phaser.Game(config)
