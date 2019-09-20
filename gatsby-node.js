const _ = require('lodash')
const path = require('path')

const databaseFoods = require('./src/contents/database/foods')

const ITEMS_PER_PAGE = 20

exports.createPages = async ({graphql, actions, reporter}) => {
  const {createPage} = actions

  // Node transform
  const fetchedFoods = databaseFoods.map(async food => {
    const gqlResult = await graphql(`
      {
        banner: file(relativePath: {eq: "${food.id}.jpg"}) {
          childImageSharp {
            fluid(maxWidth: 1000, quality: 75) {
              base64
              tracedSVG
              aspectRatio
              src
              srcSet
              srcWebp
              srcSetWebp
              sizes
            }
          }
        }
      }
    `)

    return {
      raw: food,
      image: gqlResult.data.banner
    }
  })

  await Promise.all(fetchedFoods)

  console.log(fetchedFoods)

  // Create listing for databaseFoods
  createPage({
    path: `/`,
    component: path.resolve(`./src/templates/food/listing/components/index.tsx`),
    context: {
      data: fetchedFoods,
    },
  })

  // Create food pages
  fetchedFoods.map(node => {
    createPage({
      path: `/food/${node.data.id}`,
      component: path.resolve(`./src/templates/food/viewing/components/index.tsx`),
      context: {
        data: node,
      },
    })
  })
}
