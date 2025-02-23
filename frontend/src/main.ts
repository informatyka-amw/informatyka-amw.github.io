import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HttpClientModule } from '@angular/common/http'; // Importujemy HttpClientModule
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; // Importujemy provideHttpClient

// Zmieniamy appConfig, aby dodać HttpClientModule
bootstrapApplication(AppComponent, {
  providers: [
    HttpClientModule,   // Dodajemy HttpClientModule do providers
    provideHttpClient(), // Opcjonalnie, można dodać provideHttpClient
    ...appConfig.providers, provideAnimationsAsync() // Przekazujemy pozostałe providers z appConfig
  ],
})
  .catch((err) => console.error(err));
