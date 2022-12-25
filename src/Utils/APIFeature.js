class APIFeature {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  filter() {
    const Obj = { ...this.queryStr };
    ['sort', 'page', 'fields', 'limit'].map((el) => delete Obj[el]);
    [
      'cardType',
      'customerName',
      'customerID',
      'firstName',
      'lastName',
      'DOB',
    ].map((el) => {
      Obj[el] && (Obj[el] = new RegExp(`^${Obj[el]}`, 'i'));
    });
    this.query = this.query.find(Obj);
    return this;
  }
  sort() {
    if (this.queryStr.sort) {
      this.query = this.query.sort(this.queryStr.sort);
    }
    return this;
  }
  limitFields() {
    if (this.queryStr.fields) {
      this.query = this.query.select(this.queryStr.fields.split(',').join(' '));
    }
    return this;
  }
  pagination() {
    if (this.queryStr.page) {
      const limit = this.queryStr.limit || 2;
      const page = this.queryStr.page || 1;
      const skip = (page - 1) * limit;
      this.query = this.query.skip(skip).limit(limit);
    }
    return this;
  }
}

module.exports = APIFeature;
