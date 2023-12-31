import { ChangesDto } from '@backend/models';

export interface ReportData {
  changes: (ChangesDto & { project: string; commitDate: Date })[];
  generationDate: Date;
}
