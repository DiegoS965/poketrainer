import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-stat-bar',
  templateUrl: './stat-bar.component.html',
  styleUrls: ['./stat-bar.component.sass']
})
export class StatBarComponent implements OnChanges {
  @Input() color = 'bug';
  @Input() value = 0;
  @Input() height = 20;
  @Input() maxValue = 100;
  percentage = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if ('value' in changes || 'maxValue' in changes) {
      this.calculatePercentage();
    }
  }

  private calculatePercentage(): void {
    if (this.maxValue <= 0) {
      this.percentage = 0;
    } else {
      this.percentage = (this.value / this.maxValue) * 100;
    }
  }
}