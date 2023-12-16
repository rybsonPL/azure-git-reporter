import { inject } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

export function primengConfig() {
  const config = inject(PrimeNGConfig);

  config.ripple = true;
  config.setTranslation({
    firstDayOfWeek: 1,
    dateFormat: 'dd.mm.yy',
  });
}
