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
    districtMap.src = `OdishaMap/${states}.png`;
}



// Chatbot functionality
const farmingKnowledge = {
    soilTypes: {
        "alluvial soil": "Alluvial soil is very fertile and perfect for growing crops like rice, wheat, maize, sugarcane, and various pulses.",
        "black cotton soil": "Black cotton soil is ideal for growing cotton, sorghum, millets, and oilseeds. It has high moisture retention capacity.",
        "red soil": "Red soil is good for growing groundnuts, tobacco, millets, and pulses. It requires proper irrigation.",
        "laterite soil": "Laterite soil is suitable for plantation crops like tea, coffee, rubber, and cashew. It needs proper management.",
        "sandy soil": "Sandy soil is good for root vegetables and requires frequent irrigation and fertilization."
    },
    cropManagement: {
        "irrigation": "Proper irrigation is crucial for crop growth. Methods include drip irrigation, sprinkler irrigation, and flood irrigation.",
        "fertilizer": "Use balanced NPK fertilizers based on soil testing. Consider organic fertilizers for sustainable farming.",
        "pest control": "Implement Integrated Pest Management (IPM) using biological controls and appropriate pesticides when necessary.",
        "crop rotation": "Rotate crops to maintain soil fertility and prevent pest buildup. Follow a seasonal rotation pattern."
    }
};

let genAI;
let model;

// Initialize Gemini AI
async function initializeGeminiAI(apiKey) {
    try {
        if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY') {
            console.warn("No valid Gemini API key provided. Using local responses only.");
            return false;
        }
        genAI = new GoogleGenerativeAI(apiKey);
        model = genAI.getGenerativeModel({ model: "gemini-pro"});
        
        // Test the connection
        const testResponse = await model.generateContent("Test connection");
        return testResponse ? true : false;
    } catch (error) {
        console.error("Error initializing Gemini AI:", error);
        return false;
    }
}

// Function to generate response using Gemini AI
async function getGeminiResponse(userMessage) {
    if (!model) {
        return getBasicAgricultureResponse(userMessage.toLowerCase());
    }

    try {
        const context = `You are an agricultural expert AI assistant helping farmers with queries about farming, crops, soil types, and agricultural practices. Keep responses concise, practical, and easy to understand.
        
        Current context: User is asking about agriculture and farming. Provide:
        1. Clear, simple explanations for basic concepts
        2. Practical examples when possible
        3. Relevant information for Indian farming conditions
        4. Focus on Odisha's agricultural context when applicable
        
        User query: ${userMessage}`;

        const result = await model.generateContent(context);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Error getting Gemini response:", error);
        return getBasicAgricultureResponse(userMessage.toLowerCase());
    }
}

