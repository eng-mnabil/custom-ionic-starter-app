import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { EndpointsService } from '../../services/endpoints.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.page.html',
  styleUrls: ['./upload-file.page.scss'],
})
export class UploadFilePage implements OnInit {
  fileName: any;
  fileType: any;
  filesPath: any;
  filesType = ["txt", "pdf", "doc", "docx", "xls", "xlsx", "rtf", "gif", "csv", "jpg", "png", "jpeg"];

  constructor(
    private transfer: FileTransfer,
    public loadingController: LoadingController,
    private fileChooser: FileChooser,
    private filePath: FilePath,
    private server: EndpointsService,
    private toastController: ToastController,
  ) { }

  ngOnInit() {
  }

   chooseFile() {
    this.fileChooser.open().then(uri=>{
      this.filePath.resolveNativePath(uri).then(filePath=>{
        this.filesPath = filePath;
        this.fileName = filePath.substring(filePath.lastIndexOf("/") + 1);
        this.fileType = this.fileName.substring(this.fileName.lastIndexOf(".") + 1);
        if(this.filesType.indexOf(this.fileType) > -1) {
          this.presentToast("Accepted File type");
          // this.uploadFile();
        }
        else {
          this.presentToast("File type not accepted");
        }
      }).catch(err=>{
        console.log(err);
      })
    }).catch(err=>{
      console.log(err);
    })
  }

   // full example
   async uploadFile() {
    const loading = await this.loadingController.create({
      message: 'Uploading...',
    });
    await loading.present();

    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: this.fileName,
    }

    fileTransfer.upload(this.filesPath, 'https://my-json-server.typicode.com/eng-mnabil/fake-server/users', options)
    .then((data) => {
      // success
      console.log(data);
      loading.dismiss();
      this.presentToast("Successfully uploaded");
    }, (err) => {
      // error
      console.log(err);
      loading.dismiss();
      this.presentToast(err);
    })
  }

  async presentToast(message: string) {
    const toastMessage = await this.toastController.create({
      message: message,
      duration: 3000
    });
    toastMessage.present();
  }

}
