export default (schema, options) => {
  /**
   * Add find one or create function to mongoose.
   *
   * @param {object} condition
   * @param {object} doc
   *
   * @return {object}
   */
  schema.statics.findOneOrCreate = async function (condition, doc) {
    const one = await this.findOne(condition);
    return one || this.create(doc);
  };

  schema.set('toJSON', {
    versionKey: false,
    transform: (doc, ret, options) => {
      delete ret.__v;
    }
  });
};
