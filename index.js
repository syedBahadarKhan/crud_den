import express from "express";
import mongoose from "mongoose";
import contact from './models/contacts.model.js'; //this is the collection 
const app = express();
const port = 3000;

//Database connection
mongoose.connect('mongodb://127.0.0.1:27017/contact-crud')
.then(() =>{console.log('Database connected successfully')})
//Middlewares

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));




app.get('/', async(req, res) =>{
   const contacts = await contact.find();
   res.render('home', {contacts})
})

app.get('/show-contact/:id',async (req, res) =>{
    const Contact =  await contact.findById( req.params.id );
    // res.json(Contact);
    res.render('show-contact', {Contact})
})

app.get('/add-contact', (req, res) =>{
    res.render('add-contact');
})

app.post('/add-contact', async(req, res) =>{
    await contact.create(req.body)
    res.redirect('/')
})

app.get('/update-contact/:id', async(req, res) =>{
      const Contact =  await contact.findById( req.params.id );
    // res.json(Contact);
    res.render('update-contact', {Contact})
 
})

app.post('/update-contact/:id', async(req, res) =>{
    //(req.body) when your database name and form fields name same then you can use this
    //if the form and database fields doesnt same then you uset hte following method
    const {first_name, last_name, email, phone, address} = req.body
    // await contact.findByIdAndUpdate(req.params.id, req.body) this method is for same filds
        await contact.findByIdAndUpdate(req.params.id, {first_name, last_name, email, phone, address})//this method is used for when the database and form fields name different
    res.redirect('/');
})

app.get('/delete-contact/:id', async(req, res) =>{
    await contact.findByIdAndDelete(req.params.id)//this is mongoose method not  mongodb
    res.redirect('/')
})

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
})
