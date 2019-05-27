import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Subscription} from "rxjs";
import {SandboxAllocationService} from "../../../../services/organizer/sandbox-allocation/sandbox-allocation.service";

@Component({
  selector: 'app-sandbox-allocation-panel',
  templateUrl: './sandbox-allocation-panel.component.html',
  styleUrls: ['./sandbox-allocation-panel.component.css']
})
export class SandboxAllocationPanelComponent implements OnInit, OnDestroy {

  @Output() closeEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() maximizeEvent: EventEmitter<boolean> = new EventEmitter();

  isExpanded = false;
  unseenSandboxStateChanges = 0;

  private _sandboxStateChangeSubscription: Subscription;

  constructor(private sandboxAllocationService: SandboxAllocationService) { }

  ngOnInit(): void {
    this.subscribeSandboxStateChange();
  }

  ngOnDestroy(): void {
    if (this._sandboxStateChangeSubscription) {
      this._sandboxStateChangeSubscription.unsubscribe();
    }
  }

  close() {
    this.closeEvent.emit(true);
    this.unseenSandboxStateChanges = 0;
  }

  minimize() {
    this.maximizeEvent.emit(false);
    this.isExpanded = false;
  }

  maximize() {
    this.maximizeEvent.emit(true);
    this.isExpanded = true;
    this.unseenSandboxStateChanges = 0;
  }

  private subscribeSandboxStateChange() {
    this._sandboxStateChangeSubscription = this.sandboxAllocationService.instancesStateChange
      .subscribe(sandboxStateChange => {
        if (!this.isExpanded) {
          this.unseenSandboxStateChanges++;
        }
      })
  }
}
