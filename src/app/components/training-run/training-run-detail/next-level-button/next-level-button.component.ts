import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'kypo2-next-level-button',
  templateUrl: './next-level-button.component.html',
  styleUrls: ['./next-level-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NextLevelButtonComponent implements OnInit {

  @Input() isLast: boolean;
  @Output() next: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onNext() {
    this.next.emit();
  }
}
