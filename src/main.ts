import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { APP_CONFIG } from '@ddsi-labs-apps/models';
import { appConfig } from './app/app.config';

fetch('./config/config.json')
	.then((resp) => resp.json())
	.then((config) => {
    appConfig.providers.push({ provide: APP_CONFIG, useValue: config });
    bootstrapApplication(AppComponent, appConfig).catch((err) =>
      console.error(err)
    );
	});
