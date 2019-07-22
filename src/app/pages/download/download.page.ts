import { Component, OnInit } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-download',
  templateUrl: './download.page.html',
  styleUrls: ['./download.page.scss'],
})
export class DownloadPage implements OnInit {
  downloadedFileUrl;

  constructor(
    private transfer: FileTransfer,
    private file: File,
    private androidPermissions: AndroidPermissions,
    private toastController: ToastController,
    private fileOpener: FileOpener
  ) { }

  ngOnInit() {
  }
  // Check for write permission
  ////////////////////////////////////////////////
  download() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
      result => {
        console.log('Has permission?',result.hasPermission);
        if (result.hasPermission) {
          this.download2();
        }
        else {
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
            status => {
              if(status.hasPermission) {
                this.download2();
              }
            }
          )
        }
      },
      err => {
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
      }
    );
  }

  // Create my_downloads folder
  ////////////////////////////////////////////////
  download2() {
    this.file.checkDir(this.file.externalRootDirectory, 'my_downloads').then(dirStatus => {
      console.log(dirStatus);
      if(!dirStatus) {
        this.file.createDir(this.file.externalRootDirectory, 'my_downloads', false).then(response => {
          console.log('Directory created',response);
          this.download3();
        });
      }
      else {
        this.download3();
      }
    }).catch( err => {
      console.log(err);
    });
  }

  // Download file by URL in my_downloads folder
  ////////////////////////////////////////////////
  download3() {
    const fileTransfer: FileTransferObject = this.transfer.create();
    const url = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
    fileTransfer.download(url, this.file.externalRootDirectory+ '/my_downloads/' + 'file.pdf').then((entry) => {
      console.log(entry);
      console.log('download complete: ' + entry.toURL());
      this.downloadedFileUrl = entry.toURL();
      this.presentToast("Download complete at " + entry.fullPath);
    }, (error) => {
      // handle error
      console.log(error);
    });
  }

  download_default() {
    const fileTransfer: FileTransferObject = this.transfer.create();
    const url = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
    fileTransfer.download(url, this.file.externalRootDirectory+ '/Download/' + 'file.pdf').then((entry) => {
      console.log(entry);
      console.log('download complete: ' + entry.toURL());
      this.downloadedFileUrl = entry.toURL();
      this.presentToast("Download complete at " + entry.fullPath);
    }, (error) => {
      // handle error
      console.log(error);
    });
  }

  openFile() {
    this.fileOpener.open(this.downloadedFileUrl, 'application/pdf')
    .then(() => console.log('File is opened'))
    .catch(e => console.log('Error opening file', e));
  }

  async presentToast(message: string) {
    const toastMessage = await this.toastController.create({
      message: message,
      duration: 3000
    });
   toastMessage.present();
  }

}
