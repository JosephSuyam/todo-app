import * as dotenv from "dotenv";
import app from "../app.js";
import chai from "chai";
import chaiHttp from "chai-http";
import casual from "casual";

dotenv.config()
chai.should();
chai.use(chaiHttp);

const email = 'uwuwu@wuwu.com';
const password = 'uwuwu';
const task = {
    title: casual.title,
    description: casual.description
}
let token;
let task_id;

describe('Task/Todo Management', () => {
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

    describe('Add Task', () => {
        it('It should add new task.', (done) => {
            chai.request(app)
                .post('/api/tasks/add-task')
                .send(task)
                .set({ "Authorization": `Bearer ${token}` })
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Task successfully added.');
                    res.body.data.should.be.a('object');
                    res.body.data.should.have.property('id');
                    res.body.data.should.have.property('title');
                    res.body.data.should.have.property('description');
                    res.body.data.should.have.property('status');
                    res.body.data.should.have.property('created_at');
                    res.body.data.should.have.property('updated_at');
                    task_id = res.body.data.id;
                    done();
                })
        })
    });

    describe('Update Task', () => {
        it('It should update new task.', (done) => {
            chai.request(app)
                .put(`/api/tasks/update-task/${task_id}`)
                .send({
                    title: casual.title,
                    description: casual.description
                })
                .set({ "Authorization": `Bearer ${token}` })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Task successfully updated.');
                    res.body.data.should.be.a('object');
                    res.body.data.should.have.property('id');
                    res.body.data.should.have.property('title');
                    res.body.data.should.have.property('description');
                    res.body.data.should.have.property('status');
                    res.body.data.should.have.property('created_at');
                    res.body.data.should.have.property('updated_at');
                    done();
                })
        })
    });

    describe('Task Paginated List', () => {
        it('It should list tasks', (done) => {
            chai.request(app)
                .get('/api/tasks/get-tasks')
                .set({ "Authorization": `Bearer ${token}` })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('message').eql('Task List.');
                    res.body.should.be.a('object');
                    res.body.should.have.property('total_count');
                    res.body.should.have.property('total_pages');
                    res.body.data.should.be.a('array');
                    done();
                })
        })
    });

    describe('Task Details', () => {
        it('It should list task details', (done) => {
            chai.request(app)
                .get(`/api/tasks/get-task/${task_id}`)
                .set({ "Authorization": `Bearer ${token}` })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('message').eql('Task Details.');
                    res.body.should.be.a('object');
                    res.body.data.should.be.a('object');
                    done();
                })
        })
    });

    describe('Task Status Update', () => {
        it('It should update task status', (done) => {
            chai.request(app)
                .patch(`/api/tasks/set-status/${task_id}`)
                .send({ status: "COMPLETE" })
                .set({ "Authorization": `Bearer ${token}` })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('message').eql('Task status updated.');
                    res.body.should.be.a('object');
                    done();
                })
        })
    });
})