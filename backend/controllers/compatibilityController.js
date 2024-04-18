const Listing = require('../models/listingModel')
const User = require('../models/userModel')

//Creates a tuple of (Listing ID : compatibility score) 
const computeCompatibility = async (req, res) => {
    const id = req.user
    const user = await User.findById(id)
    const listings = await Listing.find({}).sort({createdAt: -1})

    //CHANGE THIS IF WE ADD MORE FIELDS SO IT DIVIDES CORRECTLY
    let DIVISOR = 3;

    //preferences Space?.map(space => space.value).includes(lifestyle )are arrays 
    let compatibilityScores = new Map();

    for(let i = 0; i < listings.length; i ++)
    {
        let score = 0
        if (user.petPreferences?.map((pet => pet.value)).includes(listings[i].type))
        {
            score+=1
        }

        
        if (user.livingArrangements?.value === 'house')
        {
            if (listings[i].size === 's') 
            {
                score+=.25
            } else if (listings[i].size === 'm') 
            {
                score+=1
            } else 
            {
                score+=.5
            }
        } else if (user.livingArrangements?.value === 'townhouse') 
        {
            if (listings[i].size === 's') 
            {
                score+=.5
            } else if (listings[i].size === 'm') 
            {
                score+=.5
            } else 
            {
                score+=.5
            }
        } else 
        {
            if (listings[i].size === 's') 
            {
                score+=1
            } else if (listings[i].size === 'm') 
            {
                score+=.5
            } else 
            {
                score+=.25
            }
        }

        if (user.experience?.value === 'none')
        { 
            if (listings[i].training === 'need')
            {
                score += .25
            } else if (listings[i].training === 'none')
            {
                score += -1
            } else if (listings[i].training === 'part')
            {
                score += .5
            } else if (listings[i].training === 'well')
            {
                score += 1
            }
        } else if (user.experience?.value === 'moderate') 
        {
            if (listings[i].training === 'need')
            {
                score += .5
            } else if (listings[i].training === 'none')
            {
                score += .25
            } else if (listings[i].training === 'part')
            {
                score += 1
            } else if (listings[i].training === 'well')
            {
                score += 1
            }
        } else 
        {
            if (listings[i].training === 'need')
            {
                score += 1
            } else if (listings[i].training === 'none')
            {
                score += 1
            } else if (listings[i].training === 'part')
            {
                score += 1
            } else if (listings[i].training === 'well')
            {
                score += 1
            }
        }

        let outdoor = false
        let indoor = false
    
        if (user.space?.map(space => space.value).includes('soutdoor') && !outdoor)
        {
            if (listings[i].energy?.map(energy => energy.value).includes('low'))
            {
                score += 1
            } else if (listings[i].energy?.map(energy => energy.value).includes('med'))
            {
                score += .5
            } else if (listings[i].energy?.map(energy => energy.value).includes('high'))
            {
                score += .5
            }
            outdoor = true
        } else if (user.space?.map(space => space.value).includes('loutdoor') && !outdoor)
        {
            if (listings[i].energy?.map(energy => energy.value).includes('low'))
            {
                score += 1
            } else if (listings[i].energy?.map(energy => energy.value).includes('med'))
            {   
                score += 1
            } else if (listings[i].energy?.map(energy => energy.value).includes('high'))
            {
                score += 1
            }
            outdoor = true
        } else if (user.space?.map(space => space.value).includes('sliving') && !indoor)
        {
            if (listings[i].energy?.map(energy => energy.value).includes('low'))
            {   
                score += 1
            } else if (listings[i].energy?.map(energy => energy.value).includes('med'))
            {
                score += .5
            } else if (listings[i].energy?.map(energy => energy.value).includes('high'))
            {
                score +=.25
            }
            indoor = true
        } else if (user.space?.map(space => space.value).includes('lliving') && !indoor)
        {
            if (listings[i].energy?.map(energy => energy.value).includes('low'))
            {
                score += 1
            } else if (listings[i].energy?.map(energy => energy.value).includes('med'))
            {
                score += 1
            } else if (listings[i].energy?.map(energy => energy.value).includes('high'))
            {
                score += 1
            }
            indoor = true
        }

        //Note for reviewer: We could implement this, but I do not think its worth
        /*
        let familyFlag = false
        let workFlag = false
        let lifeFlag = false 
        for(let i = 0; i < user.lifestyleTraits.length; i++)
        {
            if (user.lifestyleTraits[i] === 'single' && !familyFlag)
            {
                if (listings.)
                familyFlag = true
            } else if ( user.lifestyleTraits[i] === 'couple' && !familyFlag)
            {
                familyFlag = true

            } else if ( user.lifestyleTraits[i] === 'sfamily' && !familyFlag)
            {
                familyFlag = true

            } else if ( user.lifestyleTraits[i] === 'lfamily' && !familyFlag)
            {
                familyFlag = true

            } else if ( user.lifestyleTraits[i] === 'full-time' && !workFlag)
            {
                workFlag = true
            } else if ( user.lifestyleTraits[i] === 'part-time' && !workFlag)
            {
                workFlag = true

            } else if ( user.lifestyleTraits[i] === 'flex' && !workFlag)
            {
                workFlag = true

            } else if ( user.lifestyleTraits[i] === 'active' && !lifeFlag)
            {
                lifeFlag = true
            } else if ( user.lifestyleTraits[i] === 'sedentary' && !lifeFlag)
            {
                lifeFlag = true
            }
        }
        */
    
        compatibilityScores.set(listings[i].id, score/DIVISOR)
    }

    const returnObj = Object.fromEntries(compatibilityScores)
    user.compatibility = returnObj

    try {
        res.status(200).json(returnObj);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


module.exports = { computeCompatibility }