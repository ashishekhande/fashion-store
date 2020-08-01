var Observer = require('../appBackEnd/observerPattern');
var CustomerFactory = require('./Customer/customerFactory');
var Customer = require('./Customer/Customer');
var common = require('../appBackEnd/emmiter/emit');

var commonEmitter = common.commonEmitter;
const DISCOUNT_ON_PRODUCT = require('../appBackEnd/subject');

export const MakeSubscriptions = function () {
  var oObserver = new Observer();
  var cust = new Customer();


  cust.getCustomers(0, (custList) => {
    custList.forEach(cust => {
      var customerFactory = new CustomerFactory()

      var custItem = customerFactory.getCustomer(cust.data.type);

      if (custItem){
        custItem.setMail(cust.data.Email);
        custItem.setType(cust.data.type);
        custItem.setSegment(cust.data.subscription_segment)
        custItem.setAction(cust.data.action)
        oObserver.Subscribe(custItem);
        console.log(custItem + 'registered for discount notification')
      }
    });
  })
  .then(()=>{})
  .catch((err)=>{});
  


  commonEmitter.on(DISCOUNT_ON_PRODUCT, (data) => {
    oObserver.Notify(data);

    console.log('an event occurred!');
  });
}

MakeSubscriptions();
