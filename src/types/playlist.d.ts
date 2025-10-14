export interface Thumbnails {
    url: string;
    width: number;
    height: number;
}

export interface PlayListItems {
    etag: string;
    id: {
        kind: string;
        videoId: string;
    }
    kind: string;
    snippet: {
        channelId: string;
        channelTitle: string;
        description: string;
        liveBroadcastContent: string;
        publishTime: string;
        publishedAt: string;
        thumbnails: {
            default: Thumbnails;
            medium: Thumbnails;
            high: Thumbnails;
        }
        title: string;
    }
}