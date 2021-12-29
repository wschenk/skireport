import { getMohawkStatus } from "./mohawk.ts";
import { getStrattonStatus } from "./stratton.ts";

export interface MountainStatus {
    name: string
    lastUpdated: string
    summary: string
    trailStatus: TrailStatus[]

}
export interface TrailStatus {
    name: string
    open: boolean
    snowMaking: boolean
    nightSkiing: boolean
    grooming: boolean
}

export function trimLines( input : string ) {
    return input.split("\n").map( line => line.trim() ).join("\n")
}

export function display(status:MountainStatus) {
    if( status ) {
        console.log( `Name       ${status.name}`)
        console.log( `Updated    ${status.lastUpdated}` )
        console.log( `Summary` )
        console.log( status.summary )
        console.log( "Open  Trails" )
        status.trailStatus.forEach( trail => {
            if( trail.open ) {
                console.log( `${trail.open ? 'Yes  ' : 'No    '} ${trail.name}`)
            }
        } )
    }
}

if( Deno.args[0] == 'mohawk' ) {
    const status = await getMohawkStatus()
    if( status ) {
        display( status );
    }
}

if( Deno.args[0] == 'stratton' ) {
    const status = await getStrattonStatus()
    if( status ) {
        display( status );
    }
}
