import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HttpClientModule } from '@angular/common/http'; 
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; 


bootstrapApplication(AppComponent, {
  providers: [
    HttpClientModule,  
    provideHttpClient(), 
    ...appConfig.providers, provideAnimationsAsync() 
  ],
})
  .catch((err) => console.error(err));
