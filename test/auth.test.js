import * as dotenv from "dotenv";
import app from "../app.js";
import chai from "chai";
import chaiHttp from "chai-http";
import casual from "casual";

dotenv.config()
chai.should();
chai.use(chaiHttp);

// const email = casual.email;
// const password = casual.password;
const email = 'uwuwu@wuwu.com';
const password = 'uwuwu';
const user = {
    email: casual.email,
    password: password,
    password_confirmation: password,
    first_name: casual.first_name,
    last_name: casual.last_name,
}

describe('Authentication and registration', () => {
    describe('User Sign-up', () => {
        it('It should add new user.', (done) => {
            chai.request(app)
                .post('/api/auth/sign-up')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('User successfully added.');
                    res.body.data.should.be.a('object');
                    res.body.data.should.have.property('id');
                    res.body.data.should.have.property('email');
                    res.body.data.should.have.property('first_name');
                    res.body.data.should.have.property('last_name');
                    res.body.data.should.have.property('status');
                    res.body.data.should.have.property('created_at');
                    done();
                })
        })
    })

    describe('Validate email address', () => {
        it('It should validate email address.', (done) => {
            chai.request(app)
                .post('/api/auth/sign-up')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(409);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Email address is already registered.');
                    done();
                })
        })
    })

    describe('User login', () => {
        it('User should be able to login.', (done) => {
            chai.request(app)
                .post('/api/auth/login')
                .send({ email, password })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Login Successful.');
                    res.body.data.should.have.property('access_token');
                    done();
                })
        })
    })

    describe('User failed login', () => {
        it('User should be not able to login.', (done) => {
            chai.request(app)
                .post('/api/auth/login')
                .send({ email, password: casual.password })
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Invalid Password.');
                    done();
                })
        })
    })

    describe('User logout', () => {
        it('User should be able to logout.', (done) => {
            chai.request(app)
                .get('/api/auth/logout')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('User is logged out.');
                    done();
                })
        })
    })
})