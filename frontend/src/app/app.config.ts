import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { FacebookModule } from 'ngx-facebook';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { AuthService, authFactory } from './services/auth/auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(FacebookModule.forRoot()),
    importProvidersFrom(NgxEchartsModule.forRoot({ echarts: () => import('echarts') })),
    provideEcharts(),
		{
			provide: APP_INITIALIZER,
			useFactory: authFactory,
			multi: true, 
			deps: [AuthService]
		}
  ]
};
