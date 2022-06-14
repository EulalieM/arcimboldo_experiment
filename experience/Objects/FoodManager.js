import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import foodsData from '../data/foodsData';
import { DragControls } from 'three/examples/jsm/controls/DragControls'
import SceneBase from '../SceneView/Scene/SceneBase';

export default class FoodManager {

    constructor(sceneView) {  
        this.sceneView = sceneView
    }

    load() {
        const loader = new GLTFLoader();

        loader.load( '/assets/food/scene.gltf', ( gltf ) => {

            this.ressources = gltf.scene    

            this.foods = []

            foodsData.foodsData.forEach(food => this.addFood(food.name, food.position, food.scale, food.rotation))

            this.handleDrag()

        }, undefined, function ( error ) {
            console.error( error );
        } );
    }

    addFood(name, position, scale, rotation) {
        const food = this.ressources.getObjectByName(name) // Mesh

        this.foods.push(food)

        food.position.set(position.x, position.y, position.z)

        food.scale.set(scale.x, scale.y, scale.z)

        food.rotation.set(rotation.x, rotation.y, rotation.z)

        this.sceneView.scene.add(food)
    }

    // https://jsfiddle.net/janqhxdu/

    handleDrag() {
        const controls = new DragControls( this.foods, this.sceneView.camera, this.sceneView.renderer.domElement );

        controls.addEventListener( 'dragstart', ( event ) => {
            this.sceneView.controls.enabled = false
            console.log(event)
            // event.object.material.emissive.set( 0xaaaaaa );
        } );

        // controls.addEventListener ( 'drag', function( event ){
        //     // event.object.position.z = 0; // bloque l'axe z
        // })
        
        controls.addEventListener( 'dragend', ( event ) => {
            this.sceneView.controls.enabled = true
            // event.object.material.emissive.set( 0x000000 );
        } );
    }

}