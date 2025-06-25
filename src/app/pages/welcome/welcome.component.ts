
import { Component, OnInit, OnDestroy, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LoginComponent,
    RegisterComponent
  ]
})
export class WelcomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private videoElement: HTMLVideoElement | null = null;
  private canPlayListener: (() => void) | null = null;
  private interactionListener: (() => void) | null = null;

  showLogin: boolean = false;
  showRegister: boolean = false;
  isClosing: boolean = false;

  constructor(private el: ElementRef) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.videoElement = this.el.nativeElement.querySelector('.video-background video');

      if (!this.videoElement) {
        console.error("WelcomeComponent: Video element could not be found.");
        return;
      }
      
      this.canPlayListener = () => {
        this.attemptToPlayVideo();
      };
      
      this.videoElement.addEventListener('canplay', this.canPlayListener);

    }, 0);
  }

  private attemptToPlayVideo(): void {
    if (!this.videoElement) return;

    const playPromise = this.videoElement.play();

    if (playPromise !== undefined) {
      playPromise.catch(error => {
        if (error.name === 'NotAllowedError') {
          console.warn('Autoplay was prevented. Waiting for the first user interaction.');
          
          this.interactionListener = () => {
            this.videoElement!.play().then(() => {
              console.log('Video started playing after user interaction.');
            }).catch(err => {
              console.error('Failed to play video even after interaction.', err);
            });
            this.removeInteractionListener();
          };
          document.addEventListener('click', this.interactionListener);
          document.addEventListener('touchend', this.interactionListener);

        } else {
          console.error("An unexpected error occurred while trying to play the video.", error);
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.videoElement && this.canPlayListener) {
      this.videoElement.removeEventListener('canplay', this.canPlayListener);
    }
    this.removeInteractionListener();
  }

  private removeInteractionListener(): void {
    if (this.interactionListener) {
      document.removeEventListener('click', this.interactionListener);
      document.removeEventListener('touchend', this.interactionListener);
      this.interactionListener = null;
    }
  }

  openLoginModal(): void {
    this.showRegister = false;
    this.showLogin = true;
    this.isClosing = false;
  }

  openRegisterModal(): void {
    this.showLogin = false;
    this.showRegister = true;
    this.isClosing = false;
  }

  closeModals(): void {
    this.isClosing = true;
    setTimeout(() => {
      this.showLogin = false;
      this.showRegister = false;
      this.isClosing = false;
    }, 300); 
  }
}
