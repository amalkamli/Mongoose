const mongoose=require('mongoose')

const personSchema=new mongoose.Schema({
    name:{type:String,uppercase:true},
    age: Number,
    favoriteFoods:[String]
})
const Person=mongoose.model("person",personSchema)


module.exports=Person