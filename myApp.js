require('dotenv').config();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model('Person', personSchema);

var janeFonda = new Person({name: "Jane Fonda", age: 84, favoriteFoods: ["eggs", "fish", "fresh fruit"]});
var janeFondu = new Person({name: "Jane Fonda", age: 86, favoriteFoods: ["eggs", "fish", "fresh fruit"]});
var janeFondo = new Person({name: "Gabriele", age: 86, favoriteFoods: ["eggs", "fish", "fresh fruit"]});
var arrayOfPeople=[{janeFonda,janeFondu,janeFondo}]
var personName = "Gabriele"
var food = "Pizza"

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology:true
})
.then(() => {
  console.log("Connection Success");
})
.catch((error) => {
  console.error("Connection Failure", error);});

const createAndSavePerson = (done) => {
  var janeFonda = new Person({name: "Jane Fonda", age: 84, favoriteFoods: ["eggs", "fish", "fresh fruit"]});
  janeFonda.save((err,data)=>{
    if(err){
      console.error("Problem")
    }
    done(null, data);
  })
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople,(err,data)=>{
    if(err){
      console.error("Problem")
    }
    done(null,  data);
  })
};


const findPeopleByName = (personName, done) => {
  Person.find({name:personName},(err,data)=>{
    if(err){
      console.error("Problem")
    }
    done(null,data);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:food}, (err,data)=>{
    if(err){
      console.log(err)
    }
    done(null ,data);
  }
)};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err,data)=>{
    if(err){
      console.log(err)
    }
    done(null ,data);
  })
};

const findEditThenSave = (personId, done) => {

  const foodToAdd = "hamburger";

  Person.findById(personId, (err,data)=>{
    if(err)
      {console.log("KO")}
    const person = data;
    person.favoriteFoods.push(foodToAdd) 
    person.save((err,updateData)=>{
      if(err){
        console.error("Problem")
      }
      done(null, updateData);
    })
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name:personName},{age:ageToSet},{new:true},(err,data)=>{
    if(err)
    {console.log(err)}
    done(null , data);
})
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err,data)=>{
    if(err)
      {console.log(err)}
      done(null , data);
  })
};

const removeManyPeople = (done) => {

  const nameToRemove = "Mary";

  Person.remove({name: nameToRemove}, (err, response) => {
    if(err) return console.log(err);
    done(null, response);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec()
    .then(data => done(null, data))
    .catch(err => {
      console.error("KO" + err);
      done(err);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
