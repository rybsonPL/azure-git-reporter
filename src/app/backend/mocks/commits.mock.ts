import { CommitsDto } from '@backend/models';

export const commitsMock: CommitsDto = {
  count: 5,
  value: [
    {
      commitId: '1111111111',
      author: {
        name: 'CommiterName',
        email: 'commmiter@email.com',
        date: '2023-12-21T08:59:15Z',
      },
      committer: {
        name: 'CommiterName',
        email: 'commmiter@email.com',
        date: '2023-12-21T08:59:15Z',
      },
      comment: 'refactor(): comment 1',
      changeCounts: {
        Add: 0,
        Edit: 1,
        Delete: 0,
      },
      remoteUrl: 'https://dev.azure.com/OrganizationName/ProjectName/_git/repo1/commit/1111111111',
      url: 'http://www.url.com/commit1',
    },
    {
      commitId: '2222222222',
      author: {
        name: 'CommiterName',
        email: 'commmiter@email.com',
        date: '2023-12-21T08:56:16Z',
      },
      committer: {
        name: 'CommiterName',
        email: 'commmiter@email.com',
        date: '2023-12-21T08:56:16Z',
      },
      comment: 'refactor(): comment 2',
      changeCounts: {
        Add: 0,
        Edit: 1,
        Delete: 0,
      },
      remoteUrl: 'https://dev.azure.com/OrganizationName/ProjectName/_git/repo1/commit/2222222222',
      url: 'http://www.url.com/commit2',
    },
    {
      commitId: '3333333333',
      author: {
        name: 'CommiterName',
        email: 'commmiter@email.com',
        date: '2023-12-20T18:57:07Z',
      },
      committer: {
        name: 'CommiterName',
        email: 'commmiter@email.com',
        date: '2023-12-20T18:57:07Z',
      },
      comment: 'refactor(): comment 3',
      changeCounts: {
        Add: 0,
        Edit: 1,
        Delete: 0,
      },
      remoteUrl: 'https://dev.azure.com/OrganizationName/ProjectName/_git/repo3/commit/3333333333',
      url: 'http://www.url.com/commit3',
    },
    {
      commitId: '4444444444',
      author: {
        name: 'CommiterName',
        email: 'commmiter@email.com',
        date: '2023-12-20T18:45:58Z',
      },
      committer: {
        name: 'CommiterName',
        email: 'commmiter@email.com',
        date: '2023-12-20T18:55:19Z',
      },
      comment: 'refactor(): comment 4',
      changeCounts: {
        Add: 0,
        Edit: 5,
        Delete: 0,
      },
      remoteUrl: 'https://dev.azure.com/OrganizationName/ProjectName/_git/repo3/commit/4444444444',
      url: 'http://www.url.com/commit4',
    },
    {
      commitId: '5555555555',
      author: {
        name: 'Rybski Mariusz (YIAIC)',
        email: 'commmiter@email.com',
        date: '2023-12-20T15:02:26Z',
      },
      committer: {
        name: 'Rybski Mariusz (YIAIC)',
        email: 'commmiter@email.com',
        date: '2023-12-20T15:02:26Z',
      },
      comment: 'refactor(): comment 5',
      commentTruncated: true,
      changeCounts: {
        Add: 0,
        Edit: 9,
        Delete: 0,
      },
      remoteUrl: 'https://dev.azure.com/OrganizationName/ProjectName/_git/repo3/commit/5555555555',
      url: 'http://www.url.com/commit5',
    },
  ],
};
