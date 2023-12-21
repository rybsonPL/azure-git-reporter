export interface GenerateReportFormValue {
  reportDates: [Date, Date];
  generationDate: Date;
  skipMergesToMaster: boolean;
  skipMergesFromMaster: boolean;
}
