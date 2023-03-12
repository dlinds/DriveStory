export interface StoryCollection {
  readonly id: string
  readonly title: string
  readonly itemIds: string[]
}

export interface SavedStory {
  readonly storyId: string
  readonly title: string
  readonly audioFilePaths: AudioFile[]
}

export interface AudioFile {
  readonly fileId: string
  readonly filePath: string
  readonly storyIndex: number
}
