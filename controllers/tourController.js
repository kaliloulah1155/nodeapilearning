 const Tour =require('./../../4-natours/models/tourModel');

  
  exports.getAllTours = async(req, res) => {
   
    try{
      
      //BUILD QUERY
      // 1A) Filtering
      const queryObj={...req.query}
      const excludedFields=['page','sort','limit','fields'];
      excludedFields.forEach(el=>delete queryObj[el]);
       
      // 1B) Advanced filter
       //{ difficulty: 'easy', duration: { gte: '5' } }
      let queryStr=JSON.stringify(queryObj);
      //{ difficulty: 'easy', duration: { $gte: '5' } }
      //gte,gt,lte,lt
      queryStr= queryStr.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`);

      // console.log(JSON.parse(queryStr));
      let query= Tour.find(JSON.parse(queryStr));

      //2) Sorting
    //  console.log(req.query);
      if(req.query.sort){
        const sortBy=req.query.sort.split(',').join(' ');
           query=query.sort(sortBy);

          // sort('price ratingsAverage')
      }else{
        query=query.sort('-createdAt'); 
      }
    
      // 3) Field limiting
      if(req.query.fields){
        const fields=req.query.fields.split(',').join(' ');
        query=query.select('name duration price');
      }else{
        query=query.select('-__v');
      }


 
      //EXECUTE QUERY
      const tours= await query;
  
      //SEND QUERY
      res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
          tours
        }
      });

    }catch(err){
      res.status(404).json({
        status:'fail',
        message:err
      })
    }
 

  };
  
  exports.getTour = async(req, res) => {
   
    try{
       const tour= await Tour.findById(req.params.id);

      res.status(200).json({
        status: 'success',
        data: {
          tour
        }
      });

    }catch(err){
          req.status(404).json({
            status:'fail',
            message:err
          })
    }
  };
  
  exports.createTour = async (req, res) => {
      // const newTour =new Tour({});
      // newTour.save();

    try{

      const newTour= await  Tour.create(req.body);
      res.status(201).json({
            status:'success',
            data:{
              tour:newTour
            }
         });

    }catch(err){
        res.status(400).json({
          status:'fail',
          message:err
        })
    }
  };
  
  exports.updateTour = async(req, res) => {

    try{

      const tour=await Tour.findByIdAndUpdate(req.params.id,req.body,{
        new :true,
        runValidators:true
      });

       res.status(200).json({
          status: 'success',
          data: {
            tour 
          }
        });

    }catch(err){

          res.status(404).json({
            status:'fail',
            message:err
          });
    }
  };
  
  exports.deleteTour = async (req, res) => {
    
   try{
     await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null
    });

   }catch(err){console.log(err)};

   
  };
  
