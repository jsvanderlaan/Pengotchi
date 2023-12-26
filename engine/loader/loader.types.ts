export enum FileType {
    image = 'image',
}

export interface File {
    key: string;
    fileType: FileType;
    load: () => Promise<void>;
}
