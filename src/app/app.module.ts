import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import firebase from 'firebase'
import { OneSignal} from '@ionic-native/onesignal';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

export const firebaseConfig = {
  apiKey: "AIzaSyAoFFCOqDn9fmUWgpJNf_x7ATl8CLO9lTc", //change This to your apiKey
  authDomain: "admob-app-id-8141482590.firebaseapp.com", //change This to your authDomain
  databaseURL: "https://admob-app-id-8141482590.firebaseio.com", //change This to your databaseURL
  storageBucket: "admob-app-id-8141482590.appspot.com", //change This to your storageBucket
  messagingSenderId: "736746868289" //change This to your messagingSenderId
  
};

firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    OneSignal,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
