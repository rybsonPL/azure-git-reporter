import { DatePipe } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { ReportData } from '@features/generate-report/models/report-data.model';
import { SettingsService } from '@features/settings';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';

@Injectable({ providedIn: 'root' })
export class GenerateReportPdfService {
  private readonly settingsService = inject(SettingsService);

  private readonly settings = this.settingsService.getSettings();
  private readonly lineWidth = { right: 0.1, left: 0.1, bottom: 0.1, top: 0.1 };
  private readonly datePipe = new DatePipe('pl-PL');

  public generate({ changes, generationDate }: ReportData) {
    const file = new jsPDF({ orientation: 'l', unit: 'px' });

    autoTable(file, {
      showHead: 'firstPage',
      rowPageBreak: 'avoid',
      styles: {
        lineColor: '#777',
        lineWidth: this.lineWidth,
        fontSize: 9,
        // font: 'Roboto-Medium',
        fontStyle: 'normal',
      },
      headStyles: {
        textColor: '#000',
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
      body: this.getBody(changes),
      foot: this.getFooter(generationDate),
      showFoot: 'lastPage',
      footStyles: {
        textColor: '#000',
        fillColor: '#fff',
      },
    });

    file.save(this.getFileName());
  }

  private getHeaders(generationDate: Date): RowInput[] {
    return [
      [{ content: `Pracownik: ${this.settings()?.personalInfo.fullName}`, colSpan: 6 }],
      [
        {
          content:
            `Przełożony akceptujący rejestr utworów: ${this.settings()?.personalInfo.managerName}` +
            '\n' +
            `Data sporządzenia: ${this.datePipe.transform(generationDate, 'shortDate')}` +
            '\n' +
            `Kwota wynagrodzenia za przeniesienie majątkowych praw autorskich do utworów zgodnie z umową o pracę z dnia: ${this.datePipe.transform(
              this.settings()?.personalInfo.contractDate,
              'shortDate'
            )}`,
          colSpan: 6,
          styles: { fontStyle: 'normal' },
        },
      ],
      [
        'Projekt',
        'Rodzaj dzialalnosci twórczej',
        'Rodzaj utworu',
        'Nazwa utworu',
        'Data powstania utworu',
        'Miejsce przechowywania utworu',
      ],
    ];
  }

  private getBody(changes: ReportData['changes']): RowInput[] {
    return changes
      .flatMap(({ project, changes, commitDate }) => changes.flatMap(change => ({ ...change, project, commitDate })))
      .sort((a, b) => a.commitDate.getTime() - b.commitDate.getTime())
      .map(change => [
        change.project,
        'programowanie',
        this.mapChangeType(change.changeType),
        change.item.path,
        this.datePipe.transform(change.commitDate, 'short'),
        change.item.url,
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
            lineWidth: { ...this.lineWidth, right: 0 },
          },
        },
        {
          colSpan: 2,
          content: 'Podpis pracownika, data:',
          styles: {
            lineWidth: { ...this.lineWidth, left: 0 },
          },
        },
      ],
      [
        {
          colSpan: 4,
          styles: { minCellHeight: 50, lineWidth: { ...this.lineWidth, top: 0 } },
          content: '',
        },
        // TODO add signature
        {
          colSpan: 2,
          content: `${this.datePipe.transform(generationDate, 'shortDate')}`,
          styles: {
            lineWidth: { ...this.lineWidth, top: 0, left: 0 },
          },
        },
      ],
    ];
  }

  private getFileName(): string {
    const date = new Date();
    const name = this.settings()?.personalInfo.fullName.split(' ').join('_');

    return `${date.getFullYear()}.${date.getMonth() + 1}_${name}.pdf`;
  }
}
