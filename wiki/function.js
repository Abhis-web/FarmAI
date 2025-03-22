//Different class for different soils
//for location get general idea of different type of soil generally found in that region and show that crops
//soil type optional
//state is mandatory

const cropsBySoilType = {

    "Alluvial Soil": {
        "Cereal Crops": ["Rice", "Maize", "Wheat"],
        "Pulses": ["Black Gram (Urad Dal)", "Green Gram (Moong Dal)", "Lentil (Masoor Dal)", "Chickpea (Chana)"],
        "Oil Seeds": ["Mustard", "Sunflower", "Soybean"],
        "Plantation Crops": ["Banana"],
        "Sugar & Fiber Crops": ["Sugarcane", "Jute"],
        "Fodder Crops": ["Napier Grass", "Berseem", "Maize (as fodder)"]
    },

    "Black Cotton Soil": {
        "Cereal Crops": ["Sorghum (Jowar)", "Pearl Millet (Bajra)", "Maize"],
        "Oil Seeds": ["Soybean", "Sunflower"],
        "Sugar & Fiber Crops": ["Cotton"]
    },

    "Red & Yellow Soil": {
        "Cereal Crops": ["Finger Millet (Ragi)", "Little Millet", "Kodo Millet"],
        "Plantation Crops": ["Cashew Nut"],
        "Fruits & Vegetables": ["Pineapple", "Jackfruit"]
    },

    "Laterite Soil": {
        "Plantation Crops": ["Tea", "Coffee"],
        "Fruits & Vegetables": ["Mango", "Guava"]
    },

    "Mountainous or Forest Soil": {
        "Plantation Crops": ["Tea", "Coffee"],
        "Fruits & Vegetables": ["Orange", "Lemon"]
    },

    "Arid or Desert Soil": {
        "Cereal Crops": ["Pearl Millet (Bajra)"],
        "Pulses": ["Moth Bean", "Cowpea"]
    },

    "Saline and Alkaline Soil": {
        "Cereal Crops": ["Barley"],
        "Oil Seeds": ["Mustard"]
    },

    "Peaty and Marshy Soil": {
        "Fruits & Vegetables": ["Coconut", "Banana"],
        "Plantation Crops": ["Arecanut", "Rubber"]
    }
};

const cropType = [
    "Cereal Crops",
    "Pulses",
    "Oil Seeds",
    "Plantation Crops",
    "Sugar & Fiber Crops",
    "Fodder Crops",
    "Fruits & Vegetables"
];

async function typeSearch() {
    
    var states = document.getElementById("states").value;
    var soils = document.getElementById("soils").value;
    const suggestion = document.getElementById("suggestion");


    let ele1 = document.querySelectorAll(".descHead");
    let ele2 = document.querySelectorAll(".descPara");


    ele1.forEach(el => el.innerHTML = "");
    ele2.forEach(el => el.innerHTML = "");


    if (!cropsBySoilType[soils]) {
        console.warn("No data available for selected soil type.");
        return;
    }
    if(states == "select"){
        console.warn("No data available for selected district type.");
        return;
    }

    for (let i = 0; i < cropType.length; i++) {
        let cropCategory = cropType[i];

        if (cropCategory in cropsBySoilType[soils]) {

            document.getElementById(cropCategory).textContent = cropCategory;

            let cropList = cropsBySoilType[soils][cropCategory];
            let targetElement = document.getElementById("sug" + cropCategory);


            if (Array.isArray(cropList)) {
                cropList.forEach(crop => {
                    const para = document.createElement("p");
                    para.textContent = crop;
                    targetElement.appendChild(para);
                });
            }
        }
    }


    let heightMap = {
        "Alluvial Soil": "800px",
        "Black Cotton Soil": "380px",
        "Red & Yellow Soil": "380px",
        "Laterite Soil": "250px",
        "Mountainous or Forest Soil": "250px",
        "Arid or Desert Soil": "225px",
        "Saline and Alkaline Soil": "150px",
        "Peaty and Marshy Soil": "250px"
    };

    suggestion.style.height = heightMap[soils] || "auto"; 


    //image
    const districtMap = document.getElementById("districtMap");
    map(districtMap,states);

}

function map(districtMap,states){
    districtMap.src = `/OdishaMap/${states}.png`;
}

//Text To Audio


var audioField = document.getElementById("audioField");
var isPlaying = false;

function textToAudio(topic){

    if(topic == 'topic1'){
        audioField.src = ".../HackathonAudio/1.mp3";
        isPlaying ? audioField.pause() : audioField.play();
    }
    if(topic == 'topic2'){
        audioField.src = "/HackathonAudio/2.mp3";
        isPlaying ? audioField.pause() : audioField.play();
    }
    if(topic == 'topic3'){
        audioField.src = "/HackathonAudio/3.mp3";
        isPlaying ? audioField.pause() : audioField.play();
    }
    if(topic == 'topic4'){
        audioField.src = "/HackathonAudio/4.mp3";
        isPlaying ? audioField.pause() : audioField.play();
    }
    if(topic == 'topic5'){
        audioField.src = "/HackathonAudio/5.mp3";
        isPlaying ? audioField.pause() : audioField.play();
    }
    if(topic == 'topic6'){
        audioField.src = "/HackathonAudio/6.mp3";
        isPlaying ? audioField.pause() : audioField.play();
    }
    if(topic == 'topic7'){
        audioField.src = "/HackathonAudio/7.mp3";
        isPlaying ? audioField.pause() : audioField.play();
    }  

}

audioField.onplaying = function() {
    isPlaying = true;
};
audioField.onpause = function() {
    isPlaying = false;
};
