import { Events } from '../engine/events/events';
import { TextObject } from '../engine/game-objects/text-object';
import { GameBuilder } from '../engine/game/game-builder';
import { Scene } from '../engine/scene/scene';

const fps = new TextObject();

const scene: Scene = new Scene('one', () => {}).add(fps);

GameBuilder.create('Pengotchi')
    .config({ width: 764, height: 1024 })
    .addScenes(scene)
    .build()
    .then(game => {
        game.events.on(Events.fps_updated, newFps => fps.setText(newFps.toFixed(2)));
        game.start();
    });
