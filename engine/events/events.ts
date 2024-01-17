import { Game } from '../game/game';
import { Scene } from '../scene/scene';

export enum Events {
    dom_content_loaded = 'dom_content_loaded',

    game_booted = 'game_booted',

    scene_booted = 'scene_booted',
    scene_started = 'scene_started',

    fps_updated = 'fps_updated',
}

export interface EventHandlers {
    [Events.dom_content_loaded]: () => void;
    [Events.game_booted]: (game: Game) => void;
    [Events.scene_booted]: (scene: Scene) => void;
    [Events.scene_started]: (scene: Scene) => void;
    [Events.fps_updated]: (fps: number) => void;
}
