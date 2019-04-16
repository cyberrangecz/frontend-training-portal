import {Component, OnDestroy, OnInit} from '@angular/core';
import {SandboxAllocationState} from "../../../../enums/sandbox-allocation-state";
import {Subscription} from "rxjs";
import {SandboxAllocationService} from "../../../../services/sandbox-allocation/sandbox-allocation.service";

@Component({
  selector: 'app-sandbox-allocation-content-minimized',
  templateUrl: './sandbox-allocation-content-minimized.component.html',
  styleUrls: ['./sandbox-allocation-content-minimized.component.css']
})
export class SandboxAllocationContentMinimizedComponent implements OnInit, OnDestroy {

  displayedMessage: string;
  isRunning: boolean;

  private _allocationStateChangeSubscription: Subscription;

  constructor(private sandboxAllocationService: SandboxAllocationService) { }

  ngOnInit() {
    this.isRunning = this.sandboxAllocationService.isRunning();
    if (this.isRunning) {
      this.displayedMessage = 'Sandbox allocation in progress...';
    }
    else this.displayedMessage = 'It is not running or whatever...';
    this.subscribeAllocationStateChange();
  }

  ngOnDestroy(): void {
    if (this._allocationStateChangeSubscription) {
      this._allocationStateChangeSubscription.unsubscribe();
    }
  }

  private subscribeAllocationStateChange() {
    this._allocationStateChangeSubscription = this.sandboxAllocationService.allocationStateChange
      .subscribe(allocationStateChange => {
        if (allocationStateChange === SandboxAllocationState.FINISHED) {
          this.isRunning = false;
          this.displayedMessage = 'Sandbox allocation finished.'
        }
        if (allocationStateChange === SandboxAllocationState.FAILED) {
          this.isRunning = this.sandboxAllocationService.isRunning();
          this.displayedMessage = 'Allocation of some sandboxes failed';
        }
        if (allocationStateChange === SandboxAllocationState.RUNNING) {
          this.isRunning = true;
          this.displayedMessage = 'Sandbox allocation in progress...';
        }
      })
  }
}
