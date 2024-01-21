import { DatePipe } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { ReportPdfRow } from '@features/generate-report/models';
import { SettingsService } from '@features/settings';
import { LATO_FONT } from 'assets/fonts';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';

@Injectable()
export class GenerateReportPdfService {
  private readonly settingsService = inject(SettingsService);

  private readonly personalInfoSettings = this.settingsService.personalInfoSettings;
  private readonly lineWidth = { right: 0.1, left: 0.1, bottom: 0.1, top: 0.1 };
  private readonly datePipe = new DatePipe('pl-PL');

  public generate({ reportRows, generationDate }: { reportRows: ReportPdfRow[]; generationDate: Date }) {
    const file = new jsPDF({ orientation: 'l', unit: 'px', compress: true });
    this.setupFont(file);

    autoTable(file, {
      showHead: 'firstPage',
      rowPageBreak: 'avoid',
      styles: {
        lineColor: '#757575',
        lineWidth: this.lineWidth,
        fontSize: 9,
        font: 'Lato-Regular',
        fontStyle: 'normal',
        textColor: '#000',
      },
      headStyles: {
        fillColor: '#b2b2b2',
        overflow: 'linebreak',
        cellWidth: 'wrap',
        valign: 'middle',
      },
      columnStyles: {
        0: {
          cellWidth: 40,
        },
        1: {
          cellWidth: 70,
        },
        2: {
          cellWidth: 75,
        },
        3: {
          cellWidth: 100,
        },
        4: {
          cellWidth: 75,
        },
      },
      margin: 10,
      head: this.getHeaders(generationDate),
      body: this.getBody(reportRows),
      foot: this.getFooter(generationDate),
      showFoot: 'lastPage',
      footStyles: {
        fillColor: '#fff',
      },
    });

    file.save(this.getFileName());
  }

  private setupFont(file: jsPDF): void {
    file.addFileToVFS('Lato-Regular.ttf', LATO_FONT);
    file.addFont('Lato-Regular.ttf', 'Lato-Regular', 'normal');
  }

  private getHeaders(generationDate: Date): RowInput[] {
    return [
      [{ content: `Pracownik: ${this.personalInfoSettings()!.fullName}`, colSpan: 6 }],
      [
        {
          content:
            `Przełożony akceptujący rejestr utworów: ${this.personalInfoSettings()!.managerName}` +
            '\n' +
            `Data sporządzenia: ${this.datePipe.transform(generationDate, 'shortDate')}` +
            '\n' +
            `Kwota wynagrodzenia za przeniesienie majątkowych praw autorskich do utworów zgodnie z umową o pracę z dnia: ${this.datePipe.transform(
              this.personalInfoSettings()!.contractDate,
              'shortDate'
            )}`,
          colSpan: 6,
          styles: { fontStyle: 'normal' },
        },
      ],
      [
        'Projekt',
        'Rodzaj dzialalności twórczej',
        'Rodzaj utworu',
        'Nazwa utworu',
        'Data powstania utworu',
        'Miejsce przechowywania utworu',
      ],
    ];
  }

  private getBody(reportRows: ReportPdfRow[]): RowInput[] {
    return reportRows.map(row => [
      row.project,
      'programowanie',
      this.mapChangeType(row.changeType),
      row.item.path,
      this.datePipe.transform(row.commitDate, 'short'),
      row.item.url,
    ]);
  }

  private mapChangeType(changeType: string): string {
    return `Plik źródłowy z kodem ${changeType === 'add' ? 'nowego' : 'zmodyfikowanego'} modułu w aplikacji`;
  }

  private getFooter(generationDate: Date): RowInput[] {
    return [
      [
        {
          colSpan: 6,
          content: 'Utwory zostały/nie zostały* zaakceptowane przez pracodawcę.',
        },
      ],
      [
        {
          colSpan: 6,
          content:
            'W związku z brzmieniem przepisów ustawy o podatku dochodowym od osób fizycznych, oświadczam, że wykonuję działalność twórczą w zakresie programów komputerowych/sztuk plastycznych/twórczości audiowizualnej/innej działalności określonej w art. 22 ust. 9b ww. ustawy*, i jednocześnie wnoszę/nie wnoszę* o potrącanie zaliczek na poczet podatku dochodowego od osób fizycznych, z uwzględnieniem 50% kosztów uzyskania przychodów od kwoty wynagrodzenia za przeniesienie majątkowych praw autorskich do utworów.',
        },
      ],
      [
        {
          colSpan: 4,
          content: 'Podpis pracodawcy, data:',
          styles: {
            minCellHeight: 15,
            lineWidth: { ...this.lineWidth, right: 0, bottom: 0 },
          },
        },
        {
          colSpan: 2,
          content: 'Podpis pracownika, data:',
          styles: {
            lineWidth: { ...this.lineWidth, left: 0, bottom: 0 },
          },
        },
      ],
      [
        {
          colSpan: 4,
          styles: { minCellHeight: 50, lineWidth: { ...this.lineWidth, right: 0, top: 0 } },
          content: '',
        },
        {
          colSpan: 2,
          content: `${this.datePipe.transform(generationDate, 'shortDate')}`,
          styles: {
            lineWidth: { ...this.lineWidth, left: 0, top: 0 },
          },
        },
      ],
    ];
  }

  private getFileName(): string {
    const date = new Date();
    const name = this.personalInfoSettings()!.fullName.split(' ').join('_');

    return `${date.getFullYear()}.${date.getMonth() + 1}_${name}.pdf`;
  }
}
