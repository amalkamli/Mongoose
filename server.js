const express = require('express')
const app = express()
require('dotenv').config()
console.log(process.env.Mongo_URI)
const connectDB=require('./Config/connectDB')
const Person=require('./Config/Models/Person')

//Create and Save a Record of a Model
const createPerson=async()=>{
    try {
        const pers1=new Person({age:30,address:"Gafsa",name:"lml"})
       // console.log(pers1)
        await pers1.save()
        console.log("user added successfully");
    } catch (error) {
        console.log(error)
    }
}
//Create Many Records with model.create()
const   CreateMany=async()=>{
    try {
        await Person.create(records);
        console.log("added success")
    } catch (error) {
        console.log(error)
    }   
}
const records = [
    { name1: 'smx', age1: '50' , favoriteFoods:["pizza"]},
    { name2: 'umb', age2: '33' , favoriteFoods:["Couscous"] },
    { name3: 'kiku',age3: '29' , favoriteFoods:["riz","pizza"] },
    ];

//Search Database with model.find()
const Search =async()=>{
    try {
        await Person.findOne({ name3: 'kiku' });
        console.log('found pers');
      } catch (error) {
        console.error(error);
      }
 }; 
//Search Database with model.findById()
const SearchById =async()=>{
    try {
        await Person.findById("63db9cb292a9b73c9fadccf4");
        console.log('ID founded');
      } catch (error) {
        console.error(error);
      }
 }; 
//Update a Document byId()
const updatePersonById = async () => {
    try {
      const person = await Person.findById("63dd202a82765e213b6fe8ef");
      person.favoriteFoods.push("hamburger");
      person.markModified("favoriteFoods Modified");
      await person.save();
    } catch (error) {
      console.error(error);
    }
  };
//New Updates on a Document Using model.findOneAndUpdate()
const updatePersonByName = async () => {
  try {
    const updatedPerson = await Person.findOneAndUpdate(
      { name: "LML" },
      { name: "Mary" },
      { new: true }
    );
    return updatedPerson;
  } catch (error) {
    console.error(error);
  }
};
//Delete One Document Using model.findByIdAndRemove()
const deletePersonById = async () => {
  try {
    await Person.findByIdAndRemove("63dd202a82765e213b6fe8ed");
  } catch (error) {
    console.error(error);
  }
};
//Delete Many Documents with model.remove()
const deleteMany = async () => {
  try {
    await Person.deleteMany({name:'Mary'});
  } catch (error) {
    console.error(error);
  }
};
//Search Query
const findPersLikeBurritos = async () => {
  try {
    const people = await Person.find({ favoriteFoods: "burritos" })
      .sort({ name: 1 })
      .limit(2)
      .select("-age")
      .exec();
    return people;
  } catch (error) {
    console.error(error);
  }
};
findPersLikeBurritos()
deleteMany()
deletePersonById()
updatePersonByName()
updatePersonById()
Search()
SearchById()
CreateMany()
createPerson()
connectDB()
const port = 5000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))