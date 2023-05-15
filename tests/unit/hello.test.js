const { expect } = require("chai");
const sinon = require("sinon");
const { sendHello } = require("../../src/controllers/hello");

it("hello", () => {
  const request = {};
  // spy is just watching the function and tells us how the function was called (number of times, with what arguements)
  const response = { sendStatus: sinon.spy() };

  sendHello(request, response);

  expect(response.sendStatus.calledOnce).to.be.true;
  expect(response.sendStatus.calledWith(200)).to.be.true;
});
