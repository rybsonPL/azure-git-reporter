export interface Settings {
  personalInfo: {
    fullName: string;
    managerName: string;
    contractDate: string;
  };
  repositoryInfo: {
    organization: string;
    emails: string[];
    projectNames: string[];
  };
  securityInfo: {
    domainEmail: string;
    token: string;
  };
}
