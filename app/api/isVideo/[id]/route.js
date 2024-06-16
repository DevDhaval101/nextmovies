import { response } from 'express'
import fs from 'fs'

export async function GET(Request){
    
    const url = new URL (Request.url)
    const fileName = url.pathname.split('/')[3]

    const files = fs.readdirSync('files')
    const regEx = new RegExp(`${fileName}.*`)
    const matchingFile = files.filter(file => regEx.test(file))

    const exactmatch = matchingFile.filter(file => file.split('.')[0] === fileName)

    // console.log('exactmatch', exactmatch)

    if(exactmatch.length){
        return Response.json({success: true})
    }else{
        return Response.json({success: false})
    }

}