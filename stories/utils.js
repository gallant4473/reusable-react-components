const Faker = require('faker')

const fakeData = () => {
  const data = []
  const { firstName, lastName } = Faker.name
  const { streetName, streetAddress, city, zipCode } = Faker.address
  for (let i = 0; i < 10; i += 1) {
    data.push({
      firstName: firstName(),
      lastName: lastName(),
      streetName: streetName(),
      streetAddress: streetAddress(),
      city: city(),
      zipCode: zipCode()
    })
  }
  return data
}

export default fakeData