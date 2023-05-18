import React, {useState, useEffect} from "react"
import { Link } from "react-router-dom";

const binsIndex = props => {
    const [bins, setBins] = useState([])

    const getBins = async() => {
        try{
            const response = await fetch (`/api/v1/bins`)
            if(!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw(error)
            }
            const body = await response.json()
            setBins(body.bins)
        } catch(err) {
            console.log(`Error in Fetch: ${err.message}`)
        }
    }

    useEffect(() => {
        getBins()
    }, [])

    const binTiles = props.bins.map(bin => {
        return(
        <BinTile
            key={bin.id}
            id={bin.id}
            location={bin.location}
            company={bin.company}
            neighborhood={bin.neighborhood}
            imgUrl={bin.imgUrl}
            relatedInfo={bin.relatedInfo}
        />
    )
    })

    return(
        <div>
            <h1>Drop Off Bins</h1>
            {binTiles}
        </div> 
    )
}

export default binsIndex