const path = require('path');
require('dotenv').config({path: path.resolve(__dirname,'../../server/.env')});

const productConfig = {
    name: 'Agri-Vision'
};

const ttnConfig = {
    appId: process.env.AGRI_TTN,
    accessKey: process.env.AGRI_KEY
};

const twilioConfig = {
    accountSid: process.env.AGRI_SID,
    authToken: process.env.AGRI_TOKEN,
    sendingNumber: process.env.AGRI_NUM
};

const emailConfig = {
    service: 'Gmail',
    user: process.env.AGRI_USER,
    pass: process.env.AGRI_PASS,
    sendFrom: 'Agri-Vision <G8@AgriVision.com>'
};


const modelMessage = [
    {name: 'human', subject: 'TRESPASSER!!!!'},
    {name: 'animalCount', subject: 'Number of animals seen'},
    {name: 'pestID', subject: 'FERAL SPOTTED!!!'},
    {name: 'vehicleID', subject: 'Vehicle Spotted!'}
];

const menuItems = [
    {name: "home page", icon: "home_heart.png"},
    {name: "device", icon: "camera.png"},
    {name: "manage", icon: "contract.png"},
    {name: "store", icon: "coin.png"},
    {name: "account", icon: "key.png"}
];

const storeModules = [
    {
        name: 'Animal Count',
        img: 'duck.png',
        description: "Count the number of animals within the camera's vision by species.",
        price: 400
    },
    {
        name: 'Animal Identification',
        img: 'cow.png',
        description: "Identify animals by species.",
        price: 200
    },
    {
        name: 'Vehicle Identification',
        img: 'pickup-truck.png',
        description: "Identify vehicles by model, make, colour and number plate.",
        price: 500
    }
];

const memberProfiles = [
    {
        name: "Max",
        description: "Internet and new tech enthusiast - making IOT happen from space @ Fleet Space Technologies.",
        img: "max.jpg"
    },
    {
        name: "Matthew",
        description: "Seasoned techie and in-house Git expert. Loves pull requests.",
        img: "matthew.jpg"
    },
    {
        name: "Hugo",
        description: "International IoT expert. His perfect night out involves coding and $5.95 Maccas deals.",
        img: "hugo.jpg"
    },
    {
        name: "Jason",
        description: "A Queenslander who found his way to Sydney via Melbourne. A machine learning machine.",
        img: "jason.jpg"
    },
    {
        name: "Michelle",
        description: "Self-proclaimed nerd. Sorry not sorry.",
        img: "michelle.jpg"
    }
];

module.exports = {
    productConfig: productConfig,
    ttnConfig: ttnConfig,
    twilioConfig: twilioConfig,
    emailConfig: emailConfig,
    menuItems: menuItems,
    storeModules: storeModules,
    memberProfiles: memberProfiles,
    modelMessage: modelMessage
};