// Function for basic agriculture responses when Gemini AI is not available
function getBasicAgricultureResponse(query) {
    const basicResponses = {
        'what is a crop': 'A crop is a plant that is grown and harvested for agricultural purposes. Crops are grown for food, fiber, fuel, or other uses. Common crops include rice, wheat, maize, and vegetables.',
        'what is farming': 'Farming is the practice of cultivating plants and livestock for food, fiber, biofuel, medicinal plants, and other products used to sustain and enhance human life.',
        'what is agriculture': 'Agriculture is the science and art of cultivating plants and livestock for food, fiber, biofuel, medicinal plants, and other products. It includes farming, soil cultivation, crop growing, and animal husbandry.',
        'what is irrigation': 'Irrigation is the artificial application of water to land for growing crops. Common irrigation methods include drip irrigation, sprinkler systems, and flood irrigation.',
        'what is fertilizer': 'Fertilizer is a natural or artificial substance containing essential plant nutrients that is added to soil to promote plant growth and increase crop yield.',
        'what are pesticides': 'Pesticides are substances used to control pests that can damage crops. This includes insects, weeds, fungi, and other organisms that can harm plant growth.',
        'what is crop rotation': 'Crop rotation is the practice of growing different types of crops in the same area across different growing seasons. It helps improve soil health and reduce pest problems.',
        'what is organic farming': 'Organic farming is a method of crop and livestock production that avoids the use of synthetic pesticides, fertilizers, and other artificial inputs. It focuses on natural farming methods.',
        'what is sustainable agriculture': 'Sustainable agriculture focuses on producing food in ways that protect the environment, public health, human communities, and animal welfare while maintaining crop productivity.',
        'how to use this page': 'To get crop suggestions: 1. Select your district from the dropdown menu 2. Choose your soil type 3. Click "Analyze" to see recommended crops and a district map. You can also ask me specific questions about the suggestions!',
        'how to get suggestions': 'First select your district and soil type from the dropdown menus above, then click "Analyze". I can help explain the results or answer questions about specific crops.',
        'how to select district': 'Look for the "District" dropdown menu at the top of the page. Click it and select your district from the list of Odisha districts.',
        'how to select soil': 'Find the "Soil type" dropdown menu next to the district selection. Choose the type of soil in your area. If you\'re unsure about your soil type, I can help you identify it!',
        'what does analyze do': 'The Analyze button processes your district and soil type selections to show: 1. Recommended crops categorized by type 2. A map of your selected district 3. Detailed crop suggestions based on local conditions',
        'where is the map': 'The district map appears on the right side of the suggestions after you select your district and click "Analyze". It shows the geographical location of your selected district in Odisha.',
        'how to read suggestions': 'The suggestions are organized by crop categories like Cereals, Pulses, Oil Seeds, etc. Each category lists specific crops that grow well in your selected soil type. The height of the suggestion box adjusts automatically to show all recommendations.'
    };

    // Check for exact matches first
    if (basicResponses[query]) {
        return basicResponses[query];
    }

    // Check for partial matches with suggestion page queries
    const suggestionQueries = {
        'help': 'how to use this page',
        'suggestion': 'how to get suggestions',
        'district': 'how to select district',
        'soil type': 'how to select soil',
        'analyze': 'what does analyze do',
        'map': 'where is the map',
        'read': 'how to read suggestions'
    };

    for (const [key, value] of Object.entries(suggestionQueries)) {
        if (query.includes(key)) {
            return basicResponses[value];
        }
    }

    // Handle district-specific queries
    const districts = [
        "Angul", "Bargarh", "Bhadrak", "Balasore", "Balangir", "Boudh", "Cuttack",
        "Debagarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur",
        "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Keonjhar", "Khordha",
        "Koraput", "Malkangiri", "Mayurbhanj", "Nuapada", "Nabarangpur", "Nayagarh",
        "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundergarh"
    ];

    for (const district of districts) {
        if (query.toLowerCase().includes(district.toLowerCase())) {
            return `${district} is a district in Odisha. To see crop recommendations for ${district}: 1. Select ${district} from the district dropdown 2. Choose your soil type 3. Click Analyze to see suitable crops and the district map.`;
        }
    }

    // Handle general questions about specific crops
    const commonCrops = {
        'rice': 'Rice is a major cereal crop and staple food. It grows best in warm, humid conditions and requires plenty of water. It\'s one of the most important crops in Odisha.',
        'wheat': 'Wheat is a cereal grain that provides essential nutrients. It grows best in cool weather and well-drained soil.',
        'maize': 'Maize (corn) is a versatile cereal crop used for food, feed, and industrial purposes. It grows well in warm weather and requires good sunlight.',
        'cotton': 'Cotton is a fiber crop that grows best in areas with long frost-free periods. It requires moderate rainfall and plenty of sunshine.',
        'sugarcane': 'Sugarcane is a tall grass crop used for sugar production. It requires tropical/subtropical climate and plenty of water.',
        'pulses': 'Pulses are legume crops that include beans, peas, and lentils. They are important sources of protein and help improve soil fertility.'
    };

    for (const [crop, info] of Object.entries(commonCrops)) {
        if (query.includes(crop)) {
            return info;
        }
    }

    return null;
}

