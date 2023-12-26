import { CacheManager } from '../cache/cache-manager';
import { DEFAULT_GAME_CONFIG, GameConfig } from '../config/game-config';
import { DOMUtils } from '../dom/dom-utils';
import { AssetLoader } from '../loader/asset-loader';
import { CanvasRenderer } from '../renderer/canvas-renderer';
import { Scene } from '../scene/scene';
import { SceneManager } from '../scene/scene-manager';
import { Game } from './game';

export class GameBuilder {
    private _config: GameConfig = DEFAULT_GAME_CONFIG;
    private _scenes: Scene[] = [];
    private _onStep: (game: Game) => void = () => {};

    private constructor(private readonly _name: string) {}

    static create(name: string): GameBuilder {
        return new GameBuilder(name);
    }

    config(config: Partial<GameConfig>): GameBuilder {
        this._config = { ...this._config, ...config };
        return this;
    }

    addScenes(...scenes: Scene[]): GameBuilder {
        this._scenes = this._scenes.concat(scenes);
        return this;
    }

    onStep(onStep: (game: Game) => void): GameBuilder {
        this._onStep = onStep;
        return this;
    }

    build(): Promise<Game> {
        return new Promise((resolve, _) => {
            DOMUtils.onContentLoaded(() =>
                resolve(
                    new Game(
                        this._name,
                        this._config,
                        new CanvasRenderer(this._config),
                        new CacheManager(),
                        new AssetLoader(),
                        new SceneManager(this._scenes),
                        this._onStep
                    )
                )
            );
        });
    }
}
