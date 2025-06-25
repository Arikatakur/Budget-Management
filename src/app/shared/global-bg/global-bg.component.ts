import { Component, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-global-bg',
  standalone: true,
  templateUrl: './global-bg.component.html',
  styleUrls: ['./global-bg.component.css']
})
export class GlobalBgComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    const waves = (document.querySelectorAll('.bg-wrapper path') as NodeListOf<SVGPathElement>);
    const minS = -120, maxS = 120;
    const minD = 1500, maxD = 4500;
    const rand = (a: number, b: number) => Math.random() * (b - a) + a;

    function hop(el: SVGPathElement) {
      el.style.setProperty('--tx', `${rand(minS, maxS).toFixed(0)}px`);
      el.style.setProperty('--ty', `${rand(minS, maxS).toFixed(0)}px`);
      const dur = rand(minD, maxD);
      el.style.transitionDuration = `${dur}ms`;
      setTimeout(() => hop(el), dur);
    }
    waves.forEach(hop);
  }
}