// Function to generate local responses for common queries
async function generateLocalResponse(query) {
    // Get the selected district and soil type
    const districtSelect = document.getElementById("states");
    const soilSelect = document.getElementById("soils");
    const selectedDistrict = districtSelect ? districtSelect.value : null;
    const selectedSoil = soilSelect ? soilSelect.value : null;

    // Basic greetings
    if (query.match(/^(hi|hello|hey|greetings)/i)) {
        return "Hello! I'm your FarmAI assistant. I can help you with crop suggestions, soil information, and using this page. What would you like to know?";
    }

    // Check for general agriculture questions first
    const basicResponse = getBasicAgricultureResponse(query);
    if (basicResponse) {
        return basicResponse;
    }

    // Handle queries about current selections
    if (query.includes('what did i select') || query.includes('my selection') || query.includes('what is selected')) {
        if (selectedDistrict && selectedDistrict !== 'select' && selectedSoil && selectedSoil !== 'select') {
            return `You have selected ${selectedDistrict} district with ${selectedSoil}. Would you like to know about the recommended crops for these conditions?`;
        } else if (selectedDistrict && selectedDistrict !== 'select') {
            return `You have selected ${selectedDistrict} district. Please also select a soil type to get crop recommendations.`;
        } else if (selectedSoil && selectedSoil !== 'select') {
            return `You have selected ${selectedSoil}. Please also select a district to get crop recommendations.`;
        } else {
            return "You haven't made any selections yet. Start by selecting your district and soil type from the dropdown menus above.";
        }
    }

    // Handle height adjustment queries
    if (query.includes('height') || query.includes('size') || query.includes('too small') || query.includes('too big')) {
        return "The suggestion box height adjusts automatically based on the number of crop recommendations. If you're having trouble viewing all suggestions, you can scroll within the box. Let me know if you need help finding specific information!";
    }

    // Soil type related queries
    if (query.includes('soil type') || query.includes('soil')) {
        if (selectedSoil && selectedSoil !== 'select') {
            return `You've selected ${selectedSoil}. This soil type is common in certain regions of Odisha. Would you like to know what crops are suitable for this soil type?`;
        } else {
            return "I can help you understand different soil types. Please select a soil type from the dropdown menu above, and I'll provide specific recommendations.";
        }
    }

    // Crop recommendations based on soil
    if (query.includes('what can i grow') || query.includes('which crops') || query.includes('crop recommendations') || query.includes('suitable') || query.includes('what crops')) {
        if (selectedSoil && selectedSoil !== 'select' && cropsBySoilType[selectedSoil]) {
            let response = `For ${selectedSoil}, here are the recommended crops:\n\n`;
            
            // Loop through each crop category in the selected soil type
            for (const [category, crops] of Object.entries(cropsBySoilType[selectedSoil])) {
                if (crops && crops.length > 0) {
                    response += `${category}:\n`;
                    response += crops.map(crop => `• ${crop}`).join('\n');
                    response += '\n\n';
                }
            }
            
            response += "Would you like specific information about any of these crop categories?";
            return response;
        } else {
            return "To provide accurate crop recommendations, please select your soil type from the dropdown menu above.";
        }
    }

    // Specific crop category queries
    const cropCategories = ["Cereal Crops", "Pulses", "Oil Seeds", "Plantation Crops", "Sugar & Fiber Crops", "Fodder Crops", "Fruits & Vegetables"];
    for (const category of cropCategories) {
        if (query.toLowerCase().includes(category.toLowerCase())) {
            if (selectedSoil && selectedSoil !== 'select' && cropsBySoilType[selectedSoil]) {
                const crops = cropsBySoilType[selectedSoil][category];
                if (crops && crops.length > 0) {
                    return `For ${selectedSoil}, recommended ${category} include:\n` +
                           crops.map(crop => `• ${crop}`).join('\n');
                } else {
                    return `${selectedSoil} is not typically recommended for ${category}. Would you like to know about other suitable crops for this soil type?`;
                }
            }
        }
    }

    return null;
}

