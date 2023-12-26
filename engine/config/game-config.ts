export interface GameConfig {
    width: number;
    height: number;
    canvas?: HTMLCanvasElement;
}

export const DEFAULT_GAME_CONFIG: GameConfig = {
    width: 1024,
    height: 768,
};
