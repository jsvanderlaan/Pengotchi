export class DOMUtils {
    static onContentLoaded(callback: () => void) {
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            callback();
            return;
        }

        var onLoaded = () => {
            document.removeEventListener('DOMContentLoaded', onLoaded, true);
            window.removeEventListener('load', onLoaded, true);

            callback();
        };

        document.addEventListener('DOMContentLoaded', onLoaded, true);
        window.addEventListener('load', onLoaded, true);
    }

    static createCanvas(): HTMLCanvasElement {
        const canvas = document.createElement('canvas');
        document.body.appendChild(canvas);
        return canvas;
    }
}
