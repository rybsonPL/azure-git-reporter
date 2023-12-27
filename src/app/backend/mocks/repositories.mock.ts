import { RepositoriesDto } from '@backend/models';

export const repositoriesMock: RepositoriesDto = {
  value: [
    {
      id: '11111-1111-111-11-1',
      name: 'repo1',
      url: 'https://dev.azure.com/OrganizationName/organization/_apis/git/repositories/11111-1111-111-11-1',
      project: {
        id: 'organization',
        name: 'ProjectName',
        url: 'https://dev.azure.com/OrganizationName/_apis/projects/organization',
        state: 'wellFormed',
      },
      remoteUrl: 'https://OrganizationName@dev.azure.com/OrganizationName/ProjectName/_git/repo1',
    },
    {
      id: '22222-2222-222-22-2',
      name: 'repo2',
      url: 'https://dev.azure.com/OrganizationName/organization/_apis/git/repositories/22222-2222-222-22-2',
      project: {
        id: 'organization',
        name: 'ProjectName',
        url: 'https://dev.azure.com/OrganizationName/_apis/projects/organization',
        state: 'wellFormed',
      },
      remoteUrl: 'https://OrganizationName@dev.azure.com/OrganizationName/ProjectName/_git/repo2',
    },
    {
      id: '33333-3333-333-33-3',
      name: 'repo3',
      url: 'https://dev.azure.com/OrganizationName/organization/_apis/git/repositories/33333-3333-333-33-3',
      project: {
        id: 'organization',
        name: 'ProjectName',
        url: 'https://dev.azure.com/OrganizationName/_apis/projects/organization',
        state: 'wellFormed',
      },
      remoteUrl: 'https://OrganizationName@dev.azure.com/OrganizationName/ProjectName/_git/repo3',
    },
  ],
  count: 3,
};
