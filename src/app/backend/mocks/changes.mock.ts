import { ChangesDto } from '@backend/models';

export const changesMock: ChangesDto = {
  changeCounts: {
    Edit: 5,
  },
  changes: [
    {
      item: {
        path: '/src',
        isFolder: true,
        url: 'https://dev.azure.com/OrganizationName/1111111111/_apis/git/repositories/11111-1111-111-11-1/items/src?versionType=Commit&version=71337642eb74633ce29248a38f88f734f673a3c4',
      },
      changeType: 'edit',
    },
    {
      item: {
        path: '/src/app',
        isFolder: true,
        url: 'https://dev.azure.com/OrganizationName/1111111111/_apis/git/repositories/11111-1111-111-11-1/items/src%2Fapp?versionType=Commit&version=71337642eb74633ce29248a38f88f734f673a3c4',
      },
      changeType: 'edit',
    },
    {
      item: {
        path: '/file/patch/test.component.ts',
        url: 'https://dev.azure.com/OrganizationName/1111111111/_apis/git/repositories/11111-1111-111-11-1/items/src%2Fapp%2Fshared%2Fglobal-search%2Fglobal-search.component.ts?versionType=Commit&version=71337642eb74633ce29248a38f88f734f673a3c4',
      },
      changeType: 'edit',
    },
    {
      item: {
        path: '/file/patch',
        isFolder: true,
        url: 'https://dev.azure.com/OrganizationName/1111111111/_apis/git/repositories/11111-1111-111-11-1/items/src%2Fapp%2Fshared%2Fglobal-search?versionType=Commit&version=71337642eb74633ce29248a38f88f734f673a3c4',
      },
      changeType: 'edit',
    },
    {
      item: {
        path: '/file/patch/test2.component.ts',
        url: 'https://dev.azure.com/OrganizationName/1111111111/_apis/git/repositories/11111-1111-111-11-1/items/src%2Fapp%2Fshared%2Fglobal-search%2Fglobal-search.component.ts?versionType=Commit&version=71337642eb74633ce29248a38f88f734f673a3c4',
      },
      changeType: 'edit',
    },
  ],
};
