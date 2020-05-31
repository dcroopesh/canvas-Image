import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanvasImageComponent } from './canvas-image/canvas-image.component';


const routes: Routes = [
  { path : '', component: CanvasImageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 


}
