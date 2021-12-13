import asyncHandler from 'express-async-handler'
import Admin from '../models/adminModel.js'

const addWord = asyncHandler(async (req, res) => {
    const word = await Admin.find({})
    if(word){
        word.inAppropriateWords.push(req.body.word)
        await word.save()
        res.json({ message: 'Word Added' })
    }
    else {
        res.status(404)
        throw new Error('Error')
    }
})

const addWords = asyncHandler(async (req, res) => {
    const word = await Admin.find({})
    if(word){
        word.inAppropriateWords.concat(req.body.word)
        await word.save()
        res.json({ message: 'Words Added' })
    }
    else {
        res.status(404)
        throw new Error('Error')
    }
})

export {
    addWord,
    addWords
}