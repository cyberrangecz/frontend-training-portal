import { ElementRef, Injectable } from '@angular/core';
import { SentinelTourGuideConcreteService } from '@sentinel/components/tour-guide';
import { MatDialogActions } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { TourGuideSelectorFormatter } from '../utils/tour-guide-selector-formatter';
import { NavigationEnd } from '@angular/router';

@Injectable()
export class TourStarterService {
  constructor(private tourService: SentinelTourGuideConcreteService) {}

  startTourGuide(event: NavigationEnd, elementRef: ElementRef): Observable<MatDialogActions> {
    return this.tourService.startTourFirstVisit(
      'assets/tour-guide-config.json',
      TourGuideSelectorFormatter.format(event.url),
      elementRef
    );
  }
}
