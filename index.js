let express = require(`express`);
let {connection} =require('./config/db');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
const { Usermod } = require('./models/user.model');
let cors=require('cors');
const { auth } = require('./Middlewares/authenticate');

let app = express();
app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send({msg:'home page'});
});

app.post('/signup', async (req, res) => {
    let { email, password } = req.body;
    let user = await Usermod.find({ email });

    if (user.length > 0) {
        res.send({ message: 'User already exist ! Please Login !' });
    }
    else {
        try {
            const hash_pass = bcrypt.hashSync(password, 8);
            await Usermod.create({ email, password: hash_pass });
            res.status(200).send({ message: 'Signup Successful!' });
        }
        catch (error) {
            res.status(500).send({ message: 'Error in Signup!' });
        }
    }
})


app.post('/login', async (req, res) => {
    let { email, password } = req.body;

    try {
        let user = await Usermod.findOne({ email });

        if (user) {
            let check_password = bcrypt.compareSync(password, user.password);
            if (check_password) {
                let token = jwt.sign({ empID: user._id }, 'shailesh');
                res.send({ message: 'Login successful !', token });
            } else {
                res.status(401).send({ message: 'Invalid password' });
            }
        } else {
            res.status(404).send({ message: 'User not found. Please Signup First!' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Login failed !' });
    }
});







app.listen(7000,()=>{
    connection();
    console.log('Server running at port 7000');
})