const professionsMock = require('../mock/professions.json')
const qualitiesMock = require('../mock/qualities.json')
const Profession = require('../models/Profession')
const Quality = require('../models/Quality')

module.exports = async () => {
  const professions = await Profession.find()

  if (professions.length !== professionsMock.length) {
    await createInitialEntities(Profession, professionsMock)
  }
  const qualities = await Quality.find()

  if (qualities.length !== qualitiesMock.length) {
    await createInitialEntities(Quality, qualitiesMock)
  }
}

async function createInitialEntities(Model, mockData) {
  await Model.collection.drop()
  return Promise.all(
    mockData.map(async (item) => {
      try {
        delete item._id
        const newItem = new Model(item)
        await newItem.save()
        return newItem
      } catch (error) {
        return error
      }
    })
  )
}
