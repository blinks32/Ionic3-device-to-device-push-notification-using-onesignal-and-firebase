import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import  firebase from 'firebase';
import { OneSignal} from '@ionic-native/onesignal';
import { Platform } from 'ionic-angular';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public platform: Platform, public One: OneSignal) {

  }


  ionViewDidLoad(){
    this.Update_User_Presence()
  }

 //Update The Users Phone Id On Firebase For The First Time.
  Update_User_Presence(){
    //Make refrence to the users database, under the node UserProfile
    let _userprofile = firebase.database().ref(`UserProfile/`);
    //check if we are running on a device.
    if (this.platform.is('cordova')) {
                         //Get the Id
                          this.One.getIds().then( success => {
                            //Update  the database with onesignal_ID
                            _userprofile.update({
                              onesignal_ID: success.userId
                            })
                          })

                        }else{
                              
                          _userprofile.update({
                            onesignal_ID: '12345567890'
                          })

                        }
                }
                      
  

  //send the notification
  Send_Push_Notification_To_Available_Users(){
    //Make refrence to the users database, under the node UserProfile
    let _userprofile = firebase.database().ref(`UserProfile/`);
    let reciever_ID;
    
    //Get the Ids available on the database
    _userprofile.on('value', Snapshot => {
      //snapshot data from the UserProfile node
    let key = Snapshot.key
    reciever_ID = Snapshot.val().onesignal_ID
    })

    ///Push The Notification
    if (this.platform.is('cordova')) {
    let notificationObj:any = {
      include_player_ids:  reciever_ID,
      contents: {en: "Hello, This Is My First Notification With Onesignal"},
      };
  
  this.One.postNotification(notificationObj).then( success => {
      console.log("Notification Post Success:", success);
    }, error => {
      console.log(error);
      alert("Notification Post Failed:\n" + JSON.stringify(error));
    });
   
  }

  }
  
  
}
