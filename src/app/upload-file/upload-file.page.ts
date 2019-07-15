import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { EndpointsService } from '../services/endpoints.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.page.html',
  styleUrls: ['./upload-file.page.scss'],
})
export class UploadFilePage implements OnInit {
  image:any='';
  imageData:any='';

  constructor(
    private camera: Camera,
    private server: EndpointsService,
    private loadingController: LoadingController,
    private toastController: ToastController,
  ) { }

  ngOnInit() {
  }

  openCam(){
    const options: CameraOptions = {
      quality: 100,
      // destinationType: this.camera.DestinationType.FILE_URI,
      destinationType: this.camera.DestinationType.DATA_URL,//base64 formate
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true
    }
    
    this.camera.getPicture(options).then( (imageData) => {
      this.imageData = 'data:image/jpeg;base64,' + imageData;
      this.image=(<any>window).Ionic.WebView.convertFileSrc(this.imageData);
    }, (err) => {
      alert("error "+JSON.stringify(err))
    });
  }
  
  async uploadImg() {
    const loading = await this.loadingController.create({
      message: 'Uploading...',
    });
    await loading.present();

    this.server.uploadImg(this.imageData).subscribe( (res) => {
      loading.dismiss();
      this.presentToast("Successfully uploaded with id "+ res['id']);
    });
  }

  async presentToast(message: string) {
    const toastMessage = await this.toastController.create({
      message: message,
      duration: 3000
    });
    toastMessage.present();
  }
}
