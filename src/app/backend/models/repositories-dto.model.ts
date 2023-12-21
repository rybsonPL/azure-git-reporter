export interface RepositoriesDto {
  count: number;
  value: RepositoryDto[];
}

export interface RepositoryDto {
  id: string;
  name: string;
  url: string;
  project: ProjectDto;
  remoteUrl: string;
}

export interface ProjectDto {
  id: string;
  name: string;
  url: string;
  state: string;
}
