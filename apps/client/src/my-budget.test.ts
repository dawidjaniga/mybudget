import MyBudget from './my-budget'

describe('class MyBudget', () => {
  const apiKey = 'xyz-123'
  const mb = MyBudget(apiKey)

  it('should creates API client', () => {
    expect(mb).toHaveProperty('income')
  })
})
