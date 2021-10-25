const mongoose=require('mongoose');
const slugify=require('slugify');

const tourSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'A tour must have the name'],
        unique:true,
        trim:true,
        maxlength:[40,'A tour name must have less or equal then 40 characters'],
        minlength:[10,'A tour name must have more or equal then 10 characters']
    },
    slug:String,
    maxGroupSize:{
        type:Number,
        required:[true,"A tour must have a group size"]
    },
    difficulty:{
        type:String,
        required:[true , 'A tour must have a difficulty']
    },
    duration:{
        type:Number,
        required:[true,"A tour must have a duration"]
    },
    ratingsAverage: {
        type:Number,
        default:4.5,
        min:[1,'Rating must be above 1.0'],
        max:[5,'Rating must be below 5.0']
    },
    ratingsQuantity: {
        type:Number,
        default:0
    },
    price: {
        type:Number,
        required:[true,'A tour must have a price']
    },
    priceDiscount:Number,
    summary:{
        type:String,
        trim:true,
        required:[true,'A tour must have a description']
    },
    description:{
        type:String,
        trim:true
    },
    imageCover:{
        type:String,
        required:[true,'A tour must have a cover image']
    },
    images:[String],
    createdAt:{
        type:Date,
        default:Date.now(),
        select:false
    },
    startDates:[Date],
    secretTour:{
        type:Boolean,
        default:false
    }
},{
    //permit to use virtual properties
    toJSON:{virtuals:true} ,
    toObject:{virtuals:true}
});

tourSchema.virtual('durationWeeks').get(function(){ //not us arrow function its not persist on database
    return this.duration /7;
});

//DOCUMENt MIDDLEWARE : runs before .save() and .create() 
tourSchema.pre('save',function(next){
   this.slug=slugify(this.name,{lower:true});
   next();
});

// tourSchema.pre('save',function(next){
//     console.log("Will save document ...");

//     next();
// })

// tourSchema.post('save',function(doc,next){
//     console.log(doc);
//     next();
// })

//QUERY MIDDLEWARE
tourSchema.pre(/^find/,function(next){ //mean all string that begin by find
     
    this.find({secretTour:{$ne:true}});
    this.start=Date.now();
    next();
});

tourSchema.post(/^find/,function(docs,next){
    console.log(`Query took ${Date.now()-this.start} milliseconds`)
   // console.log(docs);
    next();
});

//AGGREGATION MIDDLEWARE

tourSchema.pre('aggregate',function(next){
   
    this.pipeline().unshift({ $match:{secretTour:{$ne:true}}});

   console.log(this.pipeline());
   next();
});

const Tour =mongoose.model('Tour',tourSchema);
    
module.exports=Tour;