export interface Post {
    id: string
    title:string
    urlTitle:string
    dateTimestamp: number
    tags: string[]
    thumbnailImageUrl: string
    markdownContent: string
    seoTitleTag: string
    seoMetaDescription: string
}

export interface PostProps {
    post : Post
    getDataError?: boolean
    notFoundError?: boolean
}

export interface PostbyTag {
    posts : Post[]
    getDataError?: boolean
    notFoundError?: boolean
    tag?: string
}