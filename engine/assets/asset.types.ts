export enum FileType {
    image = 'image',
    animation = 'animation',
}

export interface Asset {
    key: string;
    fileType: FileType;
    load: () => Promise<void>;
}
