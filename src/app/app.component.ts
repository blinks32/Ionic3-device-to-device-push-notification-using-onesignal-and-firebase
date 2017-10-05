import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';
import { OneSignal} from '@ionic-native/onesignal';
import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(public platform: Platform, public statusBar: StatusBar, public One: OneSignal, public splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      
      statusBar.styleDefault();
      splashScreen.hide();
    });
    
  }



  initializeApp(){
    this.platform.ready().then(() => {
      
     let appId = ''
     let googleProjectNumber = ''

    if (this.platform.is('cordova')) {
      this.One.startInit(appId, googleProjectNumber );
      this.One.inFocusDisplaying(this.One.OSInFocusDisplayOption.Notification);
      this.One.setSubscription(true);
      this.One.enableVibrate(true);
      
      this.One.handleNotificationReceived().subscribe((data) => {
        // handle received here how you wish.
        alert(data)
      });
      this.One.handleNotificationOpened().subscribe((data) => {
        // handle opened here how you wish.
        alert(data)
      });
      this.One.endInit();  
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString("#BBBBBB");
      
      setTimeout(() => {
        this.splashScreen.hide();
      }, 500);
      
    }
    });
  }

  
}

