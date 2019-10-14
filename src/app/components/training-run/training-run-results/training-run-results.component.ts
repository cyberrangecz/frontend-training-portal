import {AfterViewInit, Component, HostListener, OnInit, } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Kypo2AuthService} from 'kypo2-auth';
import {map} from 'rxjs/operators';
import {BaseComponent} from '../../base.component';
@Component({
  selector: 'kypo2-training-run-results',
  templateUrl: './training-run-results.component.html',
  styleUrls: ['./training-run-results.component.css'],
})
/**
 * Component displaying visualization of training run results
 */
export class TrainingRunResultsComponent extends BaseComponent implements OnInit, AfterViewInit {

  display = false;
  vizSize: {width: number, height: number};

  trainingDefinitionId: number;
  trainingInstanceId: number;
  activeUserUco: string;

  constructor(private activatedRoute: ActivatedRoute,
              private authService: Kypo2AuthService) {
    super();
}

  ngOnInit() {
    this.setVisualizationSize(window.innerWidth, innerHeight);
    this.loadData();
  }

  ngAfterViewInit() {
    // hack because visualization components won't render properly
    // (probably because changing the setting of distraction free mode when leaving last level)
    setTimeout(x => this.display = true, 1);
  }

  @HostListener('window:resize')
  onResize(event) {
    this.setVisualizationSize(event.target.innerWidth, event.target.innerHeight);
  }

  loadData() {
    this.activeUserUco = this.parseUcoFromUserLogin();
    this.activatedRoute.data
      .pipe(
        map(data => data.trainingRun)
      )
      .subscribe(tr => {
        this.trainingInstanceId = tr.trainingInstanceId;
        this.trainingDefinitionId = tr.trainingDefinitionId;
      });
  }

  private parseUcoFromUserLogin() {
    return this.authService.getActiveUser().login.split('@')[0];
  }

  private setVisualizationSize(windowWidth: number, windowHeight: number) {
    const divideBy = 2;
      const width = windowWidth / divideBy;
      const height = windowHeight / divideBy;
      this.vizSize = { width: width, height: height };
  }
}
