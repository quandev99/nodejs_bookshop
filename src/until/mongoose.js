module.exports = {
  mutipleMongooseToObject: function (mongoose) {
    return mongoose.map((mongoose) => mongoose.toObject());
  },
  mutipleToObject: function (mongoose) {
    return mongoose ? mongoose.toObject() : mongoose;
  },
};
