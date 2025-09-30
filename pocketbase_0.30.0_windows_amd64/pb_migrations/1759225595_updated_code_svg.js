/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2871740963")

  // update collection data
  unmarshal({
    "name": "Svg"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2871740963")

  // update collection data
  unmarshal({
    "name": "code_svg"
  }, collection)

  return app.save(collection)
})
