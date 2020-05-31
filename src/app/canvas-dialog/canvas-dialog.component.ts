import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-canvas-dialog',
  templateUrl: './canvas-dialog.component.html',
  styleUrls: ['./canvas-dialog.component.scss']
})
export class CanvasDialogComponent implements OnInit {


  @ViewChild('canvas', { static: true }) 
  canvas: ElementRef<HTMLCanvasElement>;
  context
  image
  imageData
  imageData2
  
  constructor(public dialogRef: MatDialogRef<CanvasDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.image = this.data.image
     }

  ngOnInit(): void {

    this.context = this.canvas.nativeElement.getContext('2d') ;

    this.context.drawImage(this.image,0,0,500,500);
  
    // this.showOptions = true

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

  close(){
    this.dialogRef.close()
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
