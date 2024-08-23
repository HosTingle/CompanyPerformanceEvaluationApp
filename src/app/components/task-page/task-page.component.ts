import { Component, Inject, OnInit, AfterViewInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-task-page',
  standalone: true,
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.css']
})
export class TaskPageComponent implements OnInit, AfterViewInit {
  private platformId: Object;
  private completedTasks = 0; // Tamamlanan görev sayısı
  private totalTasks = 0; // Toplam görev sayısı

  constructor(@Inject(PLATFORM_ID) private platform: Object) {
    this.platformId = platform;
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.totalTasks = document.querySelectorAll('.gorev-card').length; // Toplam görev sayısını hesapla
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setProgress();
    }
  }

  setProgress() {
    if (isPlatformBrowser(this.platformId)) {
      const circles = document.querySelectorAll('.progress-circle');
      circles.forEach(circle => {
        const progress = circle.getAttribute('data-progress');
        if (progress) {
          (circle as HTMLElement).style.setProperty('--progress', `${progress}%`);
        }
      });
    }
  }

  public showContent(donem: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const contents = document.querySelectorAll('.content');
      contents.forEach(content => {
        (content as HTMLElement).classList.remove('active');
      });
      const selectedContent = document.getElementById(donem);
      if (selectedContent) {
        (selectedContent as HTMLElement).classList.add('active');
      }
    }
  }

  public gorevTamamla(event: Event): void {
    const button = event.target as HTMLButtonElement;
    const gorevCard = button.parentElement as HTMLElement;
    
    if (gorevCard.classList.contains('tamamlandi')) return;
    
    gorevCard.classList.add('tamamlandi');
    button.disabled = true;
    button.textContent = 'Tamamlandı';

    this.completedTasks++;
    this.updateProgress();
  }

  private updateProgress(): void {
    const progressPercentage = (this.completedTasks / this.totalTasks) * 100;
    
    const progressElement = document.getElementById('progress-percentage');
    if (progressElement) {
      progressElement.textContent = `${progressPercentage.toFixed(0)}%`;
    }
    
    const progressCircle = document.getElementById('progress-circle');
    if (progressCircle) {
      progressCircle.style.setProperty('--progress', `${progressPercentage * 3.6}deg`);
    }
  }
}
