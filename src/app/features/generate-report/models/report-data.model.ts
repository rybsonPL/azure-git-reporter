import { ChangeDto } from '@backend/models';

export interface ReportData {
  commits: {
    project: string;
    commitDate: Date;
    changes: ChangeDto[];
  }[];
  generationDate: Date;
}
