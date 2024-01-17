import { AssetFactory } from '../engine/assets/asset-factory';
import { Events } from '../engine/events/events';
import { ImageObject } from '../engine/game-objects/objects/image-object';
import { SpriteObject } from '../engine/game-objects/objects/sprite-object';
import { GameBuilder } from '../engine/game/game-builder';

// const fpsObject = new TextObject().setPosition(30, 30);
// const imgObj = new ImageObject('brawler').setPosition(50, 50);
const bgObj = new ImageObject('bg').setPosition(0, 0).setScale(0.5);
const eggObj = new ImageObject('egg1').setPosition(0, 0).setScale(2);
const animObj = new SpriteObject().setPosition(126, 512).setScale(4);

const bg = AssetFactory.image('bg', './assets/bg.jpg');
const egg = AssetFactory.image('egg1', './assets/piskel/eggs/Egg_001 (1).png');
const eggAnim = AssetFactory.animation('egg_hatch', {
    imgKey: 'egg1',
    frames: [0, 1, 2, 3],
    framerate: 1,
    width: 128,
    height: 128,
});

const game = GameBuilder.new('Pengotchi').config({ width: 764, height: 1024 }).run();

const sceneOne = game.scenes.add('one', scene =>
    scene
        .update((time, delta) => {})
        .assets(bg, egg, eggAnim)
        .gameObjects(bgObj, animObj)
);

// game.events.on(Events.fps_updated, fps => fpsObject.setText(fps.toFixed(2)));

game.events.on(Events.scene_booted, () => {
    animObj.play('egg_hatch');
});
