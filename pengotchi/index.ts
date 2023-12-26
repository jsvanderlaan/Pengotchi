import { TextObject } from '../engine/game-objects/text-object';
import { GameBuilder } from '../engine/game/game-builder';
import { Scene } from '../engine/scene/scene';

const fps = new TextObject();

const scene: Scene = new Scene('one', () => {}).add(fps);

GameBuilder.create('Pengotchi')
    .config({ width: 764, height: 1024 })
    .addScenes(scene)
    .onStep(game => fps.setText(game._loop?.fps.toString() ?? ''))
    .build()
    .then(game => game.start());
