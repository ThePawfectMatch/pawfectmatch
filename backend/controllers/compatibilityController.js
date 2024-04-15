const Listing = require('../models/listingModel')
const User = require('../models/userModel')

//Creates a tuple of (Listing ID : compatibility score) 
const computeCompatibility = async (req, res) => {
    const user = await User.findById(req.params._id)
    const listings = await Listing.find({}).sort({createdAt: -1})

    //CHANGE THIS IF WE ADD MORE FIELDS SO IT DIVIDES CORRECTLY
    let DIVISOR = 3;


    //preferences Space and lifestyle are arrays 
    let compatibilityScores = new Map();

    for(let i = 0; i < listings.length; i ++)
    {
        let score = 0

        if(user.petPreferences == listings[i].type)
        {
            score+=1
        }

        
        if(user.livingArrangements== 'house')
        {
            if(listings[i].sizeVal == 's') 
            {
                score+=.25
            } else if(listings[i].sizeVal == 'm') 
            {
                score+=1
            } else 
            {
                score+=.5
            }
        } else if(user.livingArrangements == 'townhouse') 
        {
            if(listings[i].sizeVal == 's') 
            {
                score+=.5
            } else if(listings[i].sizeVal == 'm') 
            {
                score+=.5
            } else 
            {
                score+=.5
            }
        } else 
        {
            if(listings[i].sizeVal == 's') 
            {
                score+=1
            } else if(listings[i].sizeVal == 'm') 
            {
                score+=.5
            } else 
            {
                score+=.25
            }
        }

        if(user.experience == 'none')
        { 
            if(listings[i].trainingVals == 'need')
            {
                score += .25
            } else if(listings[i].trainingVals == 'none')
            {
                score += -1
            } else if(listings[i].trainingVals == 'part')
            {
                score += .5
            } else if(listings[i].trainingVals == 'well')
            {
                score += 1
            }
        } else if(user.experience == 'moderate') 
        {
            if(listings[i].trainingVals == 'need')
            {
                score += .5
            } else if(listings[i].trainingVals == 'none')
            {
                score += .25
            } else if(listings[i].trainingVals == 'part')
            {
                score += 1
            } else if(listings[i].trainingVals == 'well')
            {
                score += 1
            }
        } else 
        {
            if(listings[i].trainingVals == 'need')
            {
                score += 1
            } else if(listings[i].trainingVals == 'none')
            {
                score += 1
            } else if(listings[i].trainingVals == 'part')
            {
                score += 1
            } else if(listings[i].trainingVals == 'well')
            {
                score += 1
            }
        }

        let outdoor = false
        let indoor = false
    
        if(user.space == 'soutdoor' && !outdoor)
        {
            if(listings[i].energyVals == 'low')
            {
                score += 1
            } else if(listings[i].energyVals == 'med')
            {
                score += .5
            } else if(listings[i].energyVals == 'high')
            {
                score += .5
            }
            outdoor = true
        } else if (user.space == 'loutdoor' && !outdoor)
        {
            if(listings[i].energyVals == 'low')
            {
                score += 1
            } else if(listings[i].energyVals == 'med')
            {   
                score += 1
            } else if(listings[i].energyVals == 'high')
            {
                score += 1
            }
            outdoor = true
        } else if(user.space == 'sliving' && !indoor)
        {
            if(listings[i].energyVals == 'low')
            {   
                score += 1
            } else if(listings[i].energyVals == 'med')
            {
                score += .5
            } else if(listings[i].energyVals == 'high')
            {
                score +=.25
            }
            indoor = true
        } else if(user.space == 'lliving' && !indoor)
        {
            if(listings[i].energyVals == 'low')
            {
                score += 1
            } else if(listings[i].energyVals == 'med')
            {
                score += 1
            } else if(listings[i].energyVals == 'high')
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
            if(user.lifestyleTraits[i] == 'single' && !familyFlag)
            {
                if(listings.)
                familyFlag = true
            } else if( user.lifestyleTraits[i] == 'couple' && !familyFlag)
            {
                familyFlag = true

            } else if( user.lifestyleTraits[i] == 'sfamily' && !familyFlag)
            {
                familyFlag = true

            } else if( user.lifestyleTraits[i] == 'lfamily' && !familyFlag)
            {
                familyFlag = true

            } else if( user.lifestyleTraits[i] == 'full-time' && !workFlag)
            {
                workFlag = true
            } else if( user.lifestyleTraits[i] == 'part-time' && !workFlag)
            {
                workFlag = true

            } else if( user.lifestyleTraits[i] == 'flex' && !workFlag)
            {
                workFlag = true

            } else if( user.lifestyleTraits[i] == 'active' && !lifeFlag)
            {
                lifeFlag = true
            } else if( user.lifestyleTraits[i] == 'sedentary' && !lifeFlag)
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