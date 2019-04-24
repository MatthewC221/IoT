const productConfig = {
    name: 'Agri-Vision'
}

const vapidKeys = {
    publicKey: 'BPESrytqmo5QZZVN3iS9jk7K3mkXoivO5tjDv5NHn-53_pcGtWoUfFdCFMaeR5jcm1NkpYH55qCoXO29vjNpaCE',
    privateKey: 'inLn2Fm6zIHNkmUNPOfevvNW9qs7JPV3VkqAx5h2ugw'
}

const ttnConfig = {
    appId: 'comp6324_8_testing',
    accessKey: 'ttn-account-v2.kwfGp5IlnhPua5xrHsF9PeIH6LyWyPMKXGOgP7oVZ88'
}

const twilioConfig = {
    accountSid: 'ACd8d455064f253c4a2e493a29b3213f77',
    authToken: '912dc7896ae121ca6a13c471f58f78f0',
    sendingNumber: '+614436433763'
}

const emailConfig = {
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    user: 'username',
    pass: 'pasword',
    sendFrom: `${productConfig.name} <${productConfig.name}@example.com>`
}

module.exports = {
    productConfig: productConfig,
    ttnConfig: ttnConfig,
    vapidKeys: vapidKeys,
    twilioConfig: twilioConfig,
    emailConfig: emailConfig
}