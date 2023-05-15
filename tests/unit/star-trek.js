const { expect } = require("chai");
const sinon = require("sinon");
const { create } = require("../../src/controllers/star-trek");
const db = require("../../src/db");

describe("create", () => {
  beforeEach(() => {
    sinon.restore();
  });
  it("returns a 201 status code", async () => {
    // arrange
    // creating objects that match the ones used in the function (function gets request and response object from express framework)
    const request = { body: { name: "name", ship: "ship", rank: "rank" } };
    // first create empty respose object
    const response = {};
    // then add response.status method which is stub that returns the response so can chain on the .json
    response.status = sinon.stub().returns(response);
    // then setting .json to a spy so can run assertions on it
    response.json = sinon.spy();
    // writing data similar to want would be returned from database
    const data = {
      rows: [
        {
          id: 1,
          ...request.body,
        },
      ],
    };
    // using sinon.stub method, passing database object and telling it to replace the query method on that object (the await db.query() in controller)
    // then tell it what to return, as it's an async function needs to return promise which resolves to the data above
    sinon.stub(db, "query").returns(Promise.resolve(data));

    // act
    // run function with everything created above
    await create(request, response);

    // assert
    // using spy to assert function has been called and with certain arguement
    expect(response.status.calledWith(201)).to.be.true;
    //checks that it is handling the returned value from the database correctly even though not connecting to it
    expect(
      response.json.calledWith({
        id: 1,
        name: "name",
        ship: "ship",
        rank: "rank",
      })
    ).to.be.true;
  });
  it("returns a 201 status code", async () => {
    // arrange
    const request = { body: { name: "name", ship: "ship", rank: "rank" } };
    const response = {};
    response.status = sinon.stub().returns(response);
    response.json = sinon.spy();
    const data = {
      rows: [
        {
          id: 1,
          ...request.body,
        },
      ],
    };
    const mockDB = sinon
      .mock(db) // mock the db object i.e. automatically replace this object and all of it's methods
      .expects("query") // chain expectations on query method so can see mock is being used as expected
      .once() 
      .withArgs(
        "INSERT INTO StarTrek(name, ship, rank) VALUES ($1, $2, $3) RETURNING *",
        ["name", "ship", "rank"]
      )
      .returns(Promise.resolve(data)); // chain on return to return the data above

    // act
    await create(request, response);

    // assert
    // call this, it will look at mockDB function and with throw an error if any assertions are wrong
    mockDB.verify();
  });
});
