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
        let t = listings[i].type.value ? listings[i].type.value : listings[i].type
        if (user.petPreferences?.map((pet => pet.value)).includes(t))
        {
            score+=1
        }

        
        if (user.livingArrangements?.value === 'house')
        {
            if (listings[i].size?.value === 's') 
            {
                score+=.25
            } else if (listings[i].size?.value === 'm') 
            {
                score+=1
            } else 
            {
                score+=.5
            }
        } else if (user.livingArrangements?.value === 'townhouse') 
        {
            if (listings[i].size?.value === 's') 
            {
                score+=.5
            } else if (listings[i].size?.value === 'm') 
            {
                score+=.5
            } else 
            {
                score+=.5
            }
        } else 
        {
            if (listings[i].size?.value === 's') 
            {
                score+=1
            } else if (listings[i].size?.value === 'm') 
            {
                score+=.5
            } else 
            {
                score+=.25
            }
        }

        if (user.experience?.value === 'none')
        { 
            if (listings[i].training?.value === 'need')
            {
                score += .25
            } else if (listings[i].training?.value === 'none')
            {
                score += -1
            } else if (listings[i].training?.value === 'part')
            {
                score += .5
            } else if (listings[i].training?.value === 'well')
            {
                score += 1
            }
        } else if (user.experience?.value === 'moderate') 
        {
            if (listings[i].training?.value === 'need')
            {
                score += .5
            } else if (listings[i].training?.value === 'none')
            {
                score += .25
            } else if (listings[i].training?.value === 'part')
            {
                score += 1
            } else if (listings[i].training?.value === 'well')
            {
                score += 1
            }
        } else 
        {
            if (listings[i].training?.value === 'need')
            {
                score += 1
            } else if (listings[i].training?.value === 'none')
            {
                score += 1
            } else if (listings[i].training?.value === 'part')
            {
                score += 1
            } else if (listings[i].training?.value === 'well')
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
                score += 1 / (listings[i].energy.length + user.space.length)
            } else if (listings[i].energy?.map(energy => energy.value).includes('med'))
            {
                score += .5 /  (listings[i].energy.length + user.space.length)
            } else if (listings[i].energy?.map(energy => energy.value).includes('high'))
            {
                score += .5 /  (listings[i].energy.length + user.space.length)
            }
            outdoor = true
        } else if (user.space?.map(space => space.value).includes('loutdoor') && !outdoor)
        {
            if (listings[i].energy?.map(energy => energy.value).includes('low'))
            {
                score += 1 /  (listings[i].energy.length + user.space.length)
            } else if (listings[i].energy?.map(energy => energy.value).includes('med'))
            {   
                score += 1 /  (listings[i].energy.length + user.space.length)
            } else if (listings[i].energy?.map(energy => energy.value).includes('high'))
            {
                score += 1 /  (listings[i].energy.length + user.space.length)
            }
            outdoor = true
        } else if (user.space?.map(space => space.value).includes('sliving') && !indoor)
        {
            if (listings[i].energy?.map(energy => energy.value).includes('low'))
            {   
                score += 1 /  (listings[i].energy.length + user.space.length)
            } else if (listings[i].energy?.map(energy => energy.value).includes('med'))
            {
                score += .5 /  (listings[i].energy.length + user.space.length)
            } else if (listings[i].energy?.map(energy => energy.value).includes('high'))
            {
                score +=.25  /  (listings[i].energy.length + user.space.length)
            }
            indoor = true
        } else if (user.space?.map(space => space.value).includes('lliving') && !indoor)
        {
            if (listings[i].energy?.map(energy => energy.value).includes('low'))
            {
                score += 1 /  (listings[i].energy.length + user.space.length)
            } else if (listings[i].energy?.map(energy => energy.value).includes('med'))
            {
                score += 1 /  (listings[i].energy.length + user.space.length)
            } else if (listings[i].energy?.map(energy => energy.value).includes('high'))
            {
                score += 1 /  (listings[i].energy.length + user.space.length)
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
       score = score/DIVISOR > 1 ? 1 : score/DIVISOR
    
        compatibilityScores.set(listings[i].id, score)
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