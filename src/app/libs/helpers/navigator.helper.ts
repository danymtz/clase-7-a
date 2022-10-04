export default class NavigatorHelper {
    static getLocation(): Promise<any> {

        /* let navigation: any = {
          timeout: 1
        }; */

        return new Promise ((resolve,reject)=>{
            navigator.geolocation.getCurrentPosition(position=>{
                //console.log('Respuesta: ',position);
                resolve(position);
              },
              err => {
                //console.log('Error: ',err);
                reject(err)
              })
        })
        
        
      }

      static getLocationC (success: (key: any) => void, error: (key: any) => void): void{
        navigator.geolocation.getCurrentPosition(position => {
            success(position)
        },
        err =>{
            error(err)
        })
      }

      static startRecord (video: HTMLVideoElement){
        navigator.mediaDevices.getUserMedia({
            video: {
                width: 600,
                height: 400
            },
            //audio: true
        }).then(media => {
            //console.log(media);
            video.srcObject = media;
            video.onloadedmetadata = resp => {
                video.play();
                let data: any[] = [];
                const recorder = new MediaRecorder(media,{
                    mimeType: 'video/webm'
                })                

                recorder.ondataavailable = event => {
                    console.log("tonDataAvailable");
                    data.push(event.data)
                }

                recorder.onstop = () => {
                    console.log("toStop");
                    const blob = new Blob(data, {
                        type: 'video/webm'
                    })

                    const reader = new FileReader()
                    reader.readAsDataURL(blob)
                    reader.onloadend = () => {
                        console.log('Reader: ',reader.result);
                        
                    }
                    
                    console.log('Blob: ',URL.createObjectURL(blob));
                }

                setTimeout(()=>{
                    console.log("toStart");
                    
                    recorder.start()
                }, 100)

                setTimeout (() => {
                    console.log("toStop");
                    recorder.stop()
                },3000)
            }
        })
      }
}