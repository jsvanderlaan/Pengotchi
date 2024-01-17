import { DEFAULT_GAME_CONFIG, GameConfig } from '../config/game-config';
import { SceneBuilder } from '../scene/scene-builder';
import { Game } from './game';

export class GameBuilder {
    private _config: GameConfig = DEFAULT_GAME_CONFIG;
    private _scenes: Record<string, (sceneBuilder: SceneBuilder) => SceneBuilder> = {};

    private constructor(private readonly _name: string) {}

    static new(name: string): GameBuilder {
        return new GameBuilder(name);
    }

    config(config: Partial<GameConfig>): GameBuilder {
        this._config = { ...this._config, ...config };
        return this;
    }

    scene(name: string, options: (sceneBuilder: SceneBuilder) => SceneBuilder): GameBuilder {
        if (this._scenes[name] !== undefined) {
            throw new Error(`Scene with name ${name} already exists`);
        }
        this._scenes[name] = options;

        return this;
    }

    run(): Game {
        const game = new Game(this._name, this._config);
        Object.entries(this._scenes).forEach(([name, options]) => game.scenes.add(name, options));
        return game;
    }
}
