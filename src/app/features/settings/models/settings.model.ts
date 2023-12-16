export interface Settings {
  personalInfo: {
    fullName: string;
    managerName: string;
    contractDate: string;
  };
  repositoryInfo: {
    organization: string;
    emails: string[];
    projects: string[];
  };
  securityInfo: {
    domainEmail: string;
    token: string;
  };
}
