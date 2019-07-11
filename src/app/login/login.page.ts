import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

import { EndpointsService } from '../services/endpoints.service';


@Component({
    selector: 'app-login',
    templateUrl: 'login.page.html',
    styleUrls: ['login.page.scss'],
})

export class LoginPage {
    public loginForm: FormGroup;
    private submitted = false;

    constructor(
        public formBuilder: FormBuilder,
        private toastController: ToastController,
        private server: EndpointsService
    ) {
        this.loginForm = formBuilder.group({
            username: ['', Validators.required],
            password: ['',
                        [
                            Validators.required, 
                            Validators.minLength(6)
                        ]
                      ]
        })
    }

    submit() {
        this.submitted = true;
        let formData = this.loginForm.value;//The data to be sent to the server
        console.log(formData);
        if(this.loginForm.invalid) {
            this.presentToast("Please recheck the fields");
            return;
        }
        //POST request should be submitted to the server with the data
        this.presentToast("Successfully logged in");
        // this.server.getUsers().subscribe((res)=>{
        //   console.log(res);  
        // });
    }

    async presentToast(message: string) {
        const toastMessage = await this.toastController.create({
            message: message,
            duration: 3000
        });
        toastMessage.present();
    }

   
}