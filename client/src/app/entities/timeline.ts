interface TimelineEventTag {
  name: string
  style: any
}

export interface TimelineEvent {
  summary: string
  date: string
  type: string
  author: string
  tags?: TimelineEventTag[]
  description?: string
  style: any
}

export interface Timeline {
  [date: string]: {
    summary?: {
      title?: string,
      style?: any
    },
    events: TimelineEvent[],
  }
}
