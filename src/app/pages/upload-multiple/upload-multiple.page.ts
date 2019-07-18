import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { IOSFilePicker } from '@ionic-native/file-picker/ngx';

@Component({
  selector: 'app-upload-multiple',
  templateUrl: './upload-multiple.page.html',
  styleUrls: ['./upload-multiple.page.scss'],
})
export class UploadMultiplePage implements OnInit {
  fileName: any;
  fileType: any;
  filesPath: any;
  filesType = ["txt", "pdf", "doc", "docx", "xls", "xlsx", "rtf", "gif", "csv", "jpg", "png", "jpeg"];
  files = [];

  constructor(
    private transfer: FileTransfer,
    public loadingController: LoadingController,
    private fileChooser: FileChooser,
    private filePath: FilePath,
    private toastController: ToastController,
    private filePicker: IOSFilePicker,
    private platform: Platform
  ) { }

  ngOnInit() {}

  // Choose file, get it's path,name and type 
  // handling Android and IOS
  ////////////////////////////////////////////////////////////
  addFile() {
    if(this.platform.is('android')) {
       this.fileChooser.open().then(uri=>{
         this.filePath.resolveNativePath(uri).then(filePath=>{
           this.filesPath = filePath;
           this.fileName = filePath.substring(filePath.lastIndexOf("/") + 1);
           this.fileType = this.fileName.substring(this.fileName.lastIndexOf(".") + 1);
           if(this.filesType.indexOf(this.fileType) > -1) {
             this.presentToast("Accepted File type");
             this.files.push({
               'name': this.fileName,
               'type': this.fileType,
               'path': this.filesPath
             })
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
    else if(this.platform.is('ios')) {
     this.filePicker.pickFile().then(uri=>  {
       console.log(uri);
       this.filesPath  = uri;
       this.fileName   = this.filesPath.substring(this.filesPath.lastIndexOf("/") + 1);
       this.fileType   = this.fileName.substring(this.fileName.lastIndexOf(".") + 1);
       this.files.push({
        'name': this.fileName,
        'type': this.fileType,
        'path': this.filesPath
      });
     }, err=> {
       console.log(err);
       throw err;
     });
    }
  }

  // Initiate upload files loop 
  ////////////////////////////////////////////////////////////
  async uploadFiles() {
    var sequence;
   
    this.files.forEach((element, index) => {
      if(sequence === undefined) {//wait before go to next object: https://stackoverflow.com/a/41879704
        sequence = this.uploadFile(element,index);
      }
      else {
        sequence = sequence.then((res) => {
          return this.uploadFile(element,index)
        });
      }
    });
  }

  // Upload file using FileTransfer plugin
  ////////////////////////////////////////////////////////////
  async uploadFile(fileElement, index) {
    const loading = await this.loadingController.create({
      message: 'Uploading file ' + parseInt(index+1),
    });
    loading.present();

    const p = new Promise( (resolve, reject) => {
      const fileTransfer: FileTransferObject = this.transfer.create();
    
      let options: FileUploadOptions = {
        fileKey: 'file',
        fileName: fileElement['name'],
      }
    
      fileTransfer.upload(fileElement['path'], 'https://my-json-server.typicode.com/eng-mnabil/fake-server/users', options)
      .then((data) => {
        console.log(data);
        resolve(data);
        this.presentToast("Successfully uploaded");
        loading.dismiss();
      }, (err) => {
        console.log(err);
        resolve(err);
        loading.dismiss();
      })
    });

   return p;
 }

 // Remove selected file
  ////////////////////////////////////////////////////////////
  remove(index) {
    this.files.splice(index, 1);
  }

  async presentToast(message: string) {
    const toastMessage = await this.toastController.create({
      message: message,
      duration: 3000
    });
   toastMessage.present();
  }

}
