import Phaser from "phaser"
export default class Enemy extends Phaser.Physics.Arcade.Sprite {
	//-----> This class is usedto create objectsof type sprite

	//-------- There are 3 methods created in this class (spawn, die, update). Complete it by moving on to the next stage! -------//
	constructor(scene, x, y, texture, config) {
		super(scene, x, y, texture)
		this.scene = scene
		this.speed = config.speed
		this.rotationVal = config.rotation
	}
	spawn(positionX) {
		this.setPosition(positionX, -10) //------> The value of X position will be set when this method is called

		this.setActive(true)

		this.setVisible(true)
	}
	die() {
		this.destroy()
	}
	update(time) {
		//----------------WRITE CODE BELOW----------------
		this.setVelocityY(this.speed) // Objects move down

		const gameHeight = this.scene.scale.height
		if (this.y > gameHeight + 5) {
			// If the object crosses the layout’s lower bound, it disappears
			this.die()
		}
	}
}
