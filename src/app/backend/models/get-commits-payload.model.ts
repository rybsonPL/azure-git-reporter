export interface GetCommitsPayload {
  organization: string;
  project: string;
  repositoryId: string;
  user: string;
  fromDate: string;
  toDate: string;
}
