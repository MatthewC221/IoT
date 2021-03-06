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
    sendingEmail: 'Agri-Vision <G8@AgriVision.com>'
};


const modelMessage = [
    {name: 'human', subject: 'TRESPASSER!!!!'},
    {name: 'animalCount', subject: 'Number of animals seen'},
    {name: 'pestID', subject: 'FERAL SPOTTED!!!'},
    {name: 'vehicleID', subject: 'Vehicle Spotted!'}
];

const customerData = [
    {
        name: "Hugo",
        email: "Hugo@Agri-vision.com",
        phone: "+852933313165",
        notif: {
            email: false,
            phone: false
        },
        devices: [
            {id: "testing_device", model: "human"},
            {id: "contol", model: "pestID"}
        ]
    },
    {
        name: "Jace",
        email: "kibaov@gmail.com",
        phone: "+61468440474",
        notif: {
            email: true,
            phone: false
        },
        devices: [
            {id: "testing_device", model: "human"},
            {id: "anima", model: "animalCount"}
        ]
    },
    {
        name: "Matt",
        email: "Matt@Agri-vision.com",
        phone: "+61424082585",
        notif: {
            email: false,
            phone: false
        },
        devices: [
            {id: "testing_device", model: "human"},
            {id: "car", model: "vehicleID"}
        ]
    },
    {
        name: "Max",
        email: "Max@Agri-vision.com",
        phone: "+61402829421",
        notif: {
            email: false,
            phone: false
        },
        devices: [
            {id: "testing_device", model: "human"},
            {id: "ranger", model: "human"}
        ]
    },
    {
        name: "Mich",
        email: "Mich@Agri-vision.com",
        phone: "+61420314485",
        notif: {
            email: false,
            phone: false
        },
        devices: [
            {id: "testing_device", model: "human"},
            {id: "animals", model: "animalCount"}
        ]
    }
];

const menuItems = [
    {name: "home page", icon: "home_heart.png"},
    {name: "device", icon: "camera.png"},
    {name: "manage", icon: "contract.png"},
    {name: "store", icon: "coin.png"},
    {name: "account", icon: "key.png"}
];

const storeModules = {
    security: [
        {
            name: 'Human Recognition',
            img: 'farmer.png',
            description: "Receive alerts when one or more humans are within the camera's vision.",
            price: 0
        },
        {
            name: 'Vehicle Identification',
            img: 'pickup-truck.png',
            description: "Identify vehicles by model, make, colour and number plate.",
            price: 500
        },
        {
            name: 'Pest Recognition',
            img: 'scarecrow.png',
            description: "Receive alerts when a known pest or feral animal is within the camera's vision.",
            price: 350
        },
    ],
    livestock: [
        {
            name: 'Animal Count',
            img: 'duck.png',
            description: "Count the number of animals within the camera's vision by species.",
            price: 400
        },
        {
            name: 'Cattle Behaviour',
            img: 'cow.png',
            description: "Monitor cattle behaviour and receive alerts when stress indicators are high.",
            price: 500
        }
    ],
    crop: [
        {
            name: 'Crop Monitoring',
            img: 'wheat.png',
            description: "Monitor crop growth and receive alerts when harvest indicators are high.",
            price: 375
        }
    ]
}

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
]

const userProfile = {
    name: "Jane Smith",
    email: "jane@gmail.com",
    phone: "0412345678",
    password: "password",
    billing: {
        number: "0123456789012345",
        expMonth: 12,
        expYear: 20,
        cvv: 123
    },
    notif: {
        email: false,
        phone: true
    }
}

module.exports = {
    productConfig: productConfig,
    ttnConfig: ttnConfig,
    twilioConfig: twilioConfig,
    emailConfig: emailConfig,
    menuItems: menuItems,
    storeModules: storeModules,
    memberProfiles: memberProfiles,
    userProfile: userProfile,
    modelMessage: modelMessage,
    customerData: customerData
}