// Add the appendMessage function with typing animation
function appendMessage(type, message) {
    try {
        const chatMessages = document.getElementById('chat-messages');
        if (!chatMessages) {
            console.error('Chat messages container not found');
            return;
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        
        if (type === 'user') {
            // User messages appear instantly
            messageDiv.textContent = message;
            chatMessages.appendChild(messageDiv);
        } else {
            // Bot messages have typing animation
            chatMessages.appendChild(messageDiv);
            let index = 0;
            const words = message.split(' ');
            
            function typeWord() {
                if (index < words.length) {
                    messageDiv.textContent += (index > 0 ? ' ' : '') + words[index];
                    index++;
                    // Random delay between words (30-70ms)
                    setTimeout(typeWord, Math.random() * 40 + 30);
                }
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
            
            typeWord();
        }
        
        chatMessages.scrollTop = chatMessages.scrollHeight;
    } catch (error) {
        console.error('Error appending message:', error);
    }
}

// Update the sendMessage function to handle typing animation
async function sendMessage() {
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');
    
    if (!userInput || !chatMessages) {
        console.error('Required elements not found');
        return;
    }

    const userMessage = userInput.value.trim();
    if (userMessage === '') return;

    // Add user message
    appendMessage('user', userMessage);

    // Show typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'message bot typing';
    typingIndicator.innerHTML = '<div class="typing-animation"><span></span><span></span><span></span></div>';
    chatMessages.appendChild(typingIndicator);

    try {
        // First try to get a response from our local knowledge base
        let botResponse = await generateLocalResponse(userMessage.toLowerCase());
        
        // If no specific local response, use Gemini AI with suggestion page context
        if (botResponse === null) {
            const districtSelect = document.getElementById("states");
            const soilSelect = document.getElementById("soils");
            const selectedDistrict = districtSelect ? districtSelect.value : 'not selected';
            const selectedSoil = soilSelect ? soilSelect.value : 'not selected';

            const contextMessage = `User is on the crop suggestions page. Current selections: District: ${selectedDistrict}, Soil Type: ${selectedSoil}. ${userMessage}`;
            botResponse = await getGeminiResponse(contextMessage);
        }

        // If still no response, provide a context-aware default response
        if (!botResponse) {
            const query = userMessage.toLowerCase();
            if (query.includes('crop') || query.includes('grow') || query.includes('plant')) {
                botResponse = "Let me help you with crop recommendations. First, select your district and soil type from the dropdown menus above. This will help me suggest the most suitable crops for your area.";
            } else if (query.includes('soil')) {
                botResponse = "I can help you understand different soil types and their characteristics. Use the soil type dropdown menu to select your soil, and I'll provide specific information about it.";
            } else if (query.includes('district') || query.includes('area') || query.includes('region')) {
                botResponse = "To get location-specific recommendations, please select your district from the dropdown menu. I can then show you a map and suggest crops that grow well in your area.";
            } else {
                botResponse = "I can help you with:\n1. Selecting your district and soil type\n2. Understanding crop recommendations\n3. Learning about farming practices\n4. Getting specific crop information\nWhat would you like to know more about?";
            }
        }

        // Remove typing indicator after a short delay
        setTimeout(() => {
            if (typingIndicator.parentNode === chatMessages) {
                chatMessages.removeChild(typingIndicator);
            }
            // Add bot response with typing animation
            appendMessage('bot', botResponse);
        }, 500);

    } catch (error) {
        console.error("Error in sendMessage:", error);
        if (typingIndicator.parentNode === chatMessages) {
            chatMessages.removeChild(typingIndicator);
        }
        
        // Provide a helpful response based on the user's query
        const query = userMessage.toLowerCase();
        let errorResponse;
        
        if (query.includes('crop') || query.includes('grow') || query.includes('plant')) {
            errorResponse = "While I'm having trouble accessing some information, I can still help you with crop selection. Would you like to know about specific crops or get general farming advice?";
        } else if (query.includes('soil')) {
            errorResponse = "I can tell you about different soil types and their characteristics. Which soil type would you like to learn about?";
        } else if (query.includes('district') || query.includes('map')) {
            errorResponse = "I can help you understand the agricultural patterns in different districts. Which district are you interested in?";
        } else {
            errorResponse = "Let's focus on what you'd like to know about farming. Are you interested in crops, soil types, or farming practices?";
        }
        
        appendMessage('bot', errorResponse);
    }

    // Clear input and focus it
    userInput.value = '';
    userInput.focus();
    
    // Hide notification dot after first interaction
    const notificationDot = document.querySelector('.notification-dot');
    if (notificationDot) {
        notificationDot.style.display = 'none';
    }
}

// Add event listeners for chat input
document.addEventListener('DOMContentLoaded', function() {
    const userInput = document.getElementById('user-input');
    if (userInput) {
        userInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // Initialize chat as collapsed
    const chatContainer = document.getElementById('chatbot-container');
    if (chatContainer) {
        chatContainer.classList.add('collapsed');
    }
});

// Initialize Gemini AI when the page loads
window.addEventListener('load', async () => {
    // You would typically get this from a secure configuration
    const API_KEY = 'YOUR_GEMINI_API_KEY';
    const initialized = await initializeGeminiAI(API_KEY);
    if (!initialized) {
        console.warn("Gemini AI initialization failed. Falling back to local responses only.");
    }
});

// Chat toggle functionality
function toggleChat() {
    const chatContainer = document.getElementById('chatbot-container');
    chatContainer.classList.toggle('collapsed');
    
    // Focus input when chat is opened
    if (!chatContainer.classList.contains('collapsed')) {
        document.getElementById('user-input').focus();
    }
}
