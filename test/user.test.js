import * as dotenv from "dotenv";
import app from "../app.js";
import chai from "chai";
import chaiHttp from "chai-http";
import casual from "casual";

dotenv.config()
chai.should();
chai.use(chaiHttp);

const email = 'test@test.com';
const password = 'testpwd';
const user = {
    email: email,
    password: password,
    password_confirmation: password,
    first_name: casual.first_name,
    last_name: casual.last_name,
};
let token;

describe('Update user', () => {
    beforeEach((done) => {
        chai.request(app)
            .post("/api/auth/login")
            .send({ email, password })
            .end((err, res) => {
                token = res.body.data.access_token;
                res.should.have.status(200);
                done();
            });
    });

    describe('Update User', () => {
        it('It should update a user.', (done) => {
            chai.request(app)
                .put('/api/users/update-user')
                .send(user)
                .set({ "Authorization": `Bearer ${token}` })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('User successfully updated.');
                    res.body.should.be.a('object');
                    done();
                })
        })
    });
});