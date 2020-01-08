import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

/**
 * Layout footer with logo and acknowledgments.
 */
@Component({
  selector: 'kypo2-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
