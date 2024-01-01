import { ChangeDto } from '@backend/models';

export type ReportPdfRow = ChangeDto & { project: string; commitDate: Date };
