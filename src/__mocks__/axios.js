export default {
  get: jest.fn().mockResolvedValue({
    data: { data: null }
  }),
  post: jest.fn().mockResolvedValue({
    data: { data: null }
  }),
  patch: jest.fn().mockResolvedValue({
    data: { data: null }
  })
}
