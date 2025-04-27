const mongoose = require("mongoose");
const mongo_url = `mongodb+srv://goFood:goFood123@cluster0.klat3jl.mongodb.net/goFoodies?retryWrites=true&w=majority&appName=Cluster0`;
const mongoDB = async () => {
  try {
    await mongoose.connect(
      mongo_url,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      async (err, result) => {
        if (err) console.log("....", err);
        else {
          console.log("MongoDB connected");
          const fetched_data = await mongoose.connection.db.collection(
            "food_items"
          );
          fetched_data.find({}).toArray(async function (error, data) {
            const foodCategory = await mongoose.connection.db.collection(
              "food_category"
            );
            foodCategory.find({}).toArray(function (error, catData) {
              if (error) console.log("error");
              else {
                global.foodItems = data;
                global.foodCategory = catData;
              }
            });
          });
        }
      }
    );
  } catch (err) {
    console.error("Connection error:", err);
  }
};

module.exports = mongoDB;
