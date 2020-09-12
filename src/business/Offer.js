import BusinessCart from './Cart'

class Offer {
  /**
   * Request the best offers based on the total sum of a bunch of articles
   *
   * @param {float} total
   * @param {function} callback
   */
  async getOffersFromBulk (total, callback) {
    // When total equals zero no request must be done
    // but the behavior has to remain the same
    // so we do the callback if need be
    if (total === 0) {
      if (typeof callback === 'function') {
        // Trigger callback function on resource found
        callback.call(this, 0)
      }
      return
    }

    // Actually we have something to compute
    const isbnArray = []
    const cart = BusinessCart.readCart()

    cart.forEach((article) => {
      isbnArray.push(article.isbn)
    })

    this._resourceURL =
      'http://henri-potier.xebia.fr/books/' +
      isbnArray.join(',') +
      '/commercialOffers'

    const response = await fetch(this._resourceURL)
    const data = await response.json()
    const result = response.ok ? data : Promise.reject(data)

    console.log({ ccart_data: result })

    if (typeof callback === 'function') {
      // Trigger callback function on resource found
      callback.call(this, data)
    }

    return result
  }

  /**
   * Computes the best discount basd on total price and available offers
   *
   * @param {float} total
   * @param {array} offers
   */
  computeDiscount (total, offers) {
    if (total === 0 || offers === undefined) {
      return 0
    }
    let discount = 0

    let totalPct = total
    let totalMinus = total
    let totalSlice = total

    offers.forEach((offer) => {
      if (offer.type === 'percentage') {
        totalPct = total * (1 - offer.value / 100)
      } else if (offer.type === 'minus') {
        totalMinus = total - offer.value
      } else if (offer.type === 'slice') {
        totalSlice =
          total > offer.sliceValue
            ? total - Math.floor(total / offer.sliceValue) * offer.value
            : total
      }
    })

    const minTotal = Math.min(totalPct, totalMinus, totalSlice)

    discount = (total - minTotal).toFixed(2)

    return discount
  }
}

export default Offer