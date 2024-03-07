//https://teachablemachine.withgoogle.com/models/qWh9TZh4_/

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
        ;
    });
}

console.log('ml5Version', ml5.version)

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/qWh9TZh4_/model.json', modelLoaded)
function modelLoaded(){
    console.log("Modelo cargado")
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = 'La primera prediccion es:' + prediccion1;
    speak_data_2 = ' Y la segunda prediccion es:' + prediccion2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis)
}
function check(){
    img = document.getElementById('captured_image')
    classifier.classify(img, gotResult)
}


function gotResult(error, results){
    if(error){
      console.log(error);
    }else{
      console.log(results);
      document.getElementById('result_emotion_name').innerHTML = results[0].label;
      document.getElementById('result_emotion_name2').innerHTML = results[1].label;
      
    prediccion1 =  results[0].label;
    prediccion2 = results[1].label;

    speak()

    if (results[0].label = ""){
        document.getElementById(update_emoji).innerHTML = "&128512;";
    }
    
    if (results[0].label = "triste"){
        document.getElementById(update_emoji2).innerHTML = "&128532;";
    }
    
    if (results[0].label = "enojado"){
        document.getElementById(update_emoji3).innerHTML = "&128552;";
    }
    
    if (results[0].label = "sorprendido")
        document.getElementById(update_emoji4).innerHTML = "&128562;";
    }
}