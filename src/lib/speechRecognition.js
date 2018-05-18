export class SpeechRecognition {
    constructor() {
        this.message = []
        this.tooltip = '';
    }

    get Tooltip() {
        return this.tooltip;
    }

    createRecognizer = () => {
        const SpeechRecognition =  window.webkitSpeechRecognition || window.SpeechRecognition;
        let recognizer = null;
        if (SpeechRecognition) {
            recognizer = new SpeechRecognition();
            recognizer.lang = 'ru-RU';
            recognizer.continuous = true;
            // recognizer.interimResults = true;
        } else {
           this.tooltip = 'Браузер не поддерживает распознователь речи';
        }

        this.recognizer = recognizer;
    }

    start = setMessage => {
        this.createRecognizer();
        
        if (this.recognizer) {
            if (!navigator.getUserMedia) {
                navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
                    navigator.mozGetUserMedia || navigator.msGetUserMedia;
            }
            if (navigator.getUserMedia) {
                navigator.getUserMedia({
                    audio: true
                }, () => {
                    this.recognizer.start();
                }, () => {
                    this.tooltip = "Разрешите использовать микрофон";
                })
            }
            else {
                this.tooltip = "Не поддерживается getUserMedia"
            }

            this.recognizer.addEventListener('error', event => {
                console.info(event.message);
            });
  
            this.recognizer.onresult = event => {
                var result = event.results[event.resultIndex];
                if (result.isFinal) {
                    this.message.push(result[0].transcript);
                    setMessage(this.message.join(' '));
                }
            };
        } 
    }

    stop = () => {
        this.recognizer.stop();
        console.log('stop');
        
    }
}
