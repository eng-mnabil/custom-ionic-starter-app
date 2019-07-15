import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'camera', loadChildren: './pages/camera/camera.module#CameraPageModule' },
  { path: 'upload-image', loadChildren: './pages/upload-image/upload-image.module#UploadImagePageModule' },
  { path: 'upload-file', loadChildren: './pages/upload-file/upload-file.module#UploadFilePageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
