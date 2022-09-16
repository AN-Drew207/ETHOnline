import { createClient } from 'urql'

const APIURL = "https://api-sandbox-mumbai.lens.dev/"

export const client = new createClient({
  url: APIURL
})

export const recommendProfiles = `
  query RecommendedProfiles {
    recommendedProfiles {
        id
        name
        picture {
          ... on MediaSet {
            original {
              url
            }
          }
        }
        handle
        stats {
          totalFollowers
        }
    }
  }
`