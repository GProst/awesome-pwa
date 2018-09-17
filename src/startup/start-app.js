export const startApp = () => {
  const fragment = document.createDocumentFragment()
  const vendors = document.createElement('script')
  vendors.src = '/vendors.js'
  fragment.appendChild(vendors)
  const app = document.createElement('script')
  app.src = '/app.js'
  fragment.appendChild(app)
  document.body.appendChild(fragment)
}
