export interface CommitsDto {
  count: number;
  value: CommitDto[];
}

export interface CommitDto {
  commitId: string;
  author: AuthorDto;
  committer: CommitterDto;
  comment: string;
  commentTruncated?: boolean;
  changeCounts: ChangeCountsDto;
  url: string;
  remoteUrl: string;
}

export interface AuthorDto {
  name: string;
  email: string;
  date: string;
}

export interface CommitterDto {
  name: string;
  email: string;
  date: string;
}

export interface ChangeCountsDto {
  Add: number;
  Edit: number;
  Delete: number;
}
