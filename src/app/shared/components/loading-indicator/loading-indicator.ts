import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { HlmSpinner } from '@spartan-ng/helm/spinner';

@Component({
  selector: 'app-loading-indicator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HlmSpinner],
  templateUrl: './loading-indicator.html',
  styleUrls: ['./loading-indicator.css'],
})
export class LoadingIndicator {
  text = input('Loading...');
}
