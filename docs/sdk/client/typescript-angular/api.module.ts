import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { serverSDKConfiguration } from './configuration';
import { HttpClient } from '@angular/common/http';


@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: []
})
export class serverSDKApiModule {
    public static forRoot(configurationFactory: () => serverSDKConfiguration): ModuleWithProviders<serverSDKApiModule> {
        return {
            ngModule: serverSDKApiModule,
            providers: [ { provide: serverSDKConfiguration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: serverSDKApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('serverSDKApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
