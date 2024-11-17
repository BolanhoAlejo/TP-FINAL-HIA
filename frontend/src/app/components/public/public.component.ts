import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FacebookService, InitParams, LoginResponse} from 'ngx-facebook';
import { ApiMethod } from 'ngx-facebook/providers/facebook';

@Component({
  selector: 'app-public',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './public.component.html',
  styleUrl: './public.component.scss'
})
export class PublicComponent implements OnInit{
  mensaje: string = "";
  publicacionExitosa: boolean | null = null;
  constructor(private fb: FacebookService) {
  this.iniciarFb();
  }
  ngOnInit(): void {
  }
  postFb(){
  var apiMethod: ApiMethod = "post";
  this.fb.api('/394100297112316/feed', apiMethod,
  {
  "message": this.mensaje,
  "access_token": "EAAEi2KcOZBZBcBOZBN3FJpkRhZB6E88NMxJl22NVdZC7ZAN3AZAtRLweyNa9NTf55mSjbqGFBQhOlkw3b28KXcGHUYdTtRtqnkZBZBwPZCSFcXY4MZAWRmkRPiMIgSJTvaMMNuDrsYieHDpwkqnAfLY3xVw9k7W4u9LImwrGTHj3RdFNuOddfGTzmABGCUOsgbunaZCfWqAZCTvoITJr4YidNWkzn26y3"
}).then(response => {
  console.log('Post successfully published:', response);
  this.publicacionExitosa = true;  // Actualizar el estado de la publicación a true
}).catch(error => {
  console.error('Error publishing post:', error);
  this.publicacionExitosa = false;  // Actualizar el estado de la publicación a false
});
}
iniciarFb(){
let initParams: InitParams = {
appId: '319788887768039',
autoLogAppEvents : true,
xfbml : true,
version : 'v7.0'
};
this.fb.init(initParams);
}

loginWithFacebook(): void {
 
  this.fb.login()
  .then((response: LoginResponse) =>
  {
  console.log(response);
  
  })
  .catch((error: any) => console.error(error));
  }
 
}
