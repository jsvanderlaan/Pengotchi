export type BaseObject = new (...args: any[]) => {};

// todo kijken of dit nodig is
// type GBaseObject<T = {}> = new (...args: any[]) => T;
// export type Scaling = GBaseObject<{ setScale: (scale: number) => void }>;

export interface IRenderable {
    render(canvas: HTMLCanvasElement): void;
}
