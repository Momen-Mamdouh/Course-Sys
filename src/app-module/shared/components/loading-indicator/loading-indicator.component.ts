import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-module-loading-indicator',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.css'],
})
export class LoadingIndicator {
  @Input() text = 'Loading...';
}
