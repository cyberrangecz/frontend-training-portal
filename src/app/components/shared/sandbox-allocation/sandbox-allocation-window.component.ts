import {Component, OnDestroy, OnInit} from '@angular/core';
import {SandboxAllocationBarService} from '../../../services/organizer/sandbox-allocation/sandbox-allocation-bar.service';

@Component({
  selector: 'app-sandbox-allocation',
  templateUrl: './sandbox-allocation-window.component.html',
  styleUrls: ['./sandbox-allocation-window.component.css']
})
export class SandboxAllocationWindowComponent implements OnInit, OnDestroy {

  isMaximized: boolean;

  constructor(private sandboxAllocationBarService: SandboxAllocationBarService) {
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {

  }

  onMaximized(isMaximized: boolean) {
    this.isMaximized = isMaximized;
  }

  onClose($event: boolean) {
    this.sandboxAllocationBarService.close();
  }
}
