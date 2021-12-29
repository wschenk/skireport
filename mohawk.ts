import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
import { TrailStatus, trimLines } from "./skireport.ts";

export async function getMohawkStatus() {
    try {
        const url = 'https://www.mohawkmtn.com/snow-report/'
        const res = await fetch(url);
        const html = await res.text();

        return parseMohawkStatus( html )
      } catch(error) {
        console.log(error);
        return null
      }
}
export function parseMohawkStatus( html: string ) {
    console.log(html)
    const document = new DOMParser().parseFromString(html, 'text/html');
      
    if( document ) {
        const lastUpdatedDom = document.querySelectorAll('#snow-report-updated h5 span');
        const lastUpdated = `${lastUpdatedDom[0].textContent} ${lastUpdatedDom[1].textContent} ${lastUpdatedDom[2].textContent} `

        const scoopDom = document.querySelector( "#snow-report-details-wrapper .cell" )
        if( scoopDom ) {
            const trailStatus : TrailStatus[] = [];

            document.querySelectorAll( '#snow-report-trails-wrapper .trail' ).forEach( (trail) => {
                let nodeCounter = 0
                let name = ""
                let open = false
                let snowMaking = false
                let nightSkiing = false
                let grooming = false
                trail.childNodes.forEach( child => {
                    if( nodeCounter == 1 ) { name = child.textContent }
                    if( nodeCounter == 5 ) { open = child.textContent != "No" }
                    if( nodeCounter == 7 ) { snowMaking = child.textContent != "No" }
                    if( nodeCounter == 9 ) { nightSkiing = child.textContent != "No" }
                    if( nodeCounter == 11 ) { grooming = child.textContent != "No" }
                    nodeCounter = nodeCounter + 1
                } )

                const status = {name, open, snowMaking, nightSkiing, grooming}
                trailStatus.push( status )
            })

            return {
                name: 'Mohawk',
                lastUpdated,
                summary: trimLines( scoopDom.textContent ),
                trailStatus
            }
        }
    }
}
