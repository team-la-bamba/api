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

  // Use id field instead _id.
  schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret, options) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    }
  });
};
