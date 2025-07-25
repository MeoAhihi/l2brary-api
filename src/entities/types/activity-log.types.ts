export enum ActivityEventType {
  MEMBER_REGISTERED = 'MEMBER_REGISTERED',
  CLASS_ATTENDED = 'CLASS_ATTENDED',
  PRESENTATION_DELIVERED = 'PRESENTATION_DELIVERED',
  GAME_SCORE_RECORDED = 'GAME_SCORE_RECORDED',
  BLOG_POST_CREATED = 'BLOG_POST_CREATED',
  PRACTICE_SESSION_LOGGED = 'PRACTICE_SESSION_LOGGED',
}

// Example structure for the 'details' object
export interface ClassAttendedDetails {
  classId: string;
  className: string;
}

export interface BlogPostCreatedDetails {
  postId: string;
  postTitle: string;
}
