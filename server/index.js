require('dotenv').config()
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const app = express();
const bodyParser = require('body-parser')

const User = require("./user");
const Order = require("./order")
const Promo = require("./promo")
const Base = require("./base")
const Topping = require('./topping')
const Admin = require('./admin');
//----------------------------------------- END OF IMPORTS---------------------------------------------------
mongoose.connect(process.env.MONGO_URI , {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});


// Middleware
app.use(bodyParser.urlencoded({extended: true }))

app.use(express.json({ limit: '30mb', extended: true }))
app.use(
  cors({    
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser(process.env.SECRET));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

//----------------------------------------- END OF MIDDLEWARE---------------------------------------------------

// Routes
app.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) res.send("No User Exists");
      else {
        req.logIn(user, (err) => {
          if (err) throw err;
          res.send(req.user);
          console.log(req.user);
        });
      }
    })(req, res, next);
  });

app.post("/register", (req, res) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword,
        address: req.body.address
      });
      await newUser.save();
      res.send("User Created");
    }
  });
});

app.post("/loginadmin", (req, res, next) => {

  Admin.findOne({email: req.body.email, password: req.body.password}, (err, found) => {
  if(found) {
    res.send('Login granted')
  } else {
    res.send('Not found')
  }
});
})

app.post("/registeradmin", (req, res) => {
      const newAdmin = new Admin({
        email: req.body.email,
        password: req.body.password  
      })
      newAdmin.save()
      res.send(newAdmin)
});

app.post('/order', async (req, res)=>{
  const user = req.body.user
  const items = req.body.items
  const totalQuantity = req.body.totalQuantity
  const grandTotal = req.body.grandTotal
  const orderDate = req.body.orderDate
  const deliveryStatus = req.body.deliveryStatus
  const potonganHarga = req.body.potonganHarga
  console.log(user)
  const newOrder = new Order({
    user: user,
    items: items,
    totalQuantity: totalQuantity,
    grandTotal: grandTotal,
    orderDate: orderDate,
    deliveryStatus: deliveryStatus,
    potonganHarga: potonganHarga
  })
  await newOrder.save();
  

   await items.map(item => {
    return Base.findByIdAndUpdate(item.baseId, {$inc: { jumlahTerjual: 1 }}, function(error, counter) {
      if(error) {
        console.log(error);
      }
    })
  })

        
})


app.post('/forgot', (req, res) => {
  const userEmail = req.body.email
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'test@gmail.com',
      pass: 'tes123'
    }
  })

  const mailOptions = {
    from: 'test@gmail.com',
    to: userEmail,
    subject: 'User login data',
    text: 'To change the password click this link :'
  }
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
})

app.post('/deliverystatus/beingsent', (req, res) => {
  const id = req.body.id
  Order.findByIdAndUpdate(id, {deliveryStatus: 'Sedang dikirim'}, (err, user) => {
    if(err) {
      console.log(err)
    } else {
      res.send(user)
    }
  })
})

app.post('/deliverystatus/sent', (req, res) => {
  const id = req.body.id
  Order.findByIdAndUpdate(id, {deliveryStatus: 'Terkirim'}, (err, user) => {
    if(err) {
      console.log(err)
    } else {
      res.send(user)
    }
  })
})

app.post('/promo/newpromo', (req, res) => {
  const newPromo = new Promo({
    promoName: req.body.name,
    potongan: req.body.discount
  })
  newPromo.save()
})

app.post('/promo/deletepromo', async (req, res) => {
  const id = req.body.id

  await Promo.findByIdAndDelete(id)
})

app.post('/item/base/delete', async (req, res) => {
  const id = req.body.id

  await Base.findByIdAndDelete(id)
})

app.post('/item/base/input', (req, res) => {
    const newBase = new Base({
      _id: req.body.id,
      baseName: req.body.baseName,
      price: req.body.price,
      img: req.body.img,
      jumlahTerjual: 0
    })

    newBase.save();
})

app.post('/item/topping/delete', async (req, res) => {
  const id = req.body.id

  await Topping.findByIdAndDelete(id)
})

app.post('/item/topping/input', (req, res) => {
    const newTopping = new Topping({
      _id: req.body.id,
      toppingName: req.body.toppingName,
      price: req.body.price,
      img: req.body.img,
      jumlahTerjual: 0
    })

    newTopping.save();
})

app.get("/logout", (req, res) => {
  req.logout();
  res.clearCookie(process.env.SECRET)
  res.send("success")
});

app.get("/user", (req, res) => {
  res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});

app.get("/orders", (req, res) => {
  Order.find().then(foundOrders => res.json(foundOrders))
})

app.get('/promo/newpromo', (req, res) => {
  Promo.find().then(found => res.json(found))
})

app.get('/item/base/get', (req, res) => {
  Base.find().then(found => res.json(found))
})

app.get('/item/topping/get', (req, res) => {
  Topping.find().then(found => res.json(found))
})

app.post('/orders/senduserinfo/unsent', (req, res) => {
  Order.find({deliveryStatus: "Belum dikirim", "user._id":  req.body.id})
  .then(found => res.json(found))
})

app.post('/orders/senduserinfo/beingSent', (req, res) => {
  Order.find({deliveryStatus: "Sedang dikirim", "user._id":  req.body.id})
  .then(found => res.json(found))
})

app.post('/orders/senduserinfo/sent', (req, res) => {
  Order.find({deliveryStatus: "Terkirim",  "user._id":  req.body.id})
  .then(found => res.json(found))
})

app.post('/findexistingemail', (req, res) => {
  console.log(req.body.email)
  User.findOne({email: req.body.email}, (err, found) => {
    if (err) {
      console.log(err)
    } else {
      if(found) {
        res.send("Email is already used")
      } else {
        res.send('Email is available')
      }
    }
  })
})


app.post('/findexistingusername', (req, res) => {
  console.log(req.body.username )
  User.findOne({username: req.body.username}, (err, found) => {
    if (err) {
      console.log(err)
    } else {
      if(found) {
        res.send("Username is already used")
      } else {
        res.send('Username is available')
      }
    }
  })
})






app.get('/orders/beingSent', (req, res) => {
  Order.find({deliveryStatus: 'Sedang dikirim'}).then(found => res.json(found))
})

app.get('/orders/sent', (req, res) => {
  Order.find({deliveryStatus: 'Terkirim'}).then(found => res.json(found))
})






//----------------------------------------- END OF ROUTES---------------------------------------------------
//Start Server

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log("Server Has Started");
});               