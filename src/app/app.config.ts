import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
export const appConfig: ApplicationConfig = {

  providers: [provideHttpClient(withFetch()),provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(),importProvidersFrom(HttpClientModule),  provideToastr(),],
  
};
