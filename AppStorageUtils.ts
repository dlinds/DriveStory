export interface StoryCollection {
  readonly id: string
  readonly title: string
  readonly items: SavedStory[]
}

export interface SavedStory {
  readonly id: string
  readonly title: string
  readonly audioFilePaths: AudioFile[]
}

export interface AudioFile {
  readonly id: string
  readonly filePath: string
  readonly storyIndex: number
}
