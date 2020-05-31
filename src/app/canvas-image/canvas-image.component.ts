import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { environment } from '../../environments/environment'
import { MatDialog } from '@angular/material/dialog';
import { CanvasDialogComponent } from '../canvas-dialog/canvas-dialog.component';
@Component({
  selector: 'app-canvas-image',
  templateUrl: './canvas-image.component.html',
  styleUrls: ['./canvas-image.component.scss']
})
export class CanvasImageComponent implements OnInit {
  context
  image
  context2
  showOptions = false
  imageData2
  imageData
  imageId
  path="src/assets/profilepic.jpg"

  @ViewChild('canvas', { static: true }) 
  canvas: ElementRef<HTMLCanvasElement>;
  
  @ViewChild('canvas2', { static: true }) 
  canvas2: ElementRef<HTMLCanvasElement>;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {}

fileChangeEvent(e){

  var reader = new FileReader();
  this.context = this.canvas.nativeElement.getContext('2d') ;
  this.context2 = this.canvas2.nativeElement.getContext('2d') ;


  reader.onload = (event)=>{
      var img = new Image();
      img.onload = () =>{
          
          this.context.drawImage(img,0,0,200,200);
          this.showOptions = ! this.showOptions 
      }
      img.src = event.target.result.toString()
  }
  reader.readAsDataURL(e.target.files[0]);     
}

drawImage(id){

  this.imageId = id;


  const dialogRef = this.dialog.open(CanvasDialogComponent, {
    width: '510px',
    height : '510px',
    panelClass: 'mat-no-padding-dialog',
    data: { image : document.getElementById(id) }
  });

  this.context = this.canvas.nativeElement.getContext('2d') ;

  this.context.drawImage(document.getElementById(id),0,0,500,500);

  this.showOptions = true


}

updateImage(red,green,blue){
  
  this.imageData = this.context.getImageData(0,0,500,500)
  this.imageData2 = this.context.getImageData(0,0,500,500)
  for(let i = 0 ; i < this.imageData.data.length; i+=4){


    // let redValue = this.imageData.data[i];
    //   this.imageData.data[i] = Math.abs(redValue + red)

    //   let greenValue = this.imageData.data[i+1];

    //   this.imageData.data[i + 1] += Math.abs(greenValue + green); 
    //   let blueValue = this.imageData.data[i+2];

    //   this.imageData.data[i + 2] += Math.abs(blueValue + blue);

      this.imageData2.data[i] = 255 - this.imageData2.data[i]
      this.imageData2.data[i+1] = 255 - this.imageData2.data[i+1]
      this.imageData2.data[i+2] = 255 - this.imageData2.data[i+2]

}
  if(this.imageData.data === this.imageData2.data){
    console.log("1")
  }


  this.context.putImageData(this.imageData2,0,0);

}



downloadImage() {
  this.image = this.canvas.nativeElement.toDataURL();

  let date = new Date()
  var a = document.createElement('a');
  a.href = this.image;
  a.download = `image${date.getDate()}-${date.getMonth()}-${date.getFullYear()}-${date.getTime()}.png`;
  a.click();
}

cropImage(percentage){

  let canvasWidth = this.canvas.nativeElement.width
  let canvasHeight = this.canvas.nativeElement.height
  this.context.drawImage(this.canvas.nativeElement,percentage * canvasWidth,percentage * canvasHeight, canvasWidth - percentage*canvasWidth * 2,canvasHeight - percentage * canvasHeight * 2,0,0,500,500);
}

} 





