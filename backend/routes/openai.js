const express = require('express')
const { OpenAI } = require('openai')
const openai = new OpenAI({
    apiKey: process.env.OPENAI_SECRET
})
const fs = require('fs')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// User Bio Generation 
router.post('/user-bio', async (req, res) => {
    try {
        // get path from req, convert to base64
        const { firstName, lastName, livingArrangementsValue, lifestyleTraitValues, petPreferencesValues } = req.body

        const response = await openai.chat.completions.create(
            {
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "user",
                        content: [
                            {
                                type: "text",
                                text: `Create a description/bio for a pet adopter looking for a pet on a pet adoption website. Make the description from the adopter's POV and make it have an excited tone. Make sure to make it informative, providing information important for pet listers to know. Here are some details about the person to include: First Name: ${firstName}, Last Name: ${lastName} (only do the following if there is a value for them here) living situation ${livingArrangementsValue}, lifestyle: ${lifestyleTraitValues}, pet preferences: ${petPreferencesValues}. Limit the word count to no more than 150 words`
                            }
                        ]
                    }
                ],
            }
        )
        res.status(200).json({
          message: 'Successful',
          bio: response.choices[0].message.content
        })
        
    }

    catch (error) {
        res.status(400).json({ message: `${error} Could not complete request.` });
    }
})

// Listing Bio Generation

router.use(requireAuth) // because we only want this to be accessible if they're logged in (as to make a listing also)

router.post('/listing-bio', async (req, res) => {
    try {
        // get path from req, convert to base64
        const { path, name, type, breed, traits, hypoVal, ageVal, sizeVal, energyVals, trainingVal } = req.body
        const image = fs.readFileSync(`./../frontend/public${path}`);
        const base64Image = Buffer.from(image).toString('base64');
        const imageDataUrl = `data:image/${path.split('.').pop()};base64,${base64Image}`;

        const response = await openai.chat.completions.create(
            {
                model: "gpt-4-vision-preview",
                messages: [
                    {
                        role: "user",
                        content: [
                            {
                                type: "text",
                                text: `Create a description/bio for an adoption pet listing based on the image provided. Make the description from the pet's POV and very cute in order to make potential adopters want to adopt the pet! Here are some details about the animal to include: Name: ${name}, Pet Type: ${type}, Breed ${breed}, Traits: ${traits}, Energy: ${energyVals}, Hypoallergenic: ${hypoVal}, Age: ${ageVal}, Size: ${sizeVal}, Training Level: ${trainingVal}, and any other details that you can gather from the picture provided that you think would be important to getting the pet adopted! Limit the word count to no more than 150 words`
                            },
                            {
                                type: "image_url",
                                image_url: {
                                    url: imageDataUrl
                                }
                            }
                        ]
                    }
                ],
            }
        )
        res.status(200).json({
          message: 'Successful',
          bio: response.choices[0].message.content
        })
        
    }

    catch (error) {
        res.status(400).json({ message: `${error} Could not complete request.` });
    }
})

module.exports = router