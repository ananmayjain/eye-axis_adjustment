import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * Diagnostic Service holds data on the video input from the web-cam,
 * sends data to the server.
 */
@Injectable()
export class DiagosticService {

    /**
     * True if the browser gives camera access. 
     * False otherwise.
     */
    isCameraAvailable: boolean = true;

    /**
     * Width and Height of video output
     */
    videoWidth: number = 320;
    videoHeight: number = 240;

    responseImage: string;

    constructor(private httpClient: HttpClient) { }

    sendFrame(idOfCanvas: string) {
        var canvas = <HTMLCanvasElement>document.getElementById(idOfCanvas);
        var image = canvas.toDataURL("image/jpeg");

        // Must remove the following prefix, otherwise the image's format is not right.
        image = image.replace("data:image/jpeg;base64,", "");

        // Prepare data sent to the server
        var data = JSON.stringify(
            { "image": image }
        )

        // Send data to "/new_update"
        // to change the url, make sure to change the corresponding url and function name in 
        // : web-app/main.py
        // this.responseImage  = image;
        // console.log(this.responseImage)

        // var img = <HTMLCanvasElement>document.getElementById("");
        // img.getContext("2d").drawImage(this.responseImage, 0, 0);

        this.httpClient.post("/new_update", data).subscribe(
            (value) => {
                // var image = value["image"];
                // this.responseImage = image;
                // this.responseImage = image;
            },
            (error) => {
                console.log(error.message)
            },
            () => {
                console.log("Success")
            });

        console.log("New frame sent");

    }

